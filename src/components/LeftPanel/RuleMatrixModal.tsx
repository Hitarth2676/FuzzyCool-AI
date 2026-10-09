import React from 'react';
import { X, Layers, CheckCircle2 } from 'lucide-react';
import { FuzzyRule } from '../../types/thermal';

interface RuleMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: FuzzyRule[];
  activeRuleId: number;
}

export const RuleMatrixModal: React.FC<RuleMatrixModalProps> = ({
  isOpen,
  onClose,
  rules,
  activeRuleId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#071325] border border-[#28b8ff]/40 rounded-xl shadow-[0_0_40px_rgba(40,184,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b3a62] bg-[#050d1a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#09223d] border border-[#28b8ff]/50 flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#28b8ff]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-white font-orbitron">
                9-RULE MAMDANI FIS MATRIX
              </h2>
              <p className="text-xs text-slate-400 font-rajdhani">
                Thermal regulation inference rules & real-time firing status
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
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {rules.map((rule) => {
            const isActive = rule.id === activeRuleId;
            return (
              <div
                key={rule.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0a233f] border-[#28b8ff] shadow-[0_0_15px_rgba(40,184,255,0.25)]'
                    : 'bg-[#040a14] border-[#152a45] hover:border-[#1d3d66]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#28b8ff] text-slate-950 font-extrabold'
                          : 'bg-[#0e1e33] text-slate-400'
                      }`}
                    >
                      {rule.name}
                    </span>
                    {isActive && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#00ff9d] uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" /> Active Rule
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Firing Strength α:</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#ff3b3b]/20 text-[#ff3b3b] border border-[#ff3b3b]/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {rule.firingStrength.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-[#03070f] border border-[#10233b]">
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-0.5">
                      Antecedent (Condition)
                    </span>
                    <span className="text-cyan-300">{rule.condition}</span>
                  </div>
                  <div className="p-2 rounded bg-[#03070f] border border-[#10233b]">
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-0.5">
                      Consequent (Actuation)
                    </span>
                    <span className="text-purple-300">{rule.consequent}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1b3a62] bg-[#050d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0e2747] text-[#28b8ff] border border-[#28b8ff]/40 text-xs font-bold tracking-wider hover:bg-[#153866] transition-colors"
          >
            CLOSE MATRIX
          </button>
        </div>
      </div>
    </div>
  );
};
