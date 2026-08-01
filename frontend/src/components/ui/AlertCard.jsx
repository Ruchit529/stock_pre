import React from 'react';
import { AlertTriangle, Info, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function AlertCard({
  type = 'warning', // 'warning' | 'info' | 'success' | 'danger'
  title,
  message,
  isDarkMode = true,
  className = ''
}) {
  const configs = {
    warning: {
      icon: AlertTriangle,
      dark: 'bg-amber-950/40 border-amber-800/80 text-amber-300',
      iconColor: 'text-amber-400',
      light: 'bg-amber-50 border-amber-300 text-amber-900'
    },
    danger: {
      icon: AlertOctagon,
      dark: 'bg-rose-950/40 border-rose-800/80 text-rose-300',
      iconColor: 'text-rose-400',
      light: 'bg-rose-50 border-rose-300 text-rose-900'
    },
    info: {
      icon: Info,
      dark: 'bg-blue-950/40 border-blue-800/80 text-blue-300',
      iconColor: 'text-blue-400',
      light: 'bg-blue-50 border-blue-300 text-blue-900'
    },
    success: {
      icon: CheckCircle2,
      dark: 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300',
      iconColor: 'text-emerald-400',
      light: 'bg-emerald-50 border-emerald-300 text-emerald-900'
    }
  };

  const cfg = configs[type] || configs.warning;
  const Icon = cfg.icon;
  const containerStyle = isDarkMode ? cfg.dark : cfg.light;

  return (
    <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${containerStyle} ${className}`}>
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.iconColor}`} />
      <div className="text-xs space-y-1">
        {title && <h4 className="font-bold uppercase tracking-tight text-xs">{title}</h4>}
        {message && <p className="font-normal leading-relaxed opacity-95 text-[11px]">{message}</p>}
      </div>
    </div>
  );
}
