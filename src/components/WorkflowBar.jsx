import React from 'react';
import { 
  Building2, 
  Search, 
  AlertTriangle, 
  Cpu, 
  Share2, 
  TrendingUp, 
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function WorkflowBar({ currentStep, onStepChange }) {
  const steps = [
    { id: 1, label: '1. Brand Onboarding', short: 'Onboarding', icon: Building2 },
    { id: 2, label: '2. Multi-Source Scan', short: 'Scan', icon: Search },
    { id: 3, label: '3. Critical Threat Focus', short: 'Critical Focus', icon: AlertTriangle },
    { id: 4, label: '4. System Explains', short: 'Root Cause', icon: Cpu },
    { id: 5, label: '5. Connect Dots', short: 'Correlation', icon: Share2 },
    { id: 6, label: '6. Impact & Targeting', short: 'Impact Score', icon: TrendingUp },
    { id: 7, label: '7. Takedown Response', short: 'Response', icon: Zap }
  ];

  return (
    <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-white border-2 border-rose-300 rounded-2xl p-4 shadow-md mb-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 border-b-2 border-rose-200 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-xs font-mono font-black text-rose-950 uppercase tracking-wider">
            Guided Investigation Workflow — Step {currentStep} of 7
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onStepChange(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-3 py-1 rounded-xl bg-white hover:bg-rose-100 disabled:opacity-40 text-rose-900 font-mono text-[11px] font-bold border border-rose-300 transition-colors flex items-center gap-1 shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-rose-700" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={() => onStepChange(Math.min(7, currentStep + 1))}
            disabled={currentStep === 7}
            className="px-3.5 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-mono text-[11px] font-extrabold transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* 7 Interactive Steps Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`p-2.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between space-y-1.5 relative ${
                isActive
                  ? 'bg-rose-600 border-rose-700 text-white shadow-md font-bold scale-[1.02]'
                  : isDone
                  ? 'bg-rose-100 border-rose-300 text-rose-950 font-semibold hover:bg-rose-200'
                  : 'bg-white border-rose-200 text-slate-700 hover:border-rose-400 hover:text-rose-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDone ? 'text-rose-700' : 'text-slate-400'}`} />
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-700" />
                ) : (
                  <span className={`text-[9px] font-mono font-bold ${isActive ? 'text-rose-100' : 'text-slate-400'}`}>
                    Step {step.id}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-mono leading-tight truncate ${isActive ? 'text-white font-extrabold' : 'text-slate-900 font-bold'}`}>
                {step.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
