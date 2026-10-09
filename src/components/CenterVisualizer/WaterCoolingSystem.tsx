import React from 'react';

interface WaterCoolingSystemProps {
  pumpSpeed: number; // 0 - 100%
  pumpRpm: number;
}

export const WaterCoolingSystem: React.FC<WaterCoolingSystemProps> = ({
  pumpSpeed,
}) => {
  // Impeller rotation duration based on pump speed
  const impellerDuration = Math.max(0.3, 3 - (pumpSpeed / 100) * 2.5);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full py-1">
      {/* Section Header */}
      <div className="text-center mb-1 w-full">
        <h3 className="text-xs font-bold tracking-widest text-[#28b8ff] uppercase font-orbitron drop-shadow-[0_0_10px_rgba(40,184,255,0.7)]">
          WATER COOLING SYSTEM
        </h3>
      </div>

      {/* Assembly: Transparent Glass Cylinder Reservoir Directly Coupled to Industrial Pump */}
      <div className="flex flex-col items-center justify-center my-auto w-full space-y-1.5">
        {/* ========================================================================= */}
        {/* 1. TALL TRANSPARENT CYLINDRICAL GLASS RESERVOIR */}
        {/* Dimensions: 105px wide x 215px tall */}
        {/* ========================================================================= */}
        <div className="relative flex items-center justify-center">
          {/* Glass Cylinder Body */}
          <div className="relative w-[100px] h-[210px] bg-gradient-to-r from-[#0d2238]/95 via-[#061220]/75 to-[#0d2238]/95 border-x-2 border-[#28b8ff]/70 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.95),0_0_25px_rgba(40,184,255,0.4),inset_0_0_20px_rgba(40,184,255,0.25)] flex flex-col justify-end overflow-hidden">
            {/* Top Brushed-Aluminum Cap with Knurled Compression Collar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#64748b] via-[#334155] to-[#0f172a] border-b-2 border-[#28b8ff] flex items-center justify-center shadow-lg z-20">
              <div className="w-14 h-3 rounded-full bg-[#09111c] border border-[#28b8ff] shadow-[0_0_8px_#28b8ff]" />
              <div className="absolute top-1.5 left-3 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_2px_white]" />
              <div className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_2px_white]" />
            </div>

            {/* Left Outflow Port Fitting attached to Top Cap */}
            <div className="absolute top-1 -left-3.5 w-4 h-6 bg-gradient-to-r from-[#475569] to-[#1e293b] border border-[#28b8ff] rounded-l shadow-md z-30 flex items-center justify-center">
              <div className="w-1 h-3 bg-[#28b8ff] rounded-full shadow-[0_0_4px_#28b8ff]" />
            </div>

            {/* Bottom Brushed-Aluminum Mounting Base */}
            <div className="absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-[#64748b] via-[#334155] to-[#0f172a] border-t-2 border-[#28b8ff] z-20 flex items-center justify-center">
              <div className="w-16 h-1.5 rounded-full bg-[#09111c] border border-[#28b8ff]/40" />
            </div>

            {/* Pressurized Luminous Cyan Coolant Liquid */}
            <div
              className="relative w-full bg-gradient-to-t from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] opacity-90 transition-all duration-500 shadow-[0_0_35px_rgba(56,189,248,0.9)]"
              style={{ height: '80%' }}
            >
              {/* Surface Meniscus Wave with Glow */}
              <div className="absolute -top-2 left-0 right-0 h-4 bg-gradient-to-r from-[#7dd3fc] via-white to-[#7dd3fc] opacity-95 rounded-full blur-[0.5px] animate-pulse shadow-[0_0_10px_white]" />

              {/* Rising Drifting Micro-Bubbles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-white/95 shadow-[0_0_8px_white] bubble-1" />
                <div className="absolute bottom-8 left-11 w-3 h-3 rounded-full bg-white/90 shadow-[0_0_8px_white] bubble-2" />
                <div className="absolute bottom-4 left-16 w-2 h-2 rounded-full bg-white/95 shadow-[0_0_6px_white] bubble-3" />
                <div className="absolute bottom-14 left-7 w-2.5 h-2.5 rounded-full bg-white/90 shadow-[0_0_8px_white] bubble-4" />
                <div className="absolute bottom-6 left-13 w-3 h-3 rounded-full bg-white/80 shadow-[0_0_6px_white] bubble-5" />
              </div>

              {/* Glass Cylindrical Specular Highlight Streak (Left edge) */}
              <div className="absolute top-0 bottom-0 left-3 w-3 bg-gradient-to-r from-white/40 via-white/10 to-transparent rounded-full blur-[0.5px] pointer-events-none" />
              {/* Glass Highlight (Right edge) */}
              <div className="absolute top-0 bottom-0 right-3 w-1.5 bg-gradient-to-l from-white/30 to-transparent rounded-full blur-[0.5px] pointer-events-none" />
            </div>
          </div>

          {/* Measurement Percentage Scale on Right */}
          <div className="flex flex-col justify-between h-44 pl-3 text-[11px] font-mono text-slate-200 font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-1 bg-[#28b8ff] shadow-[0_0_6px_#28b8ff]" />
              <span className="text-[#38bdf8] drop-shadow-[0_0_4px_#38bdf8]">100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-slate-400" />
              <span>75%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-slate-400" />
              <span>50%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-slate-400" />
              <span>25%</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HEAVY INDUSTRIAL WATER PUMP HARDWARE */}
        {/* Dimensions: 145px wide x 145px tall */}
        {/* ========================================================================= */}
        <div className="relative w-[145px] h-[145px] bg-gradient-to-br from-[#1c2c42] via-[#0d1829] to-[#040810] border-2 border-[#204e82] rounded-2xl p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(0,0,0,0.98)] flex flex-col items-center justify-center">
          {/* 4 Heavy-Duty Silver Allen Bolt Heads in Corners */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#e2e8f0] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.7)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-sm" />
          </div>
          <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#e2e8f0] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.7)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-sm" />
          </div>
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#e2e8f0] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.7)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-sm" />
          </div>
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#e2e8f0] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.7)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-sm" />
          </div>

          {/* Left Inflow Fitting (Hot coolant in) */}
          <div className="absolute top-6 -left-3.5 w-4 h-6 bg-gradient-to-r from-[#4a080f] to-[#1e293b] border border-[#ff3b3b] rounded-l shadow-md z-30 flex items-center justify-center">
            <div className="w-1 h-3 bg-[#ff3b3b] rounded-full shadow-[0_0_4px_#ff3b3b]" />
          </div>

          {/* Left Outflow Fitting (Cold coolant out) */}
          <div className="absolute bottom-6 -left-3.5 w-4 h-6 bg-gradient-to-r from-[#475569] to-[#1e293b] border border-[#28b8ff] rounded-l shadow-md z-30 flex items-center justify-center">
            <div className="w-1 h-3 bg-[#28b8ff] rounded-full shadow-[0_0_4px_#28b8ff]" />
          </div>

          {/* Large Circular Impeller Window with Concentric Machined Rings */}
          <div className="relative w-24 h-24 rounded-full bg-[#02060d] border-2 border-[#28b8ff] shadow-[0_0_22px_rgba(40,184,255,0.75),inset_0_0_16px_rgba(40,184,255,0.5)] flex items-center justify-center overflow-hidden">
            {/* Spinning Turbine Impeller SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{
                animation: `pumpImpeller ${impellerDuration}s linear infinite`,
                transformOrigin: '50% 50%',
              }}
            >
              <defs>
                <linearGradient id="pumpTurbineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#034e7b" />
                </linearGradient>
              </defs>

              <g fill="none">
                <circle cx="50" cy="50" r="47" stroke="#163961" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="40" stroke="#0e243d" strokeWidth="1.5" strokeDasharray="5" />
                <circle cx="50" cy="50" r="32" stroke="#143457" strokeWidth="1" />

                {/* 6 Curved High-Pressure Impeller Vanes */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <path
                    key={i}
                    d="M 50 50 Q 72 26 92 44 Q 74 64 50 50 Z"
                    fill="url(#pumpTurbineGrad)"
                    stroke="#28b8ff"
                    strokeWidth="1"
                    transform={`rotate(${deg} 50 50)`}
                  />
                ))}
              </g>
            </svg>

            {/* Center Impeller Chrome Cap */}
            <div className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-[#476e9e] via-[#14263e] to-[#040c17] border border-[#28b8ff] shadow-[0_0_10px_#28b8ff] flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-white animate-ping opacity-90" />
              <div className="absolute w-2 h-2 rounded-full bg-[#28b8ff]" />
            </div>
          </div>
        </div>

        {/* Pump Speed Readout */}
        <div className="text-center pt-0.5">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-rajdhani">
            PUMP
          </span>
          <span className="text-2xl font-black font-mono text-[#28b8ff] drop-shadow-[0_0_14px_rgba(40,184,255,0.95)] leading-tight block">
            {pumpSpeed.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
