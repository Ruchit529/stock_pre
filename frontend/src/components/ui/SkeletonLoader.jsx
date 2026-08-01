import React from 'react';

export default function SkeletonLoader({
  count = 3,
  height = 'h-12',
  isDarkMode = true,
  className = ''
}) {
  return (
    <div className={`space-y-3 w-full animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`w-full rounded-xl ${height} ${
            isDarkMode ? 'bg-slate-800/60' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  );
}
