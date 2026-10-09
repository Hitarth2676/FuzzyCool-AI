import React from 'react';
import { SensorInputs, ActuationOutputs } from '../../types/thermal';

interface LiveThermalSystemProps {
  inputs: SensorInputs;
  outputs: ActuationOutputs;
}

export const LiveThermalSystem: React.FC<LiveThermalSystemProps> = ({
  inputs,
  outputs,
}) => {
  const { cpuTemp, gpuTemp } = inputs;
  const { pumpSpeed, pumpRpm, fanSpeed, fanRpm } = outputs;

  // Dynamic animation speeds (visual only - zero layout changes)
  const fanRotationDuration = Math.max(0.2, 3.2 - (fanSpeed / 100) * 3.0);
  const pumpRotationDuration = Math.max(0.25, 2.8 - (pumpSpeed / 100) * 2.5);
  const flowDuration = Math.max(0.6, 3.4 - (pumpSpeed / 100) * 2.7);

  // Smooth interpolated thermal color calculation (visual styling only)
  const getThermalStyle = (temp: number) => {
    if (temp <= 40) {
      return {
        glowColor: 'rgba(56, 189, 248, 0.25)',
        glowIntensity: 0.25,
        strokeColor: '#0284c7',
        textColor: '#38bdf8',
        textShadow: '0 0 8px rgba(56, 189, 248, 0.6)',
        badgeBg: '#09223d',
        badgeBorder: '#0284c7',
        badgeText: '#38bdf8',
        label: 'COOL',
        edgeGlowFilter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.3))',
      };
    } else if (temp <= 70) {
      const ratio = (temp - 40) / 30; // 0 to 1
      return {
        glowColor: `rgba(249, 115, 22, ${0.3 + ratio * 0.35})`,
        glowIntensity: 0.3 + ratio * 0.35,
        strokeColor: '#f97316',
        textColor: '#fb923c',
        textShadow: '0 0 10px rgba(249, 115, 22, 0.7)',
        badgeBg: '#331808',
        badgeBorder: '#ea580c',
        badgeText: '#fb923c',
        label: 'WARM',
        edgeGlowFilter: `drop-shadow(0 0 ${6 + ratio * 6}px rgba(249, 115, 22, 0.45))`,
      };
    } else if (temp <= 85) {
      const ratio = (temp - 70) / 15; // 0 to 1
      return {
        glowColor: `rgba(239, 68, 68, ${0.6 + ratio * 0.3})`,
        glowIntensity: 0.6 + ratio * 0.3,
        strokeColor: '#ef4444',
        textColor: '#ff4d4d',
        textShadow: '0 0 14px rgba(239, 68, 68, 0.85)',
        badgeBg: '#3b1219',
        badgeBorder: '#ef4444',
        badgeText: '#ff6b6b',
        label: 'HOT',
        edgeGlowFilter: `drop-shadow(0 0 ${10 + ratio * 8}px rgba(239, 68, 68, 0.65))`,
      };
    } else {
      return {
        glowColor: 'rgba(255, 0, 0, 0.95)',
        glowIntensity: 0.95,
        strokeColor: '#ff0000',
        textColor: '#ff2222',
        textShadow: '0 0 18px rgba(255, 0, 0, 0.95), 0 0 28px rgba(255, 59, 59, 0.8)',
        badgeBg: '#420f14',
        badgeBorder: '#ff3b3b',
        badgeText: '#ff3b3b',
        label: 'CRIT',
        edgeGlowFilter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.85))',
      };
    }
  };

  const cpuThermal = getThermalStyle(cpuTemp);
  const gpuThermal = getThermalStyle(gpuTemp);

  // Dynamic hot return coolant gradient stops based on temperature
  const isHotReturn = gpuTemp >= 70 || cpuTemp >= 70;
  const isCritReturn = gpuTemp >= 85 || cpuTemp >= 85;

  return (
    <div className="relative tech-card p-2.5 flex flex-col justify-start overflow-hidden border-2 border-[#162942]/90 shadow-[0_16px_40px_rgba(0,0,0,0.95)] bg-[#02060f]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#102035] pb-1 z-20 px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#28b8ff] animate-pulse shadow-[0_0_6px_#28b8ff]" />
          <h2 className="text-xs font-bold tracking-widest text-[#28b8ff] font-orbitron uppercase drop-shadow-[0_0_12px_rgba(40,184,255,0.7)]">
            LIVE THERMAL SYSTEM
          </h2>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold">
          SCADA CHASSIS • ZONE 01
        </span>
      </div>

      {/* ========================================================================= */}
      {/* MASTER SVG LIQUID COOLING MACHINE SCENE (100% LOCKED PHYSICAL GEOMETRY)    */}
      {/* ViewBox: 0 0 960 550                                                      */}
      {/* ========================================================================= */}
      <div className="relative w-full flex items-center justify-center my-0.5">
        <svg
          viewBox="0 0 960 550"
          className="w-full h-auto overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Real Industrial Metal Gradients */}
            <linearGradient id="chassisDarkMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="35%" stopColor="#0f172a" />
              <stop offset="85%" stopColor="#080e1a" />
              <stop offset="100%" stopColor="#02060d" />
            </linearGradient>

            <linearGradient id="machinedSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="25%" stopColor="#64748b" />
              <stop offset="65%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="gunmetalBezelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Screw Head Shader */}
            <radialGradient id="screwHeadShader" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="45%" stopColor="#94a3b8" />
              <stop offset="80%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </radialGradient>

            {/* Fan Blade Shaders */}
            <linearGradient id="fanBladeShader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="80%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#060a12" />
            </linearGradient>

            {/* Knurled Compression Fitting Gradient */}
            <linearGradient id="fittingMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="20%" stopColor="#64748b" />
              <stop offset="45%" stopColor="#cbd5e1" />
              <stop offset="60%" stopColor="#94a3b8" />
              <stop offset="80%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Realistic Transparent Acrylic Glass Tube Gradients */}
            <linearGradient id="acrylicTubeGlassWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="15%" stopColor="rgba(148, 163, 184, 0.2)" />
              <stop offset="75%" stopColor="rgba(15, 23, 42, 0.7)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
            </linearGradient>

            {/* Pressurized Cooled Liquid Core */}
            <linearGradient id="cyanCoolantCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="30%" stopColor="#0284c7" />
              <stop offset="70%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            {/* Dynamic Pressurized Hot Return Coolant Core */}
            <linearGradient id="hotCoolantCore" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isCritReturn ? "#fef08a" : isHotReturn ? "#fde047" : "#7dd3fc"} />
              <stop offset="30%" stopColor={isCritReturn ? "#f97316" : isHotReturn ? "#f97316" : "#38bdf8"} />
              <stop offset="70%" stopColor={isCritReturn ? "#ff0000" : isHotReturn ? "#ef4444" : "#0284c7"} />
              <stop offset="100%" stopColor={isCritReturn ? "#990000" : isHotReturn ? "#b91c1c" : "#075985"} />
            </linearGradient>

            {/* Focused Glow Filters */}
            <filter id="softCoolantGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softHotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={isCritReturn ? "3.5" : "2"} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================================= */}
          {/* LAYER 1: BACKSTAGE MOUNTING CHASSIS & SUBTLE CIRCUIT TRACES */}
          {/* ========================================================================= */}
          <rect x="15" y="10" width="930" height="530" rx="16" fill="#040813" stroke="#0d1b2a" strokeWidth="1.5" />

          {/* Micro-Telemetry Background Labels in Open Regions */}
          <g fill="#475569" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
            <text x="260" y="32">PRIMARY COOLANT SUPPLY • DIA 16mm ACRYLIC</text>
            <text x="540" y="32">FLOW VELOCITY: {outputs.flowRate.toFixed(2)} L/min</text>
            <text x="260" y="278">THERMAL INTERCONNECT • ΔT 5.0°C • 600W</text>
            <text x="525" y="340">HOT RETURN LINE</text>
            <text x="260" y="520">PRESSURE: 1.42 bar • DUAL-PASS RETURN</text>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 2: MASTER CLOSED-LOOP CONTINUOUS COOLANT PIPE NETWORK */}
          {/* ========================================================================= */}
          <g id="masterCoolantPipeLoop">
            {/* ROUTE 1: RADIATOR TOP OUTLET -> CPU LEFT INFLOW */}
            <path d="M 210 65 L 260 65" stroke="#000000" strokeWidth="26" opacity="0.6" strokeLinecap="round" />
            <path d="M 210 65 L 260 65" stroke="url(#acrylicTubeGlassWall)" strokeWidth="22" strokeLinecap="round" />
            <path d="M 210 65 L 260 65" stroke="rgba(10, 20, 35, 0.9)" strokeWidth="16" strokeLinecap="round" />
            <path d="M 210 65 L 260 65" stroke="url(#cyanCoolantCore)" strokeWidth="10" strokeLinecap="round" filter="url(#softCoolantGlow)" />
            <path d="M 210 61 L 260 61" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M 210 65 L 260 65" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="5 15" strokeLinecap="round" className="animate-pipe-flow" style={{ animationDuration: `${flowDuration}s` }} opacity="0.9" />

            {/* ROUTE 2: RESERVOIR TOP OUTLET -> CPU RIGHT INLET */}
            <path d="M 604 54 L 545 54 Q 500 54 500 75 L 500 97" stroke="#000000" strokeWidth="26" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 604 54 L 545 54 Q 500 54 500 75 L 500 97" stroke="url(#acrylicTubeGlassWall)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 604 54 L 545 54 Q 500 54 500 75 L 500 97" stroke="rgba(10, 20, 35, 0.9)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 604 54 L 545 54 Q 500 54 500 75 L 500 97" stroke="url(#cyanCoolantCore)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#softCoolantGlow)" />
            <path d="M 604 50 L 545 50 Q 496 50 496 75 L 496 97" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 604 54 L 545 54 Q 500 54 500 75 L 500 97" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="5 18" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-reverse-flow" style={{ animationDuration: `${flowDuration}s` }} opacity="0.9" />

            {/* ROUTE 3: GPU HOT OUTLET -> PUMP INLET */}
            <path d="M 500 367 L 604 367" stroke="#000000" strokeWidth="26" opacity="0.6" strokeLinecap="round" />
            <path d="M 500 367 L 604 367" stroke="url(#acrylicTubeGlassWall)" strokeWidth="22" strokeLinecap="round" />
            <path d="M 500 367 L 604 367" stroke="rgba(35, 12, 16, 0.9)" strokeWidth="16" strokeLinecap="round" />
            <path d="M 500 367 L 604 367" stroke="url(#hotCoolantCore)" strokeWidth="10" strokeLinecap="round" filter="url(#softHotGlow)" />
            <path d="M 500 363 L 604 363" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M 500 367 L 604 367" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="5 15" strokeLinecap="round" className="animate-pipe-flow-fast" style={{ animationDuration: `${flowDuration * 0.75}s` }} opacity="0.9" />

            {/* ROUTE 4: PUMP COOLED OUTLET -> GPU INLET & RADIATOR RETURN LOOP */}
            <path d="M 604 435 L 545 435 Q 510 435 510 460 L 510 495 Q 510 515 480 515 L 397 515 Q 377 515 377 495 L 377 455" stroke="#000000" strokeWidth="26" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 397 515 L 235 515 Q 210 515 210 495 L 210 480" stroke="#000000" strokeWidth="26" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 604 435 L 545 435 Q 510 435 510 460 L 510 495 Q 510 515 480 515 L 397 515 Q 377 515 377 495 L 377 455" stroke="url(#acrylicTubeGlassWall)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 397 515 L 235 515 Q 210 515 210 495 L 210 480" stroke="url(#acrylicTubeGlassWall)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 604 435 L 545 435 Q 510 435 510 460 L 510 495 Q 510 515 480 515 L 397 515 Q 377 515 377 495 L 377 455" stroke="rgba(10, 20, 35, 0.9)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 397 515 L 235 515 Q 210 515 210 495 L 210 480" stroke="rgba(10, 20, 35, 0.9)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 604 435 L 545 435 Q 510 435 510 460 L 510 495 Q 510 515 480 515 L 397 515 Q 377 515 377 495 L 377 455" stroke="url(#cyanCoolantCore)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#softCoolantGlow)" />
            <path d="M 397 515 L 235 515 Q 210 515 210 495 L 210 480" stroke="url(#cyanCoolantCore)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#softCoolantGlow)" />

            <path d="M 604 431 L 545 431 Q 506 431 506 460 L 506 495 Q 506 511 480 511 L 397 511 Q 373 511 373 495 L 373 455" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 397 511 L 235 511 Q 206 511 206 495 L 206 480" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 604 435 L 545 435 Q 510 435 510 460 L 510 495 Q 510 515 480 515 L 397 515 Q 377 515 377 495 L 377 455" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="5 18" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-pipe-flow" style={{ animationDuration: `${flowDuration}s` }} opacity="0.9" />
            <path d="M 397 515 L 235 515 Q 210 515 210 495 L 210 480" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="5 18" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-pipe-flow" style={{ animationDuration: `${flowDuration}s` }} opacity="0.9" />

            {/* KNURLED METALLIC COMPRESSION FITTINGS */}
            {/* 1. Radiator Top Outlet Fitting */}
            <g transform="translate(202, 53)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="8" y1="2" x2="8" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 2. CPU Left Inflow Fitting */}
            <g transform="translate(252, 53)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="8" y1="2" x2="8" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 3. Reservoir Top Outlet Fitting */}
            <g transform="translate(596, 42)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="8" y1="2" x2="8" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 4. CPU Right Inflow Fitting */}
            <g transform="translate(488, 86)">
              <rect x="0" y="0" width="24" height="16" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="2" y1="4" x2="22" y2="4" stroke="#1e293b" strokeWidth="1" />
              <line x1="2" y1="8" x2="22" y2="8" stroke="#1e293b" strokeWidth="1" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 5. GPU Right Hot Outlet Fitting */}
            <g transform="translate(492, 355)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="8" y1="2" x2="8" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 6. Pump Top Hot Inlet Fitting */}
            <g transform="translate(596, 355)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="8" y1="2" x2="8" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 7. Pump Bottom Cooled Outlet Fitting */}
            <g transform="translate(596, 423)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="8" y1="2" x2="8" y2="22" stroke="#1e293b" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 8. GPU Bottom Cooled Inlet Fitting */}
            <g transform="translate(365, 448)">
              <rect x="0" y="0" width="24" height="16" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="2" y1="4" x2="22" y2="4" stroke="#1e293b" strokeWidth="1" />
              <line x1="2" y1="8" x2="22" y2="8" stroke="#1e293b" strokeWidth="1" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#1e293b" strokeWidth="1" />
            </g>

            {/* 9. Radiator Bottom Return Fitting */}
            <g transform="translate(198, 468)">
              <rect x="0" y="0" width="24" height="16" rx="2" fill="url(#fittingMetalGrad)" stroke="#64748b" strokeWidth="0.8" />
              <line x1="2" y1="4" x2="22" y2="4" stroke="#1e293b" strokeWidth="1" />
              <line x1="2" y1="8" x2="22" y2="8" stroke="#1e293b" strokeWidth="1" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#1e293b" strokeWidth="1" />
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 3: 360mm INDUSTRIAL RADIATOR & 3 SYNCHRONIZED FANS (LOCKED)        */}
          {/* ========================================================================= */}
          <g transform="translate(30, 20)">
            {/* Master Radiator Chassis */}
            <rect x="0" y="0" width="180" height="505" rx="14" fill="url(#chassisDarkMetal)" stroke="#1e293b" strokeWidth="2" />
            {/* Background Radiator Cooling Fins Texture */}
            <g stroke="#08101a" strokeWidth="1">
              {[...Array(48)].map((_, i) => (
                <line key={i} x1="6" y1={10 + i * 10} x2="174" y2={10 + i * 10} />
              ))}
            </g>

            {/* Top & Bottom Mounting Brackets */}
            <rect x="10" y="6" width="160" height="6" rx="2" fill="#090e17" />
            <circle cx="24" cy="9" r="2.5" fill="url(#screwHeadShader)" />
            <circle cx="156" cy="9" r="2.5" fill="url(#screwHeadShader)" />
            <rect x="10" y="446" width="160" height="6" rx="2" fill="#090e17" />
            <circle cx="24" cy="449" r="2.5" fill="url(#screwHeadShader)" />
            <circle cx="156" cy="449" r="2.5" fill="url(#screwHeadShader)" />

            {/* 3 Large Stacked Mechanical Fans */}
            {[0, 1, 2].map((fIdx) => {
              const cy = 76 + fIdx * 142;
              return (
                <g key={fIdx} transform={`translate(90, ${cy})`}>
                  {/* Square Fan Housing */}
                  <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#080f1a" stroke="#162235" strokeWidth="1.5" />

                  {/* 4 Corner Screws */}
                  <circle cx="-56" cy="-56" r="5" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="0.8" />
                  <circle cx="-56" cy="-56" r="2" fill="#090e17" />
                  <circle cx="56" cy="-56" r="5" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="0.8" />
                  <circle cx="56" cy="-56" r="2" fill="#090e17" />
                  <circle cx="-56" cy="56" r="5" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="0.8" />
                  <circle cx="-56" cy="56" r="2" fill="#090e17" />
                  <circle cx="56" cy="56" r="5" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="0.8" />
                  <circle cx="56" cy="56" r="2" fill="#090e17" />

                  {/* Circular Shroud & Dynamic Speed Cyan Halo */}
                  <circle cx="0" cy="0" r="58" fill="#02040a" stroke="#0284c7" strokeWidth="1.8" opacity={0.6 + (fanSpeed / 100) * 0.4} />
                  <circle cx="0" cy="0" r="51" fill="none" stroke="#0a1424" strokeWidth="1.5" />

                  {/* Rotating 7-Blade Impeller (Rotation on inner zero-origin group) */}
                  <g style={{ animation: `fanRotate ${fanRotationDuration}s linear infinite`, transformOrigin: '0px 0px' }}>
                    {[0, 51.4, 102.8, 154.2, 205.6, 257.0, 308.4].map((deg, i) => (
                      <g key={i} transform={`rotate(${deg})`}>
                        <path d="M 0 0 Q 22 -42 52 -30 Q 42 -4 0 0 Z" fill="url(#fanBladeShader)" stroke="#1e293b" strokeWidth="0.8" />
                        <path d="M 6 -6 Q 24 -38 50 -28" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
                      </g>
                    ))}
                    <circle cx="0" cy="0" r="20" fill="#0d1829" stroke="#1e324d" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="15" fill="#050a12" stroke="#0284c7" strokeWidth="1" />
                  </g>

                  {/* Center Metal Hub Cap */}
                  <circle cx="0" cy="0" r="9" fill="url(#machinedSteelGrad)" stroke="#475569" strokeWidth="1" />
                  <circle cx="0" cy="0" r="2.5" fill="#f8fafc" />
                </g>
              );
            })}

            {/* Airflow Chevrons Radiating Rightward */}
            {[0, 1, 2].map((fIdx) => {
              const ay = 76 + fIdx * 142;
              return (
                <g key={fIdx} transform={`translate(182, ${ay})`}>
                  <path d="M 0 0 L 10 0 M 6 -4 L 10 0 L 6 4" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-arrow-pulse" style={{ animationDelay: `${fIdx * 0.2}s` }} opacity="0.85" />
                  <path d="M 14 0 L 24 0 M 20 -4 L 24 0 L 20 4" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-arrow-pulse" style={{ animationDelay: `${fIdx * 0.2 + 0.3}s` }} opacity="0.85" />
                </g>
              );
            })}

            {/* Fan Speed Telemetry Plate at Bottom */}
            <g transform="translate(10, 456)">
              <rect width="160" height="42" rx="8" fill="#050c17" stroke="#16283f" strokeWidth="1.5" />
              <text x="80" y="14" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="Rajdhani" textAnchor="middle" letterSpacing="1">FAN SPEED (360mm ARRAY)</text>
              <text x="80" y="28" fill="#38bdf8" fontSize="15" fontWeight="900" fontFamily="JetBrains Mono" textAnchor="middle">{fanSpeed.toFixed(1)}%</text>
              <text x="80" y="38" fill="#475569" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">~{fanRpm} RPM</text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 4: PROCESSING UNITS (CPU & GPU COMPUTE STACK - LOCKED POSITIONS)    */}
          {/* ========================================================================= */}
          <g transform="translate(260, 20)">
            {/* 1. INDUSTRIAL CPU WATER BLOCK (Y=10) */}
            <g transform="translate(0, 10)">
              {/* Dynamic Thermal Heat Aura around CPU Frame (Visual stroke only) */}
              <rect
                x="14"
                y="8"
                width="208"
                height="144"
                rx="12"
                fill="none"
                stroke={cpuThermal.strokeColor}
                strokeWidth="1.5"
                opacity={cpuThermal.glowIntensity}
                style={{ filter: cpuThermal.edgeGlowFilter }}
              />

              {/* Dark Matte PCB */}
              <rect x="0" y="0" width="235" height="160" rx="10" fill="#060c08" stroke="#3f2713" strokeWidth="1.5" />
              {/* Gold Contact Pins */}
              {[...Array(16)].map((_, i) => (
                <rect key={i} x={20 + i * 12} y="1" width="5" height="3" fill="#d97706" />
              ))}
              {[...Array(16)].map((_, i) => (
                <rect key={i} x={20 + i * 12} y="156" width="5" height="3" fill="#d97706" />
              ))}
              {/* SMD Capacitors */}
              <rect x="8" y="15" width="6" height="3" fill="#92400e" />
              <rect x="8" y="22" width="6" height="3" fill="#92400e" />
              <rect x="8" y="125" width="6" height="3" fill="#92400e" />
              <rect x="8" y="132" width="6" height="3" fill="#92400e" />
              <rect x="221" y="15" width="6" height="3" fill="#92400e" />
              <rect x="221" y="22" width="6" height="3" fill="#92400e" />
              <rect x="221" y="125" width="6" height="3" fill="#92400e" />
              <rect x="221" y="132" width="6" height="3" fill="#92400e" />

              {/* Heavy CNC-Machined Brushed Steel Retention Frame with Thermal Glow */}
              <rect x="18" y="12" width="200" height="136" rx="8" fill="url(#machinedSteelGrad)" stroke={cpuThermal.strokeColor} strokeWidth="1.5" />
              <rect x="21" y="15" width="194" height="130" rx="6" fill="none" stroke="#1e293b" strokeWidth="1" />

              {/* 4 Heavy Socket Screws with Washers */}
              <circle cx="34" cy="25" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="34" cy="25" r="2.5" fill="#0f172a" />
              <circle cx="202" cy="25" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="202" cy="25" r="2.5" fill="#0f172a" />
              <circle cx="34" cy="135" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="34" cy="135" r="2.5" fill="#0f172a" />
              <circle cx="202" cy="135" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="202" cy="135" r="2.5" fill="#0f172a" />

              {/* Dark Graphite Coldplate with Reactive Thermal Surface */}
              <rect x="44" y="26" width="148" height="108" rx="6" fill="#080e18" stroke={cpuThermal.strokeColor} strokeWidth="1.2" opacity="0.95" />

              {/* OLED Telemetry Display */}
              <text x="118" y="52" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="Orbitron" textAnchor="middle" letterSpacing="2">CPU</text>
              <text
                x="118"
                y="88"
                fill={cpuThermal.textColor}
                fontSize="28"
                fontWeight="900"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
                style={{ filter: `drop-shadow(${cpuThermal.textShadow})` }}
              >
                {Math.round(cpuTemp)}°C
              </text>

              {/* Status Pill Badge */}
              <rect x="81" y="100" width="74" height="18" rx="9" fill={cpuThermal.badgeBg} stroke={cpuThermal.badgeBorder} strokeWidth="1" />
              <text x="118" y="113" fill={cpuThermal.badgeText} fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                {cpuThermal.label}
              </text>
            </g>

            {/* Vertical Interconnect Channels Between CPU and GPU (Y=175, Height=100) */}
            <g transform="translate(0, 175)">
              {/* Left Interconnect: Hot Thermal Fluid */}
              <g transform="translate(78, 0)">
                <rect x="0" y="0" width="22" height="100" rx="11" fill="#1f080b" stroke="#7f1d1d" strokeWidth="1.5" />
                <rect x="5" y="0" width="12" height="100" fill="url(#hotCoolantCore)" opacity={gpuThermal.glowIntensity} />
                <text x="11" y="32" fill="#ef4444" fontSize="12" fontWeight="black" textAnchor="middle">▲</text>
                <text x="11" y="62" fill="#f97316" fontSize="12" fontWeight="black" textAnchor="middle">▲</text>
                <text x="11" y="90" fill="#facc15" fontSize="12" fontWeight="black" textAnchor="middle">▲</text>
                <rect x="-2" y="-6" width="26" height="8" rx="1.5" fill="url(#fittingMetalGrad)" stroke="#475569" strokeWidth="0.8" />
                <rect x="-2" y="98" width="26" height="8" rx="1.5" fill="url(#fittingMetalGrad)" stroke="#475569" strokeWidth="0.8" />
              </g>

              {/* Right Interconnect: Cooled Fluid Return */}
              <g transform="translate(136, 0)">
                <rect x="0" y="0" width="22" height="100" rx="11" fill="#081524" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="5" y="0" width="12" height="100" fill="url(#cyanCoolantCore)" opacity="0.85" />
                <text x="11" y="32" fill="#0284c7" fontSize="12" fontWeight="black" textAnchor="middle">▼</text>
                <text x="11" y="62" fill="#38bdf8" fontSize="12" fontWeight="black" textAnchor="middle">▼</text>
                <text x="11" y="90" fill="#7dd3fc" fontSize="12" fontWeight="black" textAnchor="middle">▼</text>
                <rect x="-2" y="-6" width="26" height="8" rx="1.5" fill="url(#fittingMetalGrad)" stroke="#475569" strokeWidth="0.8" />
                <rect x="-2" y="98" width="26" height="8" rx="1.5" fill="url(#fittingMetalGrad)" stroke="#475569" strokeWidth="0.8" />
              </g>
            </g>

            {/* 2. INDUSTRIAL GPU COMPUTE WATER BLOCK (Y=280) */}
            <g transform="translate(0, 280)">
              {/* Dynamic Thermal Heat Aura around GPU Frame (Visual stroke only) */}
              <rect
                x="14"
                y="8"
                width="208"
                height="144"
                rx="12"
                fill="none"
                stroke={gpuThermal.strokeColor}
                strokeWidth="1.5"
                opacity={gpuThermal.glowIntensity}
                style={{ filter: gpuThermal.edgeGlowFilter }}
              />

              {/* Dark Matte PCB */}
              <rect x="0" y="0" width="235" height="160" rx="10" fill="#060a0f" stroke="#2a1b38" strokeWidth="1.5" />
              {/* Gold Contact Teeth */}
              {[...Array(16)].map((_, i) => (
                <rect key={i} x={20 + i * 12} y="1" width="5" height="3" fill="#d97706" />
              ))}
              {[...Array(16)].map((_, i) => (
                <rect key={i} x={20 + i * 12} y="156" width="5" height="3" fill="#d97706" />
              ))}
              {/* GDDR6 VRAM IC Chips */}
              <g fill="#0b0e14" stroke="#1e293b" strokeWidth="0.8">
                <rect x="5" y="24" width="7" height="15" rx="1" />
                <rect x="5" y="45" width="7" height="15" rx="1" />
                <rect x="5" y="98" width="7" height="15" rx="1" />
                <rect x="5" y="119" width="7" height="15" rx="1" />
                <rect x="223" y="24" width="7" height="15" rx="1" />
                <rect x="223" y="45" width="7" height="15" rx="1" />
                <rect x="223" y="98" width="7" height="15" rx="1" />
                <rect x="223" y="119" width="7" height="15" rx="1" />
              </g>
              {/* Surface-Mounted SMDs */}
              <rect x="8" y="66" width="4" height="6" fill="#92400e" stroke="#78350f" strokeWidth="0.5" />
              <rect x="8" y="76" width="4" height="6" fill="#334155" />
              <rect x="8" y="86" width="4" height="6" fill="#92400e" stroke="#78350f" strokeWidth="0.5" />
              <rect x="223" y="66" width="4" height="6" fill="#92400e" stroke="#78350f" strokeWidth="0.5" />
              <rect x="223" y="76" width="4" height="6" fill="#334155" />
              <rect x="223" y="86" width="4" height="6" fill="#92400e" stroke="#78350f" strokeWidth="0.5" />

              {/* Heavy CNC-Machined Brushed Steel Retention Frame with Thermal Glow */}
              <rect x="18" y="12" width="200" height="136" rx="8" fill="url(#machinedSteelGrad)" stroke={gpuThermal.strokeColor} strokeWidth="1.5" />
              <rect x="21" y="15" width="194" height="130" rx="6" fill="none" stroke="#1e293b" strokeWidth="1" />

              {/* Side Retention Clamps */}
              <rect x="14" y="62" width="6" height="36" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
              <circle cx="17" cy="68" r="1.5" fill="url(#screwHeadShader)" />
              <circle cx="17" cy="92" r="1.5" fill="url(#screwHeadShader)" />
              <rect x="215" y="62" width="6" height="36" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
              <circle cx="218" cy="68" r="1.5" fill="url(#screwHeadShader)" />
              <circle cx="218" cy="92" r="1.5" fill="url(#screwHeadShader)" />

              {/* 4 Heavy Socket Screws with Washers */}
              <circle cx="34" cy="25" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="34" cy="25" r="2.5" fill="#0f172a" />
              <circle cx="202" cy="25" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="202" cy="25" r="2.5" fill="#0f172a" />
              <circle cx="34" cy="135" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="34" cy="135" r="2.5" fill="#0f172a" />
              <circle cx="202" cy="135" r="6" fill="url(#screwHeadShader)" stroke="#1e293b" strokeWidth="1" />
              <circle cx="202" cy="135" r="2.5" fill="#0f172a" />

              {/* Dark Graphite Coldplate */}
              <rect x="44" y="26" width="148" height="108" rx="6" fill="#080e18" stroke={gpuThermal.strokeColor} strokeWidth="1.2" opacity="0.95" />
              <g stroke="#0e1726" strokeWidth="1" fill="none">
                <line x1="50" y1="36" x2="186" y2="36" />
                <line x1="50" y1="124" x2="186" y2="124" />
              </g>

              {/* OLED Telemetry Display */}
              <text x="118" y="52" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="Orbitron" textAnchor="middle" letterSpacing="2">GPU</text>
              <text
                x="118"
                y="88"
                fill={gpuThermal.textColor}
                fontSize="28"
                fontWeight="900"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
                style={{ filter: `drop-shadow(${gpuThermal.textShadow})` }}
              >
                {Math.round(gpuTemp)}°C
              </text>

              {/* Status Pill Badge */}
              <rect x="81" y="100" width="74" height="18" rx="9" fill={gpuThermal.badgeBg} stroke={gpuThermal.badgeBorder} strokeWidth="1" />
              <text x="118" y="113" fill={gpuThermal.badgeText} fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                {gpuThermal.label}
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 5: WATER COOLING SYSTEM (LOCKED RESERVOIR & LOCKED LOWER-RIGHT PUMP) */}
          {/* ========================================================================= */}
          <g transform="translate(620, 20)">
            {/* 1. Transparent Glass Cylindrical Reservoir (Y=10) */}
            <g transform="translate(0, 10)">
              {/* Glass Cylinder Structure */}
              <rect x="20" y="24" width="130" height="205" rx="16" fill="#030812" stroke="#0284c7" strokeWidth="2" opacity="0.95" />

              {/* Top Brushed-Aluminum Cap with Machined Collar */}
              <rect x="10" y="0" width="150" height="28" rx="4" fill="url(#machinedSteelGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="42" y="6" width="86" height="16" rx="3" fill="#0b1320" stroke="#475569" strokeWidth="1" />
              <circle cx="26" cy="14" r="3" fill="url(#screwHeadShader)" />
              <circle cx="144" cy="14" r="3" fill="url(#screwHeadShader)" />

              {/* Bottom Mounting Base */}
              <rect x="10" y="220" width="150" height="24" rx="4" fill="url(#machinedSteelGrad)" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Pressurized Cyan Coolant Liquid (~80% Fill) */}
              <rect x="26" y="65" width="118" height="158" rx="8" fill="url(#cyanCoolantCore)" opacity="0.9" />
              <ellipse cx="85" cy="65" rx="59" ry="5" fill="#e0f2fe" opacity="0.9" />

              {/* Rising Micro-Bubbles */}
              <circle cx="55" cy="160" r="3" fill="#ffffff" opacity="0.9" className="bubble-1" />
              <circle cx="105" cy="130" r="3.5" fill="#ffffff" opacity="0.85" className="bubble-2" />
              <circle cx="75" cy="180" r="2" fill="#ffffff" opacity="0.95" className="bubble-3" />
              <circle cx="115" cy="95" r="3" fill="#ffffff" opacity="0.9" className="bubble-4" />
              <circle cx="48" cy="115" r="2.5" fill="#ffffff" opacity="0.8" className="bubble-5" />

              {/* Specular Cylindrical Glass Reflection Stripes */}
              <rect x="30" y="28" width="6" height="195" rx="3" fill="rgba(255,255,255,0.3)" />
              <rect x="135" y="28" width="3" height="195" rx="1.5" fill="rgba(255,255,255,0.2)" />

              {/* Measurement Scale on Right */}
              <g transform="translate(155, 45)" fill="#64748b" fontSize="8.5" fontFamily="JetBrains Mono" fontWeight="bold">
                <line x1="0" y1="20" x2="8" y2="20" stroke="#0284c7" strokeWidth="2" />
                <text x="12" y="23" fill="#38bdf8">100% (850mL)</text>

                <line x1="0" y1="65" x2="6" y2="65" stroke="#475569" strokeWidth="1.5" />
                <text x="12" y="68">75% (637mL)</text>

                <line x1="0" y1="110" x2="6" y2="110" stroke="#475569" strokeWidth="1.5" />
                <text x="12" y="113">50% (425mL)</text>

                <line x1="0" y1="155" x2="6" y2="155" stroke="#475569" strokeWidth="1.5" />
                <text x="12" y="158">25% (212mL)</text>
              </g>
            </g>

            {/* Direct Coupling Sleeve between Reservoir Bottom & Pump Top */}
            <rect x="73" y="254" width="24" height="26" rx="2" fill="#0b1320" stroke="#334155" strokeWidth="1.5" />

            {/* 2. Heavy Industrial Water Pump (LOCKED PERMANENTLY AT LOWER RIGHT Y=280) */}
            <g transform="translate(0, 280)">
              {/* Heavy Matte-Black Pump Housing */}
              <rect x="5" y="0" width="160" height="160" rx="12" fill="url(#chassisDarkMetal)" stroke="#1e293b" strokeWidth="2" />

              {/* 4 Heavy Corner Socket Bolts */}
              <circle cx="20" cy="15" r="6" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="1" />
              <circle cx="20" cy="15" r="2.5" fill="#090e17" />
              <circle cx="150" cy="15" r="6" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="1" />
              <circle cx="150" cy="15" r="2.5" fill="#090e17" />
              <circle cx="20" cy="145" r="6" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="1" />
              <circle cx="20" cy="145" r="2.5" fill="#090e17" />
              <circle cx="150" cy="145" r="6" fill="url(#screwHeadShader)" stroke="#0f172a" strokeWidth="1" />
              <circle cx="150" cy="145" r="2.5" fill="#090e17" />

              {/* Large Circular Impeller Window with Concentric Rings */}
              <circle cx="85" cy="80" r="54" fill="#02040a" stroke="#0284c7" strokeWidth="2" opacity={0.6 + (pumpSpeed / 100) * 0.4} />
              <circle cx="85" cy="80" r="45" fill="none" stroke="#111d2d" strokeWidth="2" strokeDasharray="5 3" />
              <circle cx="85" cy="80" r="36" fill="none" stroke="#0b1320" strokeWidth="1.5" />

              {/* Rotating 6-Blade Cyan Turbine Impeller (Rotation on inner zero-origin group) */}
              <g transform="translate(85, 80)">
                <g style={{ animation: `pumpImpeller ${pumpRotationDuration}s linear infinite`, transformOrigin: '0px 0px' }}>
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <path
                      key={i}
                      d="M 0 0 Q 20 -25 40 -12 Q 28 10 0 0 Z"
                      fill="url(#cyanCoolantCore)"
                      stroke="#0284c7"
                      strokeWidth="0.8"
                      transform={`rotate(${deg})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="11" fill="url(#machinedSteelGrad)" stroke="#475569" strokeWidth="1" />
                  <circle cx="0" cy="0" r="3" fill="#f8fafc" />
                </g>
              </g>

              {/* Pump Telemetry Readout */}
              <g transform="translate(170, 48)">
                <rect width="135" height="42" rx="8" fill="#050c17" stroke="#16283f" strokeWidth="1.5" />
                <text x="67" y="14" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="Rajdhani" textAnchor="middle" letterSpacing="1">PUMP OUTPUT</text>
                <text x="67" y="28" fill="#38bdf8" fontSize="15" fontWeight="900" fontFamily="JetBrains Mono" textAnchor="middle">{pumpSpeed.toFixed(1)}%</text>
                <text x="67" y="38" fill="#475569" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">~{pumpRpm} RPM</text>
              </g>

              <g transform="translate(170, 98)">
                <rect width="135" height="38" rx="8" fill="#050c17" stroke="#16283f" strokeWidth="1.5" />
                <text x="67" y="14" fill="#64748b" fontSize="8.5" fontWeight="bold" fontFamily="Rajdhani" textAnchor="middle" letterSpacing="1">SYSTEM PRESSURE</text>
                <text x="67" y="29" fill="#00ff9d" fontSize="13" fontWeight="900" fontFamily="JetBrains Mono" textAnchor="middle">1.42 bar (NOMINAL)</text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Legend */}
      <div className="flex items-center justify-between pt-1 border-t border-[#102035] z-20 text-[11px] font-rajdhani font-bold tracking-wider px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
            <span className="text-slate-300 uppercase tracking-widest text-[10px]">HOT COOLANT (RETURN)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shadow-[0_0_8px_#0284c7]" />
            <span className="text-slate-300 uppercase tracking-widest text-[10px]">COOLED COOLANT (FEED)</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          CLOSED LOOP HYDRODYNAMIC EFFICIENCY: 98.4%
        </span>
      </div>
    </div>
  );
};
