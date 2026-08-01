import React from 'react';

export default function Badge({
  children,
  variant = 'blue', // 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'slate'
  size = 'md', // 'sm' | 'md'
  isDarkMode = true,
  className = ''
}) {
  const darkVariants = {
    blue: 'bg-blue-950/80 text-blue-400 border-blue-800/80',
    emerald: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
    amber: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
    rose: 'bg-rose-950/80 text-rose-400 border-rose-800/80',
    purple: 'bg-purple-950/80 text-purple-400 border-purple-800/80',
    slate: 'bg-slate-800 text-slate-300 border-slate-700'
  };

  const lightVariants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const sizes = {
    sm: 'text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider',
    md: 'text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-wider'
  };

  const variantClass = isDarkMode ? darkVariants[variant] : lightVariants[variant];

  return (
    <span className={`inline-flex items-center gap-1 rounded border font-semibold ${variantClass} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
