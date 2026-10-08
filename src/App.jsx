import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import WorkflowBar from './components/WorkflowBar.jsx';
import MinecraftMainMenu from './components/MinecraftMainMenu.jsx';
import DashboardView from './components/DashboardView.jsx';
import BrandProfile from './components/BrandProfile.jsx';
import SocialScanner from './components/SocialScanner.jsx';
import GooglePlayScanner from './components/GooglePlayScanner.jsx';
import VisionInspectorModal from './components/VisionInspectorModal.jsx';
import LookalikeSandbox from './components/LookalikeSandbox.jsx';
import ProtectionBench from './components/ProtectionBench.jsx';
import TakedownCenter from './components/TakedownCenter.jsx';
import ArchitectureView from './components/ArchitectureView.jsx';
import PresentationDeck from './components/PresentationDeck.jsx';
import ThreatCorrelation from './components/ThreatCorrelation.jsx';
import GenZCopilot from './components/GenZCopilot.jsx';
import AddBrandModal from './components/AddBrandModal.jsx';

import { BRAND_PROFILES, MOCK_THREAT_DATABASE } from './utils/mockData.js';
import { evaluateAssetThreat } from './utils/detectionEngine.js';
import { Radar, CheckCircle2, Sparkles, ShieldCheck, Monitor } from 'lucide-react';
import { playScanSound, playClickSound } from './utils/soundEffects.js';

