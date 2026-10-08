import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Smartphone, 
  CheckCircle2, 
  Eye, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight,
  Globe,
  Lock,
  Search,
  Heart,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { playClickSound } from '../utils/soundEffects.js';

export default function DashboardView({ 
  socialThreats, 
  appThreats, 
  brandProfile, 
  onSelectThreat, 
  onOpenVisionModal,
  onNavigateTab
}) {
  const allThreats = [...socialThreats, ...appThreats];
  const criticalThreats = allThreats.filter(t => t.evalReport?.riskLevel === 'CRITICAL');
  const highThreats = allThreats.filter(t => t.evalReport?.riskLevel === 'HIGH');
  
  // Channel breakdowns
  const igThreats = socialThreats.filter(t => t.platform === 'instagram');
  const fbThreats = socialThreats.filter(t => t.platform === 'facebook');
  const xThreats = socialThreats.filter(t => t.platform === 'x');
  const webThreats = socialThreats.filter(t => t.platform === 'website');
  const playStoreThreats = appThreats.filter(t => !t.evalReport?.isWhitelisted);

  // Overall Risk Score
  const overallRiskScore = Math.min(98, Math.max(15, (criticalThreats.length * 25) + (highThreats.length * 10) + 20));

  return (
    <div className="space-y-6">
      {/* Welcome & Brand Health Header */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 md:p-8 border-2 border-rose-300 hk-card-pink bg-white shadow-sm">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 font-mono text-xs font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                ACTIVE BRAINSHIELD MATRIX
              </span>
              <span className="text-xs text-rose-900 font-mono font-bold">24/7 Hello Kitty Guard</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Protecting</span>
              <span className="text-rose-600 font-black">{brandProfile?.name || 'PayPal'}</span>
              <span>Ecosystem</span>
            </h2>
            
            <p className="text-slate-700 text-xs md:text-sm max-w-2xl leading-relaxed font-sans font-medium">
              Monitoring official assets across Instagram, Facebook, X (Twitter), Website Domains, and Google Play Store for imposter accounts, Cyrillic homoglyph tricks, and brand theft.
            </p>

            {/* Hello Kitty Protection Status */}
            <div className="flex items-center gap-3 pt-2 font-mono text-xs text-rose-950">
              <span className="font-extrabold text-rose-900">Protection Status:</span>
              <div className="flex items-center gap-1 text-rose-600">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse-pink" />
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse-pink" />
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse-pink" />
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse-pink" />
              </div>
              <span className="text-rose-900 font-black">| 80% Brand Safety Score</span>
            </div>
          </div>

          {/* Risk Score Gauge Widget */}
          <div className="flex items-center gap-4 bg-rose-50/80 p-5 rounded-3xl border-2 border-rose-300 shrink-0 shadow-sm">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-rose-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={overallRiskScore > 75 ? 'text-rose-600' : overallRiskScore > 45 ? 'text-rose-500' : 'text-rose-600'}
                  strokeDasharray={`${overallRiskScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-black font-mono text-sm text-rose-950">{overallRiskScore}</span>
            </div>
            <div>
              <div className="text-[10px] text-rose-900 uppercase font-mono tracking-wider font-extrabold">Overall Brand Risk</div>
              <div className={`text-base font-black font-mono ${
                overallRiskScore > 75 ? 'text-rose-700' : overallRiskScore > 45 ? 'text-rose-600' : 'text-rose-800'
              }`}>
                {overallRiskScore > 75 ? 'CRITICAL RISK' : overallRiskScore > 45 ? 'MODERATE RISK' : 'SECURE'}
              </div>
              <div className="text-[11px] text-rose-950 font-mono font-bold">{criticalThreats.length} Critical Impersonators</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Channel Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Instagram */}
        <div 
          onClick={() => {
            playClickSound();
            onNavigateTab('social_scanner');
          }}
          className="glass-panel p-4 rounded-3xl border-2 border-rose-200 hover:border-rose-400 transition-all cursor-pointer group bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-rose-950 bg-rose-100 px-2 py-0.5 rounded-lg font-black">
              IG Audit
            </span>
          </div>
          <div className="text-2xl font-black text-rose-950 font-mono">{igThreats.length}</div>
          <div className="text-xs font-extrabold text-rose-950">Instagram Imposters</div>
        </div>

        {/* Metric 2: Facebook */}
        <div 
          onClick={() => {
            playClickSound();
            onNavigateTab('social_scanner');
          }}
          className="glass-panel p-4 rounded-3xl border-2 border-rose-200 hover:border-rose-400 transition-all cursor-pointer group bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
              <Facebook className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-rose-950 bg-rose-100 px-2 py-0.5 rounded-lg font-black">
              FB Scan
            </span>
          </div>
          <div className="text-2xl font-black text-rose-950 font-mono">{fbThreats.length}</div>
          <div className="text-xs font-extrabold text-rose-950">Facebook Scam Pages</div>
        </div>

        {/* Metric 3: X (Twitter) */}
        <div 
          onClick={() => {
            playClickSound();
            onNavigateTab('social_scanner');
          }}
          className="glass-panel p-4 rounded-3xl border-2 border-rose-200 hover:border-rose-400 transition-all cursor-pointer group bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
              <Twitter className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-rose-950 bg-rose-100 px-2 py-0.5 rounded-lg font-black">
              X Audit
            </span>
          </div>
          <div className="text-2xl font-black text-rose-950 font-mono">{xThreats.length}</div>
          <div className="text-xs font-extrabold text-rose-950">X Fake Handles</div>
        </div>

        {/* Metric 4: Website / Phishing Domains */}
        <div 
          onClick={() => {
            playClickSound();
            onNavigateTab('social_scanner');
          }}
          className="glass-panel p-4 rounded-3xl border-2 border-rose-200 hover:border-rose-400 transition-all cursor-pointer group bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-rose-950 bg-rose-100 px-2 py-0.5 rounded-lg font-black">
              Phishing Web
            </span>
          </div>
          <div className="text-2xl font-black text-rose-950 font-mono">{webThreats.length}</div>
          <div className="text-xs font-extrabold text-rose-950">Phishing Domains</div>
        </div>

        {/* Metric 5: Google Play App Stores */}
        <div 
          onClick={() => {
            playClickSound();
            onNavigateTab('app_store_scanner');
          }}
          className="glass-panel p-4 rounded-3xl border-2 border-rose-200 hover:border-rose-400 transition-all cursor-pointer group bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-rose-950 bg-rose-100 px-2 py-0.5 rounded-lg font-black">
              APK Audit
            </span>
          </div>
          <div className="text-2xl font-black text-rose-950 font-mono">{playStoreThreats.length}</div>
          <div className="text-xs font-extrabold text-rose-950">Google Play Clones</div>
        </div>
      </div>

      {/* Priority Threat Stream & Whitelist Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Stream */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border-2 border-rose-300 space-y-4 bg-white shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b-2 border-rose-100">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Priority Threat Stream</span>
              </h3>
              <p className="text-slate-600 text-xs font-mono font-bold">Real-time automated detection across Instagram, Facebook, X, Web & Play Store</p>
            </div>
            
            <button 
              onClick={() => {
                playClickSound();
                onNavigateTab('social_scanner');
              }}
              className="text-xs text-rose-700 hover:text-rose-900 font-mono font-black flex items-center gap-1"
            >
              <span>Inspect All ({allThreats.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {allThreats.slice(0, 6).map((threat) => {
              const report = threat.evalReport || {};
              const isWhitelisted = report.isWhitelisted;
              const isCritical = report.riskLevel === 'CRITICAL';

              return (
                <div 
                  key={threat.id}
                  onClick={() => {
                    playClickSound();
                    onSelectThreat(threat);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-sm ${
                    isWhitelisted 
                      ? 'border-rose-200 bg-rose-50/40' 
                      : isCritical 
                      ? 'border-rose-400 bg-rose-50/60 hover:border-rose-500' 
                      : 'border-rose-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img 
                      src={threat.avatar || threat.icon} 
                      alt="Thumbnail" 
                      className="w-12 h-12 rounded-xl object-cover border-2 border-rose-300 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900 truncate">
                          {threat.username || threat.title || threat.handle}
                        </span>
                        <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-lg bg-rose-100 text-rose-950 border border-rose-300 font-black">
                          {threat.platform.replace('_', ' ')}
                        </span>
                        {report.hasHomoglyphs && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-rose-200 text-rose-950 border border-rose-400 font-black">
                            Cyrillic Trick
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-xs font-mono font-bold truncate mt-0.5">
                        {threat.handle || threat.packageId}
                      </p>
                      <p className="text-slate-600 text-[11px] line-clamp-1 mt-1 font-sans font-medium">
                        {threat.bio || threat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="text-right">
                      <div className={`font-mono text-sm font-black ${
                        isWhitelisted ? 'text-rose-700' : isCritical ? 'text-rose-600' : 'text-slate-700'
                      }`}>
                        {isWhitelisted ? '0 RISK' : `${report.riskScore}% THREAT`}
                      </div>
                      <div className="text-[10px] text-rose-950 font-mono font-extrabold">
                        {report.riskLevel}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        onOpenVisionModal(threat);
                      }}
                      className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 transition-colors"
                      title="AI Vision Inspection"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Whitelist Guarantee */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border-2 border-rose-300 space-y-3 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5 text-rose-600" />
              <span>Whitelist Filter Active</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed font-sans font-medium">
              BrainShield uses canonical URI and package matching to prevent false alerts on official brand channels.
            </p>
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-[11px] font-mono space-y-1.5 text-rose-950">
              <div className="flex justify-between">
                <span className="text-slate-600 font-bold">Official Brand:</span>
                <span className="text-rose-950 font-black">{brandProfile?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-bold">Instagram Handle:</span>
                <span className="text-rose-950 font-black">{brandProfile?.officialHandles?.instagram?.[0] || '@brand'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-bold">Official Website:</span>
                <span className="text-rose-950 font-black">{brandProfile?.officialWebsite}</span>
              </div>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab('brand_profile');
              }}
              className="mc-btn-hk-white w-full py-2.5 rounded-2xl text-xs font-black"
            >
              Manage Whitelist Handles
            </button>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-2 border-rose-300 space-y-3 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span>Protection Bench Simulator</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed font-sans font-medium">
              Forge custom security gear & redstone traps tailored for your brand using our interactive voxel crafting table.
            </p>
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab('crafting_bench');
              }}
              className="mc-btn-hk-pink w-full py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Open Protection Bench</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
