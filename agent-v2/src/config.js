import fs from 'node:fs';
import path from 'node:path';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function loadConfig() {
  const configPath = process.env.AGENT_CONFIG || path.resolve(process.cwd(), 'config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config not found: ${configPath}. Copy config.example.json to config.json first.`);
  }

  const cfg = readJson(configPath);
  
  let apiKeyVar = cfg?.llm?.apiKeyEnv || 'OPENAI_API_KEY';
  if (!cfg?.llm?.apiKeyEnv && cfg?.llm?.provider) {
    if (cfg.llm.provider === 'sarvam') apiKeyVar = 'SARVAM_API_KEY';
    else if (cfg.llm.provider === 'gemini') apiKeyVar = 'GEMINI_API_KEY';
  }

  const llmApiKey = process.env[apiKeyVar];
  if (!llmApiKey) {
    throw new Error(`Missing env var ${apiKeyVar} for provider ${cfg?.llm?.provider || 'default'}. Export it before running.`);
  }

  if (!cfg?.bluesky?.identifier || !cfg?.bluesky?.appPassword) {
    throw new Error('Missing bluesky.identifier or bluesky.appPassword in config.json');
  }

  return {
    ...cfg,
    llm: {
      ...cfg.llm,
      apiKey: llmApiKey
    },
    _meta: {
      configPath
    }
  };
}
