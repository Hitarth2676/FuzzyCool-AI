import React from 'react';
import { X, Activity } from 'lucide-react';
import { ActuationOutputs, SensorInputs } from '../../types/thermal';

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: SensorInputs;
  outputs: ActuationOutputs;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({
  isOpen,
  onClose,
  inputs,
  outputs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#071325] border border-[#28b8ff]/40 rounded-xl shadow-[0_0_40px_rgba(40,184,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b3a62] bg-[#050d1a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#09223d] border border-[#28b8ff]/50 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#28b8ff]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-white font-orbitron">
                THERMAL TELEMETRY LOG & HISTORY
              </h2>
              <p className="text-xs text-slate-400 font-rajdhani">
                Real-time actuation parameters & thermodynamic sensor telemetry
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
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded bg-[#040b17] border border-[#142944]">
              <span className="text-[10px] text-slate-400 block uppercase">CPU Temp</span>
              <span className="text-xl font-bold text-[#ff4d4d]">{inputs.cpuTemp}°C</span>
            </div>
            <div className="p-3 rounded bg-[#040b17] border border-[#142944]">
              <span className="text-[10px] text-slate-400 block uppercase">GPU Temp</span>
              <span className="text-xl font-bold text-[#c084fc]">{inputs.gpuTemp}°C</span>
            </div>
            <div className="p-3 rounded bg-[#040b17] border border-[#142944]">
              <span className="text-[10px] text-slate-400 block uppercase">Pump Speed</span>
              <span className="text-xl font-bold text-[#28b8ff]">{outputs.pumpSpeed.toFixed(1)}%</span>
            </div>
            <div className="p-3 rounded bg-[#040b17] border border-[#142944]">
              <span className="text-[10px] text-slate-400 block uppercase">Fan Speed</span>
              <span className="text-xl font-bold text-[#a45cff]">{outputs.fanSpeed.toFixed(1)}%</span>
            </div>
          </div>

          {/* Historical Waveform Preview */}
          <div className="p-4 rounded-lg bg-[#040a14] border border-[#152a45]">
            <span className="text-xs font-bold text-slate-300 font-orbitron uppercase block mb-3">
              LIVE SENSOR OSCILLOSCOPE (LAST 60s)
            </span>
            <div className="h-32 w-full bg-[#02060d] rounded border border-[#0d1d33] p-2 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                {/* Horizontal Grid */}
                <line x1="0" y1="25" x2="500" y2="25" stroke="#0d223d" strokeWidth="1" strokeDasharray="3" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="#0d223d" strokeWidth="1" strokeDasharray="3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#0d223d" strokeWidth="1" strokeDasharray="3" />

                {/* Simulated Telemetry Sine Wave 1 (Coolant Flow) */}
                <path
                  d="M 0 50 Q 50 30, 100 50 T 200 50 T 300 50 T 400 50 T 500 50"
                  fill="none"
                  stroke="#28b8ff"
                  strokeWidth="2"
                  opacity="0.8"
                />
                {/* Simulated Telemetry Sine Wave 2 (Thermal Load) */}
                <path
                  d="M 0 60 Q 60 75, 120 60 T 240 60 T 360 60 T 480 60 L 500 60"
                  fill="none"
                  stroke="#ff9d3d"
                  strokeWidth="2"
                  opacity="0.8"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1b3a62] bg-[#050d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0e2747] text-[#28b8ff] border border-[#28b8ff]/40 text-xs font-bold tracking-wider hover:bg-[#153866] transition-colors"
          >
            CLOSE TELEMETRY
          </button>
        </div>
      </div>
    </div>
  );
};
