/**
 * Canonicalizes social handle or package ID for bulletproof matching
 * @param {string} rawInput 
 * @returns {string}
 */
export function normalizeAsset(rawInput) {
  if (!rawInput) return '';
  let str = rawInput.trim().toLowerCase();
  
  // Strip URLs if full URL provided
  str = str.replace(/^https?:\/\/(www\.)?/, '');
  str = str.replace(/^(x\.com|twitter\.com|instagram\.com|linkedin\.com\/in|t\.me|tiktok\.com\/@|youtube\.com\/@|play\.google\.com\/store\/apps\/details\?id=)/, '');
  
  // Strip leading @, trailing slashes, and spaces
  str = str.replace(/^@+/, '').replace(/\/+$/, '').trim();
  
  return str;
}

/**
 * Checks if a given candidate account/package matches official whitelist
 * @param {Object} candidate - { handle, packageId, platform, name }
 * @param {Object} brandProfile - Official brand profile
 * @returns {Object} { isWhitelisted: boolean, reason: string, matchedAsset: string }
 */
export function checkWhitelist(candidate, brandProfile) {
  if (!brandProfile) return { isWhitelisted: false };

  const candidateHandleNorm = normalizeAsset(candidate.handle || candidate.username || candidate.title || '');
  const candidatePkgNorm = normalizeAsset(candidate.packageId || candidate.appId || '');

  // 1. Check Official Social Handles
  if (brandProfile.officialHandles) {
    for (const [platform, handles] of Object.entries(brandProfile.officialHandles)) {
      const handleList = Array.isArray(handles) ? handles : [handles];
      for (const h of handleList) {
        const normH = normalizeAsset(h);
        if (normH && candidateHandleNorm === normH) {
          return {
            isWhitelisted: true,
            reason: `Official ${platform.toUpperCase()} Handle (${h})`,
            matchedAsset: h
          };
        }
      }
    }
  }

  // 2. Check Official App Package IDs
  if (brandProfile.officialPackages) {
    const pkgList = Array.isArray(brandProfile.officialPackages) 
      ? brandProfile.officialPackages 
      : [brandProfile.officialPackages];
      
    for (const pkg of pkgList) {
      const normPkg = normalizeAsset(pkg);
      if (normPkg && candidatePkgNorm === normPkg) {
        return {
          isWhitelisted: true,
          reason: `Verified Official App Package (${pkg})`,
          matchedAsset: pkg
        };
      }
    }
  }

  // 3. Check Official Brand Domain
  if (brandProfile.officialDomains && candidate.domain) {
    const normCandDomain = normalizeAsset(candidate.domain);
    for (const dom of brandProfile.officialDomains) {
      if (normCandDomain === normalizeAsset(dom)) {
        return {
          isWhitelisted: true,
          reason: `Official Domain (${dom})`,
          matchedAsset: dom
        };
      }
    }
  }

  return { isWhitelisted: false };
}
