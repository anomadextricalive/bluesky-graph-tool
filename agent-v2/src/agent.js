import { logger } from './logger.js';
import { loadState, saveState } from './stateStore.js';
import { ingestPostsToMemory, retrieveContext, summarizeTrends } from './ragMemory.js';
import { recordFollow, getStaleFollows, removeEntry, updateNicheScore, hasFollow } from './followRegistry.js';
import { scoreUserRelevance, scoreNicheRelevance, tokenize } from './nicheScorer.js';

// ── Helpers ──

function hoursAgo(ts) {
  return (Date.now() - new Date(ts).getTime()) / 36e5;
}

function includesAny(text, words) {
  const t = String(text || '').toLowerCase();
  return words.some(w => t.includes(String(w).toLowerCase()));
}

function normalizeText(s) {
  return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function canAct(state, cfg) {
  if (state.actionsToday >= cfg.runtime.maxActionsPerDay) return false;
  if (!state.lastActionAt) return true;
  const mins = (Date.now() - new Date(state.lastActionAt).getTime()) / 60000;
  return mins >= cfg.runtime.cooldownMinutes;
}

function applyGuardrails(plan, cfg, state) {
  const blocked = cfg.filters.blockedTerms || [];
  const clean = {
    action: plan.action,
    reason: plan.reason,
    text: String(plan.text || '').trim(),
    replyToUri: plan.replyToUri || null,
    repostUri: plan.repostUri || null,
    repostCid: plan.repostCid || null
  };

  // Reposts don't need text
  if (!clean.text && clean.action !== 'skip' && clean.action !== 'repost') {
    return { ok: false, reason: 'empty-text', plan: { ...clean, action: 'skip' } };
  }

  if (clean.text.length > 300) clean.text = clean.text.slice(0, 297) + '...';

  if (clean.text && includesAny(clean.text, blocked)) {
    return { ok: false, reason: 'blocked-term', plan: { ...clean, action: 'skip' } };
  }

  if (clean.text) {
    const normalized = normalizeText(clean.text);
    if (state.recentOutputs.some(o => normalizeText(o.text) === normalized)) {
      return { ok: false, reason: 'duplicate-output', plan: { ...clean, action: 'skip' } };
    }
  }

  return { ok: true, reason: '', plan: clean };
}

function buildEngagePrompt(cfg, candidates, context, trends, state) {
  const policy = {
    niche: cfg.agent.niche,
    voice: cfg.agent.voice,
    recencyHours: cfg.runtime.lookbackHours,
    dailyLimits: {
      maxRepliesPerDay: cfg.runtime.maxRepliesPerDay,
      maxRepostsPerDay: cfg.runtime.maxRepostsPerDay,
      maxPostsPerDay: cfg.runtime.maxPostsPerDay
    },
    counters: {
      repliesToday: state.repliesToday,
      repostsToday: state.repostsToday,
      postsToday: state.postsToday
    },
    constraints: [
      'Never mention being an AI.',
      'No spammy hashtags.',
      'Keep it natural and niche-relevant.',
      'Prefer replies and reposts to maximize engagement.',
      'If no high-confidence idea, choose skip.'
    ]
  };

  return [
    `Policy: ${JSON.stringify(policy)}`,
    `Current trends: ${trends.join(', ') || 'none'}`,
    `Recent opportunities (reply/repost targets): ${JSON.stringify(candidates.slice(0, 8))}`,
    `Live memory context: ${JSON.stringify(context.slice(0, 10))}`,
    'Choose best action now: reply, repost, post, or skip. Provide the relevant URIs/CIDs for reposts.'
  ].join('\n\n');
}

function pickReplyRef(candidates, replyUri) {
  if (!replyUri) return null;
  const c = candidates.find(x => x.uri === replyUri);
  if (!c || !c.cid) return null; // Skip if CID is missing — never use malformed values
  return {
    root: { uri: c.uri, cid: c.cid },
    parent: { uri: c.uri, cid: c.cid }
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Phase 1: FOLLOW ──
// Find niche-relevant accounts from target's followers/following and follow them.

async function phaseFollow({ cfg, bluesky, state }) {
  if (state.followsToday >= cfg.runtime.maxFollowsPerDay) {
    logger.info('[FOLLOW] Daily follow limit reached, skipping.');
    return;
  }

  const targets = cfg.filters.targetAccounts || [];
  if (targets.length === 0) {
    logger.info('[FOLLOW] No target accounts configured, skipping follow phase.');
    return;
  }

  // Pick a random target account
  const target = targets[Math.floor(Math.random() * targets.length)];
  logger.info(`[FOLLOW] Scanning followers of @${target}...`);

  const dryRun = Boolean(cfg.runtime.dryRun);
  const keywords = cfg.filters.keywords || [];
  const nicheThreshold = cfg.runtime.nicheThreshold || 0.15;
  const maxToFollow = Math.min(10, cfg.runtime.maxFollowsPerDay - state.followsToday);

  try {
    const targetDid = await bluesky.resolveHandle(target);
    const followers = await bluesky.getFollowers(targetDid, 100);

    // Filter out: self, already following, already in registry
    const candidates = followers.filter(f => {
      if (f.did === bluesky.did) return false;
      if (f.viewer && f.viewer.following) return false;
      if (hasFollow(f.did)) return false;
      return true;
    });

    logger.info(`[FOLLOW] Found ${candidates.length} potential candidates from @${target}.`);

    let followed = 0;
    for (const candidate of candidates) {
      if (followed >= maxToFollow) break;
      if (state.followsToday >= cfg.runtime.maxFollowsPerDay) break;

      // Quick niche score from bio
      const bio = candidate.description || '';
      const quickScore = scoreNicheRelevance({
        bio,
        postTexts: [],
        keywords
      });

      if (quickScore < nicheThreshold && keywords.length > 0) {
        logger.info(`[FOLLOW] Skipping @${candidate.handle} (niche score ${quickScore} < ${nicheThreshold})`);
        continue;
      }

      try {
        if (dryRun) {
          logger.info(`[FOLLOW] [DRY-RUN] Would follow @${candidate.handle} (niche: ${quickScore})`);
        } else {
          await bluesky.follow(candidate.did);
          logger.info(`[FOLLOW] ✓ Followed @${candidate.handle} (niche: ${quickScore})`);
        }

        // Record in registry even during dry run so we can test the pipeline
        recordFollow(candidate.did, candidate.handle, `target-followers:${target}`, quickScore);

        followed++;
        state.followsToday++;
        state.actionsToday++;
        state.lastActionAt = new Date().toISOString();

        await sleep(1500); // polite delay between follows
      } catch (e) {
        logger.warn(`[FOLLOW] Error following @${candidate.handle}: ${e.message}`);
        if (e.message.includes('429')) {
          logger.warn('[FOLLOW] Rate limited, pausing follow phase.');
          break;
        }
      }
    }

    logger.info(`[FOLLOW] Phase complete. Followed ${followed} accounts.`);
  } catch (e) {
    logger.warn(`[FOLLOW] Phase error: ${e.message}`);
  }
}

// ── Phase 2: ENGAGE ──
// GPT picks: reply, repost, or skip for each candidate post.

async function phaseEngage({ cfg, bluesky, llm, state }) {
  const lookbackHours = cfg.runtime.lookbackHours || 24;
  const keywords = cfg.filters.keywords || [];
  const targets = cfg.filters.targetAccounts || [];
  const engagementsPerRun = cfg.runtime.engagementsPerRun || 3;
  const dryRun = Boolean(cfg.runtime.dryRun);

  const allPosts = [];
  for (const handle of targets) {
    try {
      const did = await bluesky.resolveHandle(handle);
      const posts = await bluesky.fetchAuthorPosts(did, 30);
      for (const p of posts) {
        allPosts.push({ ...p, targetHandle: handle });
      }
    } catch (err) {
      logger.warn(`[ENGAGE] Failed to fetch posts for @${handle}: ${err.message}`);
    }
  }

  ingestPostsToMemory(allPosts);

  const candidates = allPosts
    .filter(p => hoursAgo(p.createdAt) <= lookbackHours)
    .filter(p => keywords.length === 0 || includesAny(p.text, keywords))
    .filter(p => !state.seenPostUris.includes(p.uri))
    .sort((a, b) => ((b.likes + b.replies + b.reposts) - (a.likes + a.replies + a.reposts)));

  if (candidates.length === 0) {
    logger.info('[ENGAGE] No new candidate posts found, skipping.');
    return;
  }

  logger.info(`[ENGAGE] Found ${candidates.length} candidate post(s) for engagement.`);

  const ragQuery = `${cfg.agent.niche} ${keywords.join(' ')}`;
  const context = retrieveContext({ query: ragQuery, limit: 14 });
  const trends = summarizeTrends(context, 8);

  let engagements = 0;
  for (let i = 0; i < Math.min(engagementsPerRun, candidates.length); i++) {
    if (!canAct(state, cfg)) {
      logger.info('[ENGAGE] Cooldown or daily cap, stopping engagements.');
      break;
    }

    const prompt = buildEngagePrompt(cfg, candidates.slice(i), context, trends, state);
    const plan = await llm.planAction(prompt);
    const guarded = applyGuardrails(plan, cfg, state);

    if (!guarded.ok || guarded.plan.action === 'skip') {
      logger.info(`[ENGAGE] Planner skipped. Reason: ${guarded.reason || guarded.plan.reason || 'skip'}`);
      // Mark as seen so we don't keep evaluating it
      if (candidates[i]) {
        state.seenPostUris.push(candidates[i].uri);
      }
      continue;
    }

    const action = guarded.plan;

    if (action.action === 'reply' && state.repliesToday < cfg.runtime.maxRepliesPerDay) {
      const replyRef = pickReplyRef(candidates, action.replyToUri)
        || pickReplyRef(candidates, candidates[i]?.uri);
      if (!replyRef) {
        logger.info('[ENGAGE] Reply target not found, skipping.');
        continue;
      }

      if (dryRun) {
        logger.info(`[ENGAGE] [DRY-RUN] Would reply: "${action.text}"`);
      } else {
        await bluesky.createPost(action.text, replyRef);
        logger.info(`[ENGAGE] ✓ Reply posted: "${action.text.substring(0, 60)}..."`);
      }
      state.repliesToday++;
      engagements++;

    } else if (action.action === 'repost' && state.repostsToday < cfg.runtime.maxRepostsPerDay) {
      const repostUri = action.repostUri || candidates[i]?.uri;
      const repostCid = action.repostCid || candidates[i]?.cid;

      if (!repostUri || !repostCid) {
        logger.info('[ENGAGE] Repost target missing URI/CID, skipping.');
        continue;
      }

      if (dryRun) {
        logger.info(`[ENGAGE] [DRY-RUN] Would repost: ${repostUri}`);
      } else {
        await bluesky.repost(repostUri, repostCid);
        logger.info(`[ENGAGE] ✓ Reposted: ${repostUri}`);
      }
      state.repostsToday++;
      engagements++;

    } else if (action.action === 'post' && state.postsToday < cfg.runtime.maxPostsPerDay) {
      if (dryRun) {
        logger.info(`[ENGAGE] [DRY-RUN] Would post: "${action.text}"`);
      } else {
        await bluesky.createPost(action.text, null);
        logger.info(`[ENGAGE] ✓ Post published: "${action.text.substring(0, 60)}..."`);
      }
      state.postsToday++;
      engagements++;

    } else {
      logger.info(`[ENGAGE] Action "${action.action}" limit reached, skipping.`);
    }

    // Record the action
    state.actionsToday++;
    state.lastActionAt = new Date().toISOString();
    if (action.text) {
      state.recentOutputs.push({ text: action.text, at: state.lastActionAt });
      if (state.recentOutputs.length > 40) state.recentOutputs = state.recentOutputs.slice(-40);
    }

    // Mark candidate as seen
    if (candidates[i]) {
      state.seenPostUris.push(candidates[i].uri);
    }

    await sleep(2000); // polite delay between engagements
  }

  // Trim seen URIs
  if (state.seenPostUris.length > 500) state.seenPostUris = state.seenPostUris.slice(-500);
  logger.info(`[ENGAGE] Phase complete. ${engagements} engagement(s) made.`);
}

// ── Phase 3: POST ──
// GPT generates original niche content (if budget allows).

async function phasePost({ cfg, bluesky, llm, state }) {
  if (state.postsToday >= cfg.runtime.maxPostsPerDay) {
    logger.info('[POST] Daily post limit reached, skipping.');
    return;
  }

  if (!canAct(state, cfg)) {
    logger.info('[POST] Cooldown active, skipping post phase.');
    return;
  }

  const dryRun = Boolean(cfg.runtime.dryRun);
  const keywords = cfg.filters.keywords || [];
  const ragQuery = `${cfg.agent.niche} ${keywords.join(' ')}`;
  const context = retrieveContext({ query: ragQuery, limit: 10 });
  const trends = summarizeTrends(context, 8);

  const prompt = [
    `You are an autonomous content creator for the "${cfg.agent.niche}" niche.`,
    `Voice: ${cfg.agent.voice}.`,
    `Current trends: ${trends.join(', ') || 'none'}`,
    `Recent memory: ${JSON.stringify(context.slice(0, 5))}`,
    `Posts today: ${state.postsToday}/${cfg.runtime.maxPostsPerDay}`,
    'Create ONE original post. Output JSON: {"action":"post","reason":"string","text":"string","replyToUri":null,"repostUri":null,"repostCid":null}',
    'If you have nothing valuable to say, choose skip.'
  ].join('\n\n');

  const plan = await llm.planAction(prompt);
  const guarded = applyGuardrails(plan, cfg, state);

  if (!guarded.ok || guarded.plan.action === 'skip' || !guarded.plan.text) {
    logger.info(`[POST] Planner skipped. Reason: ${guarded.reason || guarded.plan.reason || 'nothing to say'}`);
    return;
  }

  if (dryRun) {
    logger.info(`[POST] [DRY-RUN] Would post: "${guarded.plan.text}"`);
  } else {
    await bluesky.createPost(guarded.plan.text, null);
    logger.info(`[POST] ✓ Original post published: "${guarded.plan.text.substring(0, 60)}..."`);
  }

  state.postsToday++;
  state.actionsToday++;
  state.lastActionAt = new Date().toISOString();
  state.recentOutputs.push({ text: guarded.plan.text, at: state.lastActionAt });
  if (state.recentOutputs.length > 40) state.recentOutputs = state.recentOutputs.slice(-40);
}

// ── Phase 4: UNFOLLOW ──
// Prune stale (>7 days, no follow-back) and off-niche follows.

async function phaseUnfollow({ cfg, bluesky, state }) {
  if (state.unfollowsToday >= cfg.runtime.maxUnfollowsPerDay) {
    logger.info('[UNFOLLOW] Daily unfollow limit reached, skipping.');
    return;
  }

  const dryRun = Boolean(cfg.runtime.dryRun);
  const unfollowAfterDays = cfg.runtime.unfollowAfterDays || 7;
  const nicheThreshold = cfg.runtime.nicheThreshold || 0.15;
  const keywords = cfg.filters.keywords || [];
  const maxToUnfollow = Math.min(10, cfg.runtime.maxUnfollowsPerDay - state.unfollowsToday);

  const stale = getStaleFollows(unfollowAfterDays);
  if (stale.length === 0) {
    logger.info('[UNFOLLOW] No stale follows found, skipping.');
    return;
  }

  logger.info(`[UNFOLLOW] Found ${stale.length} follow(s) older than ${unfollowAfterDays} days.`);

  // Fetch our followers set for reciprocation check
  let followerDids;
  try {
    const myFollowers = await bluesky.getFollowers(bluesky.did, 5000);
    followerDids = new Set(myFollowers.map(f => f.did));
  } catch (e) {
    logger.warn(`[UNFOLLOW] Could not fetch followers: ${e.message}. Skipping unfollow phase.`);
    return;
  }

  // Fetch follow records to get rkeys for unfollowing — one batch call
  let followRecords;
  try {
    followRecords = await bluesky.listFollowRecords(5000);
  } catch (e) {
    logger.warn(`[UNFOLLOW] Could not list follow records: ${e.message}. Skipping.`);
    return;
  }

  // Build did → rkey map
  const didToRkey = new Map();
  for (const rec of followRecords) {
    if (rec.value && rec.value.subject) {
      const rkey = rec.uri.split('/').pop();
      didToRkey.set(rec.value.subject, rkey);
    }
  }

  let unfollowed = 0;
  for (const entry of stale) {
    if (unfollowed >= maxToUnfollow) break;
    if (state.unfollowsToday >= cfg.runtime.maxUnfollowsPerDay) break;

    // Check if they followed back
    if (followerDids.has(entry.did)) {
      logger.info(`[UNFOLLOW] @${entry.handle} followed back — keeping.`);
      continue;
    }

    // Re-check niche score for stale non-reciprocators
    let nicheScore = entry.nicheScore;
    if (nicheScore === null || nicheScore === undefined) {
      try {
        const result = await scoreUserRelevance(bluesky, entry.did, keywords);
        nicheScore = result.score;
        updateNicheScore(entry.did, nicheScore);
      } catch (e) {
        logger.warn(`[UNFOLLOW] Could not score @${entry.handle}: ${e.message}`);
        nicheScore = 0;
      }
    }

    // Decision: unfollow if non-reciprocal (beyond grace period)
    // OR unfollow if niche score is below threshold
    const shouldUnfollow = !followerDids.has(entry.did) || nicheScore < nicheThreshold;

    if (!shouldUnfollow) continue;

    const rkey = didToRkey.get(entry.did);
    if (!rkey) {
      logger.warn(`[UNFOLLOW] No follow record rkey found for @${entry.handle}, removing from registry.`);
      removeEntry(entry.did);
      continue;
    }

    try {
      if (dryRun) {
        logger.info(`[UNFOLLOW] [DRY-RUN] Would unfollow @${entry.handle} (niche: ${nicheScore}, days: ${unfollowAfterDays}+)`);
      } else {
        await bluesky.unfollow(rkey);
        logger.info(`[UNFOLLOW] ✓ Unfollowed @${entry.handle} (niche: ${nicheScore})`);
      }

      removeEntry(entry.did);
      unfollowed++;
      state.unfollowsToday++;
      state.actionsToday++;
      state.lastActionAt = new Date().toISOString();

      await sleep(1500); // polite delay
    } catch (e) {
      logger.warn(`[UNFOLLOW] Error unfollowing @${entry.handle}: ${e.message}`);
      if (e.message.includes('429')) {
        logger.warn('[UNFOLLOW] Rate limited, stopping unfollow phase.');
        break;
      }
    }
  }

  logger.info(`[UNFOLLOW] Phase complete. Unfollowed ${unfollowed} account(s).`);
}

// ── Main Entry Point ──

export async function runAgentOnce({ cfg, bluesky, llm }) {
  const state = loadState();
  const runStart = new Date().toISOString();
  logger.info(`\n═══ Agent run started at ${runStart} ═══`);
  logger.info(`Day: ${state.dayKey} | Actions: ${state.actionsToday}/${cfg.runtime.maxActionsPerDay}`);

  if (state.actionsToday >= cfg.runtime.maxActionsPerDay) {
    logger.info('Daily action cap reached. Skipping entire run.');
    saveState(state);
    return;
  }

  // Phase 1: Follow niche accounts
  await phaseFollow({ cfg, bluesky, state });
  saveState(state); // checkpoint

  // Phase 2: Engage (reply, repost) with existing content
  await phaseEngage({ cfg, bluesky, llm, state });
  saveState(state); // checkpoint

  // Phase 3: Create original post
  await phasePost({ cfg, bluesky, llm, state });
  saveState(state); // checkpoint

  // Phase 4: Unfollow stale/off-niche
  await phaseUnfollow({ cfg, bluesky, state });
  saveState(state); // final save

  logger.info(`═══ Agent run complete. Actions today: ${state.actionsToday} ═══\n`);
}
