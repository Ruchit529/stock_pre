import React, { useState } from 'react';
import { TrendingUp, Search, Sun, Moon, Bookmark, BarChart2, Home, ArrowRight } from 'lucide-react';
import { PDF_COMPANIES } from '../data/mockData';

export default function AppHeader({
  activePage = 'home',
  onNavigate,
  onSelectCompany,
  isDarkMode = true,
  onToggleTheme
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredResults = PDF_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (symbol) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    if (onSelectCompany) {
      onSelectCompany(symbol);
    }
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-150 ${
      isDarkMode ? 'bg-[#090d16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <span>STOCK ANALYSIS</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
                isDarkMode ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                PRO
              </span>
            </div>
            <p className={`text-[10px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Institutional Financial Research
            </p>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className={`hidden md:flex items-center gap-1 p-1 rounded-lg border ${
          isDarkMode ? 'bg-[#131926] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'home'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('company')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'company'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Research Engine</span>
          </button>

          <button
            onClick={() => onNavigate('watchlist')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'watchlist'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Watchlist</span>
          </button>
        </nav>

        {/* Right Action Items: Search Bar & Theme Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              isDarkMode ? 'bg-[#131926] border-slate-700 text-white focus-within:border-blue-500' : 'bg-slate-100 border-slate-300 text-slate-900 focus-within:border-blue-600'
            }`}>
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search symbol (e.g. RELIANCE)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="bg-transparent border-none outline-none text-xs w-44 sm:w-56 font-medium text-white placeholder:text-slate-500"
              />
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isDropdownOpen && searchQuery.trim().length > 0 && (
              <div className={`absolute right-0 mt-1.5 w-72 rounded-lg border shadow-lg overflow-hidden z-50 ${
                isDarkMode ? 'bg-[#131926] border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}>
                <div className={`p-2 border-b text-[10px] font-bold uppercase tracking-wider ${
                  isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  Matching Equities
                </div>
                <div className={`max-h-60 overflow-y-auto divide-y ${
                  isDarkMode ? 'divide-slate-800' : 'divide-slate-100'
                }`}>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((c) => (
                      <div
                        key={c.symbol}
                        onClick={() => handleSelect(c.symbol)}
                        className={`p-2.5 cursor-pointer flex items-center justify-between transition-colors ${
                          isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs flex items-center gap-2">
                            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{c.symbol}</span>
                            <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 uppercase font-bold">{c.sector}</span>
                          </div>
                          <div className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{c.name}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))
                  ) : (
                    <div className={`p-4 text-xs text-center font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      No matching company found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDarkMode ? 'bg-[#131926] border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
