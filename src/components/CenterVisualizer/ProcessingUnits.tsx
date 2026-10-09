import React from 'react';
import { SensorInputs } from '../../types/thermal';

interface ProcessingUnitsProps {
  inputs: SensorInputs;
}

export const ProcessingUnits: React.FC<ProcessingUnitsProps> = ({ inputs }) => {
  const { cpuTemp, gpuTemp } = inputs;

  const getCpuBadgeText = (temp: number) => {
    if (temp >= 80) return 'CRIT';
    if (temp >= 70) return 'HOT';
    if (temp >= 50) return 'WARM';
    return 'COOL';
  };

  const getGpuBadgeText = (temp: number) => {
    if (temp >= 78) return 'CRIT';
    if (temp >= 68) return 'HOT';
    if (temp >= 48) return 'WARM';
    return 'COOL';
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full py-1">
      {/* Section Header */}
      <div className="text-center mb-1 w-full">
        <h3 className="text-xs font-bold tracking-widest text-[#28b8ff] uppercase font-orbitron drop-shadow-[0_0_10px_rgba(40,184,255,0.7)]">
          PROCESSING UNITS
        </h3>
      </div>

      {/* Main Processors Stack */}
      <div className="flex flex-col items-center justify-center my-auto w-full space-y-1">
        {/* ========================================================================= */}
        {/* 1. PHYSICAL INDUSTRIAL CPU WATERBLOCK PROCESSOR MODULE */}
        {/* ========================================================================= */}
        <div className="relative w-[190px] h-[168px] flex items-center justify-center">
          {/* Layer 1: Dark Green/Gold PCB Substrate with Gold Edge Fingers */}
          <div className="absolute inset-0 bg-[#091510] border-2 border-[#b45309]/80 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Top & Bottom Gold Contact Pins */}
            <div className="absolute top-0 left-6 right-6 h-2 flex justify-between px-1">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-gradient-to-b from-[#f59e0b] to-[#78350f] shadow-[0_0_2px_#f59e0b]" />
              ))}
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-2 flex justify-between px-1">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-gradient-to-t from-[#f59e0b] to-[#78350f] shadow-[0_0_2px_#f59e0b]" />
              ))}
            </div>
            {/* Micro SMD Capacitors & Traces */}
            <div className="absolute top-3 left-2 flex flex-col gap-1">
              <div className="w-2 h-1 bg-[#d97706] rounded-xs" />
              <div className="w-2 h-1 bg-[#d97706] rounded-xs" />
            </div>
            <div className="absolute top-3 right-2 flex flex-col gap-1">
              <div className="w-2 h-1 bg-[#d97706] rounded-xs" />
              <div className="w-2 h-1 bg-[#d97706] rounded-xs" />
            </div>
          </div>

          {/* Thermal Dissipation Glow Halo */}
          <div
            className="absolute -inset-1 rounded-2xl pointer-events-none animate-heat-pulse opacity-70 transition-all duration-300"
            style={{
              boxShadow: `0 0 ${Math.max(20, (cpuTemp / 100) * 45)}px rgba(255, 100, 40, ${Math.min(0.85, cpuTemp / 85)})`,
            }}
          />

          {/* Layer 2 & 3: Heavy CNC Machined Silver/Aluminum Socket Retention Frame */}
          <div className="relative w-[172px] h-[150px] bg-gradient-to-br from-[#94a3b8] via-[#475569] to-[#1e293b] border-2 border-[#cbd5e1] rounded-xl p-2 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-center">
            {/* 4 Heavy Industrial Silver Corner Hex Bolts with Washers */}
            <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#f1f5f9] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#1e293b] rounded-sm" />
            </div>
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#f1f5f9] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#1e293b] rounded-sm" />
            </div>
            <div className="absolute bottom-1.5 left-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#f1f5f9] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#1e293b] rounded-sm" />
            </div>
            <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#f1f5f9] to-[#64748b] border border-white shadow-[0_0_4px_rgba(255,255,255,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#1e293b] rounded-sm" />
            </div>

            {/* Layer 4: Dark Graphite/Copper Integrated Heat Spreader (IHS) Plate */}
            <div className="relative w-[142px] h-[122px] bg-gradient-to-b from-[#111c2b] via-[#070d16] to-[#02050a] border-2 border-[#28b8ff]/70 rounded-lg flex flex-col items-center justify-center p-2 shadow-[inset_0_3px_12px_rgba(0,0,0,0.95),0_0_15px_rgba(0,0,0,0.8)]">
              {/* Layer 5: Embedded OLED Telemetry Readout */}
              <span className="text-xs font-bold text-slate-400 tracking-widest font-orbitron uppercase">
                CPU
              </span>

              {/* Glowing Cyan Temperature Text */}
              <span className="text-3xl font-black font-mono text-[#28b8ff] drop-shadow-[0_0_14px_rgba(40,184,255,0.95)] my-0.5 tracking-tight">
                {cpuTemp}°C
              </span>

              {/* Status Pill Badge */}
              <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-[#3d1a08] text-[#ff9d3d] border border-[#ff9d3d]/70 shadow-[0_0_8px_rgba(255,157,61,0.4)] tracking-wider">
                {getCpuBadgeText(cpuTemp)}
              </span>
            </div>
          </div>

          {/* Right Tube Inflow Port Fitting */}
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-6 bg-gradient-to-r from-[#1e293b] to-[#475569] border border-[#28b8ff] rounded-r shadow-md z-30 flex items-center justify-center">
            <div className="w-1 h-3 bg-[#28b8ff] rounded-full shadow-[0_0_4px_#28b8ff]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VERTICAL HEAT & COOLANT INTERCONNECT PIPES */}
        {/* ========================================================================= */}
        <div className="relative w-[190px] h-12 flex items-center justify-around px-10">
          {/* Left Column: Hot Fluid Upward Thermal Rise (Red/Orange with Fittings) */}
          <div className="relative flex flex-col items-center justify-center h-full w-7 bg-gradient-to-b from-[#5c0a13] via-[#240407] to-[#4a080f] border-2 border-[#ff3b3b] rounded-full shadow-[0_0_14px_rgba(255,59,59,0.7)] overflow-hidden">
            <div className="flex flex-col space-y-0.5 items-center animate-pulse">
              <span className="text-[11px] text-[#ff3b3b] font-black leading-none drop-shadow-[0_0_6px_#ff3b3b]">▲</span>
              <span className="text-[11px] text-[#ff9d3d] font-black leading-none drop-shadow-[0_0_6px_#ff9d3d]">▲</span>
            </div>
          </div>

          {/* Right Column: Cooled Fluid Return (Cyan with Fittings) */}
          <div className="relative flex flex-col items-center justify-center h-full w-7 bg-gradient-to-b from-[#09355e] via-[#041629] to-[#0a3863] border-2 border-[#28b8ff] rounded-full shadow-[0_0_14px_rgba(40,184,255,0.7)] overflow-hidden">
            <div className="flex flex-col space-y-0.5 items-center animate-pulse">
              <span className="text-[11px] text-[#28b8ff] font-black leading-none drop-shadow-[0_0_6px_#28b8ff]">▼</span>
              <span className="text-[11px] text-[#38bdf8] font-black leading-none drop-shadow-[0_0_6px_#38bdf8]">▼</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PHYSICAL INDUSTRIAL GPU COMPUTE MODULE WATERBLOCK */}
        {/* ========================================================================= */}
        <div className="relative w-[190px] h-[168px] flex items-center justify-center">
          {/* Layer 1: Dark Purple/Black PCB Substrate with Memory Modules & Traces */}
          <div className="absolute inset-0 bg-[#160626] border-2 border-[#a855f7]/80 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Top & Bottom Gold Contact Teeth */}
            <div className="absolute top-0 left-6 right-6 h-2 flex justify-between px-1">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-gradient-to-b from-[#f59e0b] to-[#78350f] shadow-[0_0_2px_#f59e0b]" />
              ))}
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-2 flex justify-between px-1">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-gradient-to-t from-[#f59e0b] to-[#78350f] shadow-[0_0_2px_#f59e0b]" />
              ))}
            </div>
            {/* Visible GPU VRAM Memory Chips on Sides */}
            <div className="absolute top-4 left-1.5 flex flex-col gap-1.5">
              <div className="w-2.5 h-4 bg-[#0a0212] border border-[#a855f7]/50 rounded-xs" />
              <div className="w-2.5 h-4 bg-[#0a0212] border border-[#a855f7]/50 rounded-xs" />
            </div>
            <div className="absolute top-4 right-1.5 flex flex-col gap-1.5">
              <div className="w-2.5 h-4 bg-[#0a0212] border border-[#a855f7]/50 rounded-xs" />
              <div className="w-2.5 h-4 bg-[#0a0212] border border-[#a855f7]/50 rounded-xs" />
            </div>
          </div>

          {/* Purple Ambient Lighting Halo */}
          <div
            className="absolute -inset-1 rounded-2xl pointer-events-none opacity-75 transition-all duration-300"
            style={{
              boxShadow: `0 0 ${Math.max(20, (gpuTemp / 100) * 45)}px rgba(168, 85, 247, 0.75)`,
            }}
          />

          {/* Layer 2 & 3: Heavy Black/Gunmetal Anodized Aluminum Retention Bracket */}
          <div className="relative w-[172px] h-[150px] bg-gradient-to-br from-[#4a226b] via-[#210f36] to-[#0d0417] border-2 border-[#c084fc] rounded-xl p-2 shadow-[inset_0_2px_4px_rgba(230,170,255,0.5),0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-center">
            {/* 4 Titanium/Purple Corner Socket Bolts with Washers */}
            <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#7e22ce] border border-white shadow-[0_0_4px_rgba(216,180,254,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#170329] rounded-sm" />
            </div>
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#7e22ce] border border-white shadow-[0_0_4px_rgba(216,180,254,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#170329] rounded-sm" />
            </div>
            <div className="absolute bottom-1.5 left-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#7e22ce] border border-white shadow-[0_0_4px_rgba(216,180,254,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#170329] rounded-sm" />
            </div>
            <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#7e22ce] border border-white shadow-[0_0_4px_rgba(216,180,254,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#170329] rounded-sm" />
            </div>

            {/* Layer 4: Dark Inner Heatplate */}
            <div className="relative w-[142px] h-[122px] bg-gradient-to-b from-[#1c0f33] via-[#0b0514] to-[#030108] border-2 border-[#a45cff]/70 rounded-lg flex flex-col items-center justify-center p-2 shadow-[inset_0_3px_12px_rgba(0,0,0,0.95),0_0_15px_rgba(0,0,0,0.8)]">
              {/* Layer 5: Embedded OLED Telemetry Readout */}
              <span className="text-xs font-bold text-slate-400 tracking-widest font-orbitron uppercase">
                GPU
              </span>

              {/* Glowing Purple Temperature Text */}
              <span className="text-3xl font-black font-mono text-[#c084fc] drop-shadow-[0_0_14px_rgba(192,132,252,0.95)] my-0.5 tracking-tight">
                {gpuTemp}°C
              </span>

              {/* Status Pill Badge */}
              <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-[#290d45] text-[#c084fc] border border-[#a45cff]/70 shadow-[0_0_8px_rgba(164,92,255,0.4)] tracking-wider">
                {getGpuBadgeText(gpuTemp)}
              </span>
            </div>
          </div>

          {/* Right Hot Outflow Port Fitting */}
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-6 bg-gradient-to-r from-[#240407] to-[#5c0a13] border border-[#ff3b3b] rounded-r shadow-md z-30 flex items-center justify-center">
            <div className="w-1 h-3 bg-[#ff3b3b] rounded-full shadow-[0_0_4px_#ff3b3b]" />
          </div>

          {/* Bottom Cooled Inflow Port Fitting */}
          <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-[#1e293b] to-[#475569] border border-[#28b8ff] rounded-b shadow-md z-30 flex items-center justify-center">
            <div className="w-3 h-1 bg-[#28b8ff] rounded-full shadow-[0_0_4px_#28b8ff]" />
          </div>
        </div>
      </div>
    </div>
  );
};
