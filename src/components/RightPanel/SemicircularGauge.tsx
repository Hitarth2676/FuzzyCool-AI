import React from 'react';

interface SemicircularGaugeProps {
  value: number; // 0 - 100%
  subValue: string; // e.g. "~4332 RPM"
  title: string;
  icon: React.ReactNode;
  theme: 'cyan' | 'purple';
}

export const SemicircularGauge: React.FC<SemicircularGaugeProps> = ({
  value,
  subValue,
  title,
  icon,
  theme,
}) => {
  // Semicircle parameters
  const radius = 68;
  const cx = 100;
  const cy = 84;
  const strokeWidth = 12;

  // Circumference of semicircle = PI * radius
  const semicircleLength = Math.PI * radius;
  const strokeDashoffset = semicircleLength - (value / 100) * semicircleLength;

  const isCyan = theme === 'cyan';
  const strokeColor = isCyan ? 'url(#cyanGaugeGrad)' : 'url(#purpleGaugeGrad)';
  const textColor = isCyan ? 'text-[#28b8ff]' : 'text-[#c084fc]';
  const textGlow = isCyan
    ? 'drop-shadow-[0_0_12px_rgba(40,184,255,0.85)]'
    : 'drop-shadow-[0_0_12px_rgba(192,132,252,0.85)]';

  // Indicator needle tip angle
  const angle = Math.PI - (value / 100) * Math.PI;
  const pipX = cx + radius * Math.cos(angle);
  const pipY = cy - radius * Math.sin(angle);

  return (
    <div className="w-full bg-[#050c18]/80 border border-[#142944] rounded-xl p-2.5 flex flex-col items-center relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
      {/* Title & Icon Header */}
      <div className="w-full flex items-center justify-start gap-2 mb-0.5">
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center ${
            isCyan
              ? 'bg-[#09223d] text-[#28b8ff] border border-[#28b8ff]/40'
              : 'bg-[#200f38] text-[#c084fc] border border-[#a45cff]/40'
          }`}
        >
          {icon}
        </div>
        <span className="text-xs font-bold tracking-wider text-slate-300 uppercase font-rajdhani">
          {title}
        </span>
      </div>

      {/* SVG Semicircular Dial */}
      <div className="relative w-full max-w-[215px] h-[104px] flex items-center justify-center">
        <svg viewBox="0 0 200 105" className="w-full h-full overflow-visible">
          <defs>
            {/* Cyan Gradient */}
            <linearGradient id="cyanGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Purple Gradient */}
            <linearGradient id="purpleGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7e22ce" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id={`gaugeGlow-${theme}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#0b1728"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Filled Value Arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={semicircleLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={`url(#gaugeGlow-${theme})`}
            className="transition-all duration-500 ease-out"
          />

          {/* Glowing Indicator Pip */}
          <circle
            cx={pipX}
            cy={pipY}
            r={5}
            fill="#ffffff"
            filter={`url(#gaugeGlow-${theme})`}
            className="transition-all duration-500 ease-out"
          />

          {/* Tick Marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const tAngle = Math.PI - (tick / 100) * Math.PI;
            const x1 = cx + (radius - 14) * Math.cos(tAngle);
            const y1 = cy - (radius - 14) * Math.sin(tAngle);
            const x2 = cx + (radius - 9) * Math.cos(tAngle);
            const y2 = cy - (radius - 9) * Math.sin(tAngle);
            return (
              <line
                key={tick}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#1e3a61"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* Center Digital Telemetry Display */}
        <div className="absolute top-9 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black font-mono tracking-tight ${textColor} ${textGlow}`}>
            {value.toFixed(1)}%
          </span>
          <span className="text-[11px] font-mono text-slate-400 mt-0.5">
            {subValue}
          </span>
        </div>

        {/* Min/Max Labels at Semicircle Ends */}
        <div className="absolute bottom-0 left-2 text-[10px] font-mono text-slate-500 font-bold">0%</div>
        <div className="absolute bottom-0 right-2 text-[10px] font-mono text-slate-500 font-bold">100%</div>
      </div>
    </div>
  );
};
