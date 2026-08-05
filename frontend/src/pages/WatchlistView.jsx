import React, { useState } from 'react';
import { PDF_COMPANIES } from '../data/mockData';
import { Star, Search, Filter, TrendingUp, TrendingDown, Eye, Trash2, Bell, Plus, ArrowUpDown } from 'lucide-react';

export default function WatchlistView({ onSelectStock, isDarkMode = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const watchlistData = [
    { ...PDF_COMPANIES[0], alertTriggered: false, addedDate: '2024-05-10' },
    { ...PDF_COMPANIES[1], alertTriggered: true, addedDate: '2024-05-12' },
    { ...PDF_COMPANIES[2], alertTriggered: false, addedDate: '2024-05-15' },
    { ...PDF_COMPANIES[3], alertTriggered: false, addedDate: '2024-05-18' }
  ];

  const sectors = ['All', ...new Set(watchlistData.map(item => item.sector))];

  const filteredData = watchlistData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || item.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-2.5 w-full text-xs">
      
      {/* 1. Watchlist Summary Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'}`}>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Tracked</span>
          <div className={`text-base font-extrabold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {watchlistData.length} Stocks
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">Active Monitoring</span>
        </div>

        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'}`}>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Top Performer</span>
          <div className="text-base font-extrabold mt-0.5 text-emerald-500">
            TCS (+1.85%)
          </div>
          <span className="text-[9px] text-slate-400 font-medium">IT Services Sector</span>
        </div>

        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'}`}>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Average ROE</span>
          <div className={`text-base font-extrabold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            24.2%
          </div>
          <span className="text-[9px] text-blue-500 font-bold">High Quality Quality Moat</span>
        </div>

        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'}`}>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Alerts</span>
          <div className="text-base font-extrabold mt-0.5 text-amber-500">
            1 Price Target
          </div>
          <span className="text-[9px] text-amber-500 font-medium">TCS near 52W High</span>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2.5 ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs w-full ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}>
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search watchlist stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-xs w-full"
            />
          </div>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                selectedSector === sec
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Stock</span>
        </button>
      </div>

      {/* 3. High-Density Institutional Watchlist Table */}
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
                <th className="pb-2 text-right">Current Price</th>
                <th className="pb-2 text-right">Day Change</th>
                <th className="pb-2 text-right">Market Cap</th>
                <th className="pb-2 text-center">P/E</th>
                <th className="pb-2 text-center">ROE</th>
                <th className="pb-2 text-center">Quality Score</th>
                <th className="pb-2 text-center">Alerts</th>
                <th className="pb-2 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs font-semibold ${
              isDarkMode ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'
            }`}>
              {filteredData.map(stock => {
                const isPos = (stock.priceChangePercent || 0) >= 0;
                return (
                  <tr
                    key={stock.symbol}
                    className={`transition-colors cursor-pointer ${
                      isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-sky-50/50'
                    }`}
                  >
                    <td className="py-2.5 pl-2" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
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

                    <td className="py-2.5 text-right font-extrabold" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
                      ₹{stock.currentPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-2.5 text-right font-bold" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] ${
                        isPos ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPos ? '+' : ''}{stock.priceChangePercent}%
                      </span>
                    </td>

                    <td className="py-2.5 text-right text-slate-500 dark:text-slate-400" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
                      ₹{stock.marketCapValue?.toLocaleString('en-IN')} Cr.
                    </td>

                    <td className="py-2.5 text-center font-bold" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
                      {stock.keyMetrics?.pe || '48.2'}
                    </td>

                    <td className="py-2.5 text-center font-bold text-emerald-500" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
                      {stock.keyMetrics?.roe || '28.6'}%
                    </td>

                    <td className="py-2.5 text-center" onClick={() => onSelectStock && onSelectStock(stock.symbol)}>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        8.5 / 10
                      </span>
                    </td>

                    <td className="py-2.5 text-center">
                      {stock.alertTriggered ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          <Bell className="w-3 h-3 fill-amber-500" /> Target Met
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Set Alert</span>
                      )}
                    </td>

                    <td className="py-2.5 pr-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectStock && onSelectStock(stock.symbol)}
                          className={`p-1.5 rounded-md border transition-all ${
                            isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                          title="Open Full Stock Analysis"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-500" />
                        </button>
                        <button
                          className={`p-1.5 rounded-md border transition-all ${
                            isDarkMode ? 'bg-slate-800 border-slate-700 text-rose-400 hover:bg-rose-950/40' : 'bg-slate-50 border-slate-200 text-rose-600 hover:bg-rose-50'
                          }`}
                          title="Remove from Watchlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
