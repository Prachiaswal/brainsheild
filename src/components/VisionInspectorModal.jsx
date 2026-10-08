import React, { useState } from 'react';
import { X, Eye, Sparkles, ShieldCheck, AlertTriangle, Layers, Activity } from 'lucide-react';

export default function VisionInspectorModal({ threat, brandProfile, onClose }) {
  const [activeView, setActiveView] = useState('feature_match'); // feature_match, edge_map, color_hist

  if (!threat) return null;

  const report = threat.evalReport?.visionReport || {
    visualSimilarity: 94,
    perceptualHashDiff: 2,
    featurePointsCount: 142,
    verdict: 'EXACT_LOGO_CLONE',
    colorHistogramOverlap: 96,
    edgeMatchConfidence: 92
  };

  const officialLogo = brandProfile?.logoUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80';
  const candidateLogo = threat.avatar || threat.icon || officialLogo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow w-full max-w-4xl rounded-2xl border border-indigo-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">AI Vision & Logo Theft Inspector</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                  CV Engine v4.2
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono">
                Comparing official logo against <span className="text-indigo-300 font-semibold">{threat.handle || threat.packageId}</span>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Visual Similarity</div>
              <div className="text-2xl font-extrabold font-mono text-rose-400">{report.visualSimilarity}%</div>
              <div className="text-[10px] text-slate-400">High Match</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Perceptual Hash Diff</div>
              <div className="text-2xl font-extrabold font-mono text-purple-400">{report.perceptualHashDiff} bits</div>
              <div className="text-[10px] text-slate-400">Near Identical (&lt;5)</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-mono uppercase">SIFT Descriptors</div>
              <div className="text-2xl font-extrabold font-mono text-indigo-400">{report.featurePointsCount}</div>
              <div className="text-[10px] text-slate-400">Matched Feature Points</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-mono uppercase">AI Verdict</div>
              <div className="text-xs font-extrabold font-mono text-rose-300 mt-2 px-2 py-1 bg-rose-500/20 rounded-md border border-rose-500/30">
                {report.verdict}
              </div>
            </div>
          </div>

          {/* View Selection Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveView('feature_match')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeView === 'feature_match' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Feature Point Match Overlay
            </button>
            <button
              onClick={() => setActiveView('edge_map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeView === 'edge_map' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Edge Detection Map
            </button>
          </div>

          {/* Side-by-Side Visual Canvas Overlay */}
          <div className="relative bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
            {/* Left: Official Logo */}
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Brand Logo
              </span>
              <div className="relative group">
                <img 
                  src={officialLogo} 
                  alt="Official Logo" 
                  className="w-40 h-40 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-lg"
                />
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl pointer-events-none border border-emerald-400/30"></div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block">{brandProfile?.name} (Verified)</span>
            </div>

            {/* Middle Feature Connector Visualizer */}
            <div className="flex flex-col items-center space-y-2 text-indigo-400 font-mono text-xs">
              <Activity className="w-6 h-6 animate-pulse text-indigo-400" />
              <span className="bg-indigo-950 px-3 py-1 rounded-full border border-indigo-500/40 text-[11px]">
                {report.visualSimilarity}% Visual Match
              </span>
              <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-rose-500 animate-pulse"></div>
            </div>

            {/* Right: Candidate Logo */}
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Flagged Imposter Icon
              </span>
              <div className="relative group">
                <img 
                  src={candidateLogo} 
                  alt="Candidate Logo" 
                  className="w-40 h-40 rounded-2xl object-cover border-2 border-rose-500/60 shadow-lg"
                />
                {/* Simulated Bounding Box Overlay */}
                <div className="absolute inset-2 border-2 border-dashed border-rose-400 rounded-xl pointer-events-none flex items-start justify-end p-1">
                  <span className="bg-rose-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                    CLONE MATCH
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-rose-300 block truncate max-w-[160px]">
                {threat.handle || threat.packageId}
              </span>
            </div>
          </div>

          {/* Analysis Breakdown Box */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Computer Vision Diagnostic Highlights</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              The AI Computer Vision model detected <strong className="text-rose-300">{report.featurePointsCount} matching SIFT descriptors</strong> between the official brand logo and the suspect asset. Perceptual image hashing confirmed a <strong className="text-indigo-300">{report.perceptualHashDiff}-bit Hamming distance</strong>, indicating direct logo copyright infringement.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
