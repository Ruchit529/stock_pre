import React from 'react';
import { ShieldCheck, BookOpen } from 'lucide-react';

export default function Footer({ isDarkMode = true }) {
  return (
    <footer className={`border-t mt-12 py-6 transition-colors duration-150 ${
      isDarkMode ? 'bg-[#090d16] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className={`font-bold text-xs tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
              Stock Analysis Platform — Master Course Educational Framework
            </span>
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded border ${
            isDarkMode ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Educational Framework Standard</span>
          </div>
        </div>

        <p className={`text-[11px] leading-relaxed font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Disclaimer: This application strictly implements the educational investment methodology specified in the Stock Analysis Master Course. All calculations, scorecards, and valuations are for educational and academic research purposes only and do not constitute financial advice, investment recommendations, or SEBI-registered advisory services.
        </p>

        <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-wider ${
          isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <span>© 2026 Stock Analysis Platform</span>
          <span>Phase 0 & 1 Manual Verification State</span>
        </div>
      </div>
    </footer>
  );
}
