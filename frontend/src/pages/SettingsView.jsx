import React from 'react';
import { Settings, Moon, Sun, Monitor, Bell, Shield, Database, Layout } from 'lucide-react';

export default function SettingsView({ isDarkMode = false, onToggleTheme }) {
  return (
    <div className="space-y-2.5 w-full text-xs">
      
      {/* Header Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 border border-blue-500/20 flex items-center justify-center font-bold shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Application Settings & Platform Preferences
            </h2>
            <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
              Customize UI density, theme preferences, valuation default parameters & notification rules
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        
        {/* Settings Card 1: Appearance & Display Density */}
        <div className={`lg:col-span-6 p-4 rounded-xl border space-y-3.5 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <div className="flex items-center gap-2 border-b pb-2 border-slate-200/40 dark:border-slate-800">
            <Layout className="w-4 h-4 text-blue-500" />
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Appearance & Layout Density
            </h3>
          </div>

          <div className="space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Color Theme Mode
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Switch between sleek dark mode & clean light mode</p>
              </div>

              <button
                onClick={onToggleTheme}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>

            {/* Display Density Pill */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/40 dark:border-slate-800">
              <div>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Display Density Mode
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Institutional compact viewport layout</p>
              </div>

              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] border border-blue-500/20">
                Institutional Compact (98% Width)
              </span>
            </div>
          </div>
        </div>

        {/* Settings Card 2: Valuation & Data Defaults */}
        <div className={`lg:col-span-6 p-4 rounded-xl border space-y-3.5 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <div className="flex items-center gap-2 border-b pb-2 border-slate-200/40 dark:border-slate-800">
            <Database className="w-4 h-4 text-emerald-500" />
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Valuation & Financial Data Defaults
            </h3>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Default Discount Rate (DCF)</span>
              <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>11.0% p.a.</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Default Margin of Safety Target</span>
              <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>20.0% Discount</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Primary Financial Currency</span>
              <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>INR (₹ Cr.)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
