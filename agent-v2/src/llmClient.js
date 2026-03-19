function extractJsonBlock(s) {
  const t = String(s || '').trim();
  const first = t.indexOf('{');
  const last = t.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) return null;
  return t.slice(first, last + 1);
}

export class LLMClient {
  constructor({ provider, baseUrl, apiKey, model, temperature = 0.7, maxTokens = 500 }) {
    this.provider = provider || 'openai-compatible';
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.model = model;
    this.temperature = temperature;
    this.maxTokens = maxTokens;
  }

  async planAction(prompt) {
    const systemPrompt = [
      'You are an autonomous social media agent planner.',
      'Output strict JSON only with keys:',
      '{"action":"post|reply|repost|skip","reason":"string","text":"string","replyToUri":"string|null","repostUri":"string|null","repostCid":"string|null"}',
      'For "reply": set text and replyToUri.',
      'For "repost": set repostUri and repostCid of the post to repost (text is optional commentary).',
      'For "post": set text with original content.',
      'Keep text within 280 chars, be natural, and avoid hashtag spam.'
    ].join(' ');

    let res;
    let raw = '{}';

    try {
      if (this.provider === 'sarvam') {
        res = await fetch('https://api.sarvam.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKey
          },
          body: JSON.stringify({
            model: this.model || 'sarvam-2', // Default to sarvam-2 if not specified
            temperature: this.temperature,
            max_tokens: this.maxTokens,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt }
            ]
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(`Sarvam request failed: ${res.status} ${data?.message || res.statusText}`);
        raw = data?.choices?.[0]?.message?.content || '{}';

      } else if (this.provider === 'gemini') {
        // Gemini API uses a different structure
        res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model || 'gemini-2.5-flash'}:generateContent?key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             system_instruction: {
                parts: { text: systemPrompt }
            },
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: this.temperature,
              maxOutputTokens: this.maxTokens,
              responseMimeType: "application/json"
            }
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(`Gemini request failed: ${res.status} ${data?.error?.message || res.statusText}`);
        raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

      } else {
        // Default: openai-compatible
        res = await fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: this.model,
            temperature: this.temperature,
            max_tokens: this.maxTokens,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt }
            ]
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(`OpenAI request failed: ${res.status} ${data?.error?.message || res.statusText}`);
        raw = data?.choices?.[0]?.message?.content || '{}';
      }
    } catch (err) {
      throw new Error(`LLM Error (${this.provider}): ${err.message}`);
    }

    const block = extractJsonBlock(raw) || '{}';

    let parsed;
    try {
      parsed = JSON.parse(block);
    } catch {
      parsed = { action: 'skip', reason: 'invalid-json', text: '', replyToUri: null };
    }

    return {
      action: parsed.action || 'skip',
      reason: parsed.reason || '',
      text: parsed.text || '',
      replyToUri: parsed.replyToUri || null,
      repostUri: parsed.repostUri || null,
      repostCid: parsed.repostCid || null
    };
  }
}
