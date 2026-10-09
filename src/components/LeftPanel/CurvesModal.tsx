import React from 'react';
import { X, TrendingUp, Info } from 'lucide-react';
import { SensorInputs } from '../../types/thermal';

interface CurvesModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: SensorInputs;
}

export const CurvesModal: React.FC<CurvesModalProps> = ({
  isOpen,
  onClose,
  inputs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#071325] border border-[#a45cff]/40 rounded-xl shadow-[0_0_40px_rgba(164,92,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b3a62] bg-[#050d1a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1e0f38] border border-[#a45cff]/50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#c084fc]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-white font-orbitron">
                TRIANGULAR MEMBERSHIP FUNCTIONS (trimf)
              </h2>
              <p className="text-xs text-slate-400 font-rajdhani">
                Fuzzification curves across CPU, GPU, and System Load ranges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* CPU Function */}
          <div className="p-4 rounded-lg bg-[#040a14] border border-[#152a45]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold tracking-wider text-[#28b8ff] font-orbitron">
                CPU TEMPERATURE MEMBERSHIP [20°C - 100°C]
              </span>
              <span className="text-xs font-mono bg-[#09223d] text-[#28b8ff] px-2 py-0.5 rounded">
                Current: {inputs.cpuTemp}°C
              </span>
            </div>
            <div className="h-28 w-full bg-[#02060d] rounded border border-[#0d1d33] p-2 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="25" x2="400" y2="25" stroke="#0d223d" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#0d223d" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#0d223d" strokeWidth="1" strokeDasharray="4" />

                {/* LOW */}
                <polygon points="0,95 25,10 75,95" fill="rgba(40,184,255,0.15)" stroke="#28b8ff" strokeWidth="1.5" />
                {/* MEDIUM */}
                <polygon points="50,95 125,10 200,95" fill="rgba(40,184,255,0.2)" stroke="#28b8ff" strokeWidth="1.5" />
                {/* HIGH */}
                <polygon points="150,95 225,10 300,95" fill="rgba(40,184,255,0.25)" stroke="#28b8ff" strokeWidth="1.5" />
                {/* CRIT */}
                <polygon points="250,95 325,10 400,95" fill="rgba(255,59,59,0.3)" stroke="#ff3b3b" strokeWidth="1.5" />

                {/* Current input marker */}
                {(() => {
                  const x = ((inputs.cpuTemp - 20) / 80) * 400;
                  return (
                    <>
                      <line x1={x} y1="0" x2={x} y2="95" stroke="#ff9d3d" strokeWidth="2" strokeDasharray="3" />
                      <circle cx={x} cy="10" r="4" fill="#ff9d3d" />
                    </>
                  );
                })()}
              </svg>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
              <span className="text-cyan-400">LOW [10, 25, 45]</span>
              <span className="text-cyan-300">MEDIUM [35, 50, 70]</span>
              <span className="text-cyan-200">HIGH [50, 70, 85]</span>
              <span className="text-red-400">CRITICAL [75, 90, 105]</span>
            </div>
          </div>

          {/* GPU Function */}
          <div className="p-4 rounded-lg bg-[#040a14] border border-[#152a45]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold tracking-wider text-[#c084fc] font-orbitron">
                GPU TEMPERATURE MEMBERSHIP [20°C - 95°C]
              </span>
              <span className="text-xs font-mono bg-[#200f38] text-[#c084fc] px-2 py-0.5 rounded">
                Current: {inputs.gpuTemp}°C
              </span>
            </div>
            <div className="h-28 w-full bg-[#02060d] rounded border border-[#0d1d33] p-2 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                {/* Grid */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="#1a0f30" strokeWidth="1" strokeDasharray="4" />
                {/* LOW */}
                <polygon points="0,95 30,10 80,95" fill="rgba(164,92,255,0.15)" stroke="#a45cff" strokeWidth="1.5" />
                {/* MEDIUM */}
                <polygon points="60,95 130,10 200,95" fill="rgba(164,92,255,0.2)" stroke="#a45cff" strokeWidth="1.5" />
                {/* HIGH */}
                <polygon points="150,95 240,10 320,95" fill="rgba(164,92,255,0.25)" stroke="#a45cff" strokeWidth="1.5" />
                {/* CRIT */}
                <polygon points="260,95 340,10 400,95" fill="rgba(255,59,59,0.3)" stroke="#ff3b3b" strokeWidth="1.5" />

                {/* Marker */}
                {(() => {
                  const x = ((inputs.gpuTemp - 20) / 75) * 400;
                  return (
                    <>
                      <line x1={x} y1="0" x2={x} y2="95" stroke="#ff9d3d" strokeWidth="2" strokeDasharray="3" />
                      <circle cx={x} cy="10" r="4" fill="#ff9d3d" />
                    </>
                  );
                })()}
              </svg>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
              <span className="text-purple-400">LOW [10, 25, 42]</span>
              <span className="text-purple-300">MEDIUM [32, 45, 58]</span>
              <span className="text-purple-200">HIGH [40, 60, 80]</span>
              <span className="text-red-400">CRITICAL [70, 85, 100]</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1b3a62] bg-[#050d1a] flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Mamdani fuzzy inference aggregates these curves in real-time</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#200f38] text-[#c084fc] border border-[#a45cff]/40 text-xs font-bold tracking-wider hover:bg-[#2d154f] transition-colors"
          >
            CLOSE CURVES
          </button>
        </div>
      </div>
    </div>
  );
};
