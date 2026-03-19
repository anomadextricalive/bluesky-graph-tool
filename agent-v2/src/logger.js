const ring = [];
const MAX_LOGS = 300;

export function log(level, msg, meta = null) {
  const ts = new Date().toISOString();
  const entry = { ts, level, msg, meta };
  ring.push(entry);
  if (ring.length > MAX_LOGS) ring.shift();

  if (meta) {
    console.log(`[${ts}] [${level}] ${msg}`, meta);
    return;
  }
  console.log(`[${ts}] [${level}] ${msg}`);
}

export function getLogs(limit = 120) {
  return ring.slice(-limit);
}

export const logger = {
  info: (msg, meta) => log('INFO', msg, meta),
  warn: (msg, meta) => log('WARN', msg, meta),
  error: (msg, meta) => log('ERROR', msg, meta)
};
