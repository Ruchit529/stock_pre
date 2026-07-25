import React, { useState, useEffect } from 'react';
import { fetchCompanyData, fetchPeers } from '../services/api';
import {
  TrendingUp, TrendingDown, Info, FileText, Check,
  AlertTriangle, Award, Percent, BarChart2, ShieldCheck, Layers, ArrowRight,
  Building2, Compass, Users, PieChart, Briefcase, BookOpen, Loader2
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

export default function Company({ symbol, activeSubPage, navigate, isDarkMode = true }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [peers, setPeers] = useState([]);
  const [peersLoading, setPeersLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setCompany(null);
    setLoading(true);
    setError(null);

    fetchCompanyData(symbol).then(data => {
      if (isMounted) {
        if (data && data.symbol) {
          setCompany(data);
        } else {
          setError(`Unable to load ticker '${symbol}'`);
        }
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) {
        setError(`Stock ticker '${symbol}' was not found. Please check the symbol and try again.`);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [symbol]);

  // Fetch sector peers when company data is available
  const companySector = company ? company.sector : null;
  useEffect(() => {
    if (!companySector) return;
    setPeersLoading(true);
    fetchPeers(companySector).then(data => {
      setPeers(data || []);
      setPeersLoading(false);
    }).catch(() => setPeersLoading(false));
  }, [companySector]);

  const isLoss = company ? (company.priceChange < 0) : false;

  const menuItems = [
    { id: 'overview', label: '1. Overview & Summary', shortLabel: 'Overview', icon: FileText },
    { id: 'business-model', label: '2. Business Model', shortLabel: 'Business Model', icon: Layers },
    { id: 'industry', label: '3. Sector Playbook', shortLabel: 'Sector', icon: Compass },
    { id: 'scorecard', label: '4. Overall Scorecard', shortLabel: 'Scorecard', icon: Award },
    { id: 'deep-trends', label: '5. Deep Trend Audit', shortLabel: 'Deep Trends', icon: BarChart2 },
    { id: 'valuation', label: '6. Valuation & Safety', shortLabel: 'Valuation', icon: Percent },
    { id: 'technical', label: '7. Technical Reference', shortLabel: 'Technical', icon: BookOpen }
  ];

  if (loading && !company) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-12 text-center bg-[#131926]/80 border border-slate-800/80 rounded-3xl space-y-4 shadow-2xl">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
        <h2 className="text-lg font-extrabold text-white">Fetching Live Market Analysis for "{symbol.toUpperCase()}"...</h2>
        <p className="text-xs text-slate-400">Pulling financial statements, ratios, and scorecards live from Python backend.</p>
      </div>
    );
  }

  if (error && !company) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-10 text-center bg-[#131926]/90 border border-rose-900/50 rounded-3xl space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-800 flex items-center justify-center mx-auto text-rose-400">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">Stock Ticker Not Found</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto font-medium">{error}</p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-blue-600/30"
          >
            &larr; Return to Home Search
          </button>
        </div>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className={`max-w-6xl mx-auto flex flex-col md:flex-row gap-5 animate-fade-in text-left ${
      isDarkMode ? 'text-white' : 'text-slate-900'
    }`}>
      {/* Left Sidebar for Stock Analysis Sub-Pages */}
      <aside className="w-full md:w-60 lg:w-64 flex-shrink-0">
        <div className={`sticky top-20 p-3.5 rounded-2xl border shadow-lg space-y-3.5 ${
          isDarkMode ? 'bg-[#131926]/90 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}>
          {/* Active Company Quick Card */}
          <div className={`p-3 rounded-2xl border space-y-1.5 ${
            isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-xs px-2 py-0.5 rounded border ${
                  isDarkMode ? 'text-blue-400 bg-blue-950/60 border-blue-900/60' : 'text-blue-600 bg-blue-50 border-blue-200'
                }`}>
                  {company.symbol}
                </span>
                {loading && <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isLoss
                ? isDarkMode ? 'bg-rose-950/40 border-rose-900/50 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'
                : isDarkMode ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                {isLoss ? '' : '+'}{company.priceChangePercent}%
              </span>
            </div>
            <div>
              <div className={`text-xs font-extrabold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.name}</div>
              <div className={`text-[11px] font-bold mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>₹{company.currentPrice.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Research Playbook Sections */}
          <div className="space-y-1">
            <div className={`px-2 text-[10px] uppercase font-bold tracking-wider flex items-center justify-between ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span>Research Framework</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
              }`}>7 Steps</span>
            </div>
            
            {/* Desktop / Tablet Vertical Menu */}
            <nav className="hidden md:flex flex-col space-y-1 pt-1">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeSubPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate('company', symbol, item.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all duration-200 flex items-center gap-2.5 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-l-4 border-blue-400' 
                        : isDarkMode
                          ? 'text-slate-400 hover:text-white hover:bg-[#1c2438]/60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Horizontal / Scrollable Menu */}
            <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-hide">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeSubPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate('company', symbol, item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : isDarkMode
                          ? 'bg-[#0c111d] text-slate-400 border border-slate-800'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 space-y-5">
        {/* Spotlight Header Banner */}
        <div className={`p-5 rounded-2xl border shadow-lg w-full transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-[#131926]/80 border-slate-800/80 text-white' 
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                {company.symbol.substring(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.name}</h1>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                    isDarkMode ? 'bg-blue-950/40 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {company.symbol}
                  </span>
                </div>
                <div className={`flex items-center gap-2 mt-0.5 text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{company.exchange}</span>
                  <span>•</span>
                  <span>{company.sector}</span>
                  <span>•</span>
                  <span>{company.industry}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ₹{company.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className={`inline-flex items-center gap-1 text-[11px] font-bold mt-0.5 px-2 py-0.5 rounded-full border ${isLoss
                ? isDarkMode ? 'bg-rose-950/40 border-rose-900/50 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'
                : isDarkMode ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}>
                {isLoss ? <TrendingDown className="w-3 h-3 text-rose-500" /> : <TrendingUp className="w-3 h-3 text-emerald-500" />}
                <span>{isLoss ? '' : '+'}{company.priceChange.toFixed(2)} ({isLoss ? '' : '+'}{company.priceChangePercent}%)</span>
              </div>
            </div>
          </div>

          {/* Quick Spot stats */}
          <div className={`pt-3 border-t grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs mt-4 ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-medium text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>P/E Ratio</span>
              <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.keyMetrics.pe}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-medium text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>ROE %</span>
              <span className={`font-extrabold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{company.keyMetrics.roe}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-medium text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Market Cap</span>
              <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{(company.marketCapValue / 100000).toFixed(1)}L Cr</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-medium text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Overall Score</span>
              {(() => {
                const score = company.fundamentalAnalysis?.totalScore ?? 0;
                const maxScore = company.fundamentalAnalysis?.maxPossibleScore ?? 10;
                let verdict = 'Avoid';
                let badgeClass = isDarkMode 
                  ? 'bg-rose-950/60 text-rose-400 border-rose-800/60' 
                  : 'bg-rose-50 text-rose-600 border-rose-200';
                if (score >= 7.0) {
                  verdict = 'Excellent';
                  badgeClass = isDarkMode 
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200';
                } else if (score > 5.0) {
                  verdict = 'Good';
                  badgeClass = isDarkMode 
                    ? 'bg-blue-950/60 text-blue-400 border-blue-800/60' 
                    : 'bg-blue-50 text-blue-700 border-blue-200';
                } else if (score >= 4.0) {
                  verdict = 'Neutral';
                  badgeClass = isDarkMode 
                    ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' 
                    : 'bg-amber-50 text-amber-700 border-amber-200';
                }
                return (
                  <span className={`font-black text-[11px] px-2 py-0.5 rounded-md border ${badgeClass}`}>
                    {score}/{maxScore} • {verdict}
                  </span>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Main Subpage Router Container */}
        <div className="min-h-[450px]">
          {activeSubPage === 'overview' && <OverviewView company={company} navigate={navigate} peers={peers} peersLoading={peersLoading} isDarkMode={isDarkMode} />}
          {activeSubPage === 'business-model' && <BusinessModelView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
          {activeSubPage === 'industry' && <IndustryView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
          {activeSubPage === 'scorecard' && <ScorecardView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
          {activeSubPage === 'deep-trends' && <DeepTrendsView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
          {activeSubPage === 'valuation' && <ValuationView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
          {activeSubPage === 'technical' && <TechnicalView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
          {activeSubPage === 'portfolio-risk' && <PortfolioRiskView company={company} navigate={navigate} isDarkMode={isDarkMode} />}
        </div>
      </main>
    </div>
  );
}

function splitIntoSentences(text) {
  if (!text) return [];
  const abbrevs = [
    'Dr', 'Mr', 'Mrs', 'Ms', 'Prof', 'Sr', 'Jr', 'St',
    'Inc', 'Ltd', 'Co', 'Corp', 'Pvt', 'Bros', 'vs', 'etc',
    'e.g', 'i.e', 'Nos', 'No', 'Vol', 'Dept', 'Est', 'Approx'
  ];

  let processed = text;
  abbrevs.forEach(abbr => {
    const regex = new RegExp(`\\b${abbr}\\.`, 'gi');
    processed = processed.replace(regex, (match) => match.slice(0, -1) + '___DOT___');
  });

  processed = processed.replace(/\b([A-Z])\.\s+/g, '$1___DOT___ ');

  const rawSentences = processed.split(/(?<=[.!?])\s+/);

  return rawSentences
    .map(s => s.replace(/___DOT___/g, '.').trim())
    .filter(s => s.length > 0);
}

/* ==========================================
   1. Overview & Summary View
   ========================================== */
function OverviewView({ company, navigate, peers = [], peersLoading = false, isDarkMode = true }) {
  const biz = company.businessAnalysis;
  const isLoss = company.priceChange < 0;

  const rawOverview = biz.businessOverview || '';
  const sentences = splitIntoSentences(rawOverview);

  return (
    <div className="space-y-5 w-full">
      {/* Company Profile card */}
      <div className={`p-5 rounded-2xl border space-y-3.5 shadow-md transition-colors duration-300 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}>
        <div className={`flex items-center justify-between pb-2.5 border-b ${isDarkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-500" />
            <h2 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Company Summary & Moat Highlights</h2>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
              isDarkMode ? 'bg-blue-950/60 text-blue-400 border-blue-800/60' : 'bg-blue-50 text-blue-600 border-blue-200'
            }`}>
              {company.marketCapType || 'Large Cap'}
            </span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
              isDarkMode ? 'bg-purple-950/60 text-purple-400 border-purple-800/60' : 'bg-purple-50 text-purple-600 border-purple-200'
            }`}>
              {company.sectorAnalysis?.sectorType || 'Cyclical'}
            </span>
          </div>
        </div>

        {/* Scannable Bullet Points instead of huge paragraph */}
        <div className="space-y-2">
          {sentences.length > 0 ? (
            sentences.slice(0, 3).map((sent, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                  {sent.endsWith('.') ? sent : `${sent}.`}
                </span>
              </div>
            ))
          ) : (
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {rawOverview}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Market Cap Tier</div>
            <div className={`text-xs font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.marketCapType || 'Large Cap'}</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Sector type</div>
            <div className={`text-xs font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.sectorAnalysis?.sectorType}</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Headquarters</div>
            <div className={`text-xs font-black mt-0.5 truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.headquarters || 'Mumbai, India'}</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Exchange</div>
            <div className={`text-xs font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.exchange}</div>
          </div>
        </div>
      </div>

      {/* Spot Price details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border space-y-1 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Current Market Price</span>
          <div className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{company.currentPrice.toLocaleString('en-IN')}</div>
        </div>
        <div className={`p-4 rounded-xl border space-y-1 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>52-Week High</span>
          <div className={`text-xl font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>₹{(company.currentPrice * 1.25).toFixed(2)}</div>
        </div>
        <div className={`p-4 rounded-xl border space-y-1 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>52-Week Low</span>
          <div className={`text-xl font-black ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>₹{(company.currentPrice * 0.78).toFixed(2)}</div>
        </div>
      </div>

      {/* Peer Comparison Table */}
      <div className={`p-6 rounded-2xl border shadow-lg space-y-4 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <h3 className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Sector Benchmarking <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-normal`}>({company.sector})</span>
          </h3>
        </div>

        <div className={`overflow-x-auto rounded-xl border ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[10px] font-black tracking-wider border-b ${
              isDarkMode ? 'bg-[#0c111d] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
              <tr>
                <th className="p-3.5">Company Name ⓘ</th>
                <th className="p-3.5">Market Cap ⓘ</th>
                <th className="p-3.5">Revenue ⓘ</th>
                <th className="p-3.5">OPM % ⓘ</th>
                <th className="p-3.5">ROE ⓘ</th>
                <th className="p-3.5">P/E ⓘ</th>
              </tr>
            </thead>
            <tbody className={`divide-y font-medium ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {peersLoading ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin mx-auto" />
                    <span className="text-xs text-slate-500 mt-2 block">Loading live peer data...</span>
                  </td>
                </tr>
              ) : peers.length > 0 ? (
                peers.map((peer) => {
                  const isCurrent = peer.symbol === company.symbol;
                  const cleanSymbol = peer.symbol ? peer.symbol.replace('.NS','').replace('.BO','') : '';
                  const displayName = peer.name || cleanSymbol;
                  return (
                    <tr 
                      key={peer.symbol}
                      className={`transition-colors ${
                        isCurrent 
                          ? (isDarkMode ? 'bg-blue-950/40 font-bold border-l-4 border-l-blue-500' : 'bg-blue-50/90 font-bold border-l-4 border-l-blue-600') 
                          : (isDarkMode ? 'hover:bg-[#1a2336] cursor-pointer' : 'hover:bg-slate-50 cursor-pointer')
                      }`}
                      onClick={() => !isCurrent && navigate('company', peer.symbol)}
                    >
                      <td className="p-3.5">
                        <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{displayName}</span>
                        {peer.name && cleanSymbol && <span className={`ml-1.5 font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>({cleanSymbol})</span>}
                        {isCurrent && <span className="ml-2 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">Active</span>}
                      </td>
                      <td className={`p-3.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {peer.marketCap ? `₹${(peer.marketCap / 100).toFixed(2)}L Cr` : '-'}
                      </td>
                      <td className={`p-3.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {peer.revenue ? `₹${(peer.revenue / 100).toFixed(2)}L Cr` : '-'}
                      </td>
                      <td className={`p-3.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {peer.opm !== undefined && peer.opm !== null ? `${peer.opm}%` : '-'}
                      </td>
                      <td className={`p-3.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {peer.roe !== undefined && peer.roe !== null ? `${peer.roe}%` : '-'}
                      </td>
                      <td className={`p-3.5 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {peer.pe || '-'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className={`p-4 text-center text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    No peer data available for this sector.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Beginner Tips & Glossaries */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        isDarkMode ? 'bg-blue-950/30 border-blue-900/50' : 'bg-blue-50 border-blue-200'
      }`}>
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div className={`text-xs space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Beginner Tip: Sector Benchmarking</span>
          <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Always compare a company's ratios (like P/E and ROE) with its immediate peers. A P/E of 25 might look high in isolation, but if the sector average is 40, the company might be valued attractively relative to its industry.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate('company', company.symbol, 'business-model')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Proceed to Business Model</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   2. Business Model View
   ========================================== */
function BusinessModelView({ company, navigate, isDarkMode = true }) {
  const biz = company.businessAnalysis;
  const quality = company.moatAnalysis || {};
  const [checklist, setChecklist] = useState({
    pricingPower: false,
    highSwitching: false,
    brandEquity: false,
    costLeader: false,
    networkEffects: false,
  });

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="space-y-6 w-full">
      {/* Business Model classification */}
      <div className={`p-6 rounded-2xl border space-y-4 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}>
        <div className={`flex items-center gap-2.5 pb-3 border-b ${isDarkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
          <Layers className="w-4 h-4 text-blue-500" />
          <h2 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Business Model & Offerings</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Business Model Type</span>
            <div className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{biz.businessType}</div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Product & Services Mix</span>
            <div className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {biz.products?.length || 0} Products • {biz.services?.length || 0} Services
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Key Offerings</h3>
            <div className="space-y-2">
              {biz.products?.map(p => (
                <div key={p} className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-bold ${
                  isDarkMode ? 'bg-[#0c111d] border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{p}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    isDarkMode ? 'bg-blue-950/50 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>Product</span>
                </div>
              ))}
              {biz.services?.map(s => (
                <div key={s} className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-bold ${
                  isDarkMode ? 'bg-[#0c111d] border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{s}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700/80' : 'bg-slate-200 text-slate-600 border-slate-300'
                  }`}>Service</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Revenue Breakdown</h3>
            <div className="space-y-3.5">
              {biz.revenueSources?.map(rev => (
                <div key={rev.source} className="space-y-1 text-xs">
                  <div className={`flex justify-between font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span>{rev.source}</span>
                    <span className="text-blue-500">{rev.percentage}%</span>
                  </div>
                  <div className={`w-full rounded-full h-1.5 overflow-hidden border ${
                    isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-200 border-slate-300'
                  }`}>
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${rev.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Economic Moat Cards */}
      {quality.advantages && (
        <div className={`p-6 rounded-2xl border space-y-4 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        }`}>
          <div className={`flex items-center justify-between pb-3 border-b ${isDarkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <h2 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Competitive Moats</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quality.advantages.map((adv, idx) => (
              <div key={idx} className={`p-4 rounded-xl border space-y-1.5 ${
                isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{adv.type}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                    isDarkMode ? 'bg-blue-950/50 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {adv.rating}
                  </span>
                </div>
                <p className={`text-xs font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{adv.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate && navigate('company', company.symbol, 'industry')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Proceed to Sector Playbook</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   3. Sector Playbook View
   ========================================== */
function IndustryView({ company, navigate, isDarkMode = true }) {
  const sectorInfo = company.sectorAnalysis || {
    sectorType: 'Growth Playbook',
    tailwinds: ['Digital expansion', 'Cloud adoption'],
    risks: ['Talent wage inflation', 'Global IT spending slowdown'],
    pitfalls: ['Pricing in future margins too early']
  };

  return (
    <div className="space-y-6 w-full">
      {/* Sector Details */}
      <div className={`p-6 rounded-2xl border space-y-4 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}>
        <div className={`flex items-center gap-2.5 pb-3 border-b ${isDarkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
          <Compass className="w-4 h-4 text-blue-500" />
          <h2 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Sector Cycle & Playbook</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Sector Classification</span>
            <div className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.sector}</div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Playbook Style</span>
            <div className="text-sm font-extrabold text-blue-500">{sectorInfo.sectorType}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Sector Tailwinds</h3>
            <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {sectorInfo.tailwinds?.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Sector Risks</h3>
            <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {sectorInfo.risks?.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sector Mistakes */}
      {sectorInfo.pitfalls && (
        <div className={`p-6 rounded-2xl border space-y-3 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Common Mistakes to Avoid in this Sector</h3>
          <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
            isDarkMode ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50 border-rose-200'
          }`}>
            <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <div className={`text-xs space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Warning Checklist</span>
              <p>{sectorInfo.pitfalls[0] || 'Overpaying during peak cyclic highs.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Sector Cycle Analysis */}
      {sectorInfo.cycle && (
        <div className={`p-6 rounded-2xl border space-y-4 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Current Sector Cycle Analysis</h3>
            <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Evaluating macro-economic conditions and sector performance phase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Macro Cycle Phase</span>
              <div className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{sectorInfo.cycle.current}</div>
            </div>
            <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Investment Verdict</span>
              <div className={`text-lg font-black ${
                sectorInfo.cycle.verdict.includes('Favorable') ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') :
                sectorInfo.cycle.verdict.includes('Wait') ? 'text-blue-500' :
                (isDarkMode ? 'text-rose-400' : 'text-rose-600')
              }`}>
                {sectorInfo.cycle.verdict}
              </div>
            </div>
          </div>
          
          <p className={`text-xs font-medium leading-relaxed p-3 rounded-xl border ${
            isDarkMode ? 'bg-[#0c111d]/50 border-slate-800/40 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            {sectorInfo.cycle.description}
          </p>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate && navigate('company', company.symbol, 'scorecard')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Proceed to Gatekeeper Scorecard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   4. Gatekeeper Scorecard (Stage 1)
   ========================================== */
function ScorecardView({ company, navigate, isDarkMode = true }) {
  const score = company.fundamentalAnalysis;
  const totalScore = score?.totalScore ?? 0;
  const maxScore = score?.maxPossibleScore ?? 10;
  
  const isBank = (company.sector === "Financial Services") || (company.industry || "").includes("Bank") || (company.name || "").includes("Bank") || maxScore <= 9;
  const goodThreshold = isBank ? 5.5 : 6.5;

  let verdictLabel = 'AVOID';
  let badgeStyle = isDarkMode 
    ? 'bg-rose-950/40 border-rose-900/50 text-rose-400' 
    : 'bg-rose-50 border-rose-200 text-rose-600';
  let descriptionText = 'High risk zone: Score is below 2.0. Avoid investing as capital is exposed to severe financial or balance sheet risk.';

  if (totalScore >= goodThreshold) {
    verdictLabel = 'GOOD';
    badgeStyle = isDarkMode 
      ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400' 
      : 'bg-emerald-50 border-emerald-200 text-emerald-700';
    descriptionText = `Score is ≥ ${goodThreshold} out of ${maxScore} (Good). This stock safely passes the Stage 1 fundamental screening checkpoint.`;
  } else if (totalScore >= 2.0) {
    verdictLabel = 'CAUTION';
    badgeStyle = isDarkMode 
      ? 'bg-amber-950/40 border-amber-900/50 text-amber-400' 
      : 'bg-amber-50 border-amber-200 text-amber-700';
    descriptionText = `Score is between 2.0 and ${(goodThreshold - 0.1).toFixed(1)} out of ${maxScore} (Caution). As an initial screening step, exercise caution and perform deeper analysis.`;
  }

  return (
    <div className={`p-6 rounded-2xl border shadow-lg space-y-6 w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
    }`}>
      <div className={`p-3.5 rounded-xl border flex items-center justify-between flex-wrap gap-3 ${
        isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`px-3 py-1.5 rounded-xl border text-center whitespace-nowrap shrink-0 ${badgeStyle}`}>
            <div className="text-sm font-black tracking-tight">{totalScore} / {maxScore}</div>
            <div className="text-[9px] font-extrabold uppercase tracking-wider leading-none mt-0.5">{verdictLabel}</div>
          </div>
          <div className="text-xs space-y-0.5">
            <h4 className={`font-extrabold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Stage 1 Screening Verdict</h4>
            <p className={`font-medium leading-normal text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {descriptionText}
            </p>
          </div>
        </div>
      </div>

      {totalScore < 2.0 && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isDarkMode ? 'bg-rose-950/30 border-rose-900/50' : 'bg-rose-50 border-rose-200'
        }`}>
          <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <div className={`text-xs space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>High Risk Alert: Avoid Investment Zone</span>
            <p>
              This company scored below 2.0. Investing in stocks with scores below 2.0 exposes your capital to high balance sheet risk or severe operational failure.
            </p>
          </div>
        </div>
      )}

      {totalScore >= 2.0 && totalScore < goodThreshold && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isDarkMode ? 'bg-amber-950/30 border-amber-900/50' : 'bg-amber-50 border-amber-200'
        }`}>
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className={`text-xs space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Initial Screening: Caution Advised</span>
            <p>
              This stock scored between 2.0 and {(goodThreshold - 0.1).toFixed(1)} (out of {maxScore}). Because Stage 1 is an initial checkpoint, caution is recommended. Review the detailed scorecard items below before making investment decisions.
            </p>
          </div>
        </div>
      )}

      {/* Scorecard Table */}
      <div className={`overflow-x-auto rounded-xl border w-full ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <table className="w-full text-left text-xs">
          <thead className={`uppercase text-[10px] font-black tracking-wider border-b ${
            isDarkMode ? 'bg-[#0c111d] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <tr>
              <th className="p-3.5">Parameter</th>
              <th className="p-3.5">Company Value</th>
              <th className="p-3.5">Benchmark Criteria</th>
              <th className="p-3.5">Score Impact</th>
            </tr>
          </thead>
          <tbody className={`divide-y font-medium ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
            {score.scorecard.map((item, idx) => (
              <tr key={idx} className={`transition-colors ${isDarkMode ? 'hover:bg-[#1a2336]' : 'hover:bg-slate-50'}`}>
                <td className="p-3.5 font-bold">
                  <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>{item.parameter}</div>
                  <div className={`text-[10px] mt-0.5 font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.explanation}</div>
                </td>
                <td className={`p-3.5 font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.value}</td>
                <td className={`p-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.criteria}</td>
                <td className="p-3.5 font-black text-blue-500">
                  {item.score === null ? 'Skipped' : (item.score > 0 ? `+${item.score}` : '0 (Fail)')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate && navigate('company', company.symbol, 'deep-trends')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Proceed to Deep Trend Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   5. Deep Trend Audit (Stage 2)
   ========================================== */
function DeepTrendsView({ company, navigate, isDarkMode = true }) {
  const pnlData = company.deepAnalysis?.annualResults || [];
  const bsData = company.deepAnalysis?.balanceSheet || [];
  const cfData = company.deepAnalysis?.cashFlow || [];
  const sh = company.deepAnalysis?.shareholding || { promoter: 72, fii: 12, dii: 10, public: 6 };

  const tooltipStyle = isDarkMode ? {
    backgroundColor: '#131926',
    borderColor: '#1e293b',
    borderRadius: '12px',
    color: '#f8fafc',
    fontSize: '12px'
  } : {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: '12px',
    color: '#0f172a',
    fontSize: '12px'
  };

  return (
    <div className="space-y-6 w-full">
      {/* Deep Trend Score summary */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between flex-wrap gap-3 ${
        isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`px-3 py-1.5 rounded-xl border text-center whitespace-nowrap shrink-0 ${
            isDarkMode ? 'bg-blue-950/40 border-blue-900/50 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <div className="text-sm font-black tracking-tight">{company.deepAnalysis?.totalScore || (company.fundamentalAnalysis.totalScore >= 7 ? '8.5' : '4.5')} / 10</div>
            <div className="text-[9px] font-extrabold uppercase tracking-wider leading-none mt-0.5">Deep Trend Score</div>
          </div>
          <div className="text-xs space-y-0.5">
            <h4 className={`font-extrabold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Stage 2 Trend Verdict</h4>
            <p className={`font-medium leading-normal text-[11px] max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Evaluated across 6 criteria (Quarterly, P&L, Balance Sheet, Cash Flow, Ratios, Shareholding).
            </p>
          </div>
        </div>
      </div>

      {/* Deep Trend Detailed Scorecard Table */}
      {company.deepAnalysis?.scorecard && (
        <div className={`rounded-2xl border overflow-hidden shadow-lg ${
          isDarkMode ? 'border-slate-800/80 bg-[#131926]/80 text-slate-300' : 'border-slate-200 bg-white text-slate-700 shadow-slate-200/50'
        }`}>
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[9px] font-black tracking-wider border-b ${
              isDarkMode ? 'bg-[#0c111d] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
              <tr>
                <th className="p-4">Trend Parameter</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 hidden sm:table-cell">Scoring Criteria</th>
                <th className="p-4 w-24">Awarded</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
              {company.deepAnalysis.scorecard.map((item, idx) => (
                <tr key={idx} className={`transition-colors ${isDarkMode ? 'hover:bg-[#1a2336]' : 'hover:bg-slate-50'}`}>
                  <td className="p-4 font-bold">
                    <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>{item.parameter}</div>
                    <div className={`text-[10px] mt-0.5 font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.explanation}</div>
                  </td>
                  <td className={`p-4 font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.value}</td>
                  <td className={`p-4 hidden sm:table-cell ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.criteria}</td>
                  <td className="p-4 font-black text-blue-500">
                    +{item.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sales & Profits graph */}
      <div className={`p-6 rounded-2xl border shadow-lg space-y-6 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5-Year Growth Trends</h3>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Figures in ₹ Crores</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pnlData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="sales" name="Sales Revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="netProfit" name="Net Profit" fill="#10b981" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Statement Chart */}
      <div className={`p-6 rounded-2xl border shadow-lg space-y-4 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Long-Term Reserves & Debt Trends</h3>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Figures in ₹ Crores</span>
        </div>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="reserves" name="Reserves & Surplus" fill="#34d399" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="borrowings" name="Borrowings (Debt)" fill="#fb7185" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow Statement Chart */}
      <div className={`p-6 rounded-2xl border shadow-lg space-y-4 ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Cash Flow Audit</h3>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Figures in ₹ Crores</span>
        </div>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cfData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="operatingCashFlow" name="Cash from Operations (CFO)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="investingCashFlow" name="Cash from Investing" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="financingCashFlow" name="Cash from Financing" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shareholder layout */}
      <ShareholdingPatternAudit shareholding={company.deepAnalysis?.shareholding} isDarkMode={isDarkMode} />

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate && navigate('company', company.symbol, 'valuation')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Proceed to Valuation & Safety</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   Shareholding Pattern Audit Component
   ========================================== */
function ShareholdingPatternAudit({ shareholding, isDarkMode = true }) {
  const [chartType, setChartType] = useState('line');
  const [showTable, setShowTable] = useState(true);

  const sh = shareholding || {};
  const latestQuarter = sh.latestQuarter || 'Latest Quarter';
  const promoter = sh.promoter ?? 0;
  const fii = sh.fii ?? 0;
  const dii = sh.dii ?? 0;
  const publicPct = sh.public ?? 0;
  const trend = sh.trend || [];

  const tooltipStyle = isDarkMode ? {
    backgroundColor: '#131926',
    borderColor: '#1e293b',
    borderRadius: '12px',
    color: '#f8fafc',
    fontSize: '12px'
  } : {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: '12px',
    color: '#0f172a',
    fontSize: '12px'
  };

  return (
    <div className={`p-6 rounded-2xl border shadow-lg space-y-6 w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#131926]/80 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
    }`}>
      {/* Header with Latest Quarter Badge */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
        isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-2.5">
          <PieChart className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Shareholding Pattern Audit
            </h3>
            <p className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Promoter, FII, DII & Public quarterly ownership trends
            </p>
          </div>
        </div>

        {/* Quarter Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm self-start sm:self-auto ${
          isDarkMode ? 'bg-blue-950/60 border-blue-800/60 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Latest Quarter: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{latestQuarter}</strong></span>
        </div>
      </div>

      {/* Warning Pill if High Public Ownership */}
      {publicPct > 50 && (
        <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
          isDarkMode ? 'bg-amber-950/30 border-amber-900/60' : 'bg-amber-50 border-amber-200'
        }`}>
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className={`font-medium leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <strong className={isDarkMode ? 'text-amber-300' : 'text-amber-700'}>High Retail Concentration Warning: </strong>
            Public holding exceeds 50% ({publicPct}%). High retail presence often indicates limited institutional backing or operator vulnerability.
          </div>
        </div>
      )}

      {/* Latest Shareholding Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className={`p-4 rounded-xl border transition-colors space-y-1 ${
          isDarkMode ? 'bg-[#0c111d] border-slate-800/80 hover:border-purple-500/50' : 'bg-slate-50 border-slate-200 hover:border-purple-300'
        }`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Promoters</span>
          </div>
          <div className={`text-2xl font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{promoter}%</div>
          <div className={`text-[10px] font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Core Stake</div>
        </div>

        <div className={`p-4 rounded-xl border transition-colors space-y-1 ${
          isDarkMode ? 'bg-[#0c111d] border-slate-800/80 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-cyan-300'
        }`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>FIIs</span>
          </div>
          <div className="text-2xl font-black text-cyan-500 mt-0.5">{fii}%</div>
          <div className={`text-[10px] font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Foreign Investors</div>
        </div>

        <div className={`p-4 rounded-xl border transition-colors space-y-1 ${
          isDarkMode ? 'bg-[#0c111d] border-slate-800/80 hover:border-emerald-500/50' : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
        }`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>DIIs</span>
          </div>
          <div className="text-2xl font-black text-emerald-500 mt-0.5">{dii}%</div>
          <div className={`text-[10px] font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Domestic Funds</div>
        </div>

        <div className={`p-4 rounded-xl border transition-colors space-y-1 ${
          isDarkMode ? 'bg-[#0c111d] border-slate-800/80 hover:border-amber-500/50' : 'bg-slate-50 border-slate-200 hover:border-amber-300'
        }`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Public</span>
          </div>
          <div className="text-2xl font-black text-amber-500 mt-0.5">{publicPct}%</div>
          <div className={`text-[10px] font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Retail & Others</div>
        </div>
      </div>

      {/* Quarterly Trend Chart Section */}
      {trend.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-500" />
              <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Historical Trend (Past to Latest Quarter)
              </h4>
            </div>

            {/* Chart Type Selector */}
            <div className={`flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto ${
              isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  chartType === 'line'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Line Trend
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  chartType === 'area'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Stacked Area
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  chartType === 'bar'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Bar Breakdown
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="quarter" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`]} />
                  <Legend />
                  <Line type="monotone" dataKey="promoter" name="Promoters" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="fii" name="FIIs" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="dii" name="DIIs" stroke="#34d399" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="public" name="Public" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              ) : chartType === 'area' ? (
                <AreaChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="quarter" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`]} />
                  <Legend />
                  <Area type="monotone" dataKey="promoter" name="Promoters" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="fii" name="FIIs" stackId="1" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="dii" name="DIIs" stackId="1" stroke="#34d399" fill="#34d399" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="public" name="Public" stackId="1" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.6} />
                </AreaChart>
              ) : (
                <BarChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="quarter" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`]} />
                  <Legend />
                  <Bar dataKey="promoter" name="Promoters" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fii" name="FIIs" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="dii" name="DIIs" fill="#34d399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="public" name="Public" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quarterly Breakdown Data Table */}
      {trend.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowTable(!showTable)}
              className="text-xs font-extrabold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <span>{showTable ? 'Hide' : 'Show'} Full Quarterly Breakdown Table</span>
              <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                isDarkMode ? 'bg-blue-950 text-blue-300 border-blue-900' : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>{trend.length} Quarters</span>
            </button>
          </div>

          {showTable && (
            <div className={`overflow-x-auto rounded-xl border ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <table className="w-full text-left text-xs">
                <thead className={`uppercase text-[10px] font-black tracking-wider border-b ${
                  isDarkMode ? 'bg-[#0c111d] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  <tr>
                    <th className="p-3">Quarter</th>
                    <th className="p-3">Promoters %</th>
                    <th className="p-3">FIIs %</th>
                    <th className="p-3">DIIs %</th>
                    <th className="p-3">Public %</th>
                    <th className="p-3">Institutional Total (FII+DII)</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-medium ${isDarkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  {trend.map((row, idx) => {
                    const instTotal = (row.fii + row.dii).toFixed(2);
                    const isLatest = idx === trend.length - 1;
                    return (
                      <tr
                        key={row.quarter}
                        className={`transition-colors ${
                          isDarkMode 
                            ? (isLatest ? 'bg-blue-950/40 font-bold border-l-4 border-l-blue-500' : 'hover:bg-[#1a2336]')
                            : (isLatest ? 'bg-blue-50/70 font-bold border-l-4 border-l-blue-500' : 'hover:bg-slate-50')
                        }`}
                      >
                        <td className={`p-3 font-extrabold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          <span>{row.quarter}</span>
                          {isLatest && (
                            <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                              Latest
                            </span>
                          )}
                        </td>
                        <td className={`p-3 font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>{row.promoter}%</td>
                        <td className={`p-3 font-bold ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>{row.fii}%</td>
                        <td className={`p-3 font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{row.dii}%</td>
                        <td className={`p-3 font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>{row.public}%</td>
                        <td className="p-3 text-blue-500 font-extrabold">{instTotal}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ==========================================
   6. Valuation & Safety Margin
   ========================================== */
function ValuationView({ company, navigate, isDarkMode = true }) {
  const val = company.valuation;
  const isMOSPositive = val.marginOfSafety.pct >= 0;
  const valStatus = val.marginOfSafety.status || (isMOSPositive ? 'Fairly Valued' : 'Premium Valuation');
  const valConclusion = val.marginOfSafety.conclusion || val.marginOfSafety.text;

  return (
    <div className="space-y-6 w-full">
      {/* Fair value calculation strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`p-5 rounded-2xl border space-y-1 shadow-lg ${
          isDarkMode ? 'bg-blue-950/40 border-blue-900/50' : 'bg-blue-50/80 border-blue-200'
        }`}>
          <div className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Fair Value Price (Intrinsic Valuation)
          </div>
          <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ₹{val.peValuation.fairPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className={`p-5 rounded-2xl border space-y-1 shadow-lg ${
          isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <div className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Current Market Price
          </div>
          <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ₹{company.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Margin of Safety info */}
      <div className={`p-5 rounded-xl border flex items-center gap-4 ${
        val.marginOfSafety.pct >= 20
          ? (isDarkMode ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800')
          : val.marginOfSafety.pct >= 0
          ? (isDarkMode ? 'bg-blue-950/40 border-blue-900/50 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800')
          : (isDarkMode ? 'bg-amber-950/40 border-amber-900/50 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800')
      }`}>
        <div className="text-xs space-y-1">
          <div className="font-extrabold text-sm flex items-center gap-2">
            <span>Margin of Safety: {val.marginOfSafety.pct > 0 ? `+${val.marginOfSafety.pct}%` : `${val.marginOfSafety.pct}%`}</span>
          </div>
          <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{val.marginOfSafety.text}</p>
        </div>
      </div>

      {/* Valuation Verdict Summary */}
      <div className={`p-6 rounded-2xl border text-center space-y-4 shadow-lg ${
        isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Valuation Conclusion: <span className={
            val.marginOfSafety.pct >= 20 ? 'text-emerald-400' :
            val.marginOfSafety.pct >= 0 ? 'text-blue-400' : 'text-amber-400'
          }>{valStatus}</span>
        </h3>
        <p className={`text-xs font-medium max-w-lg mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {valConclusion}
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate && navigate('home')}
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
              isDarkMode ? 'bg-[#131926] hover:bg-[#1a2336] border-slate-800 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate && navigate('company', company.symbol, 'technical')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2"
          >
            <span>Proceed to Technical Reference</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   7. Technical Reference View
   ========================================== */
function TechnicalView({ company, navigate, isDarkMode = true }) {
  return (
    <div className="space-y-6 w-full">
      {/* Technical analysis references */}
      <div className={`p-6 rounded-2xl border space-y-4 shadow-lg ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className={`flex items-center gap-2.5 pb-3 border-b ${isDarkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
          <BookOpen className="w-4 h-4 text-blue-500" />
          <h2 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Technical Analysis Playbook</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Entry Buy Range</span>
            <div className={`text-sm font-extrabold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>₹{(company.currentPrice * 0.9).toFixed(2)} - ₹{company.currentPrice.toFixed(2)}</div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Stop Loss Support</span>
            <div className={`text-sm font-extrabold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>₹{(company.currentPrice * 0.82).toFixed(2)}</div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border space-y-2 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Buying Strategies</h4>
          <div className={`text-xs space-y-2 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <p>
              <strong>1. Accumulate / SIP:</strong> Ideal for wide moat companies. Distribute buys across multiple weeks rather than purchasing a lump sum.
            </p>
            <p>
              <strong>2. Trend Breakout:</strong> Buy when the price consolidates and breaks out with high trading volume.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate && navigate('home')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Complete Analysis (Return to Dashboard)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   8. Portfolio & Risk View
   ========================================== */
function PortfolioRiskView({ company, navigate, isDarkMode = true }) {
  const [age, setAge] = useState(30);

  const calculateAllocation = (userAge) => {
    const ageVal = parseInt(userAge) || 30;
    const nonEquity = Math.min(Math.max(ageVal, 10), 90);
    const equity = 100 - nonEquity;
    return { equity, nonEquity };
  };

  const alloc = calculateAllocation(age);

  return (
    <div className="space-y-6 w-full">
      {/* Portfolio construction */}
      <div className={`p-6 rounded-2xl border space-y-4 shadow-lg ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className={`flex items-center gap-2.5 pb-3 border-b ${isDarkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
          <Briefcase className="w-4 h-4 text-blue-500" />
          <h2 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Portfolio Construction Rules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Conviction Sizing</span>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Max 8-10% allocation in any single stock to control risk.</p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Sector Caps</span>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Limit any industry sector to 25% of the total portfolio value.</p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Diversification Range</span>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Aim to hold between 15 and 20 quality stocks to maintain focus.</p>
          </div>
        </div>
      </div>

      {/* Age allocation tool */}
      <div className={`p-6 rounded-2xl border space-y-5 shadow-lg ${
        isDarkMode ? 'bg-[#131926]/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div>
          <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dynamic Age Allocation Tool</h3>
          <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Use your age to calculate target equity and reserve divisions.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border ${
          isDarkMode ? 'bg-[#0c111d] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex-1 space-y-2">
            <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Enter Your Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Math.max(1, Math.min(120, parseInt(e.target.value) || 0)))}
              className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-[#131926] text-white border-slate-800' : 'bg-white text-slate-900 border-slate-300'
              }`}
            />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg border text-center ${
              isDarkMode ? 'bg-[#131926] border-slate-800/80' : 'bg-white border-slate-200'
            }`}>
              <span className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Equity Assets</span>
              <div className="text-lg font-black text-emerald-500 mt-0.5">{alloc.equity}%</div>
            </div>
            <div className={`p-3 rounded-lg border text-center ${
              isDarkMode ? 'bg-[#131926] border-slate-800/80' : 'bg-white border-slate-200'
            }`}>
              <span className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Reserve Funds</span>
              <div className="text-lg font-black text-blue-500 mt-0.5">{alloc.nonEquity}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate && navigate('home')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <span>Complete Analysis (Return to Dashboard)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
