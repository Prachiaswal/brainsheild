import React, { useState } from 'react';
import { Hammer, ShieldCheck, Sparkles, Zap, CheckCircle2, Lock, Flame } from 'lucide-react';
import HelloKittyMascot from './HelloKittyMascot.jsx';
import { playCraftSound, playClickSound } from '../utils/soundEffects.js';

export default function ProtectionBench({ brandProfile }) {
  const [activeRecipe, setActiveRecipe] = useState('netherite');
  const [craftedItems, setCraftedItems] = useState([]);
  const [isCrafting, setIsCrafting] = useState(false);
  const [craftMessage, setCraftMessage] = useState('');

  const recipes = [
    {
      id: 'netherite',
      name: 'Netherite Takedown Blade',
      description: 'Cuts down phishing domains & homoglyphs with 1-click legal DMCA enforcement.',
      badge: 'Hello Kitty Netherite',
      color: 'mc-btn-hk-pink',
      materials: ['Cyrillic Homoglyph Decoder', 'Visual Logo Hash', 'Legal Evidence PDF']
    },
    {
      id: 'meta_shield',
      name: 'Meta IG & FB Brand Aegis',
      description: 'Continuous automated scanner for fake Instagram handles & Facebook scam ad campaigns.',
      badge: 'Hello Kitty Emerald',
      color: 'mc-btn-hk-pink',
      materials: ['Instagram API Sentinel', 'Facebook Page Whitelist', 'Meta DMCA Key']
    },
    {
      id: 'redstone_radar',
      name: 'Redstone Homoglyph Trap',
      description: 'Traps Cyrillic & Unicode character spoofing before fake support desks gain followers.',
      badge: 'Hello Kitty Redstone',
      color: 'mc-btn-hk-pink',
      materials: ['Unicode Normalizer', 'Edit Distance Calculator', 'Real-time Sensor']
    },
    {
      id: 'ender_vault',
      name: 'Ender Domain Vault',
      description: 'Locks official web domain DNS records and monitors typosquatted look-alike URLs.',
      badge: 'Hello Kitty Ender',
      color: 'mc-btn-hk-pink',
      materials: ['SSL Certificate Monitor', 'WHOIS Registrar Lock', 'DNS Shield']
    }
  ];

  const current = recipes.find(r => r.id === activeRecipe) || recipes[0];
  const isCrafted = craftedItems.includes(current.id);

  const handleCraft = () => {
    playClickSound();
    setIsCrafting(true);
    setCraftMessage(`Crafting ${current.name} for ${brandProfile?.name}...`);
    setTimeout(() => {
      playCraftSound();
      setIsCrafting(false);
      if (!craftedItems.includes(current.id)) {
        setCraftedItems([...craftedItems, current.id]);
      }
      setCraftMessage(`Successfully Crafted ${current.name}! Protection Active.`);
      setTimeout(() => setCraftMessage(''), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-pink-300 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm bg-white">
        <div className="flex items-center gap-3.5">
          <HelloKittyMascot size={52} />
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <span>Security Protection Crafting Bench</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-xl bg-pink-100 text-pink-700 font-bold border border-pink-200">
                Hello Kitty Recipe Matrix
              </span>
            </h2>
            <p className="text-slate-600 text-xs font-mono">
              Craft specialized security gear & radar shields tailored for <span className="text-pink-600 font-bold">{brandProfile?.name}</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-pink-600 bg-pink-50 px-3 py-1.5 rounded-2xl border border-pink-200 font-bold">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Active Armor Buffs: {craftedItems.length} / {recipes.length}</span>
        </div>
      </div>

      {/* Crafting Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Recipe Selector */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider px-1">
            Available Protection Recipes
          </h3>
          <div className="space-y-2">
            {recipes.map((recipe) => {
              const selected = activeRecipe === recipe.id;
              const crafted = craftedItems.includes(recipe.id);
              return (
                <button
                  key={recipe.id}
                  onClick={() => {
                    playClickSound();
                    setActiveRecipe(recipe.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                    selected
                      ? 'bg-pink-500 text-white border-pink-600 shadow-md scale-[1.02]'
                      : 'bg-white text-slate-700 border-pink-200 hover:border-pink-300'
                  }`}
                >
                  <div>
                    <h4 className={`font-bold text-xs ${selected ? 'text-white' : 'text-slate-800'}`}>{recipe.name}</h4>
                    <p className={`text-[10px] font-mono truncate max-w-[170px] ${selected ? 'text-pink-100' : 'text-pink-500'}`}>{recipe.badge}</p>
                  </div>

                  {crafted ? (
                    <span className={`px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold ${selected ? 'bg-white text-pink-600' : 'bg-pink-100 text-pink-600'}`}>
                      EQUIPPED
                    </span>
                  ) : (
                    <span className={`text-[10px] font-mono ${selected ? 'text-white' : 'text-slate-400'}`}>Craft</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center & Right Column: Interactive 3x3 Minecraft Crafting Table Simulator */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border-2 border-pink-300 space-y-6 bg-white shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100">
            <div>
              <span className="text-[10px] font-mono text-pink-600 font-bold uppercase tracking-wider">
                Crafting Recipe Preview
              </span>
              <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <span>{current.name}</span>
              </h3>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-pink-100 text-pink-700 font-mono text-xs font-bold border border-pink-200">
              {current.badge}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            {current.description}
          </p>

          {/* 3x3 Grid & Output Slot */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-pink-50 border-2 border-pink-200">
            {/* 3x3 Crafting Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl border-2 border-pink-300 shadow-inner">
              {current.materials.map((mat, idx) => (
                <div 
                  key={idx}
                  className="w-16 h-16 rounded-xl bg-pink-50 border border-pink-200 flex flex-col items-center justify-center p-1 text-center group relative cursor-pointer hover:border-pink-400 transition-colors"
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span className="text-[8px] font-mono text-slate-600 font-bold line-clamp-1 mt-1">
                    {mat.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-pink-400 font-bold text-xl font-mono">→</div>

            {/* Output Slot */}
            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-pink-400 flex flex-col items-center justify-center text-center p-2 shadow-sm">
              <Hammer className="w-8 h-8 text-pink-500 animate-bounce" />
              <span className="text-[9px] font-mono text-pink-600 font-bold mt-1 line-clamp-1">
                {current.name}
              </span>
            </div>
          </div>

          {/* Crafting Action Button & Toast */}
          <div className="space-y-3">
            {craftMessage && (
              <div className="p-3 rounded-2xl bg-pink-100 border border-pink-300 text-pink-700 text-xs font-mono font-bold text-center animate-pulse">
                {craftMessage}
              </div>
            )}

            <button
              onClick={handleCraft}
              disabled={isCrafting}
              className="w-full py-3.5 rounded-2xl mc-btn-hk-pink text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm"
            >
              <Hammer className={`w-4 h-4 ${isCrafting ? 'animate-spin' : ''}`} />
              <span>{isCrafting ? 'Forging Security Protection...' : isCrafted ? 'Re-Craft & Refresh Buff' : `Craft ${current.name}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
