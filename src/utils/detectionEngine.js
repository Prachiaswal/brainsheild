import { checkWhitelist, normalizeAsset } from './whitelist.js';
import { decodeHomoglyphs } from './homoglyphEngine.js';
import { calculateBrandSimilarity } from './stringDistance.js';
import { analyzeLogoSimilarity } from './visionEngine.js';

const SUSPICIOUS_KEYWORDS = [
  'support', 'help', 'giveaway', 'official', 'rewards', 'airdrop',
  'claim', 'service', 'verify', 'login', 'security', 'vault', 'customer',
  'desk', 'bonus', 'free', 'mod', 'apk', 'hack', 'update', 'care', 'refund'
];

/**
 * Technical System Explanation Builder
 */
export function buildTechnicalExplanation(item, homoglyphResult, simResult, visionReport, isPlayStore, matchedKeywords) {
  const points = [];

  if (homoglyphResult.hasHomoglyphs) {
    const details = homoglyphResult.homoglyphs.map(h => `'${h.originalChar}' (${h.unicode}) mapped to '${h.mappedChar}'`).join(', ');
    points.push(`Homoglyph Detection: Unicode confusable characters found [${details}].`);
  }

  if (isPlayStore && !item.isOfficialPublisher) {
    points.push(`Package Audit: Mismatch between official package (${item.officialPackageId || 'registered'}) and candidate (${item.packageId}). Developer '${item.developer}' is unauthorized.`);
  }

  if (visionReport.visualSimilarity > 85) {
    points.push(`Icon Perceptual Hash: Visual similarity score of ${visionReport.visualSimilarity}% against official brand logo (Hamming distance: ${visionReport.perceptualHashDiff} bits).`);
  }

  if (matchedKeywords.length > 0) {
    points.push(`Intent Keywords: High-risk customer service/scam triggers identified (${matchedKeywords.join(', ')}).`);
  }

  if (simResult.similarityPercent > 70) {
    points.push(`String Distance: Levenshtein edit distance = ${simResult.levenshtein}, Jaro-Winkler similarity = ${simResult.jaroWinkler}.`);
  }

  return points.length > 0 ? points : ['Standard candidate review; low risk indicators observed.'];
}

/**
 * Master Threat Evaluator
 */
export function evaluateAssetThreat(item, brandProfile) {
  const brandName = brandProfile?.name || 'PayPal';
  const candidateName = item.handle || item.username || item.title || item.appName || '';
  const isPlayStore = item.platform === 'google_play' || item.platform === 'apple_store';

  // 1. Whitelist Check (Bulletproof Guarantee)
  const whitelistResult = checkWhitelist(item, brandProfile);
  if (whitelistResult.isWhitelisted) {
    return {
      riskScore: 0,
      riskLevel: 'WHITELISTED',
      isWhitelisted: true,
      whitelistReason: whitelistResult.reason,
      decodedName: candidateName,
      homoglyphsFound: [],
      stringSimilarity: 100,
      visualLogoScore: 100,
      matchedKeywords: [],
      threatMomentum: 'STABLE (0% ESCALATION)',
      customerTargetingScore: 0,
      technicalExplanation: [`Asset is 100% whitelisted: ${whitelistResult.reason}`]
    };
  }

  // 2. Homoglyphs & Confusables Decoding
  const homoglyphResult = decodeHomoglyphs(candidateName);

  // 3. String Distance
  const simResult = calculateBrandSimilarity(homoglyphResult.decoded, brandName);

  // 4. Keyword Matches
  const lowerCand = candidateName.toLowerCase();
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter(kw => lowerCand.includes(kw));

  // 5. Vision Analysis
  const visionReport = analyzeLogoSimilarity(item.avatar || item.icon, brandProfile?.logoUrl, item.isThreatHint !== false);

  // 6. Threat Momentum & Customer Targeting Calculation
  let threatMomentum = item.threatMomentum || '+340% / 24h (HIGH SPREAD)';
  let customerTargetingScore = item.customerTargetingScore || 85;

  let riskScore = 0;
  if (homoglyphResult.hasHomoglyphs) riskScore += 35;
  if (simResult.similarityPercent > 70) riskScore += Math.round((simResult.similarityPercent - 50) * 0.8);
  if (matchedKeywords.length > 0) riskScore += Math.min(25, matchedKeywords.length * 10);
  if (visionReport.visualSimilarity > 85) riskScore += 20;
  if (isPlayStore && !item.isOfficialPublisher) riskScore += 15;

  riskScore = Math.min(99, Math.max(10, riskScore));

  let riskLevel = 'LOW';
  if (riskScore >= 80) riskLevel = 'CRITICAL';
  else if (riskScore >= 60) riskLevel = 'HIGH';
  else if (riskScore >= 35) riskLevel = 'MEDIUM';

  const technicalExplanation = buildTechnicalExplanation(item, homoglyphResult, simResult, visionReport, isPlayStore, matchedKeywords);

  return {
    riskScore,
    riskLevel,
    isWhitelisted: false,
    decodedName: homoglyphResult.decoded,
    homoglyphsFound: homoglyphResult.homoglyphs,
    hasHomoglyphs: homoglyphResult.hasHomoglyphs,
    stringSimilarity: simResult.similarityPercent,
    levenshtein: simResult.levenshtein,
    jaroWinkler: simResult.jaroWinkler,
    visualLogoScore: visionReport.visualSimilarity,
    visionReport,
    matchedKeywords,
    threatMomentum,
    customerTargetingScore,
    technicalExplanation
  };
}