export default function App() {
  const [selectedBrandKey, setSelectedBrandKey] = useState('paypal');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState(null);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [visionModalThreat, setVisionModalThreat] = useState(null);
  
  // Launcher Mode: toggle between Hello Kitty Déesse Menu & Embedded Dashboard
  const [isFullLauncherMode, setIsFullLauncherMode] = useState(true);

  // Theme Vibe state: 'hk-babypink' | 'hk-whitedream'
  const [themeMode, setThemeMode] = useState('hk-babypink');
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);

  // Dynamic user added brands map
  const [brandProfilesMap, setBrandProfilesMap] = useState({ ...BRAND_PROFILES });
  const [customThreats, setCustomThreats] = useState([]);

  const brandProfile = brandProfilesMap[selectedBrandKey] || brandProfilesMap.paypal;
  
  const rawSocialThreats = useMemo(() => {
    const defaultList = MOCK_THREAT_DATABASE[selectedBrandKey]?.social || [];
    const brandCustoms = customThreats.filter(t => t.brandKey === selectedBrandKey || !t.brandKey);
    return [...defaultList, ...brandCustoms];
  }, [selectedBrandKey, customThreats]);

  const rawAppThreats = MOCK_THREAT_DATABASE[selectedBrandKey]?.appStore || [];

  // Evaluate threats against selected brand profile
  const evaluatedSocialThreats = useMemo(() => {
    return rawSocialThreats.map(t => ({
      ...t,
      evalReport: evaluateAssetThreat(t, brandProfile)
    }));
  }, [rawSocialThreats, brandProfile]);

  const evaluatedAppThreats = useMemo(() => {
    return rawAppThreats.map(a => ({
      ...a,
      evalReport: evaluateAssetThreat(a, brandProfile)
    }));
  }, [rawAppThreats, brandProfile]);

  const criticalThreat = evaluatedSocialThreats.find(t => t.evalReport?.riskLevel === 'CRITICAL') || evaluatedAppThreats.find(a => a.evalReport?.riskLevel === 'CRITICAL') || evaluatedSocialThreats[0];

  // Toggle Theme Mode (Baby Pink vs Pure White)
  const handleToggleTheme = () => {
    if (themeMode === 'hk-babypink') setThemeMode('hk-whitedream');
    else setThemeMode('hk-babypink');
  };

  // Add Brand Handler
  const handleAddBrand = (newBrand) => {
    setBrandProfilesMap(prev => ({
      ...prev,
      [newBrand.id]: newBrand
    }));
    setSelectedBrandKey(newBrand.id);
  };

  // Add Custom Threat Handler
  const handleAddCustomThreat = (newThreat) => {
    setCustomThreats(prev => [{ ...newThreat, brandKey: selectedBrandKey }, ...prev]);
  };

  // Handle Guided Step Change
  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
    if (stepId === 1) setActiveTab('brand_profile');
    else if (stepId === 2) setActiveTab('social_scanner');
    else if (stepId === 3) setActiveTab('dashboard');
    else if (stepId === 4) setActiveTab('lookalike_sandbox');
    else if (stepId === 5) setActiveTab('dashboard');
    else if (stepId === 6) setActiveTab('app_store_scanner');
    else if (stepId === 7) setActiveTab('takedown_center');
  };

  const handleRunScan = () => {
    playScanSound();
    setIsScanning(true);
    setScanMessage(`Scanning Instagram, Facebook, X, Website Domains & Cyrillic Homoglyphs for ${brandProfile?.name}...`);
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('BrainShield Audit Complete! 100% Whitelist Verified. Threat Matrix Updated.');
      setTimeout(() => {
        setScanMessage(null);
      }, 3500);
    }, 1800);
  };

  return (
    <div className={`min-h-screen theme-${themeMode} text-slate-100 font-sans selection:bg-pink-300 selection:text-slate-900 flex flex-col relative transition-colors duration-300`}>
      {/* Top Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedBrandKey={selectedBrandKey}
        onSelectBrand={(key) => {
          setSelectedBrandKey(key);
          setSelectedThreat(null);
        }}
        brandProfile={brandProfile}
        isScanning={isScanning}
        onRunScan={handleRunScan}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        onOpenAddBrandModal={() => setIsAddBrandOpen(true)}
      />

      {/* Live Scan Status Notification Toast */}
      {scanMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-pink-950/90 border-2 border-pink-400 shadow-2xl backdrop-blur-xl text-xs font-mono text-pink-100 animate-bounce hk-card-pink">
          {isScanning ? (
            <Radar className="w-5 h-5 text-pink-300 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-pink-400" />
          )}
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* View Switcher Banner */}
        <div className="flex items-center justify-between glass-panel p-3 px-4 rounded-xl border-2 border-pink-400/40 font-mono text-xs hk-card-pink">
          <div className="flex items-center gap-2 text-pink-200 font-bold">
            <Monitor className="w-4 h-4 text-pink-400" />
            <span>Active View: {isFullLauncherMode ? 'BrainShield Hello Kitty Launcher Mode 🎀' : 'Brand Protection Dashboard Mode'}</span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setIsFullLauncherMode(!isFullLauncherMode);
            }}
            className="mc-btn-hk-pink px-3 py-1 rounded text-[11px] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Switch to {isFullLauncherMode ? 'Dashboard View' : 'Hello Kitty Launcher'}</span>
          </button>
        </div>

        {/* Guided 7-Step Workflow Bar */}
        <WorkflowBar 
          currentStep={currentStep}
          onStepChange={handleStepChange}
        />

        {/* Déesse Hello Kitty Minecraft Menu Launcher Component */}
        {isFullLauncherMode && (
          <MinecraftMainMenu 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedBrandKey={selectedBrandKey}
            onSelectBrand={setSelectedBrandKey}
            brandProfile={brandProfile}
            onOpenAddBrandModal={() => setIsAddBrandOpen(true)}
            onRunScan={handleRunScan}
            isScanning={isScanning}
            isFullLauncherMode={isFullLauncherMode}
            onToggleLauncherMode={() => setIsFullLauncherMode(!isFullLauncherMode)}
          />
        )}

        {/* Step 5 Specific View: Threat Correlation */}
        {currentStep === 5 ? (
          <ThreatCorrelation 
            threat={selectedThreat || criticalThreat}
            brandProfile={brandProfile}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView 
                socialThreats={evaluatedSocialThreats}
                appThreats={evaluatedAppThreats}
                brandProfile={brandProfile}
                onSelectThreat={(t) => setSelectedThreat(t)}
                onOpenVisionModal={(t) => setVisionModalThreat(t)}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'brand_profile' && (
              <BrandProfile 
                brandProfile={brandProfile}
                onUpdateBrandProfile={(updated) => {
                  setBrandProfilesMap(prev => ({ ...prev, [selectedBrandKey]: updated }));
                }}
              />
            )}

            {activeTab === 'social_scanner' && (
              <SocialScanner 
                socialThreats={evaluatedSocialThreats}
                onSelectThreat={(t) => setSelectedThreat(t)}
                onOpenVisionModal={(t) => setVisionModalThreat(t)}
                onRequestTakedown={(t) => {
                  setSelectedThreat(t);
                  setActiveTab('takedown_center');
                }}
                onAddCustomThreat={handleAddCustomThreat}
              />
            )}

            {activeTab === 'app_store_scanner' && (
              <GooglePlayScanner 
                appThreats={evaluatedAppThreats}
                brandProfile={brandProfile}
                onSelectThreat={(t) => setSelectedThreat(t)}
                onOpenVisionModal={(t) => setVisionModalThreat(t)}
                onRequestTakedown={(t) => {
                  setSelectedThreat(t);
                  setActiveTab('takedown_center');
                }}
              />
            )}

            {activeTab === 'lookalike_sandbox' && (
              <LookalikeSandbox 
                brandProfile={brandProfile}
              />
            )}

            {activeTab === 'crafting_bench' && (
              <ProtectionBench 
                brandProfile={brandProfile}
              />
            )}

            {activeTab === 'takedown_center' && (
              <TakedownCenter 
                socialThreats={evaluatedSocialThreats}
                appThreats={evaluatedAppThreats}
                brandProfile={brandProfile}
                onUpdateThreatStatus={() => {}}
              />
            )}

            {activeTab === 'architecture' && (
              <ArchitectureView />
            )}

            {activeTab === 'pitch_deck' && (
              <PresentationDeck 
                brandProfile={brandProfile}
                onNavigateTab={setActiveTab}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Hello Kitty AI Copilot */}
      <GenZCopilot 
        activeThreat={selectedThreat || criticalThreat}
        brandName={brandProfile?.name}
        onQuickAction={(threat) => {
          setSelectedThreat(threat);
          setActiveTab('takedown_center');
        }}
      />

      {/* Vision Inspector Modal */}
      {visionModalThreat && (
        <VisionInspectorModal 
          threat={visionModalThreat}
          brandProfile={brandProfile}
          onClose={() => setVisionModalThreat(null)}
        />
      )}

      {/* Add Brand Multi-tenant Modal */}
      {isAddBrandOpen && (
        <AddBrandModal 
          onClose={() => setIsAddBrandOpen(false)}
          onAddBrand={handleAddBrand}
        />
      )}
    </div>
  );
}
