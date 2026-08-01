import React, { useState, useEffect } from 'react';
import SidebarNav from './layouts/SidebarNav';
import DashboardView from './pages/DashboardView';
import StockAnalysisView from './pages/StockAnalysisView';
import { PDF_COMPANIES } from './data/mockData';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';

export default function App() {
  // 1. Theme State Persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('stock_analysis_theme_mode');
    return saved !== null ? saved === 'dark' : false;
  });

  // 2. Active Nav State Persistence
  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem('stock_analysis_active_nav') || 'dashboard';
  });

  // 3. Selected Stock Symbol Persistence
  const [selectedSymbol, setSelectedSymbol] = useState(() => {
    const saved = localStorage.getItem('stock_analysis_selected_symbol');
    return saved && saved !== 'null' ? saved : null;
  });

  const [searchQuery, setSearchQuery] = useState('');

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

  const company = selectedSymbol ? (PDF_COMPANIES.find(c => c.symbol === selectedSymbol) || PDF_COMPANIES[0]) : null;

  const handleSelectStock = (sym) => {
    setSelectedSymbol(sym);
    setActiveNav('stock-analysis');
  };

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      {/* 1. Left Sidebar Navigation */}
      <SidebarNav
        activeNav={activeNav}
        onSelectNav={(navId) => {
          setActiveNav(navId);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className={`px-4 py-2 border-b flex items-center justify-between gap-4 sticky top-0 z-30 transition-colors ${
          isDarkMode ? 'bg-[#0b0f19]/90 border-slate-800/80 backdrop-blur-md' : 'bg-[#f0f7ff]/90 border-sky-100 backdrop-blur-md shadow-xs'
        }`}>
          <div>
            <h2 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeNav === 'dashboard' && 'Dashboard'}
              {activeNav === 'stock-analysis' && 'Stock Analysis'}
              {activeNav === 'watchlist' && 'Watchlist'}
              {activeNav === 'screener' && 'Screener'}
              {activeNav === 'learning' && 'Learning'}
              {activeNav === 'tools' && 'Tools'}
              {activeNav === 'settings' && 'Settings'}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              {activeNav === 'dashboard' ? 'Find, track and analyze companies' : 'Institutional Stock Research & Valuation Engine'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Market Close & Date Pill */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Market Close
              </span>
              <span>•</span>
              <span>May 21, 2024</span>
            </div>

            {/* Light / Dark Mode Icon Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-slate-600" />}
            </button>

            {/* Notification Bell with Badge */}
            <button className={`p-1.5 rounded-xl border relative transition-colors cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}>
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center border-2 border-white">
                1
              </span>
            </button>

            {/* User Profile Avatar Pill */}
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border cursor-pointer ${
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

        {/* View Container */}
        <main className="flex-1 p-3 sm:p-4 max-w-[1550px] w-full mx-auto space-y-3">
          
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

          {/* Placeholder for other sidebar tabs */}
          {!['dashboard', 'stock-analysis'].includes(activeNav) && (
            <div className={`p-12 rounded-2xl border text-center space-y-3 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeNav.toUpperCase()} Module
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                This section is configured and ready. Select "Dashboard" or "Stock Analysis" in the left sidebar to inspect the redesigned screens.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
