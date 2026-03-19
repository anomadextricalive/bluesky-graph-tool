import { loadConfig } from './config.js';
import { logger } from './logger.js';
import { BlueskyClient } from './blueskyClient.js';
import { LLMClient } from './llmClient.js';
import { runAgentOnce } from './agent.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const daemon = process.argv.includes('--daemon');
  const cfg = loadConfig();

  const bluesky = new BlueskyClient(cfg.bluesky);
  await bluesky.login();
  logger.info(`Authenticated as @${bluesky.handle}`);

  const llm = new LLMClient(cfg.llm);

  if (!daemon) {
    await runAgentOnce({ cfg, bluesky, llm });
    return;
  }

  const intervalMs = Math.max(1, cfg.runtime.intervalMinutes || 60) * 60 * 1000;
  logger.info(`Daemon mode active. Interval: ${cfg.runtime.intervalMinutes} minute(s).`);

  while (true) {
    try {
      await runAgentOnce({ cfg, bluesky, llm });
    } catch (err) {
      logger.error(`Run failed: ${err.message}`);
    }
    await sleep(intervalMs);
  }
}

main().catch(err => {
  logger.error(err.message);
  process.exit(1);
});
