import React from 'react';

interface DefuzzificationChartProps {
  pumpOutput: number;
  fanOutput: number;
}

export const DefuzzificationChart: React.FC<DefuzzificationChartProps> = ({
  pumpOutput,
  fanOutput,
}) => {
  // Centroid vertical line position (0 to 200 on X-axis)
  const avgOutput = (pumpOutput + fanOutput) / 2;
  const centroidX = Math.min(190, Math.max(10, (avgOutput / 100) * 200));

  return (
    <div className="bg-[#050c18]/80 border border-[#112642] rounded-xl p-2.5 flex flex-col justify-between h-full">
      {/* Title */}
      <span className="text-[11px] font-bold tracking-wider uppercase font-orbitron text-[#28b8ff] mb-1.5 block">
        DEFUZZIFICATION (CENTROID)
      </span>

      {/* SVG Centroid Bell Curve */}
      <div className="h-16 w-full bg-[#02060c] rounded border border-[#0d1d33] p-1 relative flex items-center justify-center">
        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            {/* Cyan to Purple Gradient Fill */}
            <linearGradient id="centroidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#28b8ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
            </linearGradient>

            {/* Cyan to Purple Stroke */}
            <linearGradient id="centroidStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#28b8ff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2="200" y2="20" stroke="#0e1f36" strokeWidth="0.8" strokeDasharray="3" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="#0e1f36" strokeWidth="0.8" strokeDasharray="3" />
          <line x1="0" y1="58" x2="200" y2="58" stroke="#102540" strokeWidth="1" />

          {/* Smooth Centroid Bell Curve */}
          <path
            d="M 10 58 C 40 58, 60 40, 100 10 C 140 40, 160 58, 190 58 Z"
            fill="url(#centroidGrad)"
            stroke="url(#centroidStroke)"
            strokeWidth="1.5"
          />

          {/* Vertical Dashed Centroid Line */}
          <line
            x1={centroidX}
            y1="5"
            x2={centroidX}
            y2="58"
            stroke="#28b8ff"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />

          {/* Centroid Peak Dot */}
          <circle cx={centroidX} cy="10" r="3" fill="#28b8ff" className="animate-ping" opacity="0.6" />
          <circle cx={centroidX} cy="10" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Bottom Output Metrics */}
      <div className="grid grid-cols-2 gap-2 mt-1.5 pt-1.5 border-t border-[#0e213b]">
        <div>
          <span className="text-[9px] font-mono text-slate-400 block uppercase">
            PUMP OUTPUT
          </span>
          <span className="text-sm font-bold font-mono text-[#28b8ff] drop-shadow-[0_0_6px_rgba(40,184,255,0.7)]">
            {pumpOutput.toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="text-[9px] font-mono text-slate-400 block uppercase">
            FAN OUTPUT
          </span>
          <span className="text-sm font-bold font-mono text-[#c084fc] drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]">
            {fanOutput.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
