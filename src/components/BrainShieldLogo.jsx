import React from 'react';

export default function BrainShieldLogo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  }[size] || 'w-10 h-10 text-sm';

  return (
    <div className={`relative flex items-center justify-center font-mono select-none group ${className}`}>
      {/* Hello Kitty Outer Shield Glow */}
      <div className={`${sizeClasses} rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-white p-0.5 shadow-lg shadow-pink-500/30 transition-transform group-hover:scale-105 hk-card-pink flex items-center justify-center relative`}>
        {/* Inner Dark Pink / Pearl Background */}
        <div className="w-full h-full bg-[#24101e] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Pink Sparkles Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-transparent opacity-60 pointer-events-none"></div>

          {/* Cute Hello Kitty Bow (🎀) + Brain Shield Symbol */}
          <div className="relative z-10 flex items-center justify-center font-black">
            <span className="text-pink-300 drop-shadow-[0_2px_4px_rgba(244,114,182,0.8)]">🎀</span>
            <span className="text-white -ml-1 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">🧠</span>
          </div>

          {/* Floating Pink Heart Badge */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 border border-white"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
