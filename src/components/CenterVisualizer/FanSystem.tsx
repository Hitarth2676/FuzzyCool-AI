import React from 'react';

interface FanSystemProps {
  fanSpeed: number; // 0 - 100%
  fanRpm: number;
}

export const FanSystem: React.FC<FanSystemProps> = ({ fanSpeed, fanRpm }) => {
  // Rotation duration in seconds (dynamic based on fanSpeed)
  const rotationDuration = Math.max(0.35, 3.6 - (fanSpeed / 100) * 3.1);

  const fans = [0, 1, 2];

  return (
    <div className="flex flex-col items-center justify-between h-full w-full py-1">
      {/* Radiator Header */}
      <div className="text-center mb-1 w-full">
        <h3 className="text-xs font-bold tracking-widest text-[#28b8ff] uppercase font-orbitron drop-shadow-[0_0_10px_rgba(40,184,255,0.7)]">
          FAN SYSTEM
        </h3>
        <p className="text-[9px] font-mono text-slate-400 tracking-wider">
          360mm RADIATOR
        </p>
      </div>

      {/* Single Continuous 360mm Industrial Metal Radiator Chassis */}
      <div className="relative w-[136px] bg-gradient-to-r from-[#0b1422] via-[#121f33] to-[#0b1422] border-2 border-[#1c3a61] rounded-2xl p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_0_15px_rgba(0,0,0,0.9)] flex flex-col items-center my-auto">
        {/* Radiator Top & Bottom Metal Brackets */}
        <div className="w-full h-2.5 bg-gradient-to-r from-[#2a4569] via-[#17283d] to-[#2a4569] rounded-t-lg border-b border-[#0d1c2e] flex items-center justify-around px-2 mb-1">
          <div className="w-1 h-1 rounded-full bg-[#5a7da8]" />
          <div className="w-1 h-1 rounded-full bg-[#5a7da8]" />
          <div className="w-1 h-1 rounded-full bg-[#5a7da8]" />
        </div>

        {/* 3 Perfectly Vertically Aligned Fans */}
        <div className="flex flex-col w-full divide-y-2 divide-[#162d4a]">
          {fans.map((fanIdx) => (
            <div key={fanIdx} className="relative w-full py-1 flex items-center justify-center">
              {/* Square Heavy-Duty Fan Casing (122px x 122px) */}
              <div className="relative w-[122px] h-[122px] bg-gradient-to-br from-[#182333] via-[#0d1522] to-[#040810] border border-[#1e3d63] rounded-xl p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.9),inset_0_0_12px_rgba(0,0,0,0.95)] flex items-center justify-center">
                {/* 4 Heavy Silver Socket Bolts with Recessed Washers */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#8faecf] to-[#3a526e] border border-[#d6e5f5] shadow-[0_0_4px_rgba(214,229,245,0.6)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#0b131e] rounded-full" />
                </div>
                <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#8faecf] to-[#3a526e] border border-[#d6e5f5] shadow-[0_0_4px_rgba(214,229,245,0.6)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#0b131e] rounded-full" />
                </div>
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#8faecf] to-[#3a526e] border border-[#d6e5f5] shadow-[0_0_4px_rgba(214,229,245,0.6)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#0b131e] rounded-full" />
                </div>
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#8faecf] to-[#3a526e] border border-[#d6e5f5] shadow-[0_0_4px_rgba(214,229,245,0.6)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#0b131e] rounded-full" />
                </div>

                {/* Circular Stepped Bezel with Intense Cyan Halo */}
                <div className="relative w-full h-full rounded-full bg-[#02050c] border-2 border-[#28b8ff] shadow-[0_0_16px_rgba(40,184,255,0.7),inset_0_0_12px_rgba(40,184,255,0.4)] flex items-center justify-center overflow-hidden">
                  {/* Rotating 7-Blade Impeller SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{
                      animation: `fanRotate ${rotationDuration}s linear infinite`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <defs>
                      <linearGradient id={`fanBladeGrad-${fanIdx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#415d82" />
                        <stop offset="35%" stopColor="#223752" />
                        <stop offset="70%" stopColor="#0e1b2b" />
                        <stop offset="100%" stopColor="#040912" />
                      </linearGradient>
                      <linearGradient id={`bladeHighlight-${fanIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#99d6ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#1a3d69" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Outer Shroud Rings */}
                    <circle cx="50" cy="50" r="47" stroke="#163961" strokeWidth="1.5" fill="none" />
                    <circle cx="50" cy="50" r="44" stroke="#0a1a2e" strokeWidth="2" fill="none" />

                    {/* 7 Curved Aerodynamic Rotor Blades */}
                    {[0, 51.4, 102.8, 154.2, 205.6, 257.0, 308.4].map((angle, i) => (
                      <g key={i} transform={`rotate(${angle} 50 50)`}>
                        <path
                          d="M 50 50 Q 66 18 92 24 Q 82 46 50 50 Z"
                          fill={`url(#fanBladeGrad-${fanIdx})`}
                          stroke="#28b8ff"
                          strokeWidth="0.7"
                          strokeOpacity="0.5"
                        />
                        {/* Leading Edge Specular Highlight */}
                        <path
                          d="M 54 44 Q 68 21 90 25"
                          stroke={`url(#bladeHighlight-${fanIdx})`}
                          strokeWidth="1"
                          fill="none"
                        />
                      </g>
                    ))}

                    {/* Stator Motor Hub */}
                    <circle cx="50" cy="50" r="18" fill="#101f33" stroke="#224875" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="14" fill="#060e1a" stroke="#28b8ff" strokeWidth="1.2" strokeOpacity="0.8" />
                    <circle cx="50" cy="50" r="8" fill="#142842" />
                    <circle cx="50" cy="50" r="4" fill="#28b8ff" opacity="0.9" />
                  </svg>

                  {/* Center Metal Cap with Rivet */}
                  <div className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-[#416899] via-[#162a45] to-[#060e1a] border border-[#28b8ff] flex items-center justify-center shadow-[0_0_10px_rgba(40,184,255,0.85)] pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28b8ff] opacity-90 animate-ping" />
                    <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_5px_white]" />
                  </div>
                </div>
              </div>

              {/* Airflow Arrow Chevrons Radiating Rightward */}
              <div className="absolute -right-8 flex items-center space-x-0.5 pointer-events-none z-30">
                <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 24">
                  <path
                    d="M 2 12 L 10 12 M 7 7 L 12 12 L 7 17"
                    stroke="#28b8ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-arrow-pulse"
                    style={{ animationDelay: `${fanIdx * 0.2}s` }}
                    filter="drop-shadow(0 0 6px #28b8ff)"
                  />
                  <path
                    d="M 14 12 L 22 12 M 19 7 L 24 12 L 19 17"
                    stroke="#28b8ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-arrow-pulse"
                    style={{ animationDelay: `${fanIdx * 0.2 + 0.3}s` }}
                    filter="drop-shadow(0 0 6px #28b8ff)"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Radiator Bottom Rail Bracket */}
        <div className="w-full h-2.5 bg-gradient-to-r from-[#2a4569] via-[#17283d] to-[#2a4569] rounded-b-lg border-t border-[#0d1c2e] flex items-center justify-around px-2 mt-1">
          <div className="w-1 h-1 rounded-full bg-[#5a7da8]" />
          <div className="w-1 h-1 rounded-full bg-[#5a7da8]" />
          <div className="w-1 h-1 rounded-full bg-[#5a7da8]" />
        </div>
      </div>

      {/* Fan Speed Telemetry Plate */}
      <div className="w-[136px] bg-[#050f20]/95 border-2 border-[#193c69] rounded-xl py-2 px-3 text-center mt-1 shadow-[0_6px_16px_rgba(0,0,0,0.8),inset_0_0_12px_rgba(15,35,70,0.7)]">
        <span className="block text-[9px] font-bold text-slate-400 tracking-widest uppercase font-rajdhani">
          FAN SPEED
        </span>
        <span className="text-2xl font-black font-mono text-[#28b8ff] drop-shadow-[0_0_12px_rgba(40,184,255,0.9)] leading-tight block">
          {fanSpeed.toFixed(1)}%
        </span>
        <span className="block text-[11px] font-mono text-slate-400 font-semibold">
          ~{fanRpm} RPM
        </span>
      </div>
    </div>
  );
};
