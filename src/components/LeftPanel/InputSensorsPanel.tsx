import React, { useState } from 'react';
import { Cpu, Server, Zap, Play, RotateCcw, BookOpen, TrendingUp, ChevronDown, Square } from 'lucide-react';
import { SensorInputs } from '../../types/thermal';
import { SCENARIO_PRESETS } from '../../utils/fuzzyEngine';

interface InputSensorsPanelProps {
  inputs: SensorInputs;
  onInputChange: (key: keyof SensorInputs, value: number) => void;
  onRunFuzzyAI: () => void;
  onResetInputs: () => void;
  onOpenRuleMatrix: () => void;
  onOpenCurves: () => void;
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  isSimulating?: boolean;
  simulationPhase?: string;
}

export const InputSensorsPanel: React.FC<InputSensorsPanelProps> = ({
  inputs,
  onInputChange,
  onRunFuzzyAI,
  onResetInputs,
  onOpenRuleMatrix,
  onOpenCurves,
  selectedPresetId,
  onSelectPreset,
  isSimulating = false,
  simulationPhase = '',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper to determine badges
  const getCpuBadge = (temp: number) => {
    if (temp >= 80) return { label: 'CRIT', bg: 'bg-[#420f14]', text: 'text-[#ff3b3b]', border: 'border-[#ff3b3b]/60' };
    if (temp >= 70) return { label: 'HOT', bg: 'bg-[#3b1219]', text: 'text-[#ff6b6b]', border: 'border-[#ff6b6b]/50' };
    if (temp >= 50) return { label: 'WARM', bg: 'bg-[#331808]', text: 'text-[#ff9d3d]', border: 'border-[#ff9d3d]/50' };
    return { label: 'COOL', bg: 'bg-[#09223d]', text: 'text-[#28b8ff]', border: 'border-[#28b8ff]/50' };
  };

  const getGpuBadge = (temp: number) => {
    if (temp >= 78) return { label: 'CRIT', bg: 'bg-[#420f14]', text: 'text-[#ff3b3b]', border: 'border-[#ff3b3b]/60' };
    if (temp >= 68) return { label: 'HOT', bg: 'bg-[#3b1219]', text: 'text-[#ff6b6b]', border: 'border-[#ff6b6b]/50' };
    if (temp >= 48) return { label: 'WARM', bg: 'bg-[#230f38]', text: 'text-[#c084fc]', border: 'border-[#a45cff]/50' };
    return { label: 'COOL', bg: 'bg-[#09223d]', text: 'text-[#28b8ff]', border: 'border-[#28b8ff]/50' };
  };

  const getLoadBadge = (load: number) => {
    if (load >= 85) return { label: 'CRIT', bg: 'bg-[#420f14]', text: 'text-[#ff3b3b]', border: 'border-[#ff3b3b]/60' };
    if (load >= 65) return { label: 'HIGH', bg: 'bg-[#301605]', text: 'text-[#ff9d3d]', border: 'border-[#ff9d3d]/50' };
    if (load >= 35) return { label: 'MOD', bg: 'bg-[#261f08]', text: 'text-[#facc15]', border: 'border-[#facc15]/50' };
    return { label: 'IDLE', bg: 'bg-[#09223d]', text: 'text-[#28b8ff]', border: 'border-[#28b8ff]/50' };
  };

  const cpuBadge = getCpuBadge(inputs.cpuTemp);
  const gpuBadge = getGpuBadge(inputs.gpuTemp);
  const loadBadge = getLoadBadge(inputs.systemLoad);

  // Percentage calculations for sliders
  const cpuPercent = ((inputs.cpuTemp - 20) / (100 - 20)) * 100;
  const gpuPercent = ((inputs.gpuTemp - 20) / (95 - 20)) * 100;
  const loadPercent = inputs.systemLoad;

  const currentPreset = SCENARIO_PRESETS.find((p) => p.id === selectedPresetId) || SCENARIO_PRESETS[0];

  return (
    <div className="w-full lg:w-[320px] flex-shrink-0 tech-card p-3 flex flex-col justify-start space-y-2.5">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#142944] pb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#28b8ff] shadow-[0_0_6px_#28b8ff]" />
          <h2 className="text-xs font-bold tracking-wider text-[#28b8ff] font-orbitron uppercase drop-shadow-[0_0_6px_rgba(40,184,255,0.4)]">
            INPUT SENSORS
          </h2>
        </div>
        {isSimulating ? (
          <span className="text-[9px] font-mono tracking-widest text-[#ff9d3d] font-bold animate-pulse">
            LIVE SIMULATION
          </span>
        ) : (
          <span className="text-[9px] font-mono tracking-widest text-slate-400 font-semibold">
            REAL-TIME TELEMETRY
          </span>
        )}
      </div>

      {/* 1. CPU TEMPERATURE */}
      <div className="bg-[#050c18]/80 p-2.5 rounded-lg border border-[#11243d]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#2a0e14] border border-[#ff3b3b]/40 flex items-center justify-center">
              <Cpu className="w-3 h-3 text-[#ff4d4d]" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-rajdhani">
              CPU TEMPERATURE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black font-mono text-[#ff4d4d] drop-shadow-[0_0_8px_rgba(255,77,77,0.7)]">
              {Math.round(inputs.cpuTemp)}°C
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${cpuBadge.bg} ${cpuBadge.text} ${cpuBadge.border}`}
            >
              {cpuBadge.label}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative pt-0.5 pb-0.5">
          <input
            type="range"
            min="20"
            max="100"
            step="1"
            value={Math.round(inputs.cpuTemp)}
            onChange={(e) => onInputChange('cpuTemp', Number(e.target.value))}
            className="slider-cpu w-full h-1.5 bg-[#0e1e33] rounded-lg appearance-none cursor-pointer relative z-10"
            style={{
              background: `linear-gradient(to right, #ff3b3b 0%, #ff4d4d ${cpuPercent}%, #0e1e33 ${cpuPercent}%, #0e1e33 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
          <span>20°C (IDLE)</span>
          <span>100°C (CRIT)</span>
        </div>
      </div>

      {/* 2. GPU TEMPERATURE */}
      <div className="bg-[#050c18]/80 p-2.5 rounded-lg border border-[#11243d]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#200f38] border border-[#a45cff]/40 flex items-center justify-center">
              <Server className="w-3 h-3 text-[#c084fc]" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-rajdhani">
              GPU TEMPERATURE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black font-mono text-[#c084fc] drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]">
              {Math.round(inputs.gpuTemp)}°C
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${gpuBadge.bg} ${gpuBadge.text} ${gpuBadge.border}`}
            >
              {gpuBadge.label}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative pt-0.5 pb-0.5">
          <input
            type="range"
            min="20"
            max="95"
            step="1"
            value={Math.round(inputs.gpuTemp)}
            onChange={(e) => onInputChange('gpuTemp', Number(e.target.value))}
            className="slider-gpu w-full h-1.5 bg-[#0e1e33] rounded-lg appearance-none cursor-pointer relative z-10"
            style={{
              background: `linear-gradient(to right, #9333ea 0%, #c084fc ${gpuPercent}%, #0e1e33 ${gpuPercent}%, #0e1e33 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
          <span>20°C (IDLE)</span>
          <span>95°C (CRIT)</span>
        </div>
      </div>

      {/* 3. SYSTEM LOAD */}
      <div className="bg-[#050c18]/80 p-2.5 rounded-lg border border-[#11243d]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#2b1706] border border-[#ff9d3d]/40 flex items-center justify-center">
              <Zap className="w-3 h-3 text-[#ff9d3d]" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-rajdhani">
              SYSTEM LOAD
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black font-mono text-[#ff9d3d] drop-shadow-[0_0_8px_rgba(255,157,61,0.7)]">
              {Math.round(inputs.systemLoad)}%
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${loadBadge.bg} ${loadBadge.text} ${loadBadge.border}`}
            >
              {loadBadge.label}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative pt-0.5 pb-0.5">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={Math.round(inputs.systemLoad)}
            onChange={(e) => onInputChange('systemLoad', Number(e.target.value))}
            className="slider-load w-full h-1.5 bg-[#0e1e33] rounded-lg appearance-none cursor-pointer relative z-10"
            style={{
              background: `linear-gradient(to right, #ea580c 0%, #ff9d3d ${loadPercent}%, #0e1e33 ${loadPercent}%, #0e1e33 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
          <span>0% (STANDBY)</span>
          <span>100% (STRESS)</span>
        </div>
      </div>

      {/* SCENARIO PRESETS DROPDOWN */}
      <div>
        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-rajdhani">
          SCENARIO PRESETS (NOTEBOOK TESTS)
        </span>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-[#050e1c] border border-[#1d3d66] hover:border-[#28b8ff]/60 rounded-lg px-2.5 py-2 text-left flex items-center justify-between text-xs font-rajdhani font-semibold text-slate-200 transition-colors shadow-inner"
          >
            <span className="truncate">{currentPreset.name}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#28b8ff] transition-transform duration-200 flex-shrink-0 ${
                isDropdownOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-[#071325] border border-[#28b8ff]/40 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-30 overflow-hidden">
              {SCENARIO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(preset.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-rajdhani transition-colors flex items-center justify-between border-b border-[#10233b] last:border-b-0 ${
                    preset.id === selectedPresetId
                      ? 'bg-[#0d2a4a] text-[#28b8ff] font-bold'
                      : 'text-slate-300 hover:bg-[#0c1c33] hover:text-white'
                  }`}
                >
                  <span>{preset.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {preset.cpu}° / {preset.gpu}° / {preset.load}%
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Buttons Area - Compact Continuous Stack */}
      <div className="space-y-2 pt-2 border-t border-[#142944]">
        {/* RUN FUZZY AI SIMULATION BUTTON */}
        <button
          onClick={onRunFuzzyAI}
          className={`w-full py-2.5 px-3 rounded-lg text-white font-orbitron font-bold tracking-wider text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 uppercase shadow-lg ${
            isSimulating
              ? 'bg-gradient-to-r from-[#dc2626] via-[#ea580c] to-[#dc2626] shadow-[0_0_22px_rgba(239,68,68,0.7)] animate-pulse'
              : 'bg-gradient-to-r from-[#1758c2] via-[#2185ff] to-[#1255c0] hover:from-[#2185ff] hover:to-[#28b8ff] shadow-[0_0_20px_rgba(33,133,255,0.6)]'
          }`}
        >
          {isSimulating ? (
            <>
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>STOP DEMO SIMULATION</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>RUN FUZZY AI (DEMO LOOP)</span>
            </>
          )}
        </button>

        {/* Real-time simulation status text if active */}
        {isSimulating && simulationPhase && (
          <div className="text-[10px] font-mono text-center text-[#ff9d3d] bg-[#1a0c06] py-1 px-2 rounded border border-[#ea580c]/50">
            {simulationPhase}
          </div>
        )}

        {/* RESET INPUTS BUTTON */}
        <button
          onClick={onResetInputs}
          className="w-full py-2 px-3 rounded-lg bg-[#040c18] hover:bg-[#09182d] text-slate-300 border border-[#1b3a62] hover:border-[#28b8ff]/50 font-rajdhani font-bold tracking-wider text-xs flex items-center justify-center gap-1.5 transition-colors uppercase"
        >
          <RotateCcw className="w-3 h-3 text-slate-400" />
          <span>RESET INPUTS</span>
        </button>

        {/* 9-RULE MATRIX & MEMBERSHIP CURVES */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={onOpenRuleMatrix}
            className="py-1.5 px-2 rounded-lg bg-[#050e1c] hover:bg-[#091a33] text-slate-300 border border-[#152e4f] hover:border-[#28b8ff]/40 text-[10.5px] font-bold tracking-wider flex items-center justify-center gap-1 transition-colors font-rajdhani uppercase"
          >
            <BookOpen className="w-3 h-3 text-[#28b8ff]" />
            <span>9-RULE MATRIX</span>
          </button>
          <button
            onClick={onOpenCurves}
            className="py-1.5 px-2 rounded-lg bg-[#050e1c] hover:bg-[#091a33] text-slate-300 border border-[#152e4f] hover:border-[#a45cff]/40 text-[10.5px] font-bold tracking-wider flex items-center justify-center gap-1 transition-colors font-rajdhani uppercase"
          >
            <TrendingUp className="w-3 h-3 text-[#c084fc]" />
            <span>MEMBERSHIP CURVES</span>
          </button>
        </div>
      </div>
    </div>
  );
};
