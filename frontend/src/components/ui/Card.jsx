import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  icon: Icon = null,
  headerAction,
  className = '',
  isDarkMode = true,
  padding = 'p-4 sm:p-5'
}) {
  return (
    <div className={`rounded-xl border transition-colors ${padding} ${
      isDarkMode
        ? 'bg-[#131926] border-slate-800 text-slate-100 shadow-sm'
        : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    } ${className}`}>
      {(title || Icon || headerAction) && (
        <div className={`flex items-center justify-between pb-3 mb-4 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-slate-800 text-blue-400 border border-slate-700' : 'bg-slate-100 text-blue-700 border border-slate-200'
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            )}
            <div>
              {title && (
                <h3 className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-900'
                }`}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-[11px] font-normal mt-0.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
