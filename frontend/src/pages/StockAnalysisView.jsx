import React, { useState, useEffect } from 'react';
import RadarChart from '../components/ui/RadarChart';
import { PDF_COMPANIES } from '../data/mockData';
import {
  ArrowLeft,
  Plus,
  Download,
  ShieldCheck,
  Building,
  DollarSign,
  Crown,
  Sparkles,
  Search,
  Check,
  CheckCircle2,
  BarChart3,
  Loader2,
  Info,
  PaintRoller,
  Factory,
  Globe,
  Home,
  Users,
  FileText,
  LineChart,
  Scale,
  FileSpreadsheet,
  PieChart,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function StockAnalysisView({ company, onBack, isDarkMode = true, onSelectStock }) {
  const [selectedCompany, setSelectedCompany] = useState(company || null);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('stock_analysis_active_tab') || 'overview';
  });
  const [fundSubTab, setFundSubTab] = useState('stage1');
  const [bsSubTab, setBsSubTab] = useState('business');
  const [userMoatAnswers, setUserMoatAnswers] = useState({});
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

  const defaultBusinessModel = {
    valueCreation: 'High-margin decorative paint formulations with extensive tinting machine installation at 70,000+ retail dealerships across India.',
    valueCapture: 'Direct dealer pricing power with daily delivery logistics, eliminating wholesale middleman margin leakage.',
    scalability: 'High',
    scalabilityDesc: 'Low incremental capital required per new dealer tinting machine; manufacturing capacity scales linearly.',
    operatingLeverage: 'Moderate-High',
    pricingPower: 'Strong — able to pass raw material (crude derivative) cost hikes to end consumers within 30-60 days.'
  };

  const defaultMoatAnalysis = {
    moatRating: 'Wide Moat',
    primaryMoatType: 'Brand Moat & Distribution Network',
    moatSources: [
      { type: 'Brand Equity', desc: 'Household brand recognition in India with top consumer mindshare and premium positioning.' },
      { type: 'Distribution Network', desc: '70,000+ dealers equipped with proprietary color tinting machines creating high entry barrier.' },
      { type: 'Cost Advantage', desc: 'Massive raw material procurement scale and supply chain logistics (3-4 deliveries/day directly to dealers).' }
    ],
    moatTests: [
      { test: 'Does the company have a recognized brand with pricing power?', answer: 'Yes', explanation: 'Holds dominant market share and routinely raises prices when raw material costs spike.' },
      { test: 'Are there high switching costs or network effects for customers/dealers?', answer: 'Yes', explanation: 'Dealers install tinting machines requiring floor space & capital, making switching disincentivized.' },
      { test: 'Does the company possess cost advantage over smaller competitors?', answer: 'Yes', explanation: 'Massive procurement scale and supply chain logistics lower per-unit distribution costs.' },
      { test: 'Is the business protected by regulatory barriers or patents?', answer: 'Unclear', explanation: 'Standard environmental compliance applies; primary advantage is distribution scale rather than patents.' },
      { test: 'Is the MOAT sustainable for the next 10+ years?', answer: 'Yes', explanation: 'Distribution footprint, brand equity, and expansion into home décor solidify long-term competitive advantage.' }
    ],
    sustainabilityVerdict: 'Strong & Expanding Moat'
  };

  const bModel = selectedCompany.businessModel || defaultBusinessModel;
  const moat = selectedCompany.moatAnalysis || defaultMoatAnalysis;

  const isBusinessSectorActive = ['business-sector', 'business', 'sector', 'business-model', 'moat'].includes(activeTab);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'business-sector', label: 'Business Analysis' },
{ id: 'fundamentals', label: 'Fundamentals' },
    { id: 'valuation', label: 'Valuation' },
    { id: 'entry-exit', label: 'Entry/Exit' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'psychology', label: 'Psychology' },
    { id: 'risk', label: 'Risk' }
  ];

  const logoText = (selectedCompany.symbol || 'AP').substring(0, 2).toUpperCase();

  return (
    <div className="space-y-2.5">
      {/* 1. Header Bar with Back to Selector & Actions */}
      <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          
          {/* Left: Back Button & Stock Symbol Logo Tile & Stock Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setSelectedCompany(null);
                if (onSelectStock) onSelectStock(null);
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Change Stock"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            {/* Stock Symbol Initials Box */}
            <div className="w-8 h-8 rounded-lg bg-blue-600 font-bold text-white text-xs flex items-center justify-center shadow-xs shrink-0">
              {logoText}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedCompany.name}</h1>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{selectedCompany.symbol}</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Sector: {selectedCompany.sector}</p>
            </div>
          </div>

          {/* Right: Price with Sparkline & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    ₹{selectedCompany.currentPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`text-[11px] font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {isPositive ? '+' : ''}{selectedCompany.priceChange || '24.35'} ({isPositive ? '+' : ''}{selectedCompany.priceChangePercent || '0.77'}%)
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium text-right sm:text-left">
                  Market Cap: ₹{selectedCompany.marketCapValue?.toLocaleString('en-IN') || '3,01,234'} Cr.
                </p>
              </div>

              {/* Green Sparkline Curve */}
              <div className="w-12 h-6 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 60 25" className="w-full h-full overflow-visible">
                  <path
                    d="M 2 20 Q 15 15, 25 18 T 45 8 T 58 4"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <Plus className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Watchlist</span>
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-[0.98]">
                <Download className="w-3 h-3" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Sub-Tabs */}
        <div className={`flex items-center gap-5 overflow-x-auto pt-1.5 border-t scrollbar-hide ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200/80'}`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === 'business-sector' && isBusinessSectorActive);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-1 text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer relative ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB 1: OVERVIEW SCREEN */}
      {activeTab === 'overview' && (
        <div className="space-y-2.5">
          
          {/* ROW 1: 3 Cards Grid (Company Overview, Business Snapshot Radar, Key Highlights) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
            
            {/* Card 1: Company Overview */}
            <div className={`lg:col-span-5 p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Company Overview
                  </h3>
                </div>
                
                <p className={`text-[11px] leading-relaxed font-normal line-clamp-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedCompany.overview || 'Asian Paints is India’s largest paint company and a leading player in the global decorative paints industry. Operating across 15 countries with 27 paint manufacturing facilities worldwide.'}
                </p>
              </div>

              {/* Defensive Tip Blue Callout Box */}
              <div className={`p-2 rounded-lg text-[11px] font-medium flex items-start gap-2 ${
                isDarkMode 
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300' 
                  : 'bg-sky-50/90 border border-sky-200/80 text-sky-900'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {selectedCompany.sectorQuickTip || 'Defensive Tip: Consistent demand, brand moat & pricing power insulate against raw material crude volatility.'}
                </span>
              </div>
            </div>

            {/* Card 2: Business Snapshot Radar Chart */}
            <div className={`lg:col-span-3 p-3.5 rounded-xl border flex flex-col justify-between space-y-1 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
            }`}>
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Business Snapshot
              </h3>
              
              <div className="py-0 flex items-center justify-center flex-1">
                <RadarChart
                  scores={selectedCompany.scoresSnapshot || {
                    growth: 82,
                    profitability: 86,
                    valuation: 68,
                    moat: 85,
                    quality: 81
                  }}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>

            {/* Card 3: Key Highlights */}
            <div className={`lg:col-span-4 p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
            }`}>
              <div>
                <h3 className={`font-bold text-xs mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Key Highlights
                </h3>

                <ul className="space-y-1.5 text-[11px] font-medium">
                  {(selectedCompany.keyHighlights || [
                    'Strong brand with market leadership in decorative paints',
                    'Consistent revenue and profit growth over 10+ years',
                    'High ROE (28.6%) and ROCE (33.4%) metrics',
                    'Wide distribution network with strong dealer relationships',
                    'Healthy balance sheet with low debt levels'
                  ]).map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </div>
                      <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* ROW 2: 2 Cards Grid (Business Segments & Financial Highlights FY24) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
            
            {/* Card 1: Business Segments */}
            <div className={`lg:col-span-5 p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
            }`}>
              <div>
                <h3 className={`font-bold text-xs mb-2.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Business Segments
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className={`p-2 rounded-lg border flex flex-col items-start justify-between space-y-2 ${
                    isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/70 border-slate-200/60'
                  }`}>
                    <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <PaintRoller className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Decorative Paints</div>
                      <div className="text-[9px] text-slate-400 font-medium">Revenue Share</div>
                      <div className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">77.3%</div>
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg border flex flex-col items-start justify-between space-y-2 ${
                    isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/70 border-slate-200/60'
                  }`}>
                    <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Factory className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Industrial Coatings</div>
                      <div className="text-[9px] text-slate-400 font-medium">Revenue Share</div>
                      <div className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">10.6%</div>
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg border flex flex-col items-start justify-between space-y-2 ${
                    isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/70 border-slate-200/60'
                  }`}>
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>International Business</div>
                      <div className="text-[9px] text-slate-400 font-medium">Revenue Share</div>
                      <div className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">6.6%</div>
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg border flex flex-col items-start justify-between space-y-2 ${
                    isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/70 border-slate-200/60'
                  }`}>
                    <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Home Décor</div>
                      <div className="text-[9px] text-slate-400 font-medium">Revenue Share</div>
                      <div className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">5.3%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-slate-400 font-medium pt-1">
                * Revenue share as of FY24
              </div>
            </div>

            {/* Card 2: Financial Highlights (FY24) Bar Charts */}
            <div className={`lg:col-span-7 p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
            }`}>
              <div>
                <h3 className={`font-bold text-xs mb-2.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Financial Highlights (FY24)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Revenue */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Revenue</span>
                    <div className={`text-[11px] font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹34,876 Cr.</div>
                    <div className="text-[9px] font-bold text-emerald-500">▲ 12.7% YoY</div>

                    <div className="flex items-end gap-1 h-10 pt-1">
                      <div className="flex-1 bg-blue-500/40 rounded-t h-[45%]" title="FY20" />
                      <div className="flex-1 bg-blue-500/60 rounded-t h-[60%]" title="FY21" />
                      <div className="flex-1 bg-blue-500/80 rounded-t h-[75%]" title="FY22" />
                      <div className="flex-1 bg-blue-500 rounded-t h-[90%]" title="FY23" />
                      <div className="flex-1 bg-blue-600 rounded-t h-[100%]" title="FY24" />
                    </div>
                    <div className="flex justify-between text-[7.5px] font-bold text-slate-400 pt-0.5">
                      <span>FY20</span><span>FY21</span><span>FY22</span><span>FY23</span><span>FY24</span>
                    </div>
                  </div>

                  {/* Net Profit */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Net Profit</span>
                    <div className={`text-[11px] font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹5,637 Cr.</div>
                    <div className="text-[9px] font-bold text-emerald-500">▲ 15.3% YoY</div>

                    <div className="flex items-end gap-1 h-10 pt-1">
                      <div className="flex-1 bg-purple-500/40 rounded-t h-[40%]" title="FY20" />
                      <div className="flex-1 bg-purple-500/60 rounded-t h-[55%]" title="FY21" />
                      <div className="flex-1 bg-purple-500/80 rounded-t h-[70%]" title="FY22" />
                      <div className="flex-1 bg-purple-500 rounded-t h-[85%]" title="FY23" />
                      <div className="flex-1 bg-purple-600 rounded-t h-[100%]" title="FY24" />
                    </div>
                    <div className="flex justify-between text-[7.5px] font-bold text-slate-400 pt-0.5">
                      <span>FY20</span><span>FY21</span><span>FY22</span><span>FY23</span><span>FY24</span>
                    </div>
                  </div>

                  {/* OPM */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">OPM</span>
                    <div className={`text-[11px] font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>18.7%</div>
                    <div className="text-[9px] font-bold text-emerald-500">▲ 1.2% YoY</div>

                    <div className="flex items-end gap-1 h-10 pt-1">
                      <div className="flex-1 bg-teal-500/40 rounded-t h-[65%]" title="FY20" />
                      <div className="flex-1 bg-teal-500/60 rounded-t h-[70%]" title="FY21" />
                      <div className="flex-1 bg-teal-500/80 rounded-t h-[80%]" title="FY22" />
                      <div className="flex-1 bg-teal-500 rounded-t h-[90%]" title="FY23" />
                      <div className="flex-1 bg-teal-600 rounded-t h-[100%]" title="FY24" />
                    </div>
                    <div className="flex justify-between text-[7.5px] font-bold text-slate-400 pt-0.5">
                      <span>FY20</span><span>FY21</span><span>FY22</span><span>FY23</span><span>FY24</span>
                    </div>
                  </div>

                  {/* ROE */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">ROE</span>
                    <div className={`text-[11px] font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>28.6%</div>
                    <div className="text-[9px] font-bold text-emerald-500">▲ 2.1% YoY</div>

                    <div className="flex items-end gap-1 h-10 pt-1">
                      <div className="flex-1 bg-orange-500/40 rounded-t h-[60%]" title="FY20" />
                      <div className="flex-1 bg-orange-500/60 rounded-t h-[72%]" title="FY21" />
                      <div className="flex-1 bg-orange-500/80 rounded-t h-[80%]" title="FY22" />
                      <div className="flex-1 bg-orange-500 rounded-t h-[92%]" title="FY23" />
                      <div className="flex-1 bg-orange-600 rounded-t h-[100%]" title="FY24" />
                    </div>
                    <div className="flex justify-between text-[7.5px] font-bold text-slate-400 pt-0.5">
                      <span>FY20</span><span>FY21</span><span>FY22</span><span>FY23</span><span>FY24</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleTabChange('fundamentals')}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Detailed Financials</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* ROW 3: Quick Links */}
          <div className={`p-3 rounded-xl border space-y-1.5 ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
          }`}>
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Quick Links
            </h3>

            <div className="flex flex-wrap items-center gap-1.5">
              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <Users className="w-3 h-3 text-blue-500" />
                <span>Peer Comparison</span>
              </button>

              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <FileText className="w-3 h-3 text-indigo-500" />
                <span>Latest Results</span>
              </button>

              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <LineChart className="w-3 h-3 text-emerald-500" />
                <span>Quarterly Performance</span>
              </button>

              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <DollarSign className="w-3 h-3 text-amber-500" />
                <span>Cash Flow</span>
              </button>

              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <Scale className="w-3 h-3 text-purple-500" />
                <span>Balance Sheet</span>
              </button>

              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <FileSpreadsheet className="w-3 h-3 text-sky-500" />
                <span>Annual Reports</span>
              </button>

              <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <PieChart className="w-3 h-3 text-rose-500" />
                <span>Shareholding Pattern</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 3. CONSOLIDATED MENU TAB: BUSINESS, SECTOR, BUSINESS MODEL & MOAT ANALYSIS */}
      {isBusinessSectorActive && (
        <div className="space-y-5">
          {/* Top Sub-Navigation Filter Pills inside Business, Sector & MOAT Menu */}
          <div className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center justify-center font-bold">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Business Analysis (Business, Sector, Model & MOAT)
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Integrated qualitative engine for value creation, industry positioning & competitive advantage
                </p>
              </div>
            </div>

            {/* Quick Sub-Filter Pills */}
            <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/80 border-slate-200'}`}>
              {[
                { id: 'business', label: 'Business Profile' },
                { id: 'sector', label: 'Sector & Peers' },
                { id: 'business-model', label: 'Business Model' },
                { id: 'moat', label: 'MOAT Analysis' }
              ].map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => setBsSubTab(subItem.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    bsSubTab === subItem.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : isDarkMode
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. BUSINESS PROFILE SECTION */}
          {(bsSubTab === 'all' || bsSubTab === 'business') && (
            <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1. Business Overview & Operations</h3>
                </div>
                <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 font-bold text-xs border border-emerald-500/20">
                  {selectedCompany.businessType || business.businessType || 'Product Based'}
                </span>
              </div>

              <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {business.whatBusinessDoes || selectedCompany.overview}
              </p>

              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
                <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[10px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Products / Services</span>
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{business.productsServices || 'Core commercial offerings'}</p>
                </div>

                <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[10px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target Customer</span>
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{business.customer || 'Enterprise & retail consumers'}</p>
                </div>

                <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className={`text-[10px] font-bold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Problem Solved</span>
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{business.problemSolved || 'Core market problem resolution'}</p>
                </div>
              </div>

              {/* How the Business Makes Money */}
              <div className={`pt-4 border-t space-y-4 ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Revenue Generation Streams</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(business.howBusinessMakesMoney || [
                    { label: 'Core Product Revenue', icon: 'DollarSign' },
                    { label: 'Premium Margin Line', icon: 'Crown' },
                    { label: 'Distribution Channel', icon: 'Network' },
                    { label: 'Value Added Services', icon: 'Package' }
                  ]).map((item, idx) => (
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
            </div>
          )}

          {/* 2. SECTOR ANALYSIS SECTION */}
          {(bsSubTab === 'all' || bsSubTab === 'sector') && (
            <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>2. Sector Dynamics & Peer Benchmarking</h3>
              </div>

              {/* Sector Classification */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {sector.sectorType || selectedCompany.sector} Sector ({selectedCompany.industry || 'Industry'})
                    </div>
                    <p className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {sector.classificationDescription || 'Consistent demand profile with strong industry tailwinds.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Market Condition Allocation Table */}
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
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sector Peer Comparison</h4>
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
                      {(sector.peers || [
                        { company: selectedCompany.name, mcap: selectedCompany.marketCapValue?.toLocaleString('en-IN') || '3,01,234', pe: selectedCompany.keyMetrics?.pe || '48.2', roe: `${selectedCompany.keyMetrics?.roe || 28.6}%`, active: true },
                        { company: 'Competitor A', mcap: '85,412', pe: '42.1', roe: '24.3%', active: false },
                        { company: 'Competitor B', mcap: '57,856', pe: '38.6', roe: '21.7%', active: false }
                      ]).map((peer, idx) => (
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
          )}

          {/* 3. BUSINESS MODEL SECTION */}
          {(bsSubTab === 'all' || bsSubTab === 'business-model') && (
            <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>3. Business Model & Value Engine</h3>
                </div>
                <span className="px-3 py-1 rounded-md bg-sky-500/10 text-sky-500 font-bold text-xs border border-sky-500/20">
                  Scalability: {bModel.scalability || 'High'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border space-y-2 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-sky-500 block">Value Creation Strategy</span>
                  <p className={`text-xs leading-relaxed font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {bModel.valueCreation}
                  </p>
                </div>

                <div className={`p-4 rounded-xl border space-y-2 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-emerald-500 block">Value Capture Mechanism</span>
                  <p className={`text-xs leading-relaxed font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {bModel.valueCapture}
                  </p>
                </div>
              </div>

              {/* Business Model Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Scalability Rating</span>
                  <span className="text-sm font-extrabold text-emerald-500 block">{bModel.scalability}</span>
                  <p className="text-[11px] text-slate-400">{bModel.scalabilityDesc}</p>
                </div>

                <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Operating Leverage</span>
                  <span className="text-sm font-extrabold text-sky-400 block">{bModel.operatingLeverage}</span>
                  <p className="text-[11px] text-slate-400">Fixed overheads dilute as volume expands.</p>
                </div>

                <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Pricing Power</span>
                  <span className="text-sm font-extrabold text-amber-400 block">{bModel.pricingPower}</span>
                  <p className="text-[11px] text-slate-400">Protects margins during raw material cost spikes.</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. MOAT ANALYSIS SECTION */}
          {(bsSubTab === 'all' || bsSubTab === 'moat') && (
            <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-sky-100 shadow-xs'}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>4. Economic MOAT & Competitive Advantage</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-emerald-500/15 text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
                    {moat.moatRating || 'Wide Moat'}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/20">
                    {moat.sustainabilityVerdict || 'Sustainable Moat'}
                  </span>
                </div>
              </div>

              {/* Primary Moat Pillar */}
              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDarkMode ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <Crown className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 block">Primary Moat Classification</span>
                  <h4 className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{moat.primaryMoatType}</h4>
                </div>
              </div>

              {/* Moat Sources Grid */}
              <div className="space-y-3">
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Moat Pillars & Entry Barriers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(moat.moatSources || []).map((source, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border space-y-1.5 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#f4f9ff] border-sky-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <h5 className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{source.type}</h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{source.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Qualitative Moat Test Questions */}
              <div className={`pt-4 border-t space-y-4 ${isDarkMode ? 'border-slate-800/60' : 'border-sky-100'}`}>
                <div className="flex items-center justify-between">
                  <h4 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>5-Parameter Moat Assessment Audit</h4>
                  <span className="text-[11px] text-slate-400 font-medium">Click answer pill to toggle qualitative assessment</span>
                </div>

                <div className="space-y-3">
                  {(moat.moatTests || []).map((testItem, idx) => {
                    const currentAnswer = userMoatAnswers[idx] || testItem.answer;

                    return (
                      <div key={idx} className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                              Q{idx + 1}
                            </span>
                            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                              {testItem.test}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 pl-7">{testItem.explanation}</p>
                        </div>

                        {/* Interactive Answer Switcher */}
                        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                          {['Yes', 'No', 'Unclear'].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setUserMoatAnswers(prev => ({ ...prev, [idx]: opt }))}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                                currentAnswer === opt
                                  ? opt === 'Yes'
                                    ? 'bg-emerald-500 text-white shadow-xs'
                                    : opt === 'No'
                                      ? 'bg-rose-500 text-white shadow-xs'
                                      : 'bg-amber-500 text-white shadow-xs'
                                  : isDarkMode
                                    ? 'bg-slate-800 text-slate-400 hover:text-white'
                                    : 'bg-slate-200 text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
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
      {!['overview', 'business-sector', 'business', 'sector', 'business-model', 'moat', 'fundamentals', 'valuation'].includes(activeTab) && (
        <div className={`p-12 rounded-2xl border text-center space-y-3 ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {tabs.find(t => t.id === activeTab)?.label} Module
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Analysis section is structured and ready. Select Overview, Business Analysis, Fundamentals, or Valuation tabs to inspect detailed screens.
          </p>
        </div>
      )}
    </div>
  );
}
