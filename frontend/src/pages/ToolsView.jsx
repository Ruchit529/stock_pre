import React, { useState } from 'react';
import { Calculator, Scale, TrendingUp, ShieldAlert, Check } from 'lucide-react';

export default function ToolsView({ isDarkMode = false }) {
  // DCF Calculator State
  const [eps, setEps] = useState(70);
  const [growthRate, setGrowthRate] = useState(15);
  const [discountRate, setDiscountRate] = useState(11);
  const [terminalPe, setTerminalPe] = useState(25);

  // DCF Calculation
  const years = 5;
  let futureEps = eps;
  for (let i = 0; i < years; i++) {
    futureEps = futureEps * (1 + growthRate / 100);
  }
  const terminalValue = futureEps * terminalPe;
  const presentIntrinsicValue = (terminalValue / Math.pow(1 + discountRate / 100, years)).toFixed(2);

  // CAGR Calculation
  const [initialVal, setInitialVal] = useState(100);
  const [finalVal, setFinalVal] = useState(250);
  const [numYears, setNumYears] = useState(5);
  const cagr = (((Math.pow(finalVal / initialVal, 1 / numYears)) - 1) * 100).toFixed(2);

  return (
    <div className="space-y-2.5 w-full text-xs">
      
      {/* Header Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 border border-blue-500/20 flex items-center justify-center font-bold shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Institutional Financial Tools & Calculators
            </h2>
            <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
              Valuation modeling tools, DCF intrinsic value estimator & compound annual growth engines
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        
        {/* Tool 1: DCF Valuation Estimator */}
        <div className={`lg:col-span-6 p-4 rounded-xl border space-y-3 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between border-b pb-2 border-slate-200/40 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-500" />
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                1. Discounted Cash Flow (DCF) Calculator
              </h3>
            </div>
            <span className="text-[10px] font-bold text-blue-500">5-Yr Model</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Current EPS (₹)</label>
              <input
                type="number"
                value={eps}
                onChange={(e) => setEps(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Expected Growth (% p.a.)</label>
              <input
                type="number"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Discount Rate (% p.a.)</label>
              <input
                type="number"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-900/50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Terminal Exit P/E</label>
              <input
                type="number"
                value={terminalPe}
                onChange={(e) => setTerminalPe(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className={`p-3 rounded-lg border flex items-center justify-between ${
            isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-sky-50 border-sky-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Estimated Intrinsic Fair Value</span>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">
                ₹{presentIntrinsicValue}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-500 block">Margin of Safety Available</span>
              <span className="text-xs font-bold text-slate-400">@ 20% MOS: ₹{(presentIntrinsicValue * 0.8).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Tool 2: CAGR Compound Growth Engine */}
        <div className={`lg:col-span-6 p-4 rounded-xl border space-y-3 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between border-b pb-2 border-slate-200/40 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                2. CAGR & Compounding Calculator
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-500">Compounding Engine</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Initial Value (₹)</label>
              <input
                type="number"
                value={initialVal}
                onChange={(e) => setInitialVal(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Final Value (₹)</label>
              <input
                type="number"
                value={finalVal}
                onChange={(e) => setFinalVal(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Time Horizon (Yrs)</label>
              <input
                type="number"
                value={numYears}
                onChange={(e) => setNumYears(Number(e.target.value))}
                className={`w-full px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className={`p-3 rounded-lg border flex items-center justify-between ${
            isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Compound Annual Growth Rate (CAGR)</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {cagr}% p.a.
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 block">Total Return</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+{(((finalVal - initialVal) / initialVal) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
