import React from 'react';
import { TrendingUp, TrendingDown, Layers, Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function StockHeroBanner({ company }) {
  if (!company) return null;

  const isPositive = (company.priceChangePercent ?? 0) >= 0;
  const fundamental = company.fundamentalAnalysis || {};
  const valuation = company.valuation || {};

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#101728] to-[#151c2e] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Strip: Stock Symbol & Live Price */}
      <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-400 text-lg shadow-inner">
            {company.symbol ? company.symbol.substring(0, 2) : 'ST'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{company.name}</h1>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-black">
                {company.exchange || 'NSE'}:{company.symbol}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-black">
                {company.businessType || 'Asset Based'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs mt-1 text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>{company.sector} Sector</span>
              </span>
              <span>•</span>
              <span className="text-slate-300 font-bold">{company.industry}</span>
            </div>
          </div>
        </div>

        {/* Spot Price Card */}
        <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Current Spot Price</span>
            <div className="text-xl font-black text-white tracking-tight">
              ₹{(company.currentPrice || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1 ${isPositive
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{isPositive ? '+' : ''}{(company.priceChangePercent || 0).toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Health Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 relative z-10">
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Stage 1 Fundamentals</span>
            <div className="text-sm font-black text-white flex items-center gap-2">
              <span>{fundamental.totalScore || 7.5} / 10</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {fundamental.finalVerdict || 'Passed'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">5-Yr Profit CAGR</span>
            <div className="text-sm font-black text-white">
              +{company.keyMetrics?.profitGrowth5Yr || 12.1}% Growth
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Fair Intrinsic Value</span>
            <div className="text-sm font-black text-emerald-400 flex items-center gap-2">
              <span>₹{valuation.peValuation?.fairPrice || company.currentPrice}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                +{valuation.marginOfSafety?.pct || 8.8}% MOS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
