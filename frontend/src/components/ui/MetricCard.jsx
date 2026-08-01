import React from 'react';
import { CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  benchmark,
  progress = 75,
  status = 'pass', // 'pass' | 'fail' | 'warn'
  weight = '1.0 Pt',
  description = null
}) {
  const isPass = status === 'pass';
  const isFail = status === 'fail';

  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          {weight}
        </span>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div className="text-lg font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
          {value}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
          isPass
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : isFail
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        }`}>
          {isPass ? <CheckCircle2 className="w-3 h-3" /> : isFail ? <ShieldAlert className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          <span>{isPass ? 'PASSED' : isFail ? 'FAILED' : 'WARN'}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isPass ? 'bg-emerald-500' : isFail ? 'bg-rose-500' : 'bg-amber-500'
          }`}
          style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
        <span>Target: {benchmark}</span>
        {description && <span className="text-slate-400 font-medium truncate max-w-[120px]">{description}</span>}
      </div>
    </div>
  );
}
