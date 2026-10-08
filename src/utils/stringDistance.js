/**
 * Calculates Levenshtein Edit Distance between two strings
 */
export function levenshteinDistance(a, b) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculates Jaro-Winkler Similarity (0.0 to 1.0)
 */
export function jaroWinklerSimilarity(s1, s2) {
  let m = 0;
  if (s1.length === 0 || s2.length === 0) return 0.0;
  if (s1 === s2) return 1.0;

  const range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
  const s1Matches = new Array(s1.length).fill(false);
  const s2Matches = new Array(s2.length).fill(false);

  for (let i = 0; i < s1.length; i++) {
    const low = Math.max(0, i - range);
    const high = Math.min(i + range + 1, s2.length);

    for (let j = low; j < high; j++) {
      if (!s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = true;
        s2Matches[j] = true;
        m++;
        break;
      }
    }
  }

  if (m === 0) return 0.0;

  let k = 0;
  let numTranspositions = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[k]) k++;
      if (s1[i] !== s2[k]) numTranspositions++;
      k++;
    }
  }

  const jaro = (m / s1.length + m / s2.length + (m - numTranspositions / 2) / m) / 3;

  // Winkler prefix adjustment
  let prefix = 0;
  const maxPrefix = 4;
  for (let i = 0; i < Math.min(s1.length, s2.length, maxPrefix); i++) {
    if (s1[i] === s2[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1 - jaro);
}

/**
 * Combined high-precision String Similarity & Brand Impersonation Scorer
 * @param {string} candidateStr 
 * @param {string} targetBrand 
 * @returns {Object} { similarityPercent, levenshtein, jaroWinkler, isSubstring, keywordPadded }
 */
export function calculateBrandSimilarity(candidateStr, targetBrand) {
  if (!candidateStr || !targetBrand) {
    return { similarityPercent: 0, levenshtein: 0, jaroWinkler: 0, isSubstring: false };
  }

  const c = candidateStr.toLowerCase().trim();
  const t = targetBrand.toLowerCase().trim();

  const levDist = levenshteinDistance(c, t);
  const maxLen = Math.max(c.length, t.length);
  const normLev = maxLen === 0 ? 1 : 1 - levDist / maxLen;
  const jaroW = jaroWinklerSimilarity(c, t);

  // Substring / Token Inclusion check (e.g., candidate contains "nike" or "paypal")
  const isSubstring = c.includes(t) || t.includes(c);
  
  // Calculate weighted score
  let weightedScore = normLev * 0.45 + jaroW * 0.45;
  if (isSubstring) {
    weightedScore = Math.max(weightedScore, 0.85); // High threat if brand name is embedded
  }

  const similarityPercent = Math.min(100, Math.max(0, Math.round(weightedScore * 100)));

  return {
    similarityPercent,
    levenshtein: levDist,
    jaroWinkler: Number(jaroW.toFixed(3)),
    isSubstring
  };
}
