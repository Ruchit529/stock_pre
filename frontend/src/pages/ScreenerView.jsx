import React, { useState } from 'react';
import { PDF_COMPANIES } from '../data/mockData';
import { Filter, Search, ArrowUpDown, Download, Check, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function ScreenerView({ onSelectStock, isDarkMode = false }) {
  const [activePreset, setActivePreset] = useState('all');
  const [minRoe, setMinRoe] = useState(15);
  const [maxPe, setMaxPe] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');

  const presets = [
    { id: 'all', label: 'All Stocks', desc: 'Browse complete universe' },
    { id: 'quality-moat', label: 'Quality Moats', desc: 'ROE > 25%, Low Debt, High Pricing Power' },
    { id: 'high-growth', label: 'High Growth', desc: 'Sales Growth > 15%, Profit Growth > 18%' },
    { id: 'undervalued', label: 'Undervalued Value', desc: 'PEG < 1.5, P/E below 5-yr average' },
    { id: 'debt-free', label: 'Debt Free Leaders', desc: 'Debt/Equity < 0.1, Free Cash Flow Positive' }
  ];

  const screenerData = PDF_COMPANIES.map(company => ({
    ...company,
    roe: company.keyMetrics?.roe || 28.6,
    roce: company.keyMetrics?.roce || 33.4,
    pe: company.keyMetrics?.pe || 48.2,
    peg: company.keyMetrics?.peg || 1.28,
    debtToEquity: company.keyMetrics?.debtToEquity ?? 0.15,
    salesGrowth: 14.5,
    profitGrowth: 16.8
  }));

  const filteredData = screenerData.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRoe = stock.roe >= minRoe;
    const matchesPe = stock.pe <= maxPe;

    if (!matchesSearch || !matchesRoe || !matchesPe) return false;

    if (activePreset === 'quality-moat') return stock.roe > 20 && stock.debtToEquity < 0.3;
    if (activePreset === 'high-growth') return stock.salesGrowth > 10;
    if (activePreset === 'undervalued') return stock.peg < 1.5;
    if (activePreset === 'debt-free') return stock.debtToEquity < 0.2;

    return true;
  });

  return (
    <div className="space-y-2.5 w-full text-xs">
      
      {/* 1. Preset Screener Quick Chips */}
      <div className={`p-3 rounded-xl border ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Preset Institutional Screeners
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            {filteredData.length} Companies Matched
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {presets.map(preset => (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                activePreset === preset.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : isDarkMode
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50'
              }`}
            >
              <div className="font-bold text-xs leading-tight">{preset.label}</div>
              <div className={`text-[9px] mt-0.5 font-medium line-clamp-1 ${
                activePreset === preset.id ? 'text-blue-100' : 'text-slate-400'
              }`}>
                {preset.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Custom Filter Controls Bar */}
      <div className={`p-3 rounded-xl border space-y-2 ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <h4 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Filter Parameters
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMinRoe(15); setMaxPe(50); setActivePreset('all'); setSearchQuery(''); }}
              className="text-[10px] font-bold text-slate-400 hover:text-blue-500 cursor-pointer"
            >
              Reset Filters
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] cursor-pointer shadow-xs">
              <Download className="w-3 h-3" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          {/* Search Box */}
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Company Search</label>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              <Search className="w-3 h-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search stock..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-xs w-full"
              />
            </div>
          </div>

          {/* Min ROE Slider */}
          <div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>Min ROE (%)</span>
              <span className="text-blue-500 font-extrabold">{minRoe}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={minRoe}
              onChange={(e) => setMinRoe(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Max P/E Slider */}
          <div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>Max P/E Ratio</span>
              <span className="text-blue-500 font-extrabold">{maxPe}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={maxPe}
              onChange={(e) => setMaxPe(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Quick Metrics Multi-Select */}
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Sector Filter</label>
            <select className={`w-full px-2.5 py-1 rounded-lg border outline-none text-xs font-semibold ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <option value="all">All Sectors</option>
              <option value="paints">Paints & Chemical</option>
              <option value="it">IT Services</option>
              <option value="banking">Banking & Finance</option>
              <option value="energy">Energy & Conglomerate</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Results Table */}
      <div className={`p-3 rounded-xl border overflow-hidden ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[10px] uppercase font-bold tracking-wider ${
                isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <th className="pb-2 pl-2">Company</th>
                <th className="pb-2 text-right">Price (₹)</th>
                <th className="pb-2 text-right">Market Cap (Cr.)</th>
                <th className="pb-2 text-center">P/E</th>
                <th className="pb-2 text-center">PEG</th>
                <th className="pb-2 text-center">ROE (%)</th>
                <th className="pb-2 text-center">ROCE (%)</th>
                <th className="pb-2 text-center">Debt/Equity</th>
                <th className="pb-2 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs font-semibold ${
              isDarkMode ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'
            }`}>
              {filteredData.map(stock => (
                <tr
                  key={stock.symbol}
                  onClick={() => onSelectStock && onSelectStock(stock.symbol)}
                  className={`transition-colors cursor-pointer ${
                    isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-sky-50/50'
                  }`}
                >
                  <td className="py-2.5 pl-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-blue-600 font-bold text-white text-[10px] flex items-center justify-center shrink-0">
                        {stock.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {stock.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {stock.symbol} • {stock.sector}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 text-right font-extrabold">
                    ₹{stock.currentPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-2.5 text-right text-slate-500 dark:text-slate-400">
                    ₹{stock.marketCapValue?.toLocaleString('en-IN')} Cr.
                  </td>

                  <td className="py-2.5 text-center font-bold">
                    {stock.pe}
                  </td>

                  <td className="py-2.5 text-center font-bold">
                    {stock.peg}
                  </td>

                  <td className="py-2.5 text-center font-bold text-emerald-500">
                    {stock.roe}%
                  </td>

                  <td className="py-2.5 text-center font-bold text-emerald-500">
                    {stock.roce}%
                  </td>

                  <td className="py-2.5 text-center font-bold">
                    {stock.debtToEquity}
                  </td>

                  <td className="py-2.5 pr-2 text-right">
                    <button
                      onClick={() => onSelectStock && onSelectStock(stock.symbol)}
                      className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] cursor-pointer shadow-2xs"
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
