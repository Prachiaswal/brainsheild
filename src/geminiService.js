import { GoogleGenAI } from '@google/genai';

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

let client = null;
function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!client) client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

export function isGeminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

const SYSTEM_PROMPT = `You are SentinelDRP's threat-intelligence analyst assistant.
You help security teams assess brand impersonation, phishing, fake mobile apps,
and look-alike domains/social accounts. Be concise, factual, and actionable.
Never invent evidence; base conclusions only on the data provided.`;

async function generate(prompt, { json = false, system = SYSTEM_PROMPT } = {}) {
  const ai = getClient();
  if (!ai) {
    const err = new Error('GEMINI_API_KEY is not configured on the server');
    err.status = 503;
    throw err;
  }

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      systemInstruction: system,
      temperature: json ? 0.2 : 0.5,
      ...(json ? { responseMimeType: 'application/json' } : {})
    }
  });

  return response.text;
}

// 1. Structured AI analysis of an evaluated threat asset
export async function analyzeThreatWithAI(asset, brandProfile) {
  const prompt = `Analyze this potential brand-impersonation threat.

BRAND PROFILE:
${JSON.stringify(brandProfile, null, 2)}

SUSPECT ASSET (including rule-engine evalReport):
${JSON.stringify(asset, null, 2)}

Respond ONLY with JSON in this exact shape:
{
  "verdict": "MALICIOUS" | "SUSPICIOUS" | "LIKELY_BENIGN",
  "confidence": number between 0 and 100,
  "summary": "2-3 sentence plain-language explanation",
  "indicators": ["key evidence points"],
  "recommendedActions": ["ordered next steps"]
}`;

  const text = await generate(prompt, { json: true });
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

// 2. Draft a tailored takedown notice
export async function draftTakedownNotice({ asset, brandName, legalName }) {
  const prompt = `Draft a professional, firm takedown/abuse-report notice.

Brand: ${brandName} (legal entity: ${legalName})
Offending asset:
${JSON.stringify(asset, null, 2)}

Requirements:
- Address the platform's trust & safety / abuse team.
- Cite specific facts from the asset (URL/package ID, developer, permissions, behaviour).
- Reference trademark infringement and impersonation/deceptive practices policies.
- Do not make legal claims beyond the facts provided; leave [PLACEHOLDERS] for contact details and registration numbers.
- Under 300 words. Plain text only.`;

  return generate(prompt);
}

function buildChatPrompt(message, history = [], context = null) {
  const transcript = history
    .slice(-10)
    .map(m => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`)
    .join('\n');

  return `${context ? `CONTEXT:\n${JSON.stringify(context, null, 2)}\n\n` : ''}${
    transcript ? `CONVERSATION SO FAR:\n${transcript}\n\n` : ''
  }User: ${message}`;
}

// 3. Analyst chat assistant with optional context
export async function chatWithAnalyst(message, history = [], context = null) {
  return generate(buildChatPrompt(message, history, context));
}

// 4. Streaming version of the analyst chat (async generator yielding text chunks)
export async function* chatWithAnalystStream(message, history = [], context = null) {
  const ai = getClient();
  if (!ai) {
    const err = new Error('GEMINI_API_KEY is not configured on the server');
    err.status = 503;
    throw err;
  }

  const stream = await ai.models.generateContentStream({
    model: MODEL,
    contents: buildChatPrompt(message, history, context),
    config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.5 }
  });

  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}
