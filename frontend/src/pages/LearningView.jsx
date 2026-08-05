import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, CheckCircle2, ChevronRight, FileText, Lightbulb, PieChart, ShieldCheck } from 'lucide-react';

export default function LearningView({ isDarkMode = false }) {
  const [activeTab, setActiveTab] = useState('fundamentals');

  const topics = [
    { id: 'fundamentals', label: 'Fundamental Analysis 101', icon: BookOpen },
    { id: 'valuation', label: 'Valuation Methodologies', icon: PieChart },
    { id: 'moats', label: 'Economic Moats (Buffett Framework)', icon: ShieldCheck },
    { id: 'cheatsheet', label: 'Financial Ratios Cheatsheet', icon: Lightbulb }
  ];

  return (
    <div className="space-y-2.5 w-full text-xs">
      
      {/* 1. Header Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 border border-blue-500/20 flex items-center justify-center font-bold shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Institutional Equity Research Academy
            </h2>
            <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
              Master fundamental security analysis, DCF modeling, margin of safety & moat identification
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-bold text-[11px] border border-emerald-500/20">
            Progress: 4/4 Modules Unlocked
          </span>
        </div>
      </div>

      {/* 2. Navigation Sub-Tabs */}
      <div className={`p-1.5 rounded-xl border flex flex-wrap items-center gap-1.5 ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        {topics.map(t => {
          const IconComp = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Content Module Display */}
      {activeTab === 'fundamentals' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
          <div className={`lg:col-span-8 p-4 rounded-xl border space-y-3 ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
          }`}>
            <h3 className={`font-bold text-xs flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="w-4 h-4 text-blue-500" />
              The 3 Pillars of Fundamental Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
              <div className={`p-3 rounded-lg border space-y-1.5 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
                <span className="text-[10px] font-bold uppercase text-blue-500 block">Pillar 1</span>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Business Quality & ROE</div>
                <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  Focus on companies generating return on equity above 20% consistently without high financial leverage.
                </p>
              </div>

              <div className={`p-3 rounded-lg border space-y-1.5 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
                <span className="text-[10px] font-bold uppercase text-indigo-500 block">Pillar 2</span>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Competitive Moat</div>
                <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  Pricing power, high switching costs, brand loyalty, or low cost distribution advantages.
                </p>
              </div>

              <div className={`p-3 rounded-lg border space-y-1.5 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
                <span className="text-[10px] font-bold uppercase text-emerald-500 block">Pillar 3</span>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Margin of Safety</div>
                <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  Never buy even the best business without a 15–20% discount to intrinsic fair value.
                </p>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-4 p-4 rounded-xl border space-y-2.5 ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
          }`}>
            <h4 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Quick Rules of Thumb</h4>
            <ul className="space-y-2 text-[11px] font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Debt to Equity should ideally be below 0.5x</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Interest Coverage Ratio &gt; 5.0x for safety</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Promoter Shareholding &gt; 50% with minimal pledge</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab !== 'fundamentals' && (
        <div className={`p-6 rounded-xl border text-center space-y-2 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Module Content Loaded
          </h3>
          <p className="text-[11px] text-slate-400 max-w-md mx-auto">
            This module provides institutional reference guides and analytical frameworks for value investors.
          </p>
        </div>
      )}
    </div>
  );
}
