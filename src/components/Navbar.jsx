import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Smartphone, 
  Presentation, 
  Radar, 
  Building2, 
  Sparkles,
  Zap,
  ChevronDown,
  Volume2,
  VolumeX,
  Palette,
  Heart,
  Hammer,
  Plus
} from 'lucide-react';
import HelloKittyMascot from './HelloKittyMascot.jsx';
import { playClickSound, toggleSound } from '../utils/soundEffects.js';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedBrandKey, 
  onSelectBrand, 
  brandProfile, 
  isScanning, 
  onRunScan,
  themeMode,
  onToggleTheme,
  onOpenAddBrandModal
}) {
  const [soundOn, setSoundOn] = useState(true);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playClickSound();
  };

  const handleNavClick = (tabId) => {
    playClickSound();
    setActiveTab(tabId);
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: ShieldAlert },
    { id: 'brand_profile', label: 'Brand Whitelist', icon: Building2 },
    { id: 'social_scanner', label: 'Social & Web Scanner', icon: Search, badge: 'IG, FB, X, Web' },
    { id: 'app_store_scanner', label: 'Google Play Store', icon: Smartphone, badge: 'APK Audit' },
    { id: 'lookalike_sandbox', label: 'Homoglyph Engine', icon: Sparkles, badge: 'Cyrillic' },
    { id: 'crafting_bench', label: 'Protection Bench', icon: Hammer, badge: 'Crafting' },
    { id: 'takedown_center', label: 'Takedown Desk', icon: Zap },
    { id: 'pitch_deck', label: 'Pitch Deck', icon: Presentation, badge: 'Demo' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b-2 border-rose-200 px-4 lg:px-8 py-2.5 shadow-sm text-rose-950 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Top Row: Brand Header & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Hello Kitty Mascot & BrainShield Title */}
          <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div 
                className="cursor-pointer hover:scale-105 transition-transform" 
                onClick={() => handleNavClick('dashboard')}
              >
                <HelloKittyMascot size={42} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-xl tracking-tight flex items-center gap-1">
                    <span className="text-rose-600 font-extrabold">Brain</span>
                    <span className="text-slate-900 font-extrabold">Shield</span>
                  </h1>
                </div>
                
                {/* Hello Kitty Status */}
                <div className="flex items-center gap-2 text-[11px] text-rose-800 font-mono font-bold mt-0.5">
                  <div className="flex items-center gap-0.5 text-rose-600">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse-pink" />
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse-pink" />
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse-pink" />
                  </div>
                  <span className="text-rose-300">|</span>
                  <span className="text-rose-950 font-extrabold truncate max-w-[150px]">Protected: {brandProfile?.name || 'PayPal'}</span>
                </div>
              </div>
            </div>

            {/* Brand Dropdown Switcher + SINGLE + Add Brand Button */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedBrandKey}
                  onChange={(e) => {
                    playClickSound();
                    if (e.target.value === '__add_new__') {
                      onOpenAddBrandModal();
                    } else {
                      onSelectBrand(e.target.value);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-950 font-mono text-xs font-black focus:outline-none appearance-none pr-8 cursor-pointer hover:bg-rose-100 transition-all shadow-sm"
                >
                  <option value="paypal">Brand: PayPal</option>
                  <option value="nike">Brand: Nike</option>
                  <option value="telegram">Brand: Telegram</option>
                  <option value="binance">Brand: Binance</option>
                  <option value="__add_new__">+ Add New Brand...</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-rose-600 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>

              {/* Single Add Brand Button */}
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAddBrandModal();
                }}
                className="mc-btn-hk-white px-2.5 py-1.5 rounded-xl text-xs hidden sm:flex items-center gap-1 font-black"
                title="Register New Brand Profile"
              >
                <Plus className="w-3.5 h-3.5 text-rose-700" />
                <span>Add Brand</span>
              </button>
            </div>
          </div>

          {/* Right Controls: Theme Switcher, Sound FX & Scan Button */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-xl border-2 text-xs font-mono flex items-center gap-1.5 transition-all ${
                soundOn
                  ? 'bg-rose-100 border-rose-300 text-rose-950 font-black'
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
              title="Toggle Sound Effects"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-rose-700" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden sm:inline font-black">{soundOn ? 'SFX ON' : 'MUTED'}</span>
            </button>

            {/* Theme Selector Button */}
            <button
              onClick={() => {
                playClickSound();
                onToggleTheme();
              }}
              className="mc-btn-hk-white px-3 py-1.5 rounded-xl text-xs font-mono font-black flex items-center gap-1.5"
              title="Switch Theme"
            >
              <Palette className="w-3.5 h-3.5 text-rose-600" />
              <span>{themeMode === 'hk-whitedream' ? 'Pure White' : 'Baby Pink'}</span>
            </button>

            {/* Run Deep Scan Button */}
            <button
              onClick={() => {
                playClickSound();
                onRunScan();
              }}
              disabled={isScanning}
              className="mc-btn-hk-pink px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md font-black"
            >
              <Radar className={`w-4 h-4 text-white ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none pt-1 border-t-2 border-rose-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm border-2 border-rose-700 scale-[1.02]'
                    : 'text-rose-950 hover:text-rose-700 hover:bg-rose-100 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rose-600'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-md font-extrabold ${
                    isActive ? 'bg-white/30 text-white' : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
