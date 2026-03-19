const $ = (id) => document.getElementById(id);

async function api(path, method = 'GET', body = null) {
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

function pretty(v) {
  return JSON.stringify(v, null, 2);
}

async function refresh() {
  const d = await api('/api/status');
  $('stateView').textContent = pretty({
    daemonRunning: d.daemonRunning,
    busy: d.busy,
    state: d.state,
    config: d.config
  });
  $('logsView').textContent = (d.logs || []).map(l => {
    const meta = l.meta ? ` ${JSON.stringify(l.meta)}` : '';
    return `[${l.ts}] [${l.level}] ${l.msg}${meta}`;
  }).join('\n');
  $('runtimeBadge').textContent = d.daemonRunning ? 'Daemon: ON' : 'Daemon: OFF';
  $('runtimeBadge').style.color = d.daemonRunning ? '#27c181' : '#f3b13f';
}

async function runOnce() {
  await api('/api/run-once', 'POST');
  await refresh();
}

async function loadConfig() {
  const d = await api('/api/config');
  $('configBox').value = pretty(d.config);
}

async function saveConfig() {
  const raw = $('configBox').value;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    alert(`Invalid JSON: ${e.message}`);
    return;
  }
  await api('/api/config', 'POST', { config: parsed });
  await refresh();
}

$('btnRefresh').addEventListener('click', refresh);
$('btnRun').addEventListener('click', runOnce);
$('btnStart').addEventListener('click', async () => {
  await api('/api/daemon/start', 'POST');
  await refresh();
});
$('btnStop').addEventListener('click', async () => {
  await api('/api/daemon/stop', 'POST');
  await refresh();
});
$('btnLoadConfig').addEventListener('click', loadConfig);
$('btnSaveConfig').addEventListener('click', saveConfig);

await loadConfig();
await refresh();
setInterval(refresh, 8000);
