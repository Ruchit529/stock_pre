import React, { useState, useEffect } from 'react';
import { fetchFeaturedStocks } from '../services/api';
import { 
  TrendingUp, TrendingDown, ArrowRight, Sparkles, 
  Filter, Briefcase, ShieldAlert, BookOpen, LayoutGrid, 
  List, Activity, ShieldCheck, Award, BarChart2, Percent, 
  Layers, ArrowUpRight, PieChart 
} from 'lucide-react';

export default function Home({ navigate, activePage = 'home', isDarkMode = true }) {
  const [selectedFilter, setSelectedFilter] = useState('🔥 Trending');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingFeatured(true);
    fetchFeaturedStocks().then(data => {
      if (isMounted) {
        setFeaturedStocks(data);
        setIsLoadingFeatured(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoadingFeatured(false);
    });
    return () => { isMounted = false; };
  }, []);

  const handleSelectCompany = (symbol, subPage = 'overview') => {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    } catch (e) {}
    let updated = [symbol, ...saved.filter(s => s !== symbol)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    navigate('company', symbol, subPage);
  };

  const filterTabs = [
    { id: '🔥 Trending', label: '🔥 Trending' },
    { id: '📈 Top Gainers', label: '📈 Top Gainers' },
    { id: '📉 Top Losers', label: '📉 Top Losers' }
  ];

  // 1. Filter out penny stocks (price < ₹20) and poor scorecards
  const validCompanies = featuredStocks.filter(company => {
    const isPennyStock = (company.currentPrice ?? 0) < 20;
    const score = company.fundamentalAnalysis?.totalScore;
    if (isPennyStock) return false;
    if (score !== undefined && score < 3.5) return false;
    return true;
  });

  // 2. Apply tab filter
  const filteredList = validCompanies.filter(company => {
    const change = company.priceChangePercent ?? 0;

    if (selectedFilter === '📈 Top Gainers') {
      return change > 0;
    }
    if (selectedFilter === '📉 Top Losers') {
      return change < 0;
    }
    return true; // '🔥 Trending'
  });

  // 3. Apply tab-specific sorting
  const filteredCompanies = [...filteredList].sort((a, b) => {
    const changeA = a.priceChangePercent ?? 0;
    const changeB = b.priceChangePercent ?? 0;

    if (selectedFilter === '📈 Top Gainers') {
      return changeB - changeA;
    }
    if (selectedFilter === '📉 Top Losers') {
      return changeA - changeB;
    }
    const scoreA = a.fundamentalAnalysis?.totalScore ?? 0;
    const scoreB = b.fundamentalAnalysis?.totalScore ?? 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    return changeB - changeA;
  });

  const mainModules = [
    {
      id: 'stock-analysis',
      title: '1. Stock Analysis',
      tag: 'ACTIVE MODULE',
      tagColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
      icon: BarChart2,
      color: 'from-blue-600 to-indigo-600',
      highlights: ['10-Parameter Scorecard', '1Yr vs 5Yr Trend Audit', 'Fair Value DCF Model'],
      description: 'Screen 500+ Nifty equities with automated fundamental scoring.',
      actionLabel: 'Launch Analysis',
      isAvailable: true,
      onClick: () => navigate('screener')
    },
    {
      id: 'sector-analysis',
      title: '2. Sector Analysis',
      tag: 'COMING SOON',
      tagColor: 'bg-amber-950/60 text-amber-400 border-amber-800/60',
      icon: PieChart,
      color: 'from-slate-700 to-slate-800',
      highlights: ['Industry Heatmaps', 'Sector ROE Benchmarks', 'Relative Valuations'],
      description: 'Sector-wide health benchmarks and industry rotation trends.',
      actionLabel: 'Coming Soon',
      isAvailable: false,
      onClick: null
    },
    {
      id: 'portfolio-analysis',
      title: '3. Portfolio Analysis',
      tag: 'COMING SOON',
      tagColor: 'bg-amber-950/60 text-amber-400 border-amber-800/60',
      icon: Briefcase,
      color: 'from-slate-700 to-slate-800',
      highlights: ['Automated Risk Score', 'Balance Sheet Audit', 'Safety Margin Alerts'],
      description: 'Track holdings with automated balance sheet safety monitoring.',
      actionLabel: 'Coming Soon',
      isAvailable: false,
      onClick: null
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in text-left pb-8 px-2 sm:px-4">

      {activePage === 'home' && (
        <div className="space-y-6">
          
          {/* Compact 2-Column Executive Intro Banner */}
          <div className={`relative overflow-hidden p-5 sm:p-7 rounded-2xl border shadow-xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#131926] via-[#101625] to-[#0c111d] border-slate-800/90 text-white' 
              : 'bg-white border-slate-200 shadow-slate-200/50 text-slate-900'
          }`}>
            <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
              isDarkMode ? 'bg-blue-600/10' : 'bg-blue-500/10'
            }`} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Title & Actions */}
              <div className="lg:col-span-7 space-y-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-wider ${
                  isDarkMode 
                    ? 'bg-blue-950/60 text-blue-400 border-blue-800/60' 
                    : 'bg-blue-50 text-blue-600 border-blue-200'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Equity Intelligence Hub</span>
                </div>

                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-snug ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Automated Stock Analysis Engine
                </h1>

                <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Instant 3-stage fundamental evaluation for Indian equities. Run 10-parameter scorecards, 5-year growth audits, and intrinsic safety margins.
                </p>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap pt-1">
                  <button
                    onClick={() => navigate('screener')}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                  >
                    <BarChart2 className="w-4 h-4" />
                    <span>Launch Stock Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleSelectCompany('RELIANCE', 'overview')}
                    className={`px-4 py-2.5 rounded-xl font-extrabold text-xs border transition-all flex items-center gap-1.5 ${
                      isDarkMode 
                        ? 'bg-[#1a2336] hover:bg-slate-800 text-slate-200 border-slate-700' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Demo: RELIANCE</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Platform Quick Stats Card (Fills Empty Space) */}
              <div className="lg:col-span-5">
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isDarkMode ? 'bg-[#0c111d]/90 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                    <span className={`text-[10px] uppercase font-extrabold tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Platform Coverage
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live Feed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-left">
                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-[#131926] border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Active Stocks</div>
                      <div className={`text-base font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>500+ Equities</div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-[#131926] border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Stage 1 Gatekeeper</div>
                      <div className="text-base font-black text-blue-500 mt-0.5">10 Ratios</div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-[#131926] border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Stage 2 Audit</div>
                      <div className="text-base font-black text-purple-500 mt-0.5">5Yr P&L / CF</div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-[#131926] border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Safety Margin</div>
                      <div className="text-base font-black text-emerald-500 mt-0.5">DCF Model</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Modules Grid */}
          <div className="space-y-4">
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div>
                <h2 className={`text-base font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <LayoutGrid className="w-4 h-4 text-blue-500" />
                  <span>Platform Modules</span>
                </h2>
              </div>
            </div>

            {/* 3 Core Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mainModules.map(mod => {
                const ModIcon = mod.icon;
                return (
                  <div
                    key={mod.id}
                    onClick={mod.isAvailable ? mod.onClick : undefined}
                    className={`group p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                      mod.isAvailable
                        ? isDarkMode
                          ? 'bg-[#131926]/90 border-slate-800/90 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer'
                          : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500/60 cursor-pointer'
                        : isDarkMode
                          ? 'bg-[#0f1420]/60 border-slate-800/50 opacity-75 cursor-not-allowed'
                          : 'bg-slate-50 border-slate-200 opacity-75 cursor-not-allowed'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-sm`}>
                          <ModIcon className="w-4 h-4" />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isDarkMode ? mod.tagColor : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {mod.tag}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-sm font-extrabold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        } ${mod.isAvailable ? 'group-hover:text-blue-500' : ''} transition-colors`}>
                          {mod.title}
                        </h3>
                        <p className={`text-xs font-medium mt-1 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {mod.description}
                        </p>
                      </div>

                      {/* Feature Bullet Chips (No Paragraph Walls) */}
                      <ul className="space-y-1 pt-1">
                        {mod.highlights.map((item, i) => (
                          <li key={i} className={`text-[11px] font-medium flex items-center gap-1.5 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between text-xs font-extrabold ${
                      isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
                    }`}>
                      <span className={mod.isAvailable ? 'text-blue-500 group-hover:translate-x-0.5 transition-transform' : 'text-slate-400'}>
                        {mod.actionLabel}
                      </span>
                      {mod.isAvailable ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                      ) : (
                        <span className="text-[9px] text-slate-400 uppercase font-bold">In Dev</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {(activePage === 'screener') && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-[#131926] via-[#101625] to-[#0c111d] border-slate-800/90 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
          }`}>
            <div className="space-y-1">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                isDarkMode ? 'bg-blue-950/60 text-blue-400 border-blue-800/50' : 'bg-blue-50 text-blue-600 border-blue-200'
              }`}>
                <Filter className="w-3.5 h-3.5 text-blue-500" />
                <span>Stock Screener & Market Discovery</span>
              </div>
              <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Explore & Screen Indian Equities
              </h1>
              <p className={`text-xs font-medium max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Filter out penny stocks (&lt; ₹20), sort by top momentum gainers/losers, and select any stock card to launch its 7-step analysis engine.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 ${
              isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mr-1 flex-shrink-0 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  <Filter className="w-3.5 h-3.5 text-blue-500" /> Filter:
                </span>
                {filterTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs whitespace-nowrap transition-all flex-shrink-0 ${
                      selectedFilter === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : isDarkMode 
                          ? 'bg-[#131926] text-slate-400 hover:text-white border border-slate-800' 
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <strong className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{filteredCompanies.length}</strong> stocks
                </span>
                <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                  isDarkMode ? 'bg-[#0c111d] border-slate-800' : 'bg-slate-200/60 border-slate-300'
                }`}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      viewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>
              </div>
            </div>

            {isLoadingFeatured ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className={`p-4 rounded-2xl border animate-pulse space-y-3 h-28 ${
                    isDarkMode ? 'border-slate-800/80 bg-[#131926]/40' : 'border-slate-200 bg-white'
                  }`}>
                    <div className="h-3 bg-slate-300 dark:bg-slate-800 rounded w-1/2" />
                    <div className="h-5 bg-slate-300 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCompanies.map(company => {
                  const isLoss = company.priceChange < 0;
                  return (
                    <div
                      key={company.symbol}
                      onClick={() => handleSelectCompany(company.symbol)}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isDarkMode 
                          ? 'bg-[#131926]/80 border-slate-800/80 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 text-white' 
                          : 'bg-white border-slate-200 hover:border-blue-500/60 shadow-sm hover:shadow-md hover:-translate-y-1 text-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-black text-sm group-hover:text-blue-500 transition-colors flex items-center gap-1.5">
                            <span>{company.symbol}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                              isDarkMode ? 'text-slate-400 bg-slate-800/80 border-slate-700' : 'text-slate-500 bg-slate-100 border-slate-200'
                            }`}>
                              {company.exchange || 'NSE'}
                            </span>
                          </div>
                          <div className={`text-[10px] font-medium truncate max-w-[190px] ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {company.name}
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-baseline justify-between pt-1 border-t ${
                        isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
                      }`}>
                        <div>
                          <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Current Price</span>
                          <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{company.currentPrice}</span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl border ${
                          isLoss
                            ? isDarkMode
                              ? 'bg-rose-950/40 text-rose-400 border-rose-900/50'
                              : 'bg-rose-50 text-rose-600 border-rose-200'
                            : isDarkMode
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {isLoss ? <TrendingDown className="w-3 h-3 text-rose-500" /> : <TrendingUp className="w-3 h-3 text-emerald-500" />}
                          <span>{company.priceChangePercent > 0 ? `+${company.priceChangePercent}%` : `${company.priceChangePercent}%`}</span>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span>Analyze Details &rarr;</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`rounded-2xl border overflow-hidden shadow-xl ${
                isDarkMode ? 'border-slate-800/80 bg-[#131926]/80 text-white' : 'border-slate-200 bg-white text-slate-900'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`font-extrabold border-b text-[10px] uppercase tracking-wider ${
                      isDarkMode ? 'bg-[#0c111d] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      <tr>
                        <th className="p-3.5">Company</th>
                        <th className="p-3.5">Sector</th>
                        <th className="p-3.5">Current Price</th>
                        <th className="p-3.5">24h Change</th>
                        <th className="p-3.5">Market Cap</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-medium ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                      {filteredCompanies.map(company => {
                        const isLoss = company.priceChange < 0;
                        return (
                          <tr
                            key={company.symbol}
                            onClick={() => handleSelectCompany(company.symbol)}
                            className={`cursor-pointer transition-colors ${
                              isDarkMode ? 'hover:bg-[#1a2336]' : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="p-3.5">
                              <div className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.symbol}</div>
                              <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{company.name}</div>
                            </td>
                            <td className={`p-3.5 font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{company.sector || 'General'}</td>
                            <td className={`p-3.5 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{company.currentPrice}</td>
                            <td className="p-3.5">
                              <span className={`inline-flex items-center gap-1 font-bold ${isLoss ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {isLoss ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                {company.priceChangePercent > 0 ? `+${company.priceChangePercent}%` : `${company.priceChangePercent}%`}
                              </span>
                            </td>
                            <td className={`p-3.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>₹{(company.marketCapValue / 100000).toFixed(1)}L Cr</td>
                            <td className="p-3.5 text-right font-bold text-blue-500">
                              Analyze &rarr;
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

