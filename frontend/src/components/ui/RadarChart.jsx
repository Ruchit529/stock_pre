import React from 'react';

export default function RadarChart({ scores, isDarkMode = true }) {
  // Axes: Growth, Profitability, Efficiency, Financial Health, Valuation, Quality
  const labels = [
    { key: 'growth', label: 'Growth' },
    { key: 'profitability', label: 'Profitability' },
    { key: 'efficiency', label: 'Efficiency' },
    { key: 'financialHealth', label: 'Financial Health' },
    { key: 'valuation', label: 'Valuation' },
    { key: 'quality', label: 'Quality' }
  ];

  const center = 110;
  const radius = 70;
  const totalAxes = labels.length;

  // Calculate points for grid polygon levels (20%, 40%, 60%, 80%, 100%)
  const getPolygonPoints = (r) => {
    return labels.map((_, i) => {
      const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate data polygon points
  const dataPoints = labels.map((item, i) => {
    const val = scores?.[item.key] ?? 75;
    const r = (val / 100) * radius;
    const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate label positions slightly outside radius
  const labelPositions = labels.map((item, i) => {
    const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
    const r = radius + 22;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { ...item, x, y };
  });

  return (
    <div className="relative w-full max-w-[260px] mx-auto aspect-square flex items-center justify-center">
      <svg viewBox="0 0 220 220" className="w-full h-full overflow-visible">
        {/* Background Grid Rings */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
          <polygon
            key={idx}
            points={getPolygonPoints(radius * level)}
            fill="none"
            stroke={isDarkMode ? '#334155' : '#cbd5e1'}
            strokeWidth={idx === 4 ? '1.5' : '1'}
            strokeDasharray={idx === 4 ? 'none' : '2,2'}
          />
        ))}

        {/* Axis Lines from center */}
        {labels.map((_, i) => {
          const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke={isDarkMode ? '#334155' : '#cbd5e1'}
              strokeWidth="1"
            />
          );
        })}

        {/* Data Filled Polygon */}
        <polygon
          points={dataPoints}
          fill={isDarkMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.2)'}
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Data Vertices Dots */}
        {labels.map((item, i) => {
          const val = scores?.[item.key] ?? 75;
          const r = (val / 100) * radius;
          const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#10b981"
              stroke={isDarkMode ? '#0f172a' : '#ffffff'}
              strokeWidth="1.5"
            />
          );
        })}

        {/* Outer Axis Text Labels */}
        {labelPositions.map((lp, i) => (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-[9px] font-bold ${isDarkMode ? 'fill-slate-300' : 'fill-slate-600'}`}
          >
            {lp.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
