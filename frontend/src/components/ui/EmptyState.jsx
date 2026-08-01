import React from 'react';
import { SearchX, FolderOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No Data Available',
  description = 'No results matched your query. Please try searching for another company or clearing your filters.',
  icon: Icon = SearchX,
  actionLabel = null,
  onAction = null,
  isDarkMode = true
}) {
  return (
    <div className={`p-10 rounded-2xl border text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto my-8 ${
      isDarkMode ? 'bg-[#131926]/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-extrabold text-sm uppercase tracking-tight">{title}</h3>
        <p className={`text-xs leading-relaxed max-w-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
