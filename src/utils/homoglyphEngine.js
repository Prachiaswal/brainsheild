/**
 * Unicode, Cyrillic, and Leetspeak Homoglyph Map
 */
const HOMOGLYPH_MAP = {
  // Cyrillic look-alikes
  '\u0430': 'a', // Cyrillic small letter a
  '\u0410': 'a', // Cyrillic capital letter A
  '\u0435': 'e', // Cyrillic small letter e
  '\u0415': 'e', // Cyrillic capital letter E
  '\u043E': 'o', // Cyrillic small letter o
  '\u041E': 'o', // Cyrillic capital letter O
  '\u0440': 'p', // Cyrillic small letter er
  '\u0420': 'p', // Cyrillic capital letter ER
  '\u0441': 'c', // Cyrillic small letter es
  '\u0421': 'c', // Cyrillic capital letter ES
  '\u0443': 'y', // Cyrillic small letter u
  '\u0423': 'y', // Cyrillic capital letter U
  '\u0445': 'x', // Cyrillic small letter ha
  '\u0425': 'x', // Cyrillic capital letter HA
  '\u0456': 'i', // Cyrillic small letter Byelorussian-Ukrainian i
  '\u0406': 'i', // Cyrillic capital letter Byelorussian-Ukrainian I
  '\u0455': 's', // Cyrillic small letter dze
  '\u0405': 's', // Cyrillic capital letter DZE
  '\u043C': 'm', // Cyrillic small letter em
  '\u043D': 'h', // Cyrillic small letter en
  '\u043A': 'k', // Cyrillic small letter ka
  '\u0131': 'i', // Latin small letter dotless i
  '\u00EC': 'i', // Latin small letter i with grave
  '\u00ED': 'i', // Latin small letter i with acute
  '\u00EE': 'i', // Latin small letter i with circumflex
  '\u00EF': 'i', // Latin small letter i with diaeresis

  // Common Leetspeak numbers & symbols
  '0': 'o',
  '1': 'l',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '@': 'a',
  '$': 's',
};

/**
 * Decodes homoglyphs and leetspeak in a string
 * @param {string} text 
 * @returns {Object} { original, decoded, homoglyphs: Array<{index, originalChar, mappedChar, type}>, hasHomoglyphs: boolean }
 */
export function decodeHomoglyphs(text) {
  if (!text) return { original: '', decoded: '', homoglyphs: [], hasHomoglyphs: false };

  let decoded = '';
  const homoglyphs = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const codePoint = char.charCodeAt(0);
    const hex = 'U+' + codePoint.toString(16).padStart(4, '0').toUpperCase();

    if (HOMOGLYPH_MAP[char]) {
      const mappedChar = HOMOGLYPH_MAP[char];
      const isCyrillic = codePoint >= 0x0400 && codePoint <= 0x04FF;
      const isLeet = /^[0-9@$]$/.test(char);
      
      homoglyphs.push({
        index: i,
        originalChar: char,
        mappedChar: mappedChar,
        unicode: hex,
        type: isCyrillic ? 'Cyrillic Homoglyph' : isLeet ? 'Leetspeak Swap' : 'Unicode Confusable'
      });

      decoded += mappedChar;
    } else {
      decoded += char;
    }
  }

  // Handle common multi-character tricks like 'rn' -> 'm', 'vv' -> 'w'
  const multiCharTricks = [
    { pattern: /rn/g, replacement: 'm', label: "'rn' visual trick for 'm'" },
    { pattern: /vv/g, replacement: 'w', label: "'vv' visual trick for 'w'" }
  ];

  let multiDecoded = decoded;
  multiCharTricks.forEach(trick => {
    if (trick.pattern.test(multiDecoded)) {
      multiDecoded = multiDecoded.replace(trick.pattern, trick.replacement);
    }
  });

  return {
    original: text,
    decoded: multiDecoded,
    homoglyphs,
    hasHomoglyphs: homoglyphs.length > 0
  };
}

/**
 * Helper to build visual diff spans for React UI display
 * @param {string} text 
 * @returns {Array<{char: string, isHomoglyph: boolean, mapped: string, type: string}>}
 */
export function getDiffHighlights(text) {
  const result = decodeHomoglyphs(text);
  const mapIndex = new Map(result.homoglyphs.map(h => [h.index, h]));

  return text.split('').map((char, idx) => {
    const hInfo = mapIndex.get(idx);
    if (hInfo) {
      return {
        char,
        isHomoglyph: true,
        mapped: hInfo.mappedChar,
        type: hInfo.type,
        unicode: hInfo.unicode
      };
    }
    return {
      char,
      isHomoglyph: false,
      mapped: char,
      type: 'Normal'
    };
  });
}
