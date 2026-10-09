import React from 'react';

interface CoolantPipesProps {
  pumpSpeed: number; // 0 - 100%
  gpuTemp: number;
}

export const CoolantPipes: React.FC<CoolantPipesProps> = ({
  pumpSpeed,
}) => {
  // Fluid velocity calculation based on pump speed
  const flowDuration = Math.max(0.8, 3.6 - (pumpSpeed / 100) * 2.8);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 780 480"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Cyan Pressurized Coolant Liquid Gradient */}
          <linearGradient id="coolantCyanCore3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="25%" stopColor="#00f0ff" />
            <stop offset="65%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#034e7b" />
          </linearGradient>

          {/* Hot Thermal Coolant Liquid Gradient */}
          <linearGradient id="coolantHotCore3D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#ff9d3d" />
            <stop offset="70%" stopColor="#ff3b3b" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          {/* Glass Specular Reflection Highlight (Upper edge) */}
          <linearGradient id="glassSpecularHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
            <stop offset="30%" stopColor="rgba(165, 243, 252, 0.25)" />
            <stop offset="75%" stopColor="rgba(8, 28, 55, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
          </linearGradient>

          {/* Focused Coolant Core Glow Filter */}
          <filter id="fluidCoreCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="fluidCoreHotGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* TUBE 1: TOP COOLED FEED (Reservoir Top-Left -> CPU Right Fitting) */}
        {/* ========================================================================= */}
        {/* 1. Ambient Drop Shadow */}
        <path
          d="M 605 75 L 545 75 Q 500 75 500 100 L 500 115 Q 500 128 480 128 L 452 128"
          stroke="#020712"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        {/* 2. Outer Acrylic Glass Wall (28px) */}
        <path
          d="M 605 75 L 545 75 Q 500 75 500 100 L 500 115 Q 500 128 480 128 L 452 128"
          stroke="url(#glassSpecularHighlight)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 3. Translucent Blue Glass Body (24px) */}
        <path
          d="M 605 75 L 545 75 Q 500 75 500 100 L 500 115 Q 500 128 480 128 L 452 128"
          stroke="rgba(8, 45, 90, 0.75)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 4. Pressurized Coolant Liquid Core (16px) */}
        <path
          d="M 605 75 L 545 75 Q 500 75 500 100 L 500 115 Q 500 128 480 128 L 452 128"
          stroke="url(#coolantCyanCore3D)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#fluidCoreCyanGlow)"
        />
        {/* 5. Bright Inner Flow Stream (6px) */}
        <path
          d="M 605 75 L 545 75 Q 500 75 500 100 L 500 115 Q 500 128 480 128 L 452 128"
          stroke="#00f0ff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 6. Specular Top Ridge Highlight (2.5px) */}
        <path
          d="M 605 71 L 545 71 Q 496 71 496 100 L 496 115 Q 496 124 480 124 L 452 124"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* 7. Animated Luminous Coolant Bubbles & Flow Particles */}
        <path
          d="M 605 75 L 545 75 Q 500 75 500 100 L 500 115 Q 500 128 480 128 L 452 128"
          stroke="#ffffff"
          strokeWidth="4"
          strokeDasharray="8 18"
          strokeLinecap="round"
          className="animate-reverse-flow"
          style={{ animationDuration: `${flowDuration}s` }}
          opacity="0.95"
        />

        {/* ========================================================================= */}
        {/* TUBE 2: HOT THERMAL RETURN TUBE (GPU Right Outlet -> Pump Left Inlet) */}
        {/* ========================================================================= */}
        {/* 1. Ambient Drop Shadow */}
        <path
          d="M 452 335 L 595 335"
          stroke="#020712"
          strokeWidth="32"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* 2. Outer Glass Wall (28px) */}
        <path
          d="M 452 335 L 595 335"
          stroke="rgba(255, 120, 60, 0.35)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        {/* 3. Translucent Hot Border (24px) */}
        <path
          d="M 452 335 L 595 335"
          stroke="rgba(120, 20, 25, 0.75)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        {/* 4. Pressurized Hot Coolant Core (16px) with Fiery Red/Orange Glow */}
        <path
          d="M 452 335 L 595 335"
          stroke="url(#coolantHotCore3D)"
          strokeWidth="16"
          strokeLinecap="round"
          filter="url(#fluidCoreHotGlow)"
        />
        {/* 5. Bright Hot Inner Core (6px) */}
        <path
          d="M 452 335 L 595 335"
          stroke="#ff9d3d"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* 6. Specular Highlight Ridge (2.5px) */}
        <path
          d="M 452 331 L 595 331"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* 7. Animated Hot Flow Pulse Particles (Flow: GPU -> Pump) */}
        <path
          d="M 452 335 L 595 335"
          stroke="#ffffff"
          strokeWidth="4"
          strokeDasharray="8 16"
          strokeLinecap="round"
          className="animate-pipe-flow-fast"
          style={{ animationDuration: `${flowDuration * 0.75}s` }}
          opacity="0.95"
        />

        {/* ========================================================================= */}
        {/* TUBE 3: BOTTOM COOLED RETURN (Pump Left Outlet -> Under GPU -> GPU Bottom Inlet) */}
        {/* ========================================================================= */}
        {/* 1. Ambient Drop Shadow */}
        <path
          d="M 595 395 L 535 395 Q 495 395 495 420 L 495 435 Q 495 455 470 455 L 415 455 Q 385 455 385 435 L 385 412"
          stroke="#020712"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        {/* 2. Glass Tube Wall (28px) */}
        <path
          d="M 595 395 L 535 395 Q 495 395 495 420 L 495 435 Q 495 455 470 455 L 415 455 Q 385 455 385 435 L 385 412"
          stroke="url(#glassSpecularHighlight)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 3. Translucent Glass Border (24px) */}
        <path
          d="M 595 395 L 535 395 Q 495 395 495 420 L 495 435 Q 495 455 470 455 L 415 455 Q 385 455 385 435 L 385 412"
          stroke="rgba(8, 45, 90, 0.75)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 4. Pressurized Coolant Core (16px) with Cyan Glow */}
        <path
          d="M 595 395 L 535 395 Q 495 395 495 420 L 495 435 Q 495 455 470 455 L 415 455 Q 385 455 385 435 L 385 412"
          stroke="url(#coolantCyanCore3D)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#fluidCoreCyanGlow)"
        />
        {/* 5. Bright Inner Flow Stream (6px) */}
        <path
          d="M 595 395 L 535 395 Q 495 395 495 420 L 495 435 Q 495 455 470 455 L 415 455 Q 385 455 385 435 L 385 412"
          stroke="#00f0ff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 6. Specular Top Ridge Highlight (2.5px) */}
        <path
          d="M 595 391 L 535 391 Q 491 391 491 420 L 491 435 Q 491 451 470 451 L 415 451 Q 381 451 381 435 L 381 412"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* 7. Animated Coolant Flow Particles (Flow: Pump -> GPU Bottom) */}
        <path
          d="M 595 395 L 535 395 Q 495 395 495 420 L 495 435 Q 495 455 470 455 L 415 455 Q 385 455 385 435 L 385 412"
          stroke="#ffffff"
          strokeWidth="4"
          strokeDasharray="8 18"
          strokeLinecap="round"
          className="animate-pipe-flow"
          style={{ animationDuration: `${flowDuration}s` }}
          opacity="0.95"
        />

        {/* Directional Flow Chevrons */}
        <g opacity="0.95">
          {/* Top feed chevrons */}
          <polygon points="565,70 553,75 565,80" fill="#ffffff" filter="drop-shadow(0 0 5px #00f0ff)" />
          {/* Hot return chevrons */}
          <polygon points="510,330 522,335 510,340" fill="#ffffff" filter="drop-shadow(0 0 5px #ff3b3b)" />
          {/* Bottom return chevrons */}
          <polygon points="445,450 433,455 445,460" fill="#ffffff" filter="drop-shadow(0 0 5px #00f0ff)" />
        </g>
      </svg>
    </div>
  );
};
