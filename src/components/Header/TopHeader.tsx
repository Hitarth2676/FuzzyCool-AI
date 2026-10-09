import React from 'react';
import { Zap, Cpu, Server, Activity, Sliders } from 'lucide-react';
import { SensorInputs } from '../../types/thermal';

interface TopHeaderProps {
  inputs: SensorInputs;
  isLiveMode: boolean;
  setIsLiveMode: (live: boolean) => void;
  isBackendConnected?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  inputs,
  isLiveMode,
  setIsLiveMode,
  isBackendConnected = true,
}) => {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-4 tech-card border-b border-[#1b3252] bg-[#030914]/90">
      {/* Left: Brand / Title */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-3">
          {/* Glowing Lightning Icon Box */}
          <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#1a1205] to-[#0d0700] border border-[#ff9d3d]/60 flex items-center justify-center shadow-[0_0_15px_rgba(255,157,61,0.35)]">
            <Zap className="w-6 h-6 text-[#ff9d3d] fill-[#ff9d3d]/30 filter drop-shadow-[0_0_8px_rgba(255,157,61,0.8)]" />
            <div className="absolute inset-0 rounded-lg bg-[#ff9d3d]/10 animate-pulse pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-wider text-white font-orbitron drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                FUZZYCOOLING AI
              </h1>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-semibold tracking-widest text-[#5ba2d6] uppercase font-rajdhani">
                AI-POWERED THERMAL CONTROL SYSTEM
              </span>
              <span className="inline-flex items-center px-2 py-0.2 rounded-full text-[9px] font-mono font-medium tracking-wide bg-[#09223d] text-[#28b8ff] border border-[#28b8ff]/40 shadow-[0_0_8px_rgba(40,184,255,0.2)]">
                FASTAPI • SCIKIT-FUZZY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Segmented Real-time Status Card */}
      <div className="flex items-center bg-[#071325]/90 border border-[#1d3d66] rounded-xl px-4 py-2 shadow-[0_0_15px_rgba(15,35,65,0.6)]">
        {/* CPU Segment */}
        <div className="flex items-center gap-2 px-3">
          <div className="w-6 h-6 rounded bg-[#0b2444] border border-[#28b8ff]/40 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-[#28b8ff]" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 font-rajdhani">CPU</span>
          <span className="text-sm font-bold font-mono text-[#28b8ff] drop-shadow-[0_0_6px_rgba(40,184,255,0.6)]">
            {Math.round(inputs.cpuTemp)}°C
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#1b3a62]" />

        {/* GPU Segment */}
        <div className="flex items-center gap-2 px-4">
          <div className="w-6 h-6 rounded bg-[#200f38] border border-[#a45cff]/40 flex items-center justify-center">
            <Server className="w-3.5 h-3.5 text-[#c084fc]" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 font-rajdhani">GPU</span>
          <span className="text-sm font-bold font-mono text-[#c084fc] drop-shadow-[0_0_6px_rgba(164,92,255,0.6)]">
            {Math.round(inputs.gpuTemp)}°C
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#1b3a62]" />

        {/* Load Segment */}
        <div className="flex items-center gap-2 px-3">
          <div className="w-6 h-6 rounded bg-[#261605] border border-[#ff9d3d]/40 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#ff9d3d]" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 font-rajdhani">LOAD</span>
          <span className="text-sm font-bold font-mono text-[#ff9d3d] drop-shadow-[0_0_6px_rgba(255,157,61,0.6)]">
            {Math.round(inputs.systemLoad)}%
          </span>
        </div>
      </div>

      {/* Right: Controls & Status Pills */}
      <div className="flex items-center gap-3">
        {/* LIVE AI Toggle Button */}
        <button
          onClick={() => setIsLiveMode(true)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 uppercase font-rajdhani ${
            isLiveMode
              ? 'bg-[#06241a] text-[#00ff9d] border border-[#00ff9d]/70 shadow-[0_0_14px_rgba(0,255,157,0.35)]'
              : 'bg-[#081524] text-slate-400 border border-[#1b3554] hover:text-slate-200'
          }`}
        >
          <Activity className={`w-3.5 h-3.5 ${isLiveMode ? 'text-[#00ff9d] animate-pulse' : 'text-slate-500'}`} />
          <span>LIVE AI</span>
        </button>

        {/* MANUAL Toggle Button */}
        <button
          onClick={() => setIsLiveMode(false)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 uppercase font-rajdhani ${
            !isLiveMode
              ? 'bg-[#15233c] text-[#28b8ff] border border-[#28b8ff]/70 shadow-[0_0_12px_rgba(40,184,255,0.3)]'
              : 'bg-[#081524] text-slate-400 border border-[#1b3554] hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>MANUAL</span>
        </button>

        {/* System & Backend Online Badge */}
        <div className={`flex items-center border rounded-lg px-3 py-1.5 shadow-[0_0_10px_rgba(0,255,157,0.2)] ${
          isBackendConnected
            ? 'bg-[#051c14] border-[#00ff9d]/50'
            : 'bg-[#2b1008] border-[#ff9d3d]/50'
        }`}>
          <span className={`text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 font-rajdhani ${
            isBackendConnected ? 'text-[#00ff9d]' : 'text-[#ff9d3d]'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-[#00ff9d] animate-ping' : 'bg-[#ff9d3d]'}`} />
            {isBackendConnected ? 'FASTAPI ONLINE' : 'STANDALONE MODE'}
          </span>
          <span className="mx-2 text-slate-600">|</span>
          <span className={`text-xs font-mono font-semibold ${isBackendConnected ? 'text-[#00ff9d]/90' : 'text-[#ff9d3d]/90'}`}>
            {isBackendConnected ? '3ms' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </header>
  );
};
