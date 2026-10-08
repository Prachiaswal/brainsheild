import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Zap, 
  Sparkles,
  ExternalLink,
  Users,
  Calendar,
  Plus,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Flag
} from 'lucide-react';
import { getDiffHighlights } from '../utils/homoglyphEngine.js';
import { playClickSound, playScanSound, playAlertSound } from '../utils/soundEffects.js';

export default function SocialScanner({ 
  socialThreats, 
  onSelectThreat, 
  onOpenVisionModal, 
  onRequestTakedown,
  onAddCustomThreat
}) {
  const [platformFilter, setPlatformFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add custom scan state
  const [customInput, setCustomInput] = useState('');
  const [customPlatform, setCustomPlatform] = useState('instagram');
  const [customMessage, setCustomMessage] = useState('');

  // Filtering Logic
  const filteredThreats = socialThreats.filter(threat => {
    const report = threat.evalReport || {};
    
    // Platform filter
    if (platformFilter !== 'all' && threat.platform !== platformFilter) return false;
    
    // Risk filter
    if (riskFilter === 'critical' && report.riskLevel !== 'CRITICAL') return false;
    if (riskFilter === 'high' && report.riskLevel !== 'HIGH') return false;
    if (riskFilter === 'whitelisted' && !report.isWhitelisted) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const h = (threat.handle || '').toLowerCase();
      const u = (threat.username || '').toLowerCase();
      const b = (threat.bio || '').toLowerCase();
      if (!h.includes(q) && !u.includes(q) && !b.includes(q)) return false;
    }

    return true;
  });

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    playScanSound();
    const handle = customInput.trim();
    const isDomain = handle.includes('.') || customPlatform === 'website';
    
    const newThreat = {
      id: `custom-soc-${Date.now()}`,
      platform: isDomain ? 'website' : customPlatform,
      handle: handle.startsWith('@') || isDomain ? handle : `@${handle}`,
      username: `${handle} Candidate Asset`,
      avatar: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150&auto=format&fit=crop&q=80',
      followers: 'Recently Detected',
      createdDate: new Date().toISOString().split('T')[0],
      verified: false,
      bio: `Live user-submitted asset scanner for ${customPlatform.toUpperCase()}. Inspecting for brand impersonation and homoglyph tricks.`,
      link: isDomain ? `https://${handle}` : `https://${customPlatform}.com/${handle.replace('@', '')}`,
      isThreatHint: true,
      status: 'NEW',
      threatMomentum: '+100% / 24h (USER SUBMITTED)',
      customerTargetingScore: 88
    };

    if (onAddCustomThreat) {
      onAddCustomThreat(newThreat);
    }
    setCustomInput('');
    setCustomMessage(`Audited "${handle}" — Threat Matrix updated!`);
    setTimeout(() => setCustomMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Channel Bar */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-pink-300 space-y-5 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-pink-500" />
              <span>Multi-Channel Social & Web Brand Scanner</span>
            </h2>
            <p className="text-slate-600 text-xs font-mono">
              Continuous monitoring across Instagram, Facebook, X (Twitter), Website Domains & Telegram.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Threat Matrix Active:</span>
            <span className="px-3 py-1 rounded-xl bg-pink-100 text-pink-700 font-mono text-xs font-bold border border-pink-200">
              {filteredThreats.length} Inspected Assets
            </span>
          </div>
        </div>

        {/* Channel Selection Buttons Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-pink-100">
          {[
            { id: 'all', label: 'All Channels', icon: Globe },
            { id: 'instagram', label: 'Instagram', icon: Instagram },
            { id: 'facebook', label: 'Facebook Pages', icon: Facebook },
            { id: 'x', label: 'X (Twitter)', icon: Twitter },
            { id: 'website', label: 'Website Domains', icon: Globe },
            { id: 'telegram', label: 'Telegram', icon: Send },
          ].map((ch) => {
            const Icon = ch.icon;
            const active = platformFilter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  playClickSound();
                  setPlatformFilter(ch.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-pink-500 text-white shadow-sm scale-[1.02]'
                    : 'bg-pink-50 text-slate-600 border border-pink-200 hover:bg-pink-100 hover:text-pink-600'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-pink-500'}`} />
                <span>{ch.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Inputs & Custom Handle Scanner Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handle, domain, or bio..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-pink-50 border-2 border-pink-200 text-slate-800 text-xs font-mono focus:border-pink-400 focus:outline-none"
            />
          </div>

          {/* Risk Level Filter */}
          <div className="relative">
            <select
              value={riskFilter}
              onChange={(e) => {
                playClickSound();
                setRiskFilter(e.target.value);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-pink-50 border-2 border-pink-200 text-slate-800 text-xs font-mono focus:border-pink-400 focus:outline-none appearance-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical Risk (&gt;80%)</option>
              <option value="high">High Risk (60-79%)</option>
              <option value="whitelisted">Whitelisted Only</option>
            </select>
          </div>

          {/* Quick Custom Handle Scanner */}
          <form onSubmit={handleAddCustom} className="flex gap-1.5">
            <select
              value={customPlatform}
              onChange={(e) => setCustomPlatform(e.target.value)}
              className="px-2 py-2 rounded-xl bg-pink-50 border-2 border-pink-200 text-slate-800 text-[11px] font-mono focus:outline-none"
            >
              <option value="instagram">IG</option>
              <option value="facebook">FB</option>
              <option value="x">X</option>
              <option value="website">Web</option>
            </select>

            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Scan custom handle/URL..."
              className="w-full px-3 py-2 rounded-xl bg-pink-50 border-2 border-pink-200 text-slate-800 text-xs font-mono focus:border-pink-400 focus:outline-none"
            />

            <button
              type="submit"
              className="mc-btn-hk-pink px-3 py-2 rounded-xl text-xs shrink-0 flex items-center gap-1"
              title="Audit handle immediately"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Scan</span>
            </button>
          </form>
        </div>

        {customMessage && (
          <div className="p-2.5 rounded-2xl bg-pink-100 border border-pink-300 text-pink-700 text-xs font-mono text-center animate-fade-in font-bold">
            {customMessage}
          </div>
        )}
      </div>

      {/* Grid of Scanned Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredThreats.map((threat) => {
          const report = threat.evalReport || {};
          const isWhitelisted = report.isWhitelisted;
          const isCritical = report.riskLevel === 'CRITICAL';
          const isHigh = report.riskLevel === 'HIGH';
          const diffHighlights = getDiffHighlights(threat.handle || '');

          return (
            <div 
              key={threat.id}
              onClick={() => {
                playClickSound();
                onSelectThreat(threat);
              }}
              className={`glass-panel p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-4 bg-white shadow-sm hover:border-pink-400 ${
                isWhitelisted 
                  ? 'border-pink-200 bg-pink-50/40' 
                  : isCritical 
                  ? 'border-rose-400 bg-rose-50/40 hover:border-rose-500' 
                  : 'border-pink-300 bg-white'
              }`}
            >
              {/* Card Header: Avatar, Name, Risk Pill */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={threat.avatar} 
                      alt="Avatar" 
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-pink-300"
                    />
                    <span className="absolute -bottom-1 -right-1 text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-md bg-white text-pink-600 border border-pink-300 font-bold">
                      {threat.platform}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                      <span>{threat.username}</span>
                      {threat.verified && <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />}
                    </h3>
                    
                    {/* Handle with Homoglyph Highlights */}
                    <div className="text-xs font-mono flex items-center flex-wrap gap-0.5 mt-0.5">
                      <span className="text-slate-400">@</span>
                      {diffHighlights.map((dh, i) => (
                        <span 
                          key={i} 
                          className={dh.isHomoglyph ? 'bg-rose-100 text-rose-700 px-0.5 font-bold rounded animate-pulse' : 'text-slate-600'}
                          title={dh.isHomoglyph ? `Homoglyph: ${dh.unicode} -> '${dh.mapped}'` : ''}
                        >
                          {dh.char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk Badge */}
                <div className="text-right shrink-0">
                  <div className={`px-2.5 py-1 rounded-xl font-mono text-xs font-extrabold border ${
                    isWhitelisted 
                      ? 'bg-pink-100 text-pink-700 border-pink-300' 
                      : isCritical 
                      ? 'bg-rose-100 text-rose-700 border-rose-300' 
                      : 'bg-pink-100 text-pink-700 border-pink-300'
                  }`}>
                    {isWhitelisted ? 'WHITELISTED' : `${report.riskScore}% THREAT`}
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <p className="text-xs text-slate-600 line-clamp-2 bg-pink-50/60 p-2.5 rounded-2xl border border-pink-100 font-sans">
                "{threat.bio}"
              </p>

              {/* Threat Intelligence Badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                {report.hasHomoglyphs && (
                  <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-200 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-rose-500" />
                    Cyrillic Homoglyph ({report.homoglyphsFound?.length})
                  </span>
                )}

                {threat.phishingDomain && (
                  <span className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-700 border border-pink-200 font-bold flex items-center gap-1">
                    <Globe className="w-3 h-3 text-pink-500" />
                    Phishing Domain linked
                  </span>
                )}

                {report.matchedKeywords?.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-700 border border-pink-200">
                    Trigger: {kw}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-pink-100 text-xs font-mono">
                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-pink-400" />
                    {threat.followers}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      onOpenVisionModal(threat);
                    }}
                    className="p-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 transition-colors flex items-center gap-1 text-[11px] px-2.5 font-bold"
                    title="Inspect visual similarity"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Vision</span>
                  </button>

                  {!isWhitelisted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        onRequestTakedown(threat);
                      }}
                      className="mc-btn-hk-pink px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Takedown</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
