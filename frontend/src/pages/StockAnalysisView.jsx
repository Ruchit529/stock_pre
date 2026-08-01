import React, { useState, useEffect } from 'react';
import RadarChart from '../components/ui/RadarChart';
import { PDF_COMPANIES } from '../data/mockData';
import {
  ArrowLeft,
  Plus,
  Download,
  CheckCircle2,
  ShieldCheck,
  Building,
  DollarSign,
  Crown,
  Network,
  Package,
  Layers,
  Sparkles,
  Flame,
  ShoppingBag,
  Wifi,
  CreditCard,
  Percent,
  Award,
  TrendingUp,
  Search,
  Check,
  ChevronRight,
  BarChart3,
  Loader2
} from 'lucide-react';

export default function StockAnalysisView({ company, onBack, isDarkMode = true, onSelectStock }) {
  const [selectedCompany, setSelectedCompany] = useState(company || null);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('stock_analysis_active_tab') || 'overview';
  });
  const [fundSubTab, setFundSubTab] = useState('stage1');
  const [hasRunAnalysis, setHasRunAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist activeTab changes
  useEffect(() => {
    localStorage.setItem('stock_analysis_active_tab', activeTab);
  }, [activeTab]);

  // Update selectedCompany when company prop changes from parent
  useEffect(() => {
    setSelectedCompany(company || null);
  }, [company]);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(25);
    setAnalysisStep('Fetching financial statements & historical metric data...');

    setTimeout(() => {
      setAnalysisProgress(65);
      setAnalysisStep('Executing Stage 1: 10-Parameter Gatekeeper Audit...');

      setTimeout(() => {
        setAnalysisProgress(90);
        setAnalysisStep('Computing Stage 2: Deep Trend & Financial Health Breakdown...');

        setTimeout(() => {
          setAnalysisProgress(100);
          setIsAnalyzing(false);
          setHasRunAnalysis(true);
          setFundSubTab('stage1');
        }, 400);
      }, 500);
    }, 500);
  };

  const handleSelect = (symbol) => {
    const found = PDF_COMPANIES.find(c => c.symbol === symbol);
    if (found) {
      setSelectedCompany(found);
      if (onSelectStock) onSelectStock(symbol);
    }
  };

  const filteredCompanies = PDF_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // STAGE 1: STOCK SELECTOR LANDING PAGE (Shown when no stock is active yet)
  if (!selectedCompany) {
    return (
      <div className="space-y-5 max-w-[1400px] mx-auto py-2">
        {/* Header Title Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border space-y-3 relative overflow-hidden flex flex-col items-center justify-center text-center ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-slate-800' 
            : 'bg-gradient-to-r from-white via-sky-100/50 to-white border-sky-100 shadow-xs'
        }`}>
          <div className="flex items-center justify-center gap-2 text-sky-600">
            <BarChart3 className="w-5 h-5" />
            <h1 className={`text-lg sm:text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Institutional Stock Research & Analysis
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium max-w-xl mx-auto">
            Search any Indian stock or pick from the curated institutional cards below to trigger our 10-parameter fundamental gatekeeper and valuation model.
          </p>

          {/* Search Bar Input */}
          <div className="pt-2 w-full max-w-2xl mx-auto">
            <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus-within:border-sky-500' : 'bg-white border-sky-200 text-slate-900 shadow-sm focus-within:border-sky-500'
            }`}>
              <Search className="w-4 h-4 text-sky-600 shrink-0" />
              <input
                type="text"
                placeholder="Search by company name, ticker symbol or sector (e.g. TCS, HDFC Bank, Paints)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full placeholder:text-slate-400 font-medium"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-200 font-bold px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Stock Cards Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Featured Stocks for Analysis
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">{filteredCompanies.length} Stocks Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredCompanies.map((stk) => {
              const isStkPositive = (stk.priceChangePercent ?? 0) >= 0;

              const renderLogo = (symbol) => {
                switch (symbol) {
                  case 'TCS':
                    return (
                      <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm">
                        TCS
                      </div>
                    );
                  case 'HDFCBANK':
                    return (
                      <div className="w-9 h-9 rounded-full bg-white text-[#004c8f] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <div className="w-5 h-5 bg-[#004c8f] text-white flex items-center justify-center font-bold text-[8px] rounded-xs">
                          HDFC
                        </div>
                      </div>
                    );
                  case 'ASIANPAINT':
                    return (
                      <div className="w-9 h-9 rounded-full bg-white text-[#d32f2f] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <span className="text-[#d32f2f] font-bold italic text-sm">ap</span>
                      </div>
                    );
                  case 'RELIANCE':
                    return (
                      <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm">
                        <Building className="w-4 h-4 text-white" />
                      </div>
                    );
                  case 'INFY':
                    return (
                      <div className="w-9 h-9 rounded-full bg-[#007cc3] text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-sm">
                        INFY
                      </div>
                    );
                  case 'ICICIBANK':
                    return (
                      <div className="w-9 h-9 rounded-full bg-white text-[#b31b1b] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <span className="text-[#b31b1b] font-bold italic text-base">i</span>
                      </div>
                    );
                  default:
                    return (
                      <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                        {symbol.substring(0, 3)}
                      </div>
                    );
                }
              };

              return (
                <div
                  key={stk.symbol}
                  onClick={() => handleSelect(stk.symbol)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer group hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-[#090f1d] border-slate-800/90 shadow-lg hover:border-sky-500/50'
                      : 'bg-white border-sky-100 shadow-xs hover:border-sky-300'
                  }`}
                >
                  {/* Top Company Header */}
                  <div className="flex items-start gap-2.5">
                    {renderLogo(stk.symbol)}
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {stk.symbol}
                      </h4>
                      <p className={`text-[11px] font-semibold truncate leading-snug ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {stk.name}
                      </p>
                      <p className={`text-[10px] font-medium truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {stk.sector}
                      </p>
                    </div>
                  </div>

                  {/* Price & Change Row */}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      ₹{stk.currentPrice ? stk.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '—'}
                    </span>
                    <span className={`text-xs font-bold flex items-center gap-0.5 ${isStkPositive ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (isDarkMode ? 'text-rose-400' : 'text-rose-600')}`}>
                      {isStkPositive ? '+' : ''}{stk.priceChangePercent}% ↗
                    </span>
                  </div>

                  {/* Sparkline Curve */}
                  <div className="w-full py-0.5">
                    <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 28">
                      <defs>
                        <linearGradient id={`grad-${stk.symbol}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={isStkPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={isStkPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 22 Q 15 25, 30 16 T 60 14 T 90 8 T 100 3 L 100 28 L 0 28 Z"
                        fill={`url(#grad-${stk.symbol})`}
                      />
                      <path
                        d="M 0 22 Q 15 25, 30 16 T 60 14 T 90 8 T 100 3"
                        fill="none"
                        stroke={isStkPositive ? '#10b981' : '#f43f5e'}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Full-width Analyze Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(stk.symbol);
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-[0.98] ${
                      isDarkMode
                        ? 'bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30'
                        : 'bg-sky-100/80 hover:bg-sky-200/90 text-sky-900 border border-sky-300/60'
                    }`}
                  >
                    <span>Analyze</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // STAGE 2: DETAILED COMPANY REPORT VIEW (Shown after a stock is selected)
  const isPositive = (selectedCompany.priceChangePercent ?? 0) >= 0;
  const keyMetrics = selectedCompany.keyMetrics || {};
  const business = selectedCompany.businessAnalysis || {};
  const sector = selectedCompany.sectorAnalysis || {};
  const fundamental = selectedCompany.fundamentalAnalysis || {};
  const valuation = selectedCompany.valuation || {};

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'fundamentals' || tabId === 'valuation') {
      setHasRunAnalysis(true);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'business', label: 'Business' },
    { id: 'sector', label: 'Sector' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'business-model', label: 'Business Model' },
    { id: 'moat', label: 'MOAT' },
    { id: 'valuation', label: 'Valuation' },
    { id: 'entry-exit', label: 'Entry/Exit' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'psychology', label: 'Psychology' },
    { id: 'risk', label: 'Risk' }
  ];

  return (
    <div className="space-y-4">
      {/* 1. Header Bar with Back to Selector & Actions */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          {/* Back Button & Stock Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedCompany(null);
                if (onSelectStock) onSelectStock(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/60'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Stock</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedCompany.name}</h1>
                <span className="text-xs font-bold text-slate-400 uppercase">{selectedCompany.symbol}</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Sector: {selectedCompany.sector}</p>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ₹{company.currentPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isPositive ? '+' : ''}{company.priceChange} ({isPositive ? '+' : ''}{company.priceChangePercent}%)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium text-right sm:text-left">
                Market Cap: ₹{company.marketCapValue?.toLocaleString('en-IN')} Cr.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-[0.98] cursor-pointer ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-700'
              }`}>
                <Plus className="w-3.5 h-3.5 text-sky-600" />
                <span>Watchlist</span>
              </button>
              <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-2xs ${
                isDarkMode 
                  ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30' 
                  : 'bg-sky-100/90 hover:bg-sky-200 text-sky-900 border border-sky-300/70'
              }`}>
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Sub-Tabs */}
        <div className={`flex items-center gap-1 overflow-x-auto pt-2 border-t scrollbar-hide ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? isDarkMode
                      ? 'bg-sky-500/30 text-sky-300 border border-sky-500/40'
                      : 'bg-sky-500 text-white shadow-2xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-sky-800 hover:bg-sky-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB 1: OVERVIEW SCREEN (Displays all key details directly without scoring) */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          
          {/* Quick Metrics Strip */}
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
            <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center divide-x ${isDarkMode ? 'divide-slate-800/40' : 'divide-sky-100'}`}>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">ROE</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.roe}%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">ROCE</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.roce}%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">OPM</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.opm}%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">P/E</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.pe}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">PEG</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.peg}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">P/B</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.priceToBook}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Debt/Equity</span>
                <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{keyMetrics.debtToEquity ?? 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Overview Section Layout */}
          <div className="space-y-4">
            {/* Company Overview Banner */}
            <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Company Overview</h3>
                <p className="text-xs text-slate-400 font-medium">Core business model & market positioning</p>
              </div>
              
              <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {selectedCompany.overview || business.whatBusinessDoes}
              </p>

              {selectedCompany.sectorQuickTip && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${isDarkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-sky-50 border border-sky-200 text-sky-800'}`}>
                  {selectedCompany.sectorQuickTip}
                </div>
              )}
            </div>

            {/* Side-by-Side Cards: Scores Snapshot Radar Chart & Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Scores Snapshot Radar Chart */}
              <div className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'
              }`}>
                <h3 className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Scores Snapshot
                </h3>
                
                <div className="py-2 flex items-center justify-center flex-1">
                  <RadarChart
                    scores={fundamental.scoresSnapshot || {
                      growth: 82,
                      profitability: 88,
                      efficiency: 76,
                      financialHealth: 92,
                      valuation: 74,
                      quality: 85
                    }}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              {/* Card 2: Key Highlights with View Full Analysis CTA */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'
              }`}>
                <div>
                  <h3 className={`font-bold text-sm mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Key Highlights
                  </h3>

                  <ul className="space-y-3 text-xs font-semibold">
                    {(selectedCompany.keyHighlights || [
                      'Strong brand with market leadership',
                      'Consistent revenue and profit growth',
                      'High ROE and ROCE',
                      'Low debt and robust balance sheet',
                      'Attractive valuations with MOS > 20%'
                    ]).map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('fundamentals')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xs ${
                    isDarkMode
                      ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30'
                      : 'bg-sky-100/90 hover:bg-sky-200 text-sky-900 border border-sky-300/70'
                  }`}
                >
                  <span>View Full Analysis</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: BUSINESS ANALYSIS SCREEN */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
            <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>What the Business Does</h3>
            <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {business.whatBusinessDoes || selectedCompany.overview}
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
              <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                <span className={`text-[10px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Products / Services</span>
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{business.productsServices}</p>
              </div>

              <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                <span className={`text-[10px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Customer</span>
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{business.customer}</p>
              </div>

              <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                <span className={`text-[10px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Problem Solved</span>
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{business.problemSolved}</p>
              </div>
            </div>

            {/* How the Business Makes Money */}
            <div className={`pt-4 border-t space-y-4 ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
              <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>How the Business Makes Money</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(business.howBusinessMakesMoney || []).map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center space-y-2 ${
                    isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-sky-600/10 text-sky-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Type */}
            <div className={`pt-4 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
              <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Business Type</span>
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 font-bold text-xs border border-emerald-500/20">
                {selectedCompany.businessType}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: SECTOR ANALYSIS SCREEN */}
      {activeTab === 'sector' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
            {/* Sector Classification */}
            <div className="space-y-3">
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Sector Classification</h3>
              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{sector.sectorType || selectedCompany.sector}</div>
                  <p className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{sector.classificationDescription || 'Consistent demand, not highly affected by economic cycles.'}</p>
                </div>
              </div>
            </div>

            {/* Market Condition Allocation */}
            <div className={`space-y-3 pt-4 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
              <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Market Condition Allocation (Reference)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase font-bold ${
                      isDarkMode ? 'border-slate-800 text-slate-400' : 'border-sky-100 text-slate-500'
                    }`}>
                      <th className="pb-2">Market Condition</th>
                      <th className="pb-2">Cyclical</th>
                      <th className="pb-2">Growth</th>
                      <th className="pb-2">Defensive</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-semibold ${
                    isDarkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-sky-100 text-slate-700'
                  }`}>
                    <tr><td className="py-2.5">Bull Market</td><td>40%</td><td>30%</td><td>30%</td></tr>
                    <tr><td className="py-2.5">Bear Market</td><td>10%</td><td>30%</td><td>60%</td></tr>
                    <tr><td className="py-2.5">Normal Market</td><td>30%</td><td>30%</td><td>40%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sector Peers */}
            <div className={`space-y-3 pt-4 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
              <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Peers</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase font-bold ${
                      isDarkMode ? 'border-slate-800 text-slate-400' : 'border-sky-100 text-slate-500'
                    }`}>
                      <th className="pb-2">Company</th>
                      <th className="pb-2">M.Cap (Cr.)</th>
                      <th className="pb-2">P/E</th>
                      <th className="pb-2">ROE (%)</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-semibold ${
                    isDarkMode ? 'divide-slate-800/60' : 'divide-sky-100'
                  }`}>
                    {(sector.peers || []).map((peer, idx) => (
                      <tr key={idx} className={peer.active ? (isDarkMode ? 'text-emerald-400 font-bold' : 'text-emerald-600 font-bold') : (isDarkMode ? 'text-slate-300' : 'text-slate-700')}>
                        <td className="py-2.5">{peer.company}</td>
                        <td className="py-2.5">₹{peer.mcap}</td>
                        <td className="py-2.5">{peer.pe}</td>
                        <td className="py-2.5">{peer.roe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 4: FUNDAMENTAL ANALYSIS SCREEN */}
      {activeTab === 'fundamentals' && (
        <div className="space-y-6">
          {isAnalyzing ? (
            <div className={`p-10 rounded-2xl border text-center max-w-xl mx-auto space-y-5 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-500 border border-blue-500/20 flex items-center justify-center mx-auto">
                <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
              </div>
              
              <div className="space-y-2">
                <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Fetching & Analyzing Fundamentals...
                </h3>
                <p className="text-xs text-blue-400 font-bold animate-pulse">
                  {analysisStep}
                </p>
              </div>

              {/* Dynamic Animated Progress Bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 font-medium">
                Running 10-parameter gatekeeper verification & Stage 2 trend audit for {selectedCompany.name}
              </p>
            </div>
          ) : !hasRunAnalysis ? (
            <div className={`p-8 rounded-2xl border text-center max-w-2xl mx-auto space-y-4 ${
              isDarkMode ? 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-500 border border-blue-500/20 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Fundamental Analysis & Screening Audit
                </h3>
                <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
                  Execute Stage 1 gatekeeper screening (10 key financial metrics) and Stage 2 deep trend audit for <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{selectedCompany.name}</strong>.
                </p>
              </div>

              <button
                onClick={handleRunAnalysis}
                className="px-6 py-3 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyse Fundamental</span>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fundamental Gatekeeper Audit</h3>
              
              {/* 3 Overview Cards at top of Fundamental screen */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Card 1: Stage 1 Score */}
                <div className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${
                  isDarkMode ? 'bg-[#090f1d] border-slate-800/80' : 'bg-[#f4f9ff] border-sky-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Stage 1 Score
                    </span>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {fundamental.stage1Score || 8.5} / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {fundamental.stage1Verdict || 'Excellent'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      Quick Screening
                    </span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden mt-0.5 ${isDarkMode ? 'bg-slate-800/80' : 'bg-sky-100'}`}>
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((fundamental.stage1Score || 8.5) / 10) * 100}%` }} />
                  </div>
                </div>

                {/* Card 2: Stage 2 Score */}
                <div className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${
                  isDarkMode ? 'bg-[#090f1d] border-slate-800/80' : 'bg-[#f4f9ff] border-sky-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Stage 2 Score
                    </span>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {fundamental.stage2Score || 7.6} / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {fundamental.stage2Verdict || 'Good'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isDarkMode ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      Deep Trend
                    </span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden mt-0.5 ${isDarkMode ? 'bg-slate-800/80' : 'bg-sky-100'}`}>
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((fundamental.stage2Score || 7.6) / 10) * 100}%` }} />
                  </div>
                </div>

                {/* Card 3: Overall Combined Audit */}
                <div className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${
                  isDarkMode ? 'bg-[#090f1d] border-slate-800/80' : 'bg-[#f4f9ff] border-sky-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Overall Gatekeeper Audit
                    </span>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {fundamental.totalScore || 8.5} / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Passed Audit
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isDarkMode ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      Passed Gatekeeper
                    </span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden mt-0.5 ${isDarkMode ? 'bg-slate-800/80' : 'bg-sky-100'}`}>
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((fundamental.totalScore || 8.5) / 10) * 100}%` }} />
                  </div>
                </div>

              </div>

              <div className={`flex items-center justify-between border-b pb-2.5 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
                <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {fundSubTab === 'stage1' ? 'Stage 1 — 10-Parameter Gatekeeper Screening' : 'Stage 2 — Deep Trend & Financial Quality Audit'}
                </h3>
                
                {fundSubTab === 'stage2' && (
                  <button
                    onClick={() => setFundSubTab('stage1')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isDarkMode
                        ? 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
                        : 'text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Stage 1 Screening</span>
                  </button>
                )}
              </div>

            {/* STAGE 1 VIEW */}
            {fundSubTab === 'stage1' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className={`border-b text-[10px] uppercase font-extrabold ${
                        isDarkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
                      }`}>
                        <th className="pb-2">Metric</th>
                        <th className="pb-2">Value</th>
                        <th className="pb-2">Score (0-1)</th>
                        <th className="pb-2">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-semibold ${
                      isDarkMode ? 'divide-slate-800/50 text-slate-200' : 'divide-slate-200 text-slate-700'
                    }`}>
                      {(fundamental.scorecard || []).map((row, idx) => (
                        <tr key={idx} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}`}>
                          <td className={`py-1.5 font-bold text-[11px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{row.metric}</td>
                          <td className={`py-1.5 font-extrabold text-[11px] ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{row.value}</td>
                          <td className="py-1.5 font-black text-[11px]">{row.score}</td>
                          <td className="py-1.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.remarks === 'Strong' || row.remarks === 'Exceptional'
                                ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')
                                : (isDarkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200')
                            }`}>
                              {row.remarks}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                  isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Stage 1 Total Score</span>
                    <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{fundamental.totalScore || 8.5} / 10</span>
                    <span className={`px-2.5 py-0.5 rounded-lg font-black text-[11px] border ${
                      isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {fundamental.stage1Verdict || 'Passed Gatekeeper'}
                    </span>
                  </div>

                  <button
                    onClick={() => setFundSubTab('stage2')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer shadow-2xs ${
                      isDarkMode
                        ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30'
                        : 'bg-sky-100/90 hover:bg-sky-200 text-sky-900 border border-sky-300/70'
                    }`}
                  >
                    <span>Proceed to Deep Trend Analysis</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-sky-600" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2 VIEW */}
            {fundSubTab === 'stage2' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stage 2 Key Pillars */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      5-Year Historical Performance Pillars
                    </h4>
                    <div className="space-y-2">
                      <div className={`p-3 rounded-xl border flex justify-between items-center text-xs ${
                        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                      }`}>
                        <span className={isDarkMode ? 'text-slate-400 font-semibold' : 'text-slate-600 font-semibold'}>Sales Growth 5Y CAGR</span>
                        <span className="font-bold text-emerald-500">14.2%</span>
                      </div>
                      <div className={`p-3 rounded-xl border flex justify-between items-center text-xs ${
                        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                      }`}>
                        <span className={isDarkMode ? 'text-slate-400 font-semibold' : 'text-slate-600 font-semibold'}>Profit Growth 5Y CAGR</span>
                        <span className="font-bold text-emerald-500">18.6%</span>
                      </div>
                      <div className={`p-3 rounded-xl border flex justify-between items-center text-xs ${
                        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                      }`}>
                        <span className={isDarkMode ? 'text-slate-400 font-semibold' : 'text-slate-600 font-semibold'}>Average ROE (5-Year)</span>
                        <span className="font-bold text-sky-600">22.4%</span>
                      </div>
                      <div className={`p-3 rounded-xl border flex justify-between items-center text-xs ${
                        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                      }`}>
                        <span className={isDarkMode ? 'text-slate-400 font-semibold' : 'text-slate-600 font-semibold'}>Free Cash Flow Conversion</span>
                        <span className="font-bold text-emerald-500">89.5%</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage 2 Verdict Summary */}
                  <div className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border-blue-500/20'
                      : 'bg-gradient-to-br from-sky-100/70 via-cyan-50/50 to-white border-sky-200 shadow-xs'
                  }`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-sky-600 tracking-wider">Deep Trend Verdict</span>
                      <h4 className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>High Quality Growth Compounder</h4>
                      <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {selectedCompany.name} demonstrates exceptional capital allocation consistency with expanding return ratios and zero debt strain over the last 5 financial cycles.
                      </p>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-sky-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Stage 2 Audit Score</span>
                        <span className="text-lg font-black text-emerald-500">{fundamental.stage2Score || 7.6} / 10</span>
                      </div>
                      <button
                        onClick={() => setFundSubTab('stage1')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        Review Stage 1
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )}

      {/* 6. TAB 7: VALUATION SCREEN */}
      {activeTab === 'valuation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: P/E Ratio */}
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>P/E Ratio</h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Company P/E</span>
                  <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{valuation.peRatio?.companyPe}</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Industry P/E</span>
                  <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{valuation.peRatio?.industryPe}</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Fair P/E (2x)</span>
                  <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{valuation.peRatio?.fairPe}</span>
                </div>
              </div>

              <div className={`pt-3 border-t flex items-center justify-between text-xs ${isDarkMode ? 'border-slate-800' : 'border-sky-100'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fair Price (Based on EPS ₹{valuation.peRatio?.eps})</span>
                <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{valuation.peRatio?.fairPrice}</span>
              </div>
            </div>

            {/* Card 2: PEG Ratio */}
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>PEG Ratio</h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>P/E</span>
                  <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{valuation.pegRatio?.pe}</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Earnings Growth</span>
                  <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{valuation.pegRatio?.earningsGrowth}%</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>PEG</span>
                  <span className={`text-sm font-bold mt-1 block ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>{valuation.pegRatio?.peg}</span>
                </div>
              </div>

              <div className={`pt-3 border-t text-center ${isDarkMode ? 'border-slate-800' : 'border-sky-100'}`}>
                <span className={`px-3 py-1 rounded-md font-bold text-xs border ${
                  isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {valuation.pegRatio?.verdict}
                </span>
              </div>
            </div>

            {/* Card 3: Margin of Safety */}
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Margin of Safety</h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Fair Value</span>
                  <span className={`text-xs font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{valuation.marginOfSafety?.fairValue}</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Current Price</span>
                  <span className={`text-xs font-bold mt-1 block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{valuation.marginOfSafety?.currentPrice}</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[9px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>MOS</span>
                  <span className={`text-xs font-bold mt-1 block ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>{valuation.marginOfSafety?.mos}%</span>
                </div>
              </div>

              <div className={`pt-3 border-t text-center ${isDarkMode ? 'border-slate-800' : 'border-sky-100'}`}>
                <span className={`px-3 py-1 rounded-md font-bold text-xs border ${
                  isDarkMode ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {valuation.marginOfSafety?.verdict}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Default View for other sub-tabs */}
      {!['overview', 'business', 'sector', 'fundamentals', 'valuation'].includes(activeTab) && (
        <div className={`p-12 rounded-2xl border text-center space-y-3 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {tabs.find(t => t.id === activeTab)?.label} Module
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Analysis section is structured and ready. Select Overview, Business, Sector, Fundamentals, or Valuation tabs to inspect detailed reference screens.
          </p>
        </div>
      )}
    </div>
  );
}
