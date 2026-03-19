import fs from 'node:fs';
import path from 'node:path';

const STATE_DIR = path.resolve(process.cwd(), 'state');
const FOLLOWS_PATH = path.join(STATE_DIR, 'follows.json');

function ensureDir() {
  if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });
}

function loadRegistry() {
  ensureDir();
  if (!fs.existsSync(FOLLOWS_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(FOLLOWS_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveRegistry(registry) {
  ensureDir();
  fs.writeFileSync(FOLLOWS_PATH, JSON.stringify(registry, null, 2));
}

/**
 * Record that we followed a user.
 * @param {string} did - The DID of the user
 * @param {string} handle - Their handle
 * @param {string} source - How we found them (e.g. "target-followers", "manual")
 * @param {number} [nicheScore] - Optional niche relevance score 0-1
 */
export function recordFollow(did, handle, source, nicheScore = null) {
  const reg = loadRegistry();
  reg[did] = {
    handle,
    followedAt: new Date().toISOString(),
    source,
    nicheScore
  };
  saveRegistry(reg);
}

/**
 * Get follows older than `days` days.
 * @param {number} days - Grace period in days
 * @returns {Array<{did: string, handle: string, followedAt: string, source: string, nicheScore: number|null}>}
 */
export function getStaleFollows(days = 7) {
  const reg = loadRegistry();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const stale = [];
  for (const [did, entry] of Object.entries(reg)) {
    const followedAt = new Date(entry.followedAt).getTime();
    if (followedAt <= cutoff) {
      stale.push({ did, ...entry });
    }
  }
  return stale;
}

/**
 * Update the niche score for a follow entry.
 * @param {string} did
 * @param {number} score - 0 to 1
 */
export function updateNicheScore(did, score) {
  const reg = loadRegistry();
  if (reg[did]) {
    reg[did].nicheScore = score;
    saveRegistry(reg);
  }
}

/**
 * Remove a follow entry (called after successful unfollow).
 * @param {string} did
 */
export function removeEntry(did) {
  const reg = loadRegistry();
  delete reg[did];
  saveRegistry(reg);
}

/**
 * Get the full follow registry.
 * @returns {Object} did → entry map
 */
export function getAllFollows() {
  return loadRegistry();
}

/**
 * Check if a DID is in the registry.
 * @param {string} did
 * @returns {boolean}
 */
export function hasFollow(did) {
  const reg = loadRegistry();
  return Boolean(reg[did]);
}

/**
 * Get the number of follows in the registry.
 * @returns {number}
 */
export function getFollowCount() {
  return Object.keys(loadRegistry()).length;
}
