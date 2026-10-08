import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  isGeminiConfigured,
  analyzeThreatWithAI,
  draftTakedownNotice,
  chatWithAnalyst,
  chatWithAnalystStream
} from './src/geminiService.js';
import { BRAND_PROFILES, MOCK_THREAT_DATABASE } from './src/utils/mockData.js';
import { evaluateAssetThreat } from './src/utils/detectionEngine.js';
import { decodeHomoglyphs } from './src/utils/homoglyphEngine.js';
import { calculateBrandSimilarity } from './src/utils/stringDistance.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'BrainShield Threat Intelligence Backend Server',
    version: '2.4.0',
    aiEnabled: isGeminiConfigured(),
    timestamp: new Date().toISOString()
  });
});

// 2. Get Supported Brand Profiles & Whitelist Rules
app.get('/api/brands', (req, res) => {
  res.json({
    success: true,
    brands: Object.values(BRAND_PROFILES)
  });
});

// 3. Get Specific Brand Profile
app.get('/api/brands/:brandKey', (req, res) => {
  const brandKey = req.params.brandKey.toLowerCase();
  const profile = BRAND_PROFILES[brandKey] || BRAND_PROFILES.paypal;
  res.json({
    success: true,
    brandKey,
    profile
  });
});

// 4. Create / Update Brand Profile
app.post('/api/brands', (req, res) => {
  const { brandKey, profile } = req.body;
  if (!profile || !profile.name) {
    return res.status(400).json({ success: false, error: 'Invalid brand profile object' });
  }

  const key = (brandKey || profile.name).toLowerCase().replace(/\s+/g, '_');
  BRAND_PROFILES[key] = profile;

  res.json({
    success: true,
    message: `Brand profile for '${profile.name}' saved successfully. Whitelist rules updated.`,
    brandKey: key,
    profile
  });
});

// 5. Fetch Evaluated Threat Records for a Brand
app.get('/api/threats/:brandKey', (req, res) => {
  const brandKey = req.params.brandKey.toLowerCase();
  const brandProfile = BRAND_PROFILES[brandKey] || BRAND_PROFILES.paypal;
  const rawSocial = MOCK_THREAT_DATABASE[brandKey]?.social || [];
  const rawAppStore = MOCK_THREAT_DATABASE[brandKey]?.appStore || [];

  const evaluatedSocial = rawSocial.map(t => ({
    ...t,
    evalReport: evaluateAssetThreat(t, brandProfile)
  }));

  const evaluatedAppStore = rawAppStore.map(a => ({
    ...a,
    evalReport: evaluateAssetThreat(a, brandProfile)
  }));

  res.json({
    success: true,
    brandKey,
    totalThreats: evaluatedSocial.length + evaluatedAppStore.length,
    socialThreats: evaluatedSocial,
    appStoreThreats: evaluatedAppStore
  });
});

