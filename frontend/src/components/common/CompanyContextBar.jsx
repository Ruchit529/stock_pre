import React from 'react';
import { Building2, Layers, TrendingUp, TrendingDown } from 'lucide-react';
import Badge from '../ui/Badge';

export default function CompanyContextBar({ company, isDarkMode = true }) {
  if (!company) return null;

  const isPositive = (company.priceChangePercent ?? 0) >= 0;

  return (
    <div className={`p-4 rounded-xl border mb-5 flex flex-wrap items-center justify-between gap-4 transition-colors ${
      isDarkMode ? 'bg-[#131926] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Left: Company Identity */}
      <div className="flex items-center gap-3.5">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border ${
          isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {company.symbol ? company.symbol.substring(0, 2) : 'ST'}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.name}</h2>
            <Badge variant="blue" isDarkMode={isDarkMode}>{company.exchange || 'NSE'}:{company.symbol}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs mt-0.5 font-medium">
            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Layers className="w-3 h-3 text-blue-400" />
              <span>{company.sector} Sector</span>
            </span>
            <span className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>•</span>
            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Building2 className="w-3 h-3 text-purple-400" />
              <span>{company.businessType || 'Product Based'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right: Live Spot Quote */}
      <div className={`flex items-center gap-4 border-l pl-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="text-right">
          <div className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Current Market Price
          </div>
          <div className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ₹{(company.currentPrice || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded border text-xs font-bold flex items-center gap-1 ${
          isPositive
            ? isDarkMode ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
            : isDarkMode ? 'bg-rose-950/80 border-rose-800 text-rose-400' : 'bg-rose-50 border-rose-300 text-rose-700'
        }`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{isPositive ? '+' : ''}{(company.priceChangePercent || 0).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
