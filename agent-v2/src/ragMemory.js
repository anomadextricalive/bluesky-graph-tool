import { appendMemory, readMemory } from './stateStore.js';

function tokenize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

function overlapScore(queryTokens, docTokens) {
  if (!queryTokens.length || !docTokens.length) return 0;
  const docSet = new Set(docTokens);
  let matches = 0;
  for (const t of queryTokens) if (docSet.has(t)) matches += 1;
  return matches / queryTokens.length;
}

export function ingestPostsToMemory(posts) {
  const records = posts.map(p => ({
    type: 'post',
    ts: new Date().toISOString(),
    uri: p.uri,
    authorHandle: p.authorHandle,
    createdAt: p.createdAt,
    text: p.text,
    likes: p.likes,
    replies: p.replies,
    reposts: p.reposts
  }));
  if (records.length) appendMemory(records);
}

export function retrieveContext({ query, limit = 12 }) {
  const mem = readMemory();
  const qTokens = tokenize(query);

  const scored = mem
    .filter(r => r.type === 'post' && r.text)
    .map(r => {
      const ageHrs = Math.max(0, (Date.now() - new Date(r.createdAt).getTime()) / 36e5);
      const recencyBoost = Math.max(0, 1 - ageHrs / 48);
      const textScore = overlapScore(qTokens, tokenize(r.text));
      const engage = (r.likes || 0) + (r.replies || 0) + (r.reposts || 0);
      const engageBoost = Math.min(1, engage / 200);
      const score = textScore * 0.65 + recencyBoost * 0.2 + engageBoost * 0.15;
      return { ...r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

export function summarizeTrends(records, topN = 8) {
  const counter = new Map();
  for (const r of records) {
    for (const tok of tokenize(r.text)) {
      if (tok.length < 4) continue;
      counter.set(tok, (counter.get(tok) || 0) + 1);
    }
  }
  return [...counter.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
}
