import React, { useState, useRef, useEffect } from 'react';
import { 
  TrendingUp, Home, Search, X, Menu, Sun, Moon, Loader2,
  LayoutDashboard, BarChart2, Filter, Clock
} from 'lucide-react';
import { searchTickers } from '../services/api';

export default function TopNav({ 
  activePage, 
  activeSymbol, 
  activeSubPage, 
  navigate,
  isDarkMode = true,
  setIsDarkMode
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const suggestionsRef = useRef(null);

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = sessionStorage.getItem('recent_stock_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      setIsSearching(true);
      searchTickers(searchQuery).then(results => {
        setSearchResults(results);
        setIsSearching(false);
      }).catch(() => setIsSearching(false));
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (symbol, name = '') => {
    if (!symbol) return;
    const cleanSymbol = symbol.trim().toUpperCase();
    setRecentSearches(prev => {
      const filtered = prev.filter(item => (typeof item === 'string' ? item : item.symbol) !== cleanSymbol);
      const updated = [{ symbol: cleanSymbol, name: name || cleanSymbol }, ...filtered].slice(0, 5);
      try {
        sessionStorage.setItem('recent_stock_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeRecentSearch = (e, symbolToRemove) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(item => (typeof item === 'string' ? item : item.symbol) !== symbolToRemove);
      try {
        sessionStorage.setItem('recent_stock_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearAllRecentSearches = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      sessionStorage.removeItem('recent_stock_searches');
    } catch {}
  };

  const handleSuggestionClick = (symbol, name = '') => {
    if (!symbol) return;
    const cleanSymbol = symbol.trim().toUpperCase();
    saveRecentSearch(cleanSymbol, name);
    navigate('company', cleanSymbol, activeSubPage);
    setShowSuggestions(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const renderDropdownContent = () => {
    if (!searchQuery.trim()) {
      if (recentSearches.length === 0) return null;
      return (
        <div>
          <div className={`px-3.5 py-2 text-[9px] font-bold uppercase tracking-wider border-b flex items-center justify-between ${
            isDarkMode ? 'bg-[#0c111d] text-slate-400 border-slate-800/80' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-blue-500" />
              <span>Recent Searches</span>
            </span>
            <button
              type="button"
              onClick={clearAllRecentSearches}
              className="text-[9px] font-extrabold text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-wider"
            >
              Clear All
            </button>
          </div>
          <div className={`divide-y max-h-64 overflow-y-auto ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
            {recentSearches.map(item => {
              const sym = typeof item === 'string' ? item : item.symbol;
              const nm = typeof item === 'string' ? '' : item.name;
              return (
                <div
                  key={sym}
                  onClick={() => handleSuggestionClick(sym, nm)}
                  className={`px-3.5 py-2.5 cursor-pointer flex items-center justify-between group transition-colors ${
                    isDarkMode ? 'hover:bg-[#1a2336]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                    <div className="truncate">
                      <div className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{sym}</div>
                      {nm && nm !== sym && (
                        <div className={`text-[10px] truncate max-w-[180px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{nm}</div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => removeRecentSearch(e, sym)}
                    className={`p-1 rounded-md transition-colors ${
                      isDarkMode ? 'text-slate-500 hover:text-rose-400 hover:bg-rose-950/40' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                    title="Remove from recent searches"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={`px-3.5 py-2 text-[9px] font-bold uppercase tracking-wider border-b flex items-center justify-between ${
          isDarkMode ? 'bg-[#0c111d] text-slate-500 border-slate-800/80' : 'bg-slate-50 text-slate-500 border-slate-200'
        }`}>
          <span>Matching Tickers</span>
          {isSearching && <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />}
        </div>
        {searchResults.length > 0 ? (
          <div className={`divide-y max-h-64 overflow-y-auto ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
            {searchResults.map(c => (
              <div
                key={c.symbol}
                onClick={() => handleSuggestionClick(c.symbol, c.name)}
                className={`px-3.5 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${
                  isDarkMode ? 'hover:bg-[#1a2336]' : 'hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className={`text-xs font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <span>{c.symbol}</span>
                    {c.exchange && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${
                        isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {c.exchange}
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] truncate max-w-[220px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{c.name}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-500">Analyze &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            onClick={() => handleSuggestionClick(searchQuery.trim().toUpperCase())}
            className={`p-3.5 text-center text-xs cursor-pointer ${isDarkMode ? 'text-slate-400 hover:bg-[#1a2336]' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Analyze ticker <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>"{searchQuery.toUpperCase()}"</span> &rarr;
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b shadow-xl transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0c111d]/95 border-slate-800/80 text-white' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Primary Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className={`font-extrabold text-xl tracking-tight hidden sm:inline ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Stock<span className="text-blue-500">Sense</span>
            </span>
          </div>

          {/* Center: Search */}
          <div className="relative flex-1 max-w-md hidden md:block" ref={suggestionsRef}>
            <div className="relative">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search stock or ticker (e.g. TCS, AAPL, NVDA)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    const targetSymbol = searchResults.length > 0 ? searchResults[0].symbol : searchQuery.trim().toUpperCase();
                    handleSuggestionClick(targetSymbol);
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                className={`w-full pl-10 pr-9 py-2 text-xs rounded-xl border focus:outline-none transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-[#131926]/80 text-white placeholder-slate-500 border-slate-700/60 focus:border-blue-500/70 focus:bg-[#1a2336]' 
                    : 'bg-slate-100 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')} 
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-0.5 transition-colors ${
                    isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (renderDropdownContent() !== null) && (
              <div className={`absolute left-0 right-0 mt-2 rounded-xl shadow-2xl overflow-hidden z-50 text-left border ${
                isDarkMode ? 'bg-[#131926] border-slate-700/60 text-white shadow-black/50' : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
              }`}>
                {renderDropdownContent()}
              </div>
            )}
          </div>

          {/* Right: Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('home')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePage === 'home'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-[#131926]/80' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('screener')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePage === 'screener' || activePage === 'company'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-[#131926]/80' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Stock Analysis</span>
            </button>

            <div className={`h-4 w-px my-auto mx-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'text-amber-400 hover:text-amber-300 hover:bg-[#131926]/80' 
                  : 'text-blue-600 hover:text-blue-700 hover:bg-slate-100'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border transition-colors ${
              isDarkMode 
                ? 'bg-[#131926] border-slate-800/80 text-slate-300 hover:text-white' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Expanded Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t animate-fade-in ${
          isDarkMode ? 'border-slate-800/50 bg-[#0a0e18]/95' : 'border-slate-200 bg-white/95 shadow-lg'
        }`}>
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <div className="relative" ref={suggestionsRef}>
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search stock..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    const targetSymbol = searchResults.length > 0 ? searchResults[0].symbol : searchQuery.trim().toUpperCase();
                    handleSuggestionClick(targetSymbol);
                  }
                }}
                className={`w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#131926] text-white placeholder-slate-500 border-slate-700/60 focus:border-blue-500/70' 
                    : 'bg-slate-100 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-blue-500'
                }`}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')} 
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 ${
                    isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Mobile Suggestions / Recent Dropdown */}
              {showSuggestions && (renderDropdownContent() !== null) && (
                <div className={`absolute left-0 right-0 mt-2 rounded-xl shadow-2xl overflow-hidden z-50 text-left border ${
                  isDarkMode ? 'bg-[#131926] border-slate-700/60 text-white shadow-black/50' : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
                }`}>
                  {renderDropdownContent()}
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <button
              onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                activePage === 'home'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-[#131926]/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { navigate('screener'); setMobileMenuOpen(false); }}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                activePage === 'screener' || activePage === 'company'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-[#131926]/50'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Stock Analysis</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
