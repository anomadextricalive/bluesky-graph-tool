import { logger } from './logger.js';

/**
 * Tokenize a string into lowercase words (3+ chars).
 * Shared logic with ragMemory.js — extracted for reuse.
 */
export function tokenize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

/**
 * Compute keyword overlap score between two token arrays.
 * @returns {number} 0-1 score
 */
export function overlapScore(queryTokens, docTokens) {
  if (!queryTokens.length || !docTokens.length) return 0;
  const docSet = new Set(docTokens);
  let matches = 0;
  for (const t of queryTokens) {
    if (docSet.has(t)) matches += 1;
  }
  return matches / queryTokens.length;
}

/**
 * Score how niche-relevant an account is based on their bio and recent posts.
 *
 * @param {Object} params
 * @param {string} params.bio - The user's profile description/bio
 * @param {string[]} params.postTexts - Array of recent post texts
 * @param {string[]} params.keywords - Niche keywords from config
 * @returns {number} 0-1 relevance score
 */
export function scoreNicheRelevance({ bio, postTexts, keywords }) {
  if (!keywords || keywords.length === 0) return 1; // no filter = everything relevant

  const keywordTokens = [];
  for (const kw of keywords) {
    keywordTokens.push(...tokenize(kw));
  }

  if (keywordTokens.length === 0) return 1;

  // Score bio (weighted 40%)
  const bioTokens = tokenize(bio);
  const bioScore = overlapScore(keywordTokens, bioTokens);

  // Score posts (weighted 60%) — average across all provided posts
  let postScore = 0;
  if (postTexts.length > 0) {
    let totalPostScore = 0;
    for (const text of postTexts) {
      const postTokens = tokenize(text);
      totalPostScore += overlapScore(keywordTokens, postTokens);
    }
    postScore = totalPostScore / postTexts.length;
  }

  const combined = bioScore * 0.4 + postScore * 0.6;
  return Math.round(combined * 1000) / 1000; // 3 decimal places
}

/**
 * Score a user's niche relevance by fetching their profile and recent posts.
 *
 * @param {Object} bluesky - BlueskyClient instance
 * @param {string} did - User's DID
 * @param {string[]} keywords - Niche keywords from config
 * @returns {Promise<{score: number, handle: string, bio: string}>}
 */
export async function scoreUserRelevance(bluesky, did, keywords) {
  try {
    // Fetch profile for bio
    const profile = await bluesky.getProfile(did);
    const bio = profile.description || '';
    const handle = profile.handle || did;

    // Fetch recent posts (up to 5) for content analysis
    let postTexts = [];
    try {
      const posts = await bluesky.fetchAuthorPosts(did, 5);
      postTexts = posts.map(p => p.text).filter(Boolean);
    } catch (e) {
      logger.warn(`Could not fetch posts for ${did}: ${e.message}`);
    }

    const score = scoreNicheRelevance({ bio, postTexts, keywords });
    return { score, handle, bio };
  } catch (e) {
    logger.warn(`Could not score relevance for ${did}: ${e.message}`);
    return { score: 0, handle: did, bio: '' };
  }
}
