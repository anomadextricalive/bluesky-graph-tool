import fs from 'node:fs';
import path from 'node:path';

const STATE_DIR = path.resolve(process.cwd(), 'state');
const STATE_PATH = path.join(STATE_DIR, 'state.json');
const MEMORY_PATH = path.join(STATE_DIR, 'memory.jsonl');

function ensureStateDir() {
  if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function loadState() {
  ensureStateDir();
  if (!fs.existsSync(STATE_PATH)) {
    const initial = {
      dayKey: todayKey(),
      actionsToday: 0,
      repliesToday: 0,
      postsToday: 0,
      repostsToday: 0,
      followsToday: 0,
      unfollowsToday: 0,
      lastActionAt: null,
      recentOutputs: [],
      seenPostUris: []
    };
    fs.writeFileSync(STATE_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }

  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  if (state.dayKey !== todayKey()) {
    state.dayKey = todayKey();
    state.actionsToday = 0;
    state.repliesToday = 0;
    state.postsToday = 0;
    state.repostsToday = 0;
    state.followsToday = 0;
    state.unfollowsToday = 0;
  }
  // Ensure new fields exist for existing state files
  if (state.repostsToday === undefined) state.repostsToday = 0;
  if (state.followsToday === undefined) state.followsToday = 0;
  if (state.unfollowsToday === undefined) state.unfollowsToday = 0;
  return state;
}

export function saveState(state) {
  ensureStateDir();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

export function appendMemory(records) {
  ensureStateDir();
  const lines = records.map(r => JSON.stringify(r)).join('\n') + '\n';
  fs.appendFileSync(MEMORY_PATH, lines);
}

export function readMemory(maxLines = 3000) {
  ensureStateDir();
  if (!fs.existsSync(MEMORY_PATH)) return [];
  const lines = fs.readFileSync(MEMORY_PATH, 'utf8').trim().split('\n').filter(Boolean);
  return lines.slice(-maxLines).map(line => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}
