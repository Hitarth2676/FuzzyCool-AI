import React from 'react';
import { Droplets, Fan, ShieldAlert, Waves, Volume2, Flame, LineChart } from 'lucide-react';
import { ActuationOutputs } from '../../types/thermal';
import { SemicircularGauge } from './SemicircularGauge';

interface AIActuationPanelProps {
  outputs: ActuationOutputs;
  onOpenTelemetry: () => void;
}

export const AIActuationPanel: React.FC<AIActuationPanelProps> = ({
  outputs,
  onOpenTelemetry,
}) => {
  const isCritical = outputs.systemCondition === 'CRITICAL';
  const isHigh = outputs.systemCondition === 'HIGH';
  const isWarm = outputs.systemCondition === 'WARM';

  // Condition alert colors
  const alertBorder = isCritical
    ? 'border-[#ff3b3b]/60'
    : isHigh
    ? 'border-[#ff9d3d]/60'
    : isWarm
    ? 'border-[#facc15]/60'
    : 'border-[#00ff9d]/60';

  const alertBg = isCritical
    ? 'bg-[#29070a]/80'
    : isHigh
    ? 'bg-[#261505]/80'
    : isWarm
    ? 'bg-[#211a05]/80'
    : 'bg-[#051c14]/80';

  const alertBadgeBg = isCritical
    ? 'bg-[#ff3b3b] text-white'
    : isHigh
    ? 'bg-[#ff9d3d] text-slate-950'
    : isWarm
    ? 'bg-[#facc15] text-slate-950'
    : 'bg-[#00ff9d] text-slate-950';

  const alertText = isCritical
    ? 'text-[#ff4d4d]'
    : isHigh
    ? 'text-[#ff9d3d]'
    : isWarm
    ? 'text-[#facc15]'
    : 'text-[#00ff9d]';

  return (
    <div className="w-full lg:w-[350px] flex-shrink-0 tech-card p-3 flex flex-col justify-start space-y-2.5">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#142944] pb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#28b8ff] shadow-[0_0_6px_#28b8ff]" />
          <h2 className="text-xs font-bold tracking-wider text-[#28b8ff] font-orbitron uppercase drop-shadow-[0_0_6px_rgba(40,184,255,0.4)]">
            AI ACTUATION
          </h2>
        </div>
        <span className="text-[9px] font-mono tracking-widest text-slate-400 font-semibold">
          DEFUZZIFIED METRICS
        </span>
      </div>

      {/* 1. PUMP SPEED GAUGE */}
      <div>
        <SemicircularGauge
          value={outputs.pumpSpeed}
          subValue={`~${outputs.pumpRpm} RPM`}
          title="PUMP SPEED"
          icon={<Droplets className="w-3.5 h-3.5" />}
          theme="cyan"
        />
      </div>

      {/* 2. FAN SPEED GAUGE */}
      <div>
        <SemicircularGauge
          value={outputs.fanSpeed}
          subValue={`~${outputs.fanRpm} RPM`}
          title="FAN SPEED"
          icon={<Fan className="w-3.5 h-3.5" />}
          theme="purple"
        />
      </div>

      {/* 3. SYSTEM CONDITION ALERT CARD */}
      <div
        className={`p-2.5 rounded-xl border ${alertBorder} ${alertBg} shadow-[0_0_15px_rgba(255,59,59,0.15)] flex flex-col gap-0.5 transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className={`w-4 h-4 ${alertText}`} />
            <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-rajdhani">
              SYSTEM CONDITION
            </span>
          </div>
          <span
            className={`text-[9px] font-mono font-black px-2 py-0.5 rounded shadow-sm uppercase ${alertBadgeBg}`}
          >
            {outputs.systemCondition}
          </span>
        </div>
        <p className={`text-[10.5px] font-rajdhani font-medium ${alertText} pl-5 tracking-wide`}>
          {outputs.conditionDescription}
        </p>
      </div>

      {/* 4. THREE METRIC CARDS */}
      <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-[#142944]">
        {/* FLOW RATE */}
        <div className="bg-[#050c18]/80 border border-[#112642] rounded-lg p-2 text-center flex flex-col items-center justify-center">
          <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider font-rajdhani mb-0.5">
            FLOW RATE
          </span>
          <Waves className="w-3.5 h-3.5 text-[#28b8ff] mb-0.5" />
          <span className="text-xs font-bold font-mono text-slate-100">
            {outputs.flowRate.toFixed(2)}{' '}
            <span className="text-[9px] font-normal text-slate-400">L/min</span>
          </span>
          <span className="text-[8px] font-mono text-cyan-400/80 mt-0.5">NOMINAL</span>
        </div>

        {/* ACOUSTIC NOISE */}
        <div className="bg-[#050c18]/80 border border-[#112642] rounded-lg p-2 text-center flex flex-col items-center justify-center">
          <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider font-rajdhani mb-0.5">
            ACOUSTIC NOISE
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#ff9d3d] mb-0.5" />
          <span className="text-xs font-bold font-mono text-slate-100">
            {outputs.acousticNoise.toFixed(1)}{' '}
            <span className="text-[9px] font-normal text-slate-400">dBA</span>
          </span>
          <span className="text-[8px] font-mono text-orange-400/80 mt-0.5">OPTIMAL</span>
        </div>

        {/* HEAT DISSIPATED */}
        <div className="bg-[#050c18]/80 border border-[#112642] rounded-lg p-2 text-center flex flex-col items-center justify-center">
          <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider font-rajdhani mb-0.5">
            HEAT DISSIPATED
          </span>
          <Flame className="w-3.5 h-3.5 text-[#ff4d4d] mb-0.5" />
          <span className="text-xs font-bold font-mono text-slate-100">
            {outputs.heatDissipated}{' '}
            <span className="text-[9px] font-normal text-slate-400">W</span>
          </span>
          <span className="text-[8px] font-mono text-red-400/80 mt-0.5">HIGH LOAD</span>
        </div>
      </div>

      {/* 5. BOTTOM ACTION BUTTON */}
      <button
        onClick={onOpenTelemetry}
        className="w-full py-2 px-3 rounded-lg bg-[#050e1c] hover:bg-[#091a33] text-slate-300 hover:text-[#28b8ff] border border-[#152e4f] hover:border-[#28b8ff]/40 text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors font-rajdhani uppercase"
      >
        <LineChart className="w-3.5 h-3.5 text-[#28b8ff]" />
        <span>VIEW TELEMETRY HISTORY</span>
      </button>
    </div>
  );
};
