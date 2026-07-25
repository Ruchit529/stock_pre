import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, Award, BarChart2, Percent, Layers, ShieldCheck, 
  Briefcase, TrendingUp, TrendingDown, Home, FileText, Search, X, BookOpen, Loader2
} from 'lucide-react';
import { searchTickers } from '../services/api';

export default function Sidebar({ 
  activePage, 
  activeSymbol, 
  activeSubPage, 
  navigate, 
  isMobileOpen, 
  setIsMobileOpen 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

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

  const handleSuggestionClick = (symbol) => {
    navigate('company', symbol, activeSubPage);
    setShowSuggestions(false);
    setSearchQuery('');
    setIsMobileOpen(false);
  };

  const menuItems = [
    { id: 'overview', label: '1. Overview & Summary', icon: FileText },
    { id: 'business-model', label: '2. Business Model', icon: Layers },
    { id: 'industry', label: '3. Sector Playbook', icon: Compass },
    { id: 'scorecard', label: '4. Gatekeeper Score (Stage 1)', icon: Award },
    { id: 'deep-trends', label: '5. Deep Trend Audit (Stage 2)', icon: BarChart2 },
    { id: 'valuation', label: '6. Valuation & Safety', icon: Percent },
    { id: 'technical', label: '7. Technical Reference', icon: BookOpen }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0c111d] border-r border-slate-800/80 text-white flex flex-col justify-between transform transition-transform md:translate-x-0 ${
      isMobileOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Brand Header */}
        <div 
          onClick={() => { navigate('home'); setIsMobileOpen(false); }}
          className="flex items-center gap-2.5 cursor-pointer group select-none px-2"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Stock<span className="text-blue-500">Sense</span>
          </span>
        </div>

        {/* Persistent Search Box */}
        <div className="relative px-2" ref={suggestionsRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search stock..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-9 pr-8 py-2 bg-[#131926] text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery && (
            <div className="absolute left-2 right-2 mt-2 bg-[#131926] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 text-left">
              <div className="px-3 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider bg-[#0c111d] border-b border-slate-800 flex items-center justify-between">
                <span>Matching Tickers</span>
                {isSearching && <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />}
              </div>
              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-800 max-h-48 overflow-y-auto">
                  {searchResults.map(c => (
                    <div
                      key={c.symbol}
                      onClick={() => handleSuggestionClick(c.symbol)}
                      className="px-3 py-2 hover:bg-[#1a2336] cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{c.symbol}</div>
                        <div className="text-[9px] text-slate-400 truncate max-w-[140px]">{c.name}</div>
                      </div>
                      <span className="text-xs font-bold text-blue-400">&rarr;</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 text-center text-xs text-slate-500">No stock found</div>
              )}
            </div>
          )}
        </div>

        {/* Global Dashboard Navigation Link */}
        <div className="px-2">
          <button
            onClick={() => { navigate('home'); setIsMobileOpen(false); }}
            className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
              activePage === 'home'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#131926]/50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Dashboard Home</span>
          </button>
        </div>

        {/* Company Active Stock Info Widget */}
        {activePage === 'company' && (
          <div className="px-2 space-y-4">
            <div className="p-3 bg-[#131926]/60 border border-slate-800/80 rounded-xl space-y-1 text-left">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Analysis</div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-blue-400 bg-blue-950/50 px-2.5 py-0.5 rounded border border-blue-900/50">
                  {activeSymbol}
                </span>
              </div>
            </div>

            {/* Step-by-Step Analysis Sections */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Research Playbook
              </span>
              <div className="space-y-0.5 pt-1.5">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  const isSubActive = activePage === 'company' && activeSubPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { navigate('company', activeSymbol, item.id); setIsMobileOpen(false); }}
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 ${
                        isSubActive 
                          ? 'bg-blue-600 text-white shadow-md border-l-4 border-blue-400' 
                          : 'text-slate-400 hover:text-white hover:bg-[#131926]/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-[#0a0e18] text-[10px] text-slate-500 text-center font-medium">
        StockSense Equity Research
      </div>
    </aside>
  );
}
