import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { loadConfig } from './config.js';
import { loadState } from './stateStore.js';
import { logger, getLogs } from './logger.js';
import { BlueskyClient } from './blueskyClient.js';
import { LLMClient } from './llmClient.js';
import { runAgentOnce } from './agent.js';
import { getAllFollows, getFollowCount } from './followRegistry.js';

const PORT = Number(process.env.PORT || 4322);
const HOST = process.env.HOST || '127.0.0.1';
const root = process.cwd();
const publicDir = path.join(root, 'public');
const configPath = process.env.AGENT_CONFIG || path.resolve(root, 'config.json');

const runtime = {
  daemonRunning: false,
  timer: null,
  busy: false
};

function sendJson(res, status, body) {
  res.writeHead(status, { 
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', c => {
      buf += c;
      if (buf.length > 1_000_000) {
        reject(new Error('payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!buf) return resolve({});
      try {
        resolve(JSON.parse(buf));
      } catch {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });
}

async function executeOnce() {
  if (runtime.busy) {
    logger.warn('Run skipped because agent is already busy.');
    return { ok: false, reason: 'busy' };
  }

  runtime.busy = true;
  try {
    const cfg = loadConfig();
    const bluesky = new BlueskyClient(cfg.bluesky);
    await bluesky.login();
    const llm = new LLMClient(cfg.llm);
    await runAgentOnce({ cfg, bluesky, llm });
    return { ok: true };
  } finally {
    runtime.busy = false;
  }
}

function startDaemon() {
  if (runtime.daemonRunning) return;
  const cfg = loadConfig();
  const intervalMs = Math.max(1, cfg.runtime.intervalMinutes || 60) * 60 * 1000;
  runtime.daemonRunning = true;
  runtime.timer = setInterval(async () => {
    try {
      await executeOnce();
    } catch (err) {
      logger.error(`Daemon run error: ${err.message}`);
    }
  }, intervalMs);
  logger.info(`Daemon started on interval ${cfg.runtime.intervalMinutes} minute(s).`);
}

function stopDaemon() {
  if (!runtime.daemonRunning) return;
  clearInterval(runtime.timer);
  runtime.timer = null;
  runtime.daemonRunning = false;
  logger.info('Daemon stopped.');
}

function redactConfig(cfg) {
  const copy = JSON.parse(JSON.stringify(cfg));
  if (copy?.bluesky?.appPassword) copy.bluesky.appPassword = '***';
  if (copy?.llm?.apiKey) copy.llm.apiKey = '***';
  return copy;
}

function serveStatic(req, res) {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const abs = path.normalize(path.join(publicDir, reqPath));
  if (!abs.startsWith(publicDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(abs).toLowerCase();
  const type = ext === '.html' ? 'text/html; charset=utf-8'
    : ext === '.css' ? 'text/css; charset=utf-8'
    : ext === '.js' ? 'application/javascript; charset=utf-8'
    : 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(abs).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      res.end();
      return;
    }

    if (!req.url) return sendJson(res, 400, { ok: false, error: 'bad request' });

    if (req.method === 'GET' && req.url === '/api/status') {
      let cfg = null;
      try {
        cfg = redactConfig(loadConfig());
      } catch (e) {
        cfg = { error: e.message };
      }
      return sendJson(res, 200, {
        ok: true,
        daemonRunning: runtime.daemonRunning,
        busy: runtime.busy,
        state: loadState(),
        config: cfg,
        followCount: getFollowCount(),
        logs: getLogs(120)
      });
    }

    if (req.method === 'GET' && req.url === '/api/follows') {
      return sendJson(res, 200, {
        ok: true,
        follows: getAllFollows(),
        count: getFollowCount()
      });
    }

    if (req.method === 'GET' && req.url === '/api/config') {
      if (!fs.existsSync(configPath)) return sendJson(res, 404, { ok: false, error: 'config.json not found' });
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return sendJson(res, 200, { ok: true, config: cfg });
    }

    if (req.method === 'POST' && req.url === '/api/config') {
      const body = await parseBody(req);
      if (!body || typeof body.config !== 'object') return sendJson(res, 400, { ok: false, error: 'missing config object' });
      fs.writeFileSync(configPath, JSON.stringify(body.config, null, 2));
      logger.info('Config updated from UI.');
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === 'POST' && req.url === '/api/run-once') {
      const result = await executeOnce();
      return sendJson(res, 200, { ok: true, result });
    }

    if (req.method === 'POST' && req.url === '/api/daemon/start') {
      startDaemon();
      return sendJson(res, 200, { ok: true, daemonRunning: runtime.daemonRunning });
    }

    if (req.method === 'POST' && req.url === '/api/daemon/stop') {
      stopDaemon();
      return sendJson(res, 200, { ok: true, daemonRunning: runtime.daemonRunning });
    }

    if (req.method === 'GET' && (req.url === '/' || req.url.startsWith('/public/') || req.url.endsWith('.css') || req.url.endsWith('.js') || req.url.endsWith('.html'))) {
      return serveStatic(req, res);
    }

    return sendJson(res, 404, { ok: false, error: 'route not found' });
  } catch (err) {
    logger.error(`HTTP error: ${err.message}`);
    return sendJson(res, 500, { ok: false, error: err.message });
  }
});

server.listen(PORT, HOST, () => {
  logger.info(`Agent UI server listening at http://${HOST}:${PORT}`);
});