// 6. Deep Google Play Store Package Scanner API
app.post('/api/scan/playstore', async (req, res) => {
  const { packageOrUrl, brandKey, includeAI = true } = req.body;
  if (!packageOrUrl) {
    return res.status(400).json({ success: false, error: 'Package ID or Google Play Store URL is required' });
  }

  const profile = BRAND_PROFILES[brandKey?.toLowerCase()] || BRAND_PROFILES.paypal;

  let cleanPkg = packageOrUrl.trim().toLowerCase();
  if (cleanPkg.includes('id=')) {
    cleanPkg = cleanPkg.split('id=')[1].split('&')[0];
  }
  cleanPkg = cleanPkg.replace(/^https?:\/\/[^\/]+\//, '');

  const candidateApp = {
    id: `api-scanned-${Date.now()}`,
    platform: 'google_play',
    title: `${profile.name} Mobile Companion & Security Helper`,
    packageId: cleanPkg,
    developer: 'Unverified 3rd Party Developer Ltd.',
    icon: profile.logoUrl,
    rating: 2.1,
    downloads: '1,500+',
    isOfficialPublisher: false,
    permissions: ['READ_SMS', 'RECEIVE_SMS', 'READ_CONTACTS', 'SYSTEM_ALERT_WINDOW'],
    description: `APK listing claiming to provide services for ${profile.name}. Package ID evaluated against official registration.`,
    storeUrl: `https://play.google.com/store/apps/details?id=${cleanPkg}`,
    isThreatHint: true,
    threatMomentum: '+410% / 24h (HIGH ESCALATION)',
    customerTargetingScore: 96
  };

  const evalReport = evaluateAssetThreat(candidateApp, profile);

  // Optional AI second opinion. A Gemini failure must never break the core scan.
  let aiAnalysis = null;
  let aiStatus = 'disabled';
  if (includeAI && isGeminiConfigured()) {
    try {
      aiAnalysis = await analyzeThreatWithAI({ ...candidateApp, evalReport }, profile);
      aiStatus = 'ok';
    } catch (err) {
      console.error('[Gemini] playstore scan analysis failed:', err.message);
      aiStatus = 'failed';
    }
  }

  res.json({
    success: true,
    scannedPackage: cleanPkg,
    aiStatus,
    appRecord: {
      ...candidateApp,
      evalReport,
      aiAnalysis
    }
  });
});

// 7. Look-alike & Homoglyph String Analysis API
app.post('/api/lookalike/analyze', (req, res) => {
  const { inputString, brandName } = req.body;
  if (!inputString) {
    return res.status(400).json({ success: false, error: 'Input string is required' });
  }

  const targetBrand = brandName || 'PayPal';
  const homoglyphResult = decodeHomoglyphs(inputString);
  const simResult = calculateBrandSimilarity(homoglyphResult.decoded, targetBrand);

  res.json({
    success: true,
    originalString: inputString,
    decodedString: homoglyphResult.decoded,
    hasHomoglyphs: homoglyphResult.hasHomoglyphs,
    homoglyphs: homoglyphResult.homoglyphs,
    similarityMetrics: simResult,
    targetBrand
  });
});

// 8. Takedown Packet Dispatch API
app.post('/api/takedown', (req, res) => {
  const { threatId, brandName, legalName } = req.body;

  const packet = {
    takedownId: `TKD-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'TAKEDOWN_REQUESTED',
    brandName: brandName || 'PayPal',
    legalName: legalName || 'PayPal Holdings, Inc.',
    targetThreatId: threatId,
    legalNoticeText: `FORMAL IMPERSONATION TAKEDOWN NOTICE: Requesting immediate removal of asset ${threatId} due to copyright infringement and unauthorized brand impersonation under DMCA Safe Harbor provisions.`,
    dispatchChannel: 'Automated Platform Abuse API Webhook'
  };

  res.json({
    success: true,
    message: `Takedown notice for threat '${threatId}' dispatched successfully.`,
    packet
  });
});

// ---------------------------------------------------------------
// 9. Gemini AI Endpoints
// ---------------------------------------------------------------
const aiError = (res, err) => {
  console.error('[Gemini]', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.status === 503 ? err.message : 'AI request failed. Please try again.'
  });
};

// 9a. AI threat analysis (runs rule engine first, then asks Gemini to reason over it)
app.post('/api/ai/analyze-threat', async (req, res) => {
  const { asset, brandKey } = req.body;
  if (!asset) {
    return res.status(400).json({ success: false, error: 'asset object is required' });
  }

  try {
    const profile = BRAND_PROFILES[brandKey?.toLowerCase()] || BRAND_PROFILES.paypal;
    const evalReport = asset.evalReport || evaluateAssetThreat(asset, profile);
    const aiAnalysis = await analyzeThreatWithAI({ ...asset, evalReport }, profile);

    res.json({ success: true, evalReport, aiAnalysis });
  } catch (err) {
    aiError(res, err);
  }
});

// 9b. AI-drafted takedown notice
app.post('/api/ai/takedown-draft', async (req, res) => {
  const { asset, brandName, legalName } = req.body;
  if (!asset) {
    return res.status(400).json({ success: false, error: 'asset object is required' });
  }

  try {
    const draft = await draftTakedownNotice({
      asset,
      brandName: brandName || 'PayPal',
      legalName: legalName || 'PayPal Holdings, Inc.'
    });
    res.json({ success: true, draft });
  } catch (err) {
    aiError(res, err);
  }
});

// 9c. Analyst chat assistant
app.post('/api/ai/chat', async (req, res) => {
  const { message, history, context } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'message is required' });
  }

  try {
    const reply = await chatWithAnalyst(message, Array.isArray(history) ? history : [], context);
    res.json({ success: true, reply });
  } catch (err) {
    aiError(res, err);
  }
});

// 9d. Streaming analyst chat (Server-Sent Events)
app.post('/api/ai/chat/stream', async (req, res) => {
  const { message, history, context } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'message is required' });
  }
  if (!isGeminiConfigured()) {
    return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured on the server' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no' // disable proxy buffering (nginx)
  });

  let clientClosed = false;
  res.on('close', () => { clientClosed = true; });

  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  try {
    for await (const text of chatWithAnalystStream(message, Array.isArray(history) ? history : [], context)) {
      if (clientClosed) break;
      send('chunk', { text });
    }
    if (!clientClosed) send('done', {});
  } catch (err) {
    console.error('[Gemini] stream error:', err.message);
    if (!clientClosed) send('error', { error: 'AI stream failed. Please try again.' });
  } finally {
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`  BrainShield Backend API Server is running!`);
  console.log(`➜  URL: http://localhost:${PORT}`);
  console.log(`➜  Health: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);
});
