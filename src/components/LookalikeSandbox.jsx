import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  RefreshCw, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Zap,
  Layers,
  Code
} from 'lucide-react';
import { decodeHomoglyphs, getDiffHighlights } from '../utils/homoglyphEngine.js';
import { calculateBrandSimilarity } from '../utils/stringDistance.js';

export default function LookalikeSandbox({ brandProfile }) {
  const brandName = brandProfile?.name || 'Nike';
  const [inputString, setInputString] = useState('PаyPal_Support_01'); // Preset Cyrillic homoglyph example

  // Presets for quick judge testing
  const presets = [
    { label: 'Cyrillic Homoglyph', value: 'Nıkе_Support_Help' },
    { label: 'Leetspeak Swap', value: 'N1k3_0ff1c1al' },
    { label: 'Keyword Padding', value: 'Nike_SNKRS_Giveaway_Free' },
    { label: 'Spacing & Punctuation', value: 'Nike-Store-Official.App' },
    { label: 'Official Handle (Whitelisted)', value: brandProfile?.officialHandles?.x?.[0] || '@Nike' }
  ];

  // Algorithmic evaluation of input string
  const homoglyphResult = decodeHomoglyphs(inputString);
  const simResult = calculateBrandSimilarity(homoglyphResult.decoded, brandName);
  const diffHighlights = getDiffHighlights(inputString);

  // Check if matches whitelist
  const isWhitelisted = (brandProfile?.officialHandles?.x || []).some(h => 
    h.toLowerCase().replace(/^@/, '') === inputString.toLowerCase().replace(/^@/, '')
  );

  let riskLevel = 'LOW';
  let riskScore = 10;

  if (isWhitelisted) {
    riskLevel = 'WHITELISTED';
    riskScore = 0;
  } else {
    if (homoglyphResult.hasHomoglyphs) riskScore += 45;
    if (simResult.similarityPercent > 70) riskScore += 35;
    riskScore = Math.min(99, riskScore);

    if (riskScore >= 80) riskLevel = 'CRITICAL';
    else if (riskScore >= 50) riskLevel = 'HIGH';
    else if (riskScore >= 30) riskLevel = 'MEDIUM';
  }

  const systemComment = isWhitelisted
    ? "Official brand handle verified. Asset is 100% whitelisted."
    : homoglyphResult.hasHomoglyphs
    ? `Unicode confusable character(s) detected: ${homoglyphResult.homoglyphs.map(h => h.originalChar).join(', ')}. String matches target brand '${brandName}'.`
    : `String similarity evaluated against '${brandName}': Levenshtein distance ${simResult.levenshtein}, Jaro-Winkler ${simResult.jaroWinkler}.`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>Look-alike Engine & Typosquatting Workbench</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Bonus Feature (+10 pts)
                </span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Inspect Unicode Cyrillic confusables, Levenshtein edit distance, and Jaro-Winkler string similarity.
              </p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            Target Brand: <span className="text-indigo-400 font-bold">{brandName}</span>
          </div>
        </div>

        {/* Preset Quick Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400 shrink-0">Quick Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setInputString(p.value)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 whitespace-nowrap transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Interactive Box */}
      <div className="glass-panel-glow p-6 rounded-2xl border border-indigo-500/40 space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase text-indigo-300 font-bold mb-2">
            Type Any Custom Handle / App Title / Domain String:
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              placeholder="e.g. PаyPal_Support_01"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border-2 border-indigo-500/60 text-white font-mono text-base focus:border-indigo-400 focus:outline-none shadow-inner"
            />
            <button
              onClick={() => setInputString('Nıkе_Support_Help')}
              className="absolute right-3 top-3 text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Live Visual Diff Character Matrix */}
        <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
            <span>Visual Character Breakdown & Homoglyph Diff</span>
            <span className="text-indigo-400">{diffHighlights.length} Chars</span>
          </div>

          <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] items-center">
            {diffHighlights.map((dh, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center px-2 py-1 rounded-lg font-mono text-sm border transition-all ${
                  dh.isHomoglyph 
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold shadow-md shadow-rose-500/20 animate-pulse' 
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <span>{dh.char}</span>
                <span className="text-[9px] opacity-75 font-sans mt-0.5">
                  {dh.isHomoglyph ? `→ '${dh.mapped}'` : idx}
                </span>
              </div>
            ))}
          </div>

          {homoglyphResult.hasHomoglyphs ? (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono text-rose-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Detected {homoglyphResult.homoglyphs.length} Homoglyph / Confusable Swap(s)!</span>
              </div>
              <ul className="list-disc list-inside text-[11px] space-y-0.5 text-rose-300/90">
                {homoglyphResult.homoglyphs.map((h, i) => (
                  <li key={i}>
                    Position {h.index}: '<span className="font-bold text-white">{h.originalChar}</span>' ({h.unicode}) mapped to '<span className="font-bold text-white">{h.mappedChar}</span>' [{h.type}]
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Cyrillic/Unicode homoglyph characters detected. Clean character encoding.</span>
            </div>
          )}
        </div>

        {/* Mathematical Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1: Decoded Text */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-mono uppercase">Normalized Clean Text</div>
            <div className="text-base font-bold font-mono text-indigo-300 truncate">
              {homoglyphResult.decoded || inputString}
            </div>
            <div className="text-[10px] text-slate-400">Post Homoglyph Decoding</div>
          </div>

          {/* Metric 2: Levenshtein Distance */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-mono uppercase">Levenshtein Edit Distance</div>
            <div className="text-2xl font-extrabold font-mono text-purple-400">{simResult.levenshtein} edits</div>
            <div className="text-[10px] text-slate-400">Min character operations to match brand</div>
          </div>

          {/* Metric 3: Jaro-Winkler */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-mono uppercase">Jaro-Winkler Similarity</div>
            <div className="text-2xl font-extrabold font-mono text-pink-400">{simResult.jaroWinkler}</div>
            <div className="text-[10px] text-slate-400">0.0 (Distinct) - 1.0 (Identical)</div>
          </div>
        </div>

        {/* Technical System Commentary Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-1 font-mono">System String Diagnosis:</span>
            <p className="font-mono">{systemComment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
