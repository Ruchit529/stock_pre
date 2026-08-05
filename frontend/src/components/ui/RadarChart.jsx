import React from 'react';

export default function RadarChart({ scores, isDarkMode = false }) {
  // 5-axis layout: Quality, Growth, Profitability, Valuation, Moat
  const defaultScores = {
    quality: 8.1,
    growth: 8.2,
    profitability: 8.6,
    valuation: 6.8,
    moat: 8.5
  };

  const currentScores = scores ? {
    quality: scores.quality ? (scores.quality > 10 ? (scores.quality / 10).toFixed(1) : Number(scores.quality).toFixed(1)) : '8.1',
    growth: scores.growth ? (scores.growth > 10 ? (scores.growth / 10).toFixed(1) : Number(scores.growth).toFixed(1)) : '8.2',
    profitability: scores.profitability ? (scores.profitability > 10 ? (scores.profitability / 10).toFixed(1) : Number(scores.profitability).toFixed(1)) : '8.6',
    valuation: scores.valuation ? (scores.valuation > 10 ? (scores.valuation / 10).toFixed(1) : Number(scores.valuation).toFixed(1)) : '6.8',
    moat: scores.moat ? (scores.moat > 10 ? (scores.moat / 10).toFixed(1) : Number(scores.moat).toFixed(1)) : '8.5'
  } : defaultScores;

  const axes = [
    { label: 'Growth', key: 'growth', val: parseFloat(currentScores.growth) },
    { label: 'Profitability', key: 'profitability', val: parseFloat(currentScores.profitability) },
    { label: 'Valuation', key: 'valuation', val: parseFloat(currentScores.valuation) },
    { label: 'Moat', key: 'moat', val: parseFloat(currentScores.moat) },
    { label: 'Quality', key: 'quality', val: parseFloat(currentScores.quality) }
  ];

  const center = 90;
  const radius = 54;
  const totalAxes = axes.length;

  // Points for pentagon grid rings (20%, 40%, 60%, 80%, 100%)
  const getPolygonPoints = (r) => {
    return axes.map((_, i) => {
      const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Data polygon points
  const dataPoints = axes.map((item, i) => {
    const norm = Math.min(10, Math.max(0, item.val)) / 10;
    const r = norm * radius;
    const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Label positions outside polygon
  const labelPositions = axes.map((item, i) => {
    const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
    const r = radius + 18;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { ...item, x, y };
  });

  return (
    <div className="relative w-full max-w-[185px] mx-auto aspect-square flex items-center justify-center p-1">
      <svg viewBox="0 0 180 180" className="w-full h-full overflow-visible">
        {/* Background Grid Concentric Pentagons */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
          <polygon
            key={idx}
            points={getPolygonPoints(radius * level)}
            fill="none"
            stroke={isDarkMode ? '#334155' : '#cbd5e1'}
            strokeWidth={idx === 4 ? '1.2' : '0.8'}
          />
        ))}

        {/* Axis Spokes from Center */}
        {axes.map((_, i) => {
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

        {/* Blue Filled Data Polygon */}
        <polygon
          points={dataPoints}
          fill={isDarkMode ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.18)'}
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Data Points (Blue Vertices) */}
        {axes.map((item, i) => {
          const norm = Math.min(10, Math.max(0, item.val)) / 10;
          const r = norm * radius;
          const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#3b82f6"
              stroke={isDarkMode ? '#0f172a' : '#ffffff'}
              strokeWidth="1.5"
            />
          );
        })}

        {/* Outer Axis Labels & Scores */}
        {labelPositions.map((lp, i) => (
          <g key={i}>
            <text
              x={lp.x}
              y={lp.y - 5}
              textAnchor="middle"
              className={`text-[8.5px] font-medium ${isDarkMode ? 'fill-slate-300' : 'fill-slate-600'}`}
            >
              {lp.label}
            </text>
            <text
              x={lp.x}
              y={lp.y + 5}
              textAnchor="middle"
              className={`text-[9px] font-bold ${isDarkMode ? 'fill-white' : 'fill-slate-900'}`}
            >
              {lp.val.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
