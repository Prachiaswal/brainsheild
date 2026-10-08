import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Smartphone, 
  Sparkles, 
  Building2, 
  Hammer, 
  Zap, 
  User, 
  Shirt, 
  Globe,
  CheckCircle2,
  Heart
} from 'lucide-react';
import HelloKittyMascot from './HelloKittyMascot.jsx';
import { playClickSound, playScanSound } from '../utils/soundEffects.js';

export default function MinecraftMainMenu({
  activeTab,
  setActiveTab,
  selectedBrandKey,
  onSelectBrand,
  brandProfile,
  onOpenAddBrandModal,
  onRunScan,
  isScanning,
  isFullLauncherMode,
  onToggleLauncherMode
}) {
  const splashTexts = [
    "Hello Kitty Edition",
    "100% Whitelisted",
    "Cyrillic Tricks Stopped",
    "Protecting " + (brandProfile?.name || "PayPal"),
    "BrainShield Active",
    "Baby Pink Security Matrix",
    "Zero False Positives",
    "Meta IG & FB Safe Harbor"
  ];

  const [splashIndex, setSplashIndex] = useState(0);
  const [characterSpeech, setCharacterSpeech] = useState("Hi! I'm Hello Kitty Analyst. Welcome to BrainShield! Select an option below to inspect brand security.");

  const cycleSplash = () => {
    playClickSound();
    setSplashIndex((prev) => (prev + 1) % splashTexts.length);
  };

  const handleMenuAction = (tabId) => {
    playClickSound();
    setActiveTab(tabId);
    if (tabId === 'social_scanner') {
      setCharacterSpeech("Inspecting Instagram, Facebook & X handles for imposter accounts!");
    } else if (tabId === 'brand_profile') {
      setCharacterSpeech("Editing canonical brand handles to guarantee zero false alerts!");
    } else if (tabId === 'crafting_bench') {
      setCharacterSpeech("Let's forge some takedown blades in the Protection Bench!");
    } else if (tabId === 'takedown_center') {
      setCharacterSpeech("Ready to dispatch automated legal notices to platform abuse teams!");
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-4 border-rose-300 bg-white min-h-[560px] flex flex-col justify-between p-6 select-none font-sans"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `radial-gradient(circle at 10% 10%, #FFF0F5 0%, transparent 40%), radial-gradient(circle at 90% 90%, #FFE4E6 0%, transparent 40%), linear-gradient(to right, rgba(244, 114, 182, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 114, 182, 0.05) 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 100% 100%, 24px 24px, 24px 24px'
      }}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          {/* Brand Selector Dropdown */}
          <select
            value={selectedBrandKey}
            onChange={(e) => {
              playClickSound();
              if (e.target.value === '__add_new__') onOpenAddBrandModal();
              else onSelectBrand(e.target.value);
            }}
            className="mc-btn-hk-white px-3.5 py-1.5 rounded-xl text-xs cursor-pointer focus:outline-none font-bold text-rose-950 shadow-sm"
          >
            <option value="paypal">Brand: PayPal</option>
            <option value="nike">Brand: Nike</option>
            <option value="telegram">Brand: Telegram</option>
            <option value="binance">Brand: Binance</option>
            <option value="__add_new__">+ Add Brand...</option>
          </select>
        </div>

        {/* Scan & Mode Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              onRunScan();
            }}
            disabled={isScanning}
            className="mc-btn-hk-pink px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm font-bold"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Deep Scan'}</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onToggleLauncherMode();
            }}
            className="mc-btn-hk-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 font-bold text-rose-950"
          >
            <Globe className="w-3.5 h-3.5 text-rose-600" />
            <span>{isFullLauncherMode ? 'Dashboard View' : 'Launcher View'}</span>
          </button>
        </div>
      </div>

      {/* Center Top: Hello Kitty Mascot & BrainShield Title */}
      <div className="flex flex-col items-center justify-center my-3 z-20 relative">
        <div className="relative cursor-pointer group flex flex-col items-center" onClick={cycleSplash}>
          <HelloKittyMascot size={76} className="mb-2 hover:scale-105 transition-transform" />
          
          {/* Main Title Logo */}
          <div className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-center text-rose-600 drop-shadow-sm font-sans">
            BRAIN SHIELD
          </div>
          
          {/* Subtitle */}
          <div className="text-center text-rose-950 font-black text-xs tracking-widest uppercase mt-1">
            HELLO KITTY BRAND PROTECTION MATRIX
          </div>

          {/* Diagonal Splash Text */}
          <div className="absolute -top-2 -right-6 sm:-right-14 text-rose-700 font-extrabold text-sm sm:text-base md:text-lg animate-hk-splash whitespace-nowrap cursor-pointer hover:scale-105 transition-transform bg-white/95 px-3 py-1 rounded-xl border-2 border-rose-300 shadow-md">
            {splashTexts[splashIndex]}
          </div>
        </div>
      </div>

      {/* Main Content Area: Left Mascot, Center Menu Stack, Right Hello Kitty Avatar */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 z-20 my-2">
        {/* Left Side: Hello Kitty Sentinel Bot Widget */}
        <div className="hidden md:flex flex-col items-start gap-2">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-rose-200 p-3 rounded-2xl text-xs text-rose-950 max-w-[210px] space-y-1.5 shadow-md">
            <div className="flex items-center gap-1.5 text-rose-700 font-extrabold border-b border-rose-100 pb-1">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Hello Kitty Guard</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-900 font-bold">
              Guarding official canonical whitelist. 0% False Alerts guaranteed for {brandProfile?.name}.
            </p>
          </div>

          <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border-2 border-rose-200 shadow-sm">
            <HelloKittyMascot size={36} />
            <div>
              <div className="text-xs font-black text-rose-950">Kitty Sentinel</div>
              <div className="text-[10px] text-rose-600 font-bold">● Active Shield</div>
            </div>
          </div>
        </div>

        {/* Center: Stacked Bedrock Main Menu Buttons (Subtle Minecraft Vibe Inset Shadows) */}
        <div className="flex flex-col items-center gap-2.5 max-w-md w-full mx-auto">
          {/* Button 1: Play / Overview */}
          <button
            onClick={() => handleMenuAction('dashboard')}
            className={`w-full py-3 text-sm rounded-2xl ${activeTab === 'dashboard' ? 'mc-btn-hk-pink' : 'mc-btn-hk-white'} text-center shadow-sm font-black`}
          >
            Play Overview
          </button>

          {/* Button 2: Realms / Social Scanner */}
          <button
            onClick={() => handleMenuAction('social_scanner')}
            className={`w-full py-3 text-sm rounded-2xl ${activeTab === 'social_scanner' ? 'mc-btn-hk-pink' : 'mc-btn-hk-pink'} text-center shadow-sm font-black`}
          >
            Realms Social Scanner
          </button>

          {/* Button 3: Marketplace / App Store */}
          <button
            onClick={() => handleMenuAction('app_store_scanner')}
            className={`w-full py-3 text-sm rounded-2xl ${activeTab === 'app_store_scanner' ? 'mc-btn-hk-pink' : 'mc-btn-hk-white'} text-center shadow-sm font-black`}
          >
            Marketplace Google Play
          </button>

          {/* Bottom Row Buttons */}
          <div className="grid grid-cols-3 gap-2 w-full pt-1">
            <button
              onClick={() => handleMenuAction('brand_profile')}
              className="mc-btn-hk-white py-2.5 text-xs rounded-xl flex items-center justify-center gap-1 font-extrabold"
              title="Brand Whitelist Profile"
            >
              <User className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden sm:inline">Profile</span>
            </button>

            <button
              onClick={() => handleMenuAction('crafting_bench')}
              className="mc-btn-hk-white py-2.5 text-xs rounded-xl flex items-center justify-center gap-1 font-extrabold"
              title="Protection Crafting Bench"
            >
              <Hammer className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden sm:inline">Bench</span>
            </button>

            <button
              onClick={() => handleMenuAction('takedown_center')}
              className="mc-btn-red py-2.5 text-xs rounded-xl flex items-center justify-center gap-1 font-extrabold"
              title="Takedown Center"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>Response</span>
            </button>
          </div>
        </div>

        {/* Right Side: Hello Kitty Pixel Avatar Mascot */}
        <div className="flex flex-col items-end gap-2">
          {/* Character Dialogue Speech Bubble */}
          <div className="bg-white border-2 border-rose-300 p-3 rounded-2xl text-xs text-rose-950 max-w-[220px] shadow-md relative animate-bounce">
            <div className="font-extrabold text-rose-700 text-[11px] border-b border-rose-100 pb-1 mb-1 flex items-center justify-between">
              <span>Hello Kitty Analyst</span>
              <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
            </div>
            <p className="text-[11px] leading-tight text-rose-900 font-bold">
              "{characterSpeech}"
            </p>
          </div>

          {/* Character Mascot Card */}
          <div 
            onClick={() => {
              playClickSound();
              setCharacterSpeech("Protecting active brand assets for " + brandProfile?.name + "! Everything is safe & clean.");
            }}
            className="flex items-center gap-3 p-2.5 bg-white rounded-2xl border-2 border-rose-300 cursor-pointer hover:border-rose-400 transition-colors shadow-sm"
          >
            <HelloKittyMascot size={40} />
            <div>
              <div className="text-xs font-black text-rose-950">Hello Kitty</div>
              <div className="text-[10px] text-rose-600 font-extrabold">● Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Overlay */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 z-20 pt-2 border-t border-rose-100 font-mono font-bold">
        <div>
          <span>©MOJANG AB & BRAINSHIELD 2026</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span>Déesse UI v1.2.5</span>
          <span>•</span>
          <span className="text-rose-700 font-black">Hello Kitty Edition</span>
        </div>
      </div>
    </div>
  );
}
