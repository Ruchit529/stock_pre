import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatusIndicator({
  status = 'good', // 'exceptional' | 'excellent' | 'good' | 'caution' | 'avoid' | 'increasing' | 'decreasing' | 'stable'
  isDarkMode = true,
  label = null
}) {
  const configs = {
    exceptional: { label: 'Exceptional', icon: CheckCircle2, dark: 'bg-emerald-950/80 text-emerald-400 border-emerald-800', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    excellent: { label: 'Excellent', icon: CheckCircle2, dark: 'bg-emerald-950/80 text-emerald-400 border-emerald-800', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    good: { label: 'Good', icon: CheckCircle2, dark: 'bg-blue-950/80 text-blue-400 border-blue-800', light: 'bg-blue-50 text-blue-700 border-blue-200' },
    caution: { label: 'Caution', icon: AlertTriangle, dark: 'bg-amber-950/80 text-amber-400 border-amber-800', light: 'bg-amber-50 text-amber-700 border-amber-200' },
    avoid: { label: 'Avoid / High Risk', icon: XCircle, dark: 'bg-rose-950/80 text-rose-400 border-rose-800', light: 'bg-rose-50 text-rose-700 border-rose-200' },
    increasing: { label: 'Increasing', icon: TrendingUp, dark: 'bg-emerald-950/80 text-emerald-400 border-emerald-800', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    decreasing: { label: 'Decreasing', icon: TrendingDown, dark: 'bg-rose-950/80 text-rose-400 border-rose-800', light: 'bg-rose-50 text-rose-700 border-rose-200' },
    stable: { label: 'Stable', icon: Minus, dark: 'bg-slate-800 text-slate-300 border-slate-700', light: 'bg-slate-100 text-slate-700 border-slate-200' }
  };

  const key = status.toLowerCase();
  const cfg = configs[key] || configs.good;
  const Icon = cfg.icon;
  const style = isDarkMode ? cfg.dark : cfg.light;
  const displayLabel = label || cfg.label;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${style}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{displayLabel}</span>
    </span>
  );
}
