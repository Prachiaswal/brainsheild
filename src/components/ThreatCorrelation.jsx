import React from 'react';
import { Share2, Smartphone, Globe, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ThreatCorrelation({ threat, brandProfile }) {
  const threatTitle = threat?.username || threat?.title || 'PayPal Customer Resolution Desk';
  const threatHandle = threat?.handle || threat?.packageId || '@PаyPal_Support_Help';

  return (
    <div className="glass-panel-glow p-6 rounded-2xl border border-indigo-500/40 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <span>Step 5: Cross-Platform Threat Correlation ("Connecting the Dots")</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Campaign Graph
              </span>
            </h3>
            <p className="text-slate-400 text-xs font-mono">
              Correlation engine linking fake Google Play APKs to X support handles, phishing sites, and Telegram channels.
            </p>
          </div>
        </div>
      </div>

      {/* Campaign Graph Visualizer */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="text-center font-mono text-xs text-indigo-300 font-bold bg-indigo-950/60 p-3 rounded-xl border border-indigo-500/30">
          IMPOSTER FRAUD CAMPAIGN: "{threatTitle}" ({threatHandle})
        </div>

        {/* 4 Connected Touchpoint Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {/* Node 1: Google Play Imposter */}
          <div className="bg-slate-900 p-4 rounded-xl border border-rose-500/40 space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold">
              <span className="flex items-center gap-1">
                <Smartphone className="w-4 h-4" /> 1. Play Store APK
              </span>
              <span className="bg-rose-500/20 px-1.5 py-0.5 rounded text-[9px]">MALWARE</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold">com.paypal.support.vault</p>
            <p className="text-[11px] text-slate-400">Unauthorized APK requesting SMS reading permissions.</p>
          </div>

          {/* Node 2: Phishing Web Domain */}
          <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" /> 2. Phishing Site
              </span>
              <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-[9px]">CREDENTIAL FORM</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold">paypal-security-verify.com</p>
            <p className="text-[11px] text-slate-400">Hosted form collecting 16-digit cards & 2FA codes.</p>
          </div>

          {/* Node 3: X/Twitter Fake Support */}
          <div className="bg-slate-900 p-4 rounded-xl border border-purple-500/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-purple-400 font-bold">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> 3. X Support Handle
              </span>
              <span className="bg-purple-500/20 px-1.5 py-0.5 rounded text-[9px]">HOMOGLYPH</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold">@PаyPal_Support_Help</p>
            <p className="text-[11px] text-slate-400">Uses Cyrillic 'а' (U+0430) to DM victims with fake refund links.</p>
          </div>

          {/* Node 4: Telegram Drop Channel */}
          <div className="bg-slate-900 p-4 rounded-xl border border-indigo-500/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400 font-bold">
              <span className="flex items-center gap-1">
                <Share2 className="w-4 h-4" /> 4. Telegram Drop
              </span>
              <span className="bg-indigo-500/20 px-1.5 py-0.5 rounded text-[9px]">EXFILTRATION</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold">t.me/PayPal_Refund_Group</p>
            <p className="text-[11px] text-slate-400">Exfiltrated victim credentials dumped automatically via Telegram bot API.</p>
          </div>
        </div>

        {/* Correlation Explanation */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-white font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Telemetry Correlation Findings:</span>
          </div>
          <p className="leading-relaxed">
            The automated correlation engine cross-referenced SSL certificate hashes, registrant contact emails, and visual logo perceptual hashes. All 4 assets share the exact same C2 exfiltration server, proving a single coordinated fraud infrastructure targeting <strong>{brandProfile?.name || 'PayPal'}</strong> customers.
          </p>
        </div>
      </div>
    </div>
  );
}
