import React from 'react';
import { ActuationOutputs, MembershipDegrees } from '../../types/thermal';
import { MembershipGraph } from './MembershipGraph';
import { DefuzzificationChart } from './DefuzzificationChart';
import { Flame, ArrowRight } from 'lucide-react';

interface AIDecisionEngineProps {
  outputs: ActuationOutputs;
  memberships: MembershipDegrees;
}

export const AIDecisionEngine: React.FC<AIDecisionEngineProps> = ({
  outputs,
  memberships,
}) => {
  const { activeRule, firingStrength, pumpSpeed, fanSpeed } = outputs;

  return (
    <div className="w-full tech-card p-3 flex flex-col justify-between space-y-2">
      {/* Top Header & Pipeline Breadcrumb Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 border-b border-[#142944] pb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#28b8ff] shadow-[0_0_6px_#28b8ff]" />
          <h2 className="text-xs font-bold tracking-wider text-[#28b8ff] font-orbitron uppercase drop-shadow-[0_0_8px_rgba(40,184,255,0.5)]">
            AI DECISION ENGINE
          </h2>
        </div>

        {/* Pipeline Steps */}
        <div className="flex items-center flex-wrap gap-1 text-[9.5px] font-mono font-semibold">
          <span className="px-2 py-0.5 rounded bg-[#071325] text-slate-400 border border-[#142944]">
            INPUT SENSORS
          </span>
          <ArrowRight className="w-3 h-3 text-slate-600" />

          <span className="px-2 py-0.5 rounded bg-[#071325] text-slate-400 border border-[#142944]">
            FUZZIFICATION (trimf)
          </span>
          <ArrowRight className="w-3 h-3 text-slate-600" />

          <span className="px-2 py-0.5 rounded bg-[#09223d] text-[#28b8ff] border border-[#28b8ff]/60 shadow-[0_0_12px_rgba(40,184,255,0.4)] font-bold">
            9-RULE MAMDANI FIS
          </span>
          <ArrowRight className="w-3 h-3 text-slate-600" />

          <span className="px-2 py-0.5 rounded bg-[#071325] text-slate-400 border border-[#142944]">
            CENTROID DEFUZZ
          </span>
          <ArrowRight className="w-3 h-3 text-slate-600" />

          <span className="px-2 py-0.5 rounded bg-[#071325] text-slate-400 border border-[#142944]">
            PUMP & FAN ACTION
          </span>
        </div>
      </div>

      {/* Main Grid of 7 Compact & Dense Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 items-stretch">
        {/* 1. CPU MEMBERSHIP */}
        <MembershipGraph
          title="CPU MEMBERSHIP"
          labels={['LOW', 'MEDIUM', 'HIGH', 'CRIT']}
          values={[
            memberships.cpu.low,
            memberships.cpu.medium,
            memberships.cpu.high,
            memberships.cpu.crit,
          ]}
          color="cyan"
        />

        {/* 2. GPU MEMBERSHIP */}
        <MembershipGraph
          title="GPU MEMBERSHIP"
          labels={['LOW', 'MEDIUM', 'HIGH', 'CRIT']}
          values={[
            memberships.gpu.low,
            memberships.gpu.medium,
            memberships.gpu.high,
            memberships.gpu.crit,
          ]}
          color="purple"
        />

        {/* 3. LOAD MEMBERSHIP */}
        <MembershipGraph
          title="LOAD MEMBERSHIP"
          labels={['IDLE', 'MODERATE', 'HEAVY']}
          values={[
            memberships.load.idle,
            memberships.load.moderate,
            memberships.load.heavy,
          ]}
          color="orange"
        />

        {/* 4. ACTIVE RULE */}
        <div className="bg-[#050c18]/80 border border-[#112642] rounded-xl p-2.5 flex flex-col justify-between h-full">
          <span className="text-[10.5px] font-bold tracking-wider uppercase font-orbitron text-slate-300 block mb-0.5">
            ACTIVE RULE
          </span>

          <div className="flex items-center gap-1.5 my-0.5">
            <span className="text-base font-black font-orbitron text-[#28b8ff] tracking-wide">
              {activeRule.name}
            </span>
            <Flame className="w-4 h-4 text-[#ff4d4d] fill-[#ff4d4d]/40 animate-pulse" />
          </div>

          <div className="space-y-0.5 text-[9.5px] font-mono leading-tight bg-[#02060c] p-1.5 rounded border border-[#0e213b]">
            <p className="text-slate-400 line-clamp-2">
              <span className="text-cyan-400 font-bold">{activeRule.condition}</span>
            </p>
            <p className="text-slate-400 line-clamp-2">
              <span className="text-purple-400 font-bold">{activeRule.consequent}</span>
            </p>
          </div>
        </div>

        {/* 5. FIRING STRENGTH */}
        <div className="bg-[#050c18]/80 border border-[#112642] rounded-xl p-2.5 flex flex-col justify-between h-full">
          <span className="text-[10.5px] font-bold tracking-wider uppercase font-orbitron text-slate-300 block mb-0.5">
            FIRING STRENGTH
          </span>

          <div className="my-auto text-center w-full px-1">
            <span className="text-lg font-black font-mono text-white tracking-wider">
              α = {firingStrength.toFixed(2)}
            </span>

            {/* Glowing Red/Orange Progress Bar */}
            <div className="w-full h-2.5 bg-[#1a080c] rounded-full mt-1.5 relative overflow-hidden border border-[#ff3b3b]/40">
              <div
                className="h-full bg-gradient-to-r from-[#ff7828] to-[#ff3b3b] rounded-full transition-all duration-300 shadow-[0_0_10px_#ff3b3b]"
                style={{ width: `${Math.min(100, firingStrength * 100)}%` }}
              />
            </div>

            {/* Scale Ticks */}
            <div className="flex justify-between text-[8.5px] font-mono text-slate-500 mt-1">
              <span>0.0</span>
              <span>0.5</span>
              <span>1.0</span>
            </div>
          </div>
        </div>

        {/* 6. AI DECISION (DEFUZZIFIED OUTPUT) */}
        <div className="bg-[#050c18]/80 border border-[#112642] rounded-xl p-2.5 flex flex-col justify-between h-full">
          <span className="text-[9.5px] font-bold tracking-wider uppercase font-orbitron text-slate-300 block mb-0.5">
            AI DECISION (OUTPUT)
          </span>

          <div className="grid grid-cols-2 gap-1.5 my-auto">
            {/* PUMP ACTION */}
            <div className="bg-[#030812] border border-[#0d2138] rounded-lg p-1 text-center">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-rajdhani block">
                PUMP ACTION
              </span>
              <span className="text-xs font-black font-orbitron text-[#28b8ff] block">
                {outputs.pumpActionLabel}
              </span>
              <span className="text-xs font-bold font-mono text-[#28b8ff]">
                {pumpSpeed.toFixed(1)}%
              </span>
            </div>

            {/* FAN ACTION */}
            <div className="bg-[#030812] border border-[#1a0f30] rounded-lg p-1 text-center">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-rajdhani block">
                FAN ACTION
              </span>
              <span className="text-xs font-black font-orbitron text-[#c084fc] block">
                {outputs.fanActionLabel}
              </span>
              <span className="text-xs font-bold font-mono text-[#c084fc]">
                {fanSpeed.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* 7. DEFUZZIFICATION (CENTROID) */}
        <DefuzzificationChart
          pumpOutput={pumpSpeed}
          fanOutput={fanSpeed}
        />
      </div>
    </div>
  );
};
