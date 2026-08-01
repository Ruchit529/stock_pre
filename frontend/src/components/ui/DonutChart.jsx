import React from 'react';

export default function DonutChart({ stats, isDarkMode = true }) {
  const total = stats.total || 45;
  const data = [
    { label: 'Excellent (8.5+)', count: stats.excellent || 12, color: '#10b981' },
    { label: 'Good (6.5 - 8.5)', count: stats.good || 18, color: '#3b82f6' },
    { label: 'Watch (4.5 - 6.5)', count: stats.watch || 9, color: '#f59e0b' },
    { label: 'Avoid (<4.5)', count: stats.avoid || 6, color: '#ef4444' }
  ];

  const size = 140;
  const strokeWidth = 22;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeAngle = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      {/* SVG Donut Chart */}
      <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
          {data.map((item, idx) => {
            const strokeDasharray = `${(item.count / total) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativeAngle;
            cumulativeAngle += (item.count / total) * circumference;

            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Total
          </span>
          <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {total}
          </span>
        </div>
      </div>

      {/* Legend List */}
      <div className="space-y-2 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.label}</span>
            </div>
            <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
