import React, { useState } from 'react';
import { X as XIcon, Building2, Globe, Smartphone, CheckCircle2, Sparkles } from 'lucide-react';
import { playClickSound, playCraftSound } from '../utils/soundEffects.js';

export default function AddBrandModal({ onClose, onAddBrand }) {
  const [name, setName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [industry, setIndustry] = useState('Fintech & Payments');
  const [officialWebsite, setOfficialWebsite] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [facebookPage, setFacebookPage] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [packageId, setPackageId] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    playCraftSound();
    const brandId = name.toLowerCase().replace(/[^a-z0-9]/g, '');

    const newBrand = {
      id: brandId,
      name: name.trim(),
      legalName: legalName.trim() || `${name.trim()} Inc.`,
      industry,
      logoUrl: logoUrl.trim() || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150&auto=format&fit=crop&q=80',
      officialWebsite: officialWebsite.trim() || `https://www.${brandId}.com`,
      officialHandles: {
        x: xHandle.trim() ? [xHandle.trim()] : [`@${brandId}`],
        instagram: instagramHandle.trim() ? [instagramHandle.trim()] : [`@${brandId}`],
        facebook: facebookPage.trim() ? [facebookPage.trim()] : [`facebook.com/${brandId}`],
        linkedin: [`company/${brandId}`],
        telegram: [`t.me/${brandId}_official`],
        tiktok: [`@${brandId}`],
        youtube: [`@${brandId}`]
      },
      officialPackages: packageId.trim() ? [packageId.trim()] : [`com.${brandId}.app`],
      officialDomains: [officialWebsite.replace(/^https?:\/\//, '').replace(/^www\./, '') || `${brandId}.com`]
    };

    onAddBrand(newBrand);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel p-6 rounded-2xl border border-emerald-500/40 shadow-2xl space-y-5 minecraft-card max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-slate-950 font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <span>Register & Manage New Brand</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Whitelist Multi-Tenant
                </span>
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                Connect official Instagram, Facebook, X, and Website domain assets.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Stripe, Airbnb, Spotify"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Legal Entity Name</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="e.g. Stripe Payments Europe Ltd."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Website URL *</label>
              <input
                type="url"
                value={officialWebsite}
                onChange={(e) => setOfficialWebsite(e.target.value)}
                placeholder="https://www.stripe.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Industry / Category</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
              >
                <option value="Fintech & Payments">Fintech & Payments</option>
                <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                <option value="Crypto & Web3">Crypto & Web3</option>
                <option value="Social & Messaging">Social & Messaging</option>
                <option value="SaaS & Cloud">SaaS & Cloud</option>
              </select>
            </div>
          </div>

          {/* Social Channels Inputs */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
              Connected Official Brand Handles (Whitelist)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-0.5">📷 Instagram</label>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  placeholder="@brand"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-0.5">📘 Facebook Page</label>
                <input
                  type="text"
                  value={facebookPage}
                  onChange={(e) => setFacebookPage(e.target.value)}
                  placeholder="facebook.com/brand"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-0.5">🐦 X (Twitter)</label>
                <input
                  type="text"
                  value={xHandle}
                  onChange={(e) => setXHandle(e.target.value)}
                  placeholder="@brand"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">📱 Google Play Package ID</label>
              <input
                type="text"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                placeholder="com.brand.app"
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-lg transition-all minecraft-btn-pastel"
            >
              Register & Initialize Whitelist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
