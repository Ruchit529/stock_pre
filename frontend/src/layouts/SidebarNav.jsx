import React from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Bookmark,
  Filter,
  GraduationCap,
  Wrench,
  Settings,
  Sun,
  Moon,
  TrendingUp
} from 'lucide-react';

export default function SidebarNav({
  activeNav = 'dashboard',
  onSelectNav,
  isDarkMode = true,
  onToggleTheme
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stock-analysis', label: 'Stock Analysis', icon: BarChart2 },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark },
    { id: 'screener', label: 'Screener', icon: Filter },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className={`w-52 shrink-0 flex flex-col justify-between border-r transition-colors duration-200 h-screen sticky top-0 ${
      isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-white border-sky-100 text-slate-700'
    }`}>
      {/* Upper Section */}
      <div className="p-3 space-y-3">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Stock Analysis
          </span>
        </div>

        {/* Menu Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNav && onSelectNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme Toggle Button */}
      <div className="p-3 border-t border-slate-800/60">
        <button
          onClick={onToggleTheme}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span className="text-xs font-bold">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
            isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
          }`}>
            Toggle
          </span>
        </button>
      </div>
    </aside>
  );
}
