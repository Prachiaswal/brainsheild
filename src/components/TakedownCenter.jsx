import React, { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Download, 
  Send, 
  ExternalLink, 
  Clock,
  Sparkles,
  AlertTriangle,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { playClickSound, playTakedownSound } from '../utils/soundEffects.js';

export default function TakedownCenter({ 
  socialThreats, 
  appThreats, 
  brandProfile, 
  onUpdateThreatStatus 
}) {
  const allThreats = [...socialThreats, ...appThreats].filter(t => !t.evalReport?.isWhitelisted);
  const [selectedThreatId, setSelectedThreatId] = useState(allThreats[0]?.id || null);
  const [noticeSent, setNoticeSent] = useState(false);

  const selectedThreat = allThreats.find(t => t.id === selectedThreatId) || allThreats[0];

  const handleIssueTakedown = () => {
    if (!selectedThreat) return;
    playTakedownSound();
    onUpdateThreatStatus(selectedThreat.id, 'TAKEDOWN_REQUESTED');
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 3500);
  };

  const handleDownloadProofJSON = () => {
    if (!selectedThreat) return;
    playClickSound();
    const proofData = {
      timestamp: new Date().toISOString(),
      brand: brandProfile?.name,
      legalName: brandProfile?.legalName,
      threatAsset: {
        id: selectedThreat.id,
        platform: selectedThreat.platform,
        identifier: selectedThreat.handle || selectedThreat.packageId,
        title: selectedThreat.username || selectedThreat.title,
        link: selectedThreat.link || selectedThreat.storeUrl
      },
      detectionEvidence: selectedThreat.evalReport,
      takedownClaimType: "Copyright & Brand Impersonation Notice (DMCA / Platform Safe Harbor)"
    };

    const blob = new Blob([JSON.stringify(proofData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `takedown-evidence-${selectedThreat.id}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 minecraft-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-400 via-pink-400 to-purple-400 flex items-center justify-center text-slate-950 font-bold shadow-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>Multi-Platform Automated Takedown Desk</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Pastel Netherite Strike
                </span>
              </h2>
              <p className="text-slate-300 text-xs font-mono">
                Generate legal DMCA impersonation notices for Meta (IG/FB), X, Website Registrars & Google Play.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Actionable Threats:</span>
            <span className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
              {allThreats.length} Flagged
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left List vs Right Notice Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Threats */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 minecraft-card">
          <h3 className="font-bold text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-3">
            <span>Select Imposter to Action</span>
            <span className="text-emerald-300">{allThreats.length} Total</span>
          </h3>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {allThreats.map((t) => {
              const isSelected = selectedThreat?.id === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedThreatId(t.id);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 minecraft-card ${
                    isSelected
                      ? 'bg-slate-800 border-amber-400/60 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={t.avatar || t.icon} 
                      alt="Thumbnail" 
                      className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs truncate text-white">{t.username || t.title}</p>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{t.handle || t.packageId}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                    t.status === 'TAKEDOWN_REQUESTED' 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {t.status || 'NEW'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Takedown Legal Package */}
        {selectedThreat ? (
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-rose-500/40 space-y-6 minecraft-card">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800 font-bold">
                    {selectedThreat.platform.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400">
                    Risk Score: {selectedThreat.evalReport?.riskScore}% ({selectedThreat.evalReport?.riskLevel})
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1">
                  {selectedThreat.username || selectedThreat.title}
                </h3>
                <p className="text-slate-400 font-mono text-xs">{selectedThreat.handle || selectedThreat.packageId}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadProofJSON}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors flex items-center gap-1.5 minecraft-card"
                >
                  <Download className="w-4 h-4 text-emerald-300" />
                  <span>Evidence JSON</span>
                </button>
              </div>
            </div>

            {/* Simulated DMCA Legal Takedown Notice Box */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-rose-300 font-bold border-b border-slate-800 pb-2">
                <span>FORMAL IMPERSONATION TAKEDOWN NOTICE</span>
                <span className="text-[10px] text-slate-500">Auto-Generated Legal Packet</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <p><strong>TO:</strong> Abuse & Trust/Safety Department ({selectedThreat.platform.toUpperCase()} Legal)</p>
                <p><strong>RIGHTS HOLDER:</strong> {brandProfile?.legalName || 'PayPal Holdings, Inc.'}</p>
                <p><strong>TARGET ASSET:</strong> {selectedThreat.link || selectedThreat.storeUrl || selectedThreat.handle}</p>
                <p className="text-slate-400">
                  "We hereby notify you that the target asset listed above is engaging in unauthorized brand impersonation, deceptive customer support fraud, and trademark infringement of {brandProfile?.name}. Automated threat telemetry confirms a {selectedThreat.evalReport?.riskScore}% threat similarity index and visual logo copyright violation."
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[10px] text-slate-400">
                <div className="font-bold text-white">Attached Technical Evidence Log:</div>
                <div>• Cyrillic Homoglyphs: {selectedThreat.evalReport?.homoglyphsFound?.length || 0} characters flagged</div>
                <div>• Visual Logo Theft Score: {selectedThreat.evalReport?.visualLogoScore || 90}% match</div>
                <div>• Brand Keyword Similarity: {selectedThreat.evalReport?.stringSimilarity || 85}%</div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Status: <strong className="text-white">{selectedThreat.status || 'NEW'}</strong></span>
              </div>

              <button
                onClick={handleIssueTakedown}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:opacity-90 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 minecraft-btn-pastel"
              >
                <Send className="w-4 h-4" />
                <span>{noticeSent ? '⚔️ Takedown Notice Dispatched!' : 'Dispatch Automated Takedown Notice'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 glass-panel p-12 rounded-2xl border border-slate-800 text-center text-slate-500 font-mono text-xs">
            No threat selected.
          </div>
        )}
      </div>
    </div>
  );
}
