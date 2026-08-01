import React from 'react';
import { RESEARCH_STEPS } from '../../data/mockData';
import { ChevronRight } from 'lucide-react';

export default function ResearchSequenceNav({
  activeStepId = 'overview',
  onSelectStep,
  isDarkMode = true
}) {
  return (
    <div className={`p-1.5 rounded-xl border mb-5 overflow-x-auto scrollbar-hide ${isDarkMode ? 'bg-[#131926] border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
      <div className="flex items-center gap-1 min-w-max">
        {RESEARCH_STEPS.map((step, idx) => {
          const isActive = activeStepId === step.id;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onSelectStep && onSelectStep(step.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
              >
                <span className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${isActive
                    ? 'bg-white/20 text-white'
                    : isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                  }`}>
                  {step.stepNum}
                </span>
                <span>{step.title}</span>
              </button>
              {idx < RESEARCH_STEPS.length - 1 && (
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-slate-700' : 'text-slate-400'
                  }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
