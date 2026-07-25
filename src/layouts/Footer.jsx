import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#0c111d] text-slate-500 py-10 mt-16 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div 
            onClick={() => navigate && navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Stock<span className="text-blue-500">Sense</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
            <span onClick={() => navigate && navigate('home')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
            <span className="hover:text-white cursor-pointer transition-colors">Glossary</span>
            <span className="hover:text-white cursor-pointer transition-colors">Disclaimer</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-600">
          <div>
            &copy; {new Date().getFullYear()} StockSense. All data is mock/educational.
          </div>
          <div className="italic font-bold text-slate-500">
            "Invest with knowledge, not emotion."
          </div>
        </div>
      </div>
    </footer>
  );
}
