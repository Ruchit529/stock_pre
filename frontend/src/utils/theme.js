export const THEMES = [
  { id: 'midnight', name: 'Midnight Emerald', color: '#059669', isDark: true },
  { id: 'graphite', name: 'Obsidian Teal', color: '#0891b2', isDark: true },
  { id: 'corporate', name: 'Corporate Blue', color: '#2563eb', isDark: true },
  { id: 'light', name: 'Classic Light', color: '#1e3a8a', isDark: false }
];

export function getThemeStyles(themeId = 'midnight') {
  switch (themeId) {
    case 'graphite':
      return {
        bgMain: 'bg-[#0e1017] text-zinc-100',
        bgHeader: 'bg-[#12141d] border-zinc-800 text-zinc-100',
        bgCard: 'bg-[#161922] border-zinc-800 text-zinc-100',
        bgSubtle: 'bg-[#1e222e] border-zinc-700',
        textPrimary: 'text-zinc-100',
        textSecondary: 'text-zinc-400',
        textMuted: 'text-zinc-500',
        border: 'border-zinc-800',
        accentBg: 'bg-cyan-700 text-white',
        accentBtn: 'bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-600',
        accentText: 'text-cyan-400',
        accentBadge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
        isDark: true
      };
    case 'corporate':
      return {
        bgMain: 'bg-[#0f172a] text-slate-100',
        bgHeader: 'bg-[#0f172a] border-slate-800 text-slate-100',
        bgCard: 'bg-[#1e293b] border-slate-800 text-slate-100',
        bgSubtle: 'bg-[#334155] border-slate-700',
        textPrimary: 'text-slate-100',
        textSecondary: 'text-slate-400',
        textMuted: 'text-slate-500',
        border: 'border-slate-800',
        accentBg: 'bg-blue-700 text-white',
        accentBtn: 'bg-blue-700 hover:bg-blue-600 text-white border border-blue-600',
        accentText: 'text-blue-400',
        accentBadge: 'bg-blue-950/80 text-blue-300 border-blue-800',
        isDark: true
      };
    case 'light':
      return {
        bgMain: 'bg-[#f8fafc] text-slate-900',
        bgHeader: 'bg-white border-slate-200 text-slate-900 shadow-sm',
        bgCard: 'bg-white border-slate-200 text-slate-900 shadow-sm',
        bgSubtle: 'bg-slate-100 border-slate-200',
        textPrimary: 'text-slate-900',
        textSecondary: 'text-slate-600',
        textMuted: 'text-slate-500',
        border: 'border-slate-200',
        accentBg: 'bg-blue-800 text-white',
        accentBtn: 'bg-blue-800 hover:bg-blue-900 text-white border border-blue-900 shadow-sm',
        accentText: 'text-blue-800',
        accentBadge: 'bg-blue-50 text-blue-800 border-blue-200',
        isDark: false
      };
    case 'midnight':
    default:
      return {
        bgMain: 'bg-[#090e1a] text-slate-100',
        bgHeader: 'bg-[#0b1325] border-slate-800/90 text-slate-100',
        bgCard: 'bg-[#111a2e] border-slate-800/90 text-slate-100',
        bgSubtle: 'bg-[#18243c] border-slate-700/80',
        textPrimary: 'text-slate-100',
        textSecondary: 'text-slate-400',
        textMuted: 'text-slate-500',
        border: 'border-slate-800',
        accentBg: 'bg-emerald-700 text-white',
        accentBtn: 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-600 shadow-sm',
        accentText: 'text-emerald-400',
        accentBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
        isDark: true
      };
  }
}
