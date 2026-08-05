import React, { useState, useEffect } from 'react';
import SidebarNav from './layouts/SidebarNav';
import DashboardView from './pages/DashboardView';
import StockAnalysisView from './pages/StockAnalysisView';
import { PDF_COMPANIES } from './data/mockData';
import { Search, Bell, Sun, Moon, ChevronDown, Clock } from 'lucide-react';

export default function App() {
  // 1. Theme State Persistence (default light theme to match screenshot unless saved)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('stock_analysis_theme_mode');
    const mode = saved !== null ? saved === 'dark' : false;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', mode);
    }
    return mode;
  });

  // 2. Active Nav State Persistence
  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem('stock_analysis_active_nav') || 'stock-analysis';
  });

  // 3. Selected Stock Symbol Persistence
  const [selectedSymbol, setSelectedSymbol] = useState(() => {
    const saved = localStorage.getItem('stock_analysis_selected_symbol');
    return saved && saved !== 'null' ? saved : 'ASIANPAINT';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Persist Theme changes & update document element class for Tailwind dark: variants
  useEffect(() => {
    localStorage.setItem('stock_analysis_theme_mode', isDarkMode ? 'dark' : 'light');
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  // Persist Active Nav changes
  useEffect(() => {
    localStorage.setItem('stock_analysis_active_nav', activeNav);
  }, [activeNav]);

  // Persist Selected Symbol changes
  useEffect(() => {
    if (selectedSymbol) {
      localStorage.setItem('stock_analysis_selected_symbol', selectedSymbol);
    } else {
      localStorage.setItem('stock_analysis_selected_symbol', 'null');
    }
  }, [selectedSymbol]);

  const company = selectedSymbol ? (PDF_COMPANIES.find(c => c.symbol === selectedSymbol) || null) : null;

  const handleSelectStock = (sym) => {
    setSelectedSymbol(sym);
    if (sym) setActiveNav('stock-analysis');
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const filteredSearch = PDF_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navTitles = {
    'dashboard': { title: 'Dashboard', subtitle: 'Market Overview & Portfolio Intelligence' },
    'stock-analysis': { title: 'Stock Analysis', subtitle: 'Institutional Stock Research & Valuation Engine' },
    'watchlist': { title: 'Watchlist', subtitle: 'Tracked Equities & Real-time Alerts' },
    'screener': { title: 'Stock Screener', subtitle: 'Institutional Security Filter & Discovery Engine' },
    'learning': { title: 'Learning Academy', subtitle: 'Security Analysis & Valuation Frameworks' },
    'tools': { title: 'Financial Tools', subtitle: 'DCF Valuation & Compounding Calculators' },
    'settings': { title: 'Settings', subtitle: 'Platform Preferences & System Configuration' }
  };

  const currentNav = navTitles[activeNav] || navTitles['stock-analysis'];

  return (
    <div className={`min-h-screen flex font-sans text-xs transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      {/* 1. Fixed Narrow Left Sidebar */}
      <SidebarNav
        activeNav={activeNav}
        onSelectNav={(navId) => {
          setActiveNav(navId);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* 2. Main Content Area - 98% Screen Width with Compact Spacing */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Sleek Top Header Bar */}
        <header className={`px-5 py-2 border-b flex items-center justify-between gap-4 transition-all ${
          isDarkMode 
            ? 'bg-[#0b0f19] border-slate-800/80' 
            : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          {/* Dynamic Page Header Title */}
          <div className="shrink-0">
            <h2 className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {currentNav.title}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
              {currentNav.subtitle}
            </p>
          </div>

          {/* Central Search Input Bar - ONLY RENDERED WHEN ANALYZING A PARTICULAR STOCK */}
          {activeNav === 'stock-analysis' && Boolean(selectedSymbol) ? (
            <div className="relative flex-1 max-w-md mx-auto">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all shadow-2xs ${
                isDarkMode 
                  ? 'bg-slate-900/90 border-slate-800 text-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500/20'
              }`}>
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for stocks, companies or sectors..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full bg-transparent outline-none text-xs text-slate-700 dark:text-slate-200 placeholder-slate-400 font-medium"
                />
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-slate-200/60 dark:bg-slate-800 rounded-md border border-slate-300/40 dark:border-slate-700">
                  /
                </kbd>
              </div>

              {/* Search Dropdown Results */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-1.5 rounded-xl border shadow-xl z-50 overflow-hidden ${
                  isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredSearch.length > 0 ? (
                      filteredSearch.map((item) => (
                        <button
                          key={item.symbol}
                          onClick={() => handleSelectStock(item.symbol)}
                          className={`w-full flex items-center justify-between p-2.5 text-left transition-colors cursor-pointer ${
                            isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-sky-50/70'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                              {item.symbol.substring(0, 2)}
                            </div>
                            <div>
                              <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {item.name}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium">
                                {item.symbol} • {item.sector}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              ₹{item.currentPrice?.toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-emerald-500 font-bold">
                              +{item.priceChangePercent}%
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-slate-400 text-center">No stocks found matching "{searchQuery}"</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Right Section Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Live Date Badge */}
            <div className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>May 21, 2024</span>
            </div>

            {/* Light / Dark Mode Icon Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            </button>

            {/* Notification Bell with Badge */}
            <button className={`p-1.5 rounded-lg border relative transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
            }`}>
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center border-2 border-white dark:border-slate-900">
                1
              </span>
            </button>

            {/* User Profile Avatar Pill */}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800' 
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}>
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shadow-2xs">
                AR
              </div>
              <span className="text-[11px] font-bold hidden sm:inline-block">Ankit R.</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </header>

        {/* View Container - 98% Screen Width with minimal margins */}
        <main className="flex-1 p-2.5 sm:p-3 w-[98%] mx-auto space-y-2.5" onClick={() => setIsSearchOpen(false)}>
          
          {activeNav === 'dashboard' && (
            <DashboardView
              onSelectStock={handleSelectStock}
              isDarkMode={isDarkMode}
            />
          )}

          {activeNav === 'stock-analysis' && (
            <StockAnalysisView
              company={company}
              onBack={() => {
                setSelectedSymbol(null);
                setActiveNav('stock-analysis');
              }}
              isDarkMode={isDarkMode}
              onSelectStock={handleSelectStock}
            />
          )}

          {/* Coming Soon card state for non-core modules */}
          {!['dashboard', 'stock-analysis'].includes(activeNav) && (
            <div className={`p-12 rounded-2xl border text-center space-y-3 my-8 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 border border-blue-500/20 flex items-center justify-center mx-auto font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] uppercase tracking-wider border border-blue-500/20">
                  Coming Soon
                </span>
                <h3 className={`text-base font-bold tracking-tight pt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentNav.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
                  This feature is currently under active development. Check back soon for updates!
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
