import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Zap, 
  Smartphone, 
  Search, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function ArchitectureView() {
  const [selectedNode, setSelectedNode] = useState('detection');

  const nodes = [
    {
      id: 'ingestion',
      title: '1. Data Ingestion Stream',
      subtitle: 'Social Crawlers & Play Store APIs',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-cyan-500/40',
      description: 'Continuously monitors X/Twitter, Instagram, Telegram, LinkedIn, TikTok, YouTube, and Google Play Store listings for brand keywords, package IDs, and app icon changes.',
      details: [
        'X/Twitter API v2 & Stream Crawlers',
        'Google Play Store Scraper & APK Metadata Audit',
        'App Store iOS Package Tracker',
        'Certificate Transparency Log Monitor'
      ]
    },
    {
      id: 'whitelist',
      title: '2. Whitelist Canonical Engine',
      subtitle: '0% False Positive Exclusion',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/40',
      description: 'Strips URLs, protocol prefixes, leading @ symbols, and trailing slashes to canonicalize candidate handles and package IDs. Guarantees 100% false-positive prevention for verified brand assets.',
      details: [
        'URI & Package Canonicalization',
        'Exact Official Social Handle Match',
        'Verified Mobile Package ID Filter',
        'Whitelisted Domain Subnet Validator'
      ]
    },
    {
      id: 'detection',
      title: '3. Multi-Layer Threat Pipeline',
      subtitle: 'Homoglyphs + Vision + String Math',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/40',
      description: 'Core AI threat evaluation pipeline combining 5 heuristic layers to score brand impersonation risk accurately without flagging normal accounts.',
      details: [
        'Layer A: Cyrillic / Unicode Homoglyph Decoder (а -> a)',
        'Layer B: Normalized Levenshtein & Jaro-Winkler Distance',
        'Layer C: AI Computer Vision & Perceptual Logo Hashing',
        'Layer D: Keyword Intent & Permission Risk Scorer'
      ]
    },
    {
      id: 'storage',
      title: '4. Telemetry Storage & DB',
      subtitle: 'Threat State & Fingerprint Store',
      icon: Database,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500/40',
      description: 'Stores brand profiles, whitelisted handles, detected threat evidence, visual perceptual hashes, and takedown status history.',
      details: [
        'Brand Profile Schema & Official Asset Lists',
        'Threat Record Telemetry & Evidence Snapshots',
        'Perceptual Logo Hash Fingerprint Index',
        'Audit Trail & Takedown Status Tracker'
      ]
    },
    {
      id: 'takedown',
      title: '5. Takedown & Alerting API',
      subtitle: 'Automated DMCA & Safe Harbor',
      icon: Zap,
      color: 'from-rose-500 to-red-500',
      borderColor: 'border-rose-500/40',
      description: 'Automated workflow engine generating formal legal DMCA notices, evidence JSON packages, and dispatching abuse reports directly to host platforms.',
      details: [
        'Automated DMCA Takedown Packet Generator',
        'Platform Abuse API Webhooks',
        'Evidence JSON & PDF Proof Exporter',
        'GenZ VibeGuard AI Copilot Real-time Alerts'
      ]
    }
  ];

  const activeNodeObj = nodes.find(n => n.id === selectedNode) || nodes[2];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>Interactive System Architecture & Data Flow Map</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Deliverable #2
                </span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Visual map depicting data ingestion sources, whitelist logic, 5-layer detection pipeline, and takedown workflow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Node Map (Horizontal Flow) */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNode === node.id;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`glass-panel p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative hover:scale-105 ${
                isSelected 
                  ? `${node.borderColor} bg-slate-900 shadow-xl shadow-indigo-500/10` 
                  : 'border-slate-800 bg-slate-900/60 opacity-80 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${node.color} flex items-center justify-center text-white shadow-md`}>
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-xs text-white">{node.title}</h3>
                <p className="text-slate-400 text-[10px] font-mono mt-0.5">{node.subtitle}</p>
              </div>

              <div className="text-[10px] font-mono text-indigo-400 font-semibold flex items-center gap-1">
                <span>Inspect Node</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Node Inspector Panel */}
      <div className="glass-panel-glow p-6 rounded-2xl border border-indigo-500/40 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${activeNodeObj.color} flex items-center justify-center text-white shadow-md`}>
            <activeNodeObj.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{activeNodeObj.title}</h3>
            <p className="text-slate-400 text-xs font-mono">{activeNodeObj.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-200 text-sm leading-relaxed">
          {activeNodeObj.description}
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-indigo-300 font-bold">Key Sub-Modules & Execution Specs:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeNodeObj.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
