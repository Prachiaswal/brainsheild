import React, { useState } from 'react';
import { Sparkles, Bot, AlertTriangle, ShieldCheck, X, ChevronRight, Zap, Heart } from 'lucide-react';
import HelloKittyMascot from './HelloKittyMascot.jsx';
import { playClickSound } from '../utils/soundEffects.js';

export default function GenZCopilot({ activeThreat, brandName, onQuickAction }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => {
          playClickSound();
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 mc-btn-hk-pink text-white p-3 rounded-2xl shadow-md hover:scale-105 transition-all flex items-center gap-2 group border-2 border-rose-300"
      >
        <HelloKittyMascot size={24} />
        <span className="font-extrabold text-xs tracking-wide pr-1 font-mono">BrainShield AI</span>
        <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-mono font-black">Assistant</span>
      </button>
    );
  }

  const comment = activeThreat?.genZComment || `Hello Kitty AI Vibe check active for ${brandName || 'Brand'}! All systems scanning social channels & Google Play Store in real-time.`;
  const isCritical = activeThreat?.riskLevel === 'CRITICAL';
  const isWhitelisted = activeThreat?.isWhitelisted;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] rounded-3xl glass-panel border-2 border-rose-300 shadow-xl p-4 transition-all animate-float bg-white text-rose-950">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-rose-100">
        <div className="flex items-center gap-2.5">
          <HelloKittyMascot size={32} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-slate-900 tracking-wide font-mono">BrainShield AI</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-lg bg-rose-100 text-rose-900 border border-rose-300 font-extrabold">
                Copilot
              </span>
            </div>
            <span className="text-[11px] text-rose-700 flex items-center gap-1 font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              Live Cyber Intel Assistant
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => {
            playClickSound();
            setIsOpen(false);
          }}
          className="text-slate-400 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* AI Speech Bubble */}
      <div className={`p-3 rounded-2xl mb-3 text-xs leading-relaxed border-2 font-mono ${
        isWhitelisted 
          ? 'bg-rose-50 border-rose-200 text-rose-950' 
          : isCritical 
          ? 'bg-rose-100 border-rose-400 text-rose-950 font-bold' 
          : 'bg-rose-50 border-rose-200 text-rose-950'
      }`}>
        <div className="flex items-start gap-2">
          {isWhitelisted ? (
            <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          ) : isCritical ? (
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
          ) : (
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-mono text-[11px] font-black text-rose-950 mb-1 flex items-center gap-1">
              <span>{activeThreat ? `Focus: ${activeThreat.handle || activeThreat.title || 'Selected Threat'}` : 'System Vibe Check'}</span>
            </p>
            <p className="font-bold text-slate-800">{comment}</p>
          </div>
        </div>
      </div>

      {/* Quick Action Suggestion */}
      {activeThreat && !isWhitelisted && (
        <div className="flex items-center justify-between bg-rose-50 p-2.5 rounded-2xl border border-rose-200 text-xs font-mono">
          <span className="text-rose-900 text-[11px] font-bold">Recommended Move:</span>
          <button
            onClick={() => {
              playClickSound();
              onQuickAction && onQuickAction(activeThreat);
            }}
            className="mc-btn-hk-pink px-3 py-1 rounded-xl text-white font-black text-[11px] flex items-center gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>Takedown Notice</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
