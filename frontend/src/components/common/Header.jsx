import React from 'react';
import { TrendingUp, Search, Sun, Moon, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function Header({
  activePage = 'dashboard',
  onNavigate,
  selectedSymbol = 'RELIANCE',
  onSelectSymbol,
  companies = [],
  isDarkMode = true,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 bg-[#07090e]/80 backdrop-blur-2xl border-b border-slate-800/80 flex items-center justify-between gap-4">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="font-black text-sm text-white tracking-tight flex items-center gap-1.5">
            <span>STOCK STUDIO</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              PRO
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Educational Research Engine</p>
        </div>
      </div>

      {/* Stock Focus Selector Dropdown */}
      <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl px-3.5 py-1.5">
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Equity Focus:</span>
        <select
          value={selectedSymbol}
          onChange={(e) => onSelectSymbol && onSelectSymbol(e.target.value)}
          className="bg-transparent text-xs font-black text-white outline-none cursor-pointer pr-1"
        >
          {companies.map(c => (
            <option key={c.symbol} value={c.symbol} className="bg-slate-900 text-white">
              {c.symbol} — {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Action Controls & Theme Toggle */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SEBI Educational Standard</span>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
