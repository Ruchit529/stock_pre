import React, { useState, useEffect } from 'react';
import SidebarNav from './layouts/SidebarNav';
import DashboardView from './pages/DashboardView';
import StockAnalysisView from './pages/StockAnalysisView';
import WatchlistView from './pages/WatchlistView';
import ScreenerView from './pages/ScreenerView';
import LearningView from './pages/LearningView';
import ToolsView from './pages/ToolsView';
import SettingsView from './pages/SettingsView';
import { PDF_COMPANIES } from './data/mockData';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';

export default function App() {
  // 1. Theme State Persistence (default light theme to match screenshot unless saved)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('stock_analysis_theme_mode');
    return saved !== null ? saved === 'dark' : false;
  });

  // 2. Active Nav State Persistence
  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem('stock_analysis_active_nav') || 'stock-analysis';
  });

  // 3. Selected Stock Symbol Persistence (Default to Asian Paints)
  const [selectedSymbol, setSelectedSymbol] = useState(() => {
    const saved = localStorage.getItem('stock_analysis_selected_symbol');
    return saved && saved !== 'null' ? saved : 'ASIANPAINT';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Persist Theme changes
  useEffect(() => {
    localStorage.setItem('stock_analysis_theme_mode', isDarkMode ? 'dark' : 'light');
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
      localStorage.removeItem('stock_analysis_selected_symbol');
    }
  }, [selectedSymbol]);

  const company = selectedSymbol ? (PDF_COMPANIES.find(c => c.symbol === selectedSymbol) || PDF_COMPANIES[0]) : PDF_COMPANIES[0];

  const handleSelectStock = (sym) => {
    setSelectedSymbol(sym);
    setActiveNav('stock-analysis');
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const filteredSearch = PDF_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        
        {/* Compact Top Header Bar */}
        <header className={`px-4 py-1.5 border-b flex items-center justify-between gap-3 sticky top-0 z-30 transition-colors ${
          isDarkMode ? 'bg-[#0b0f19]/95 border-slate-800/80 backdrop-blur-md' : 'bg-white/95 border-slate-200/80 backdrop-blur-md shadow-2xs'
        }`}>
          {/* Header Title */}
          <div className="shrink-0">
            <h2 className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Stock Analysis
            </h2>
            <p className="text-[10px] text-slate-400 font-medium leading-none">
              Institutional Stock Research & Valuation Engine
            </p>
          </div>

          {/* Central Search Input Bar */}
          <div className="relative flex-1 max-w-lg mx-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-xs transition-all ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 text-white focus-within:border-sky-500' 
                : 'bg-slate-50 border-slate-200 text-slate-900 focus-within:border-sky-500 focus-within:bg-white'
            }`}>
              <Search className="w-3 h-3 text-slate-400 shrink-0" />
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
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-semibold text-slate-400 bg-slate-200/60 dark:bg-slate-800 rounded border border-slate-300/40 dark:border-slate-700">
                /
              </kbd>
            </div>

            {/* Search Dropdown Results */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-xl z-50 overflow-hidden ${
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

          {/* Right Section Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Market Close & Date Pill */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Market Closed
              </span>
              <span>•</span>
              <span>May 21, 2024</span>
            </div>

            {/* Light / Dark Mode Icon Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle Light/Dark Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>

            {/* Notification Bell with Badge */}
            <button className={`p-1.5 rounded-lg border relative transition-colors cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}>
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center border-2 border-white dark:border-slate-900">
                1
              </span>
            </button>

            {/* User Profile Avatar Pill */}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center">
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
              onBack={() => setActiveNav('dashboard')}
              isDarkMode={isDarkMode}
              onSelectStock={handleSelectStock}
            />
          )}

          {activeNav === 'watchlist' && (
            <WatchlistView
              onSelectStock={handleSelectStock}
              isDarkMode={isDarkMode}
            />
          )}

          {activeNav === 'screener' && (
            <ScreenerView
              onSelectStock={handleSelectStock}
              isDarkMode={isDarkMode}
            />
          )}

          {activeNav === 'learning' && (
            <LearningView
              isDarkMode={isDarkMode}
            />
          )}

          {activeNav === 'tools' && (
            <ToolsView
              isDarkMode={isDarkMode}
            />
          )}

          {activeNav === 'settings' && (
            <SettingsView
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            />
          )}

        </main>
      </div>
    </div>
  );
}
