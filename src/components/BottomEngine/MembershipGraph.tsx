import React from 'react';

interface MembershipGraphProps {
  title: string;
  labels: string[];
  values: number[];
  color: 'cyan' | 'purple' | 'orange';
}

export const MembershipGraph: React.FC<MembershipGraphProps> = ({
  title,
  labels,
  values,
  color,
}) => {
  const isCyan = color === 'cyan';
  const isPurple = color === 'purple';

  const titleColor = isCyan
    ? 'text-[#28b8ff]'
    : isPurple
    ? 'text-[#c084fc]'
    : 'text-[#ff9d3d]';

  const strokeColor = isCyan ? '#28b8ff' : isPurple ? '#a45cff' : '#ff9d3d';
  const fillColor = isCyan
    ? 'rgba(40, 184, 255, 0.4)'
    : isPurple
    ? 'rgba(164, 92, 255, 0.4)'
    : 'rgba(255, 157, 61, 0.4)';

  const activeFill = isCyan
    ? 'rgba(40, 184, 255, 0.7)'
    : isPurple
    ? 'rgba(164, 92, 255, 0.7)'
    : 'rgba(255, 157, 61, 0.7)';

  return (
    <div className="bg-[#050c18]/80 border border-[#112642] rounded-xl p-2.5 flex flex-col justify-between h-full">
      {/* Title */}
      <span className={`text-[10.5px] font-bold tracking-wider uppercase font-orbitron ${titleColor} mb-1 block`}>
        {title}
      </span>

      {/* Labels row */}
      <div className="flex justify-around text-[9px] font-mono font-semibold text-slate-400 mb-1">
        {labels.map((lbl) => (
          <span key={lbl}>{lbl}</span>
        ))}
      </div>

      {/* SVG Triangular Curves (Taller & Richer Canvas) */}
      <div className="h-16 w-full bg-[#02060c] rounded border border-[#0d1d33] p-1 flex items-center justify-center">
        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Subtle Grid */}
          <line x1="0" y1="20" x2="200" y2="20" stroke="#0e1f36" strokeWidth="0.8" strokeDasharray="2" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="#0e1f36" strokeWidth="0.8" strokeDasharray="2" />
          <line x1="0" y1="58" x2="200" y2="58" stroke="#102540" strokeWidth="1" />

          {/* Render each triangle based on count */}
          {labels.map((_, i) => {
            const count = labels.length;
            const step = 200 / count;
            const center = step * i + step / 2;
            const left = Math.max(0, center - step * 0.85);
            const right = Math.min(200, center + step * 0.85);
            const val = values[i] || 0;
            const height = 55 * Math.max(0.15, val); // Scaled by membership degree

            return (
              <polygon
                key={i}
                points={`${left},58 ${center},${58 - height} ${right},58`}
                fill={val > 0 ? activeFill : fillColor}
                stroke={strokeColor}
                strokeWidth={val > 0 ? '1.5' : '1'}
                opacity={val > 0 ? 1 : 0.4}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* Values row below */}
      <div className="flex justify-around text-[10px] font-mono font-bold mt-1">
        {values.map((v, i) => (
          <span
            key={i}
            className={
              v > 0
                ? `${titleColor} drop-shadow-[0_0_6px_currentColor]`
                : 'text-slate-500'
            }
          >
            {v.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
};
