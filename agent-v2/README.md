# Agent V2 (Autonomous Bluesky + Live RAG)

This is a standalone autonomous runtime for Bluesky that can:
- fetch recent posts from target accounts
- filter by niche keywords and recency (default: 24h)
- maintain local live memory (RAG-like retrieval)
- ask a GPT API to generate replies/posts
- auto-execute with guardrails (or dry-run only)

## Quick start

1. Copy config:

```bash
cd agent-v2
cp config.example.json config.json
```

2. Fill `config.json`:
- `bluesky.identifier`
- `bluesky.appPassword`
- `filters.targetAccounts`
- `filters.keywords`

3. Set LLM key:

```bash
export OPENAI_API_KEY="..."
```

4. Run once:

```bash
npm start
```

5. Run continuously:

```bash
npm run daemon
```

## Localhost UI

Run a local control panel:

```bash
npm run ui
```

Open:

```text
http://127.0.0.1:4322
```

From the UI you can:
- run once
- start/stop daemon
- inspect state/logs
- edit `config.json`

## Safety defaults

- `runtime.dryRun = true` by default (recommended until stable)
- Daily caps for all actions/replies/posts
- Cooldown between actions
- Duplicate-content checks
- Keyword + blocked-terms filtering

## Files

- `src/index.js`: entrypoint and daemon loop
- `src/agent.js`: orchestration logic
- `src/blueskyClient.js`: Bluesky API adapter
- `src/ragMemory.js`: local live-memory and retrieval scoring
- `src/llmClient.js`: GPT API client and structured plan parsing
- `state/state.json`: counters, recent actions
- `state/memory.jsonl`: post memory corpus

## Notes

- This is intentionally API-first and separate from the old UI flow.
- The same architecture can be extended for X/Twitter by adding another adapter implementing the same methods.
