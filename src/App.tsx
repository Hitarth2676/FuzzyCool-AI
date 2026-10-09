import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SensorInputs, ActuationOutputs } from './types/thermal';
import { computeActuationOutputs, SCENARIO_PRESETS } from './utils/fuzzyEngine';
import { predictCoolingFromBackend, checkBackendHealth } from './api/coolingApi';
import { TopHeader } from './components/Header/TopHeader';
import { InputSensorsPanel } from './components/LeftPanel/InputSensorsPanel';
import { LiveThermalSystem } from './components/CenterVisualizer/LiveThermalSystem';
import { AIActuationPanel } from './components/RightPanel/AIActuationPanel';
import { AIDecisionEngine } from './components/BottomEngine/AIDecisionEngine';
import { RuleMatrixModal } from './components/LeftPanel/RuleMatrixModal';
import { CurvesModal } from './components/LeftPanel/CurvesModal';
import { TelemetryModal } from './components/RightPanel/TelemetryModal';

export const App: React.FC = () => {
  // Current Live Sensor State (Reference 60°C / 55°C / 75%)
  const [inputs, setInputs] = useState<SensorInputs>({
    cpuTemp: 60,
    gpuTemp: 55,
    systemLoad: 75,
  });

  const [selectedPresetId, setSelectedPresetId] = useState<string>('gaming_ref');
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(true);

  // Actuation outputs (populated directly from Python FastAPI scikit-fuzzy backend)
  const [outputs, setOutputs] = useState<ActuationOutputs>(() => computeActuationOutputs(inputs));

  // Demo Simulation Mode States
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationPhase, setSimulationPhase] = useState<string>('');

  // Modal dialog states
  const [isRuleMatrixOpen, setIsRuleMatrixOpen] = useState<boolean>(false);
  const [isCurvesOpen, setIsCurvesOpen] = useState<boolean>(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState<boolean>(false);

  // Simulation loop reference
  const simStateRef = useRef<{
    phaseIndex: number;
    phaseProgress: number;
    startTime: number;
  }>({
    phaseIndex: 0,
    phaseProgress: 0,
    startTime: 0,
  });

  // Check Backend Health periodically
  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      const res = await checkBackendHealth();
      if (isMounted) {
        setIsBackendConnected(res !== null);
      }
    };
    verifyHealth();
    const interval = setInterval(verifyHealth, 6000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch real scikit-fuzzy inference outputs from Python Backend
  useEffect(() => {
    let isMounted = true;
    const fetchPrediction = async () => {
      const result = await predictCoolingFromBackend(inputs);
      if (isMounted) {
        setOutputs(result);
      }
    };
    fetchPrediction();
    return () => {
      isMounted = false;
    };
  }, [inputs]);

  // Simulation Keyframes (Continuous looping cycle)
  const simKeyframes = useMemo(
    () => [
      { name: 'PHASE 1: IDLE STANDBY (COOL)', cpu: 30, gpu: 28, load: 10, duration: 4000 },
      { name: 'PHASE 2: WORKLOAD SURGE (HEATING)', cpu: 65, gpu: 62, load: 75, duration: 4500 },
      { name: 'PHASE 3: PEAK THERMAL CRITICAL', cpu: 95, gpu: 90, load: 100, duration: 4500 },
      { name: 'PHASE 4: FUZZY AI MAX COOLING ENGAGED', cpu: 55, gpu: 48, load: 60, duration: 4500 },
      { name: 'PHASE 5: EQUILIBRIUM RESTORED', cpu: 32, gpu: 29, load: 15, duration: 3500 },
    ],
    []
  );

  // Real-time smooth simulation loop engine
  useEffect(() => {
    if (!isSimulating) return;

    let animationFrameId: number;
    simStateRef.current.startTime = performance.now();
    let currentPhase = 0;
    let phaseStartTime = performance.now();

    const animateLoop = (currentTime: number) => {
      const currentKeyframe = simKeyframes[currentPhase];
      const nextPhase = (currentPhase + 1) % simKeyframes.length;
      const nextKeyframe = simKeyframes[nextPhase];

      const elapsedInPhase = currentTime - phaseStartTime;
      const t = Math.min(1, elapsedInPhase / currentKeyframe.duration);

      // Smooth easeInOut sine interpolation
      const smoothT = 0.5 - Math.cos(t * Math.PI) / 2;

      const currentCpu = currentKeyframe.cpu + (nextKeyframe.cpu - currentKeyframe.cpu) * smoothT;
      const currentGpu = currentKeyframe.gpu + (nextKeyframe.gpu - currentKeyframe.gpu) * smoothT;
      const currentLoad = currentKeyframe.load + (nextKeyframe.load - currentKeyframe.load) * smoothT;

      setInputs({
        cpuTemp: Math.round(currentCpu * 10) / 10,
        gpuTemp: Math.round(currentGpu * 10) / 10,
        systemLoad: Math.round(currentLoad),
      });

      setSimulationPhase(currentKeyframe.name);

      if (t >= 1) {
        currentPhase = nextPhase;
        phaseStartTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSimulating, simKeyframes]);

  // Handle manual slider changes (cancels simulation if active)
  const handleInputChange = (key: keyof SensorInputs, value: number) => {
    if (isSimulating) {
      setIsSimulating(false);
      setSimulationPhase('');
    }
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle preset selection
  const handleSelectPreset = (presetId: string) => {
    if (isSimulating) {
      setIsSimulating(false);
      setSimulationPhase('');
    }
    setSelectedPresetId(presetId);
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setInputs({
        cpuTemp: preset.cpu,
        gpuTemp: preset.gpu,
        systemLoad: preset.load,
      });
    }
  };

  // Toggle Fuzzy AI Demo Simulation Mode
  const handleRunFuzzyAI = () => {
    setIsSimulating((prev) => !prev);
  };

  // Reset inputs to default reference state
  const handleResetInputs = () => {
    setIsSimulating(false);
    setSimulationPhase('');
    setInputs({
      cpuTemp: 60,
      gpuTemp: 55,
      systemLoad: 75,
    });
    setSelectedPresetId('gaming_ref');
  };

  return (
    <div className="bg-[#02070e] flex flex-col space-y-2.5 p-2 md:p-3 text-slate-100 max-w-[1600px] mx-auto select-none">
      {/* 1. TOP HEADER */}
      <TopHeader
        inputs={inputs}
        isLiveMode={isLiveMode}
        setIsLiveMode={setIsLiveMode}
        isBackendConnected={isBackendConnected}
      />

      {/* 2. MAIN DASHBOARD AREA (3 COLUMNS - COMPACT & CONTENT DRIVEN) */}
      <main className="grid grid-cols-1 lg:grid-cols-[320px_1fr_350px] gap-2.5 items-start">
        {/* Left Column: Input Sensors Panel */}
        <InputSensorsPanel
          inputs={inputs}
          onInputChange={handleInputChange}
          onRunFuzzyAI={handleRunFuzzyAI}
          onResetInputs={handleResetInputs}
          onOpenRuleMatrix={() => setIsRuleMatrixOpen(true)}
          onOpenCurves={() => setIsCurvesOpen(true)}
          selectedPresetId={selectedPresetId}
          onSelectPreset={handleSelectPreset}
          isSimulating={isSimulating}
          simulationPhase={simulationPhase}
        />

        {/* Center Column: Live Thermal System Hardware Visualizer */}
        <LiveThermalSystem inputs={inputs} outputs={outputs} />

        {/* Right Column: AI Actuation Panel */}
        <AIActuationPanel
          outputs={outputs}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
        />
      </main>

      {/* 3. BOTTOM SECTION: AI DECISION ENGINE */}
      <footer className="w-full pt-0.5">
        <AIDecisionEngine outputs={outputs} memberships={outputs.memberships} />
      </footer>

      {/* MODAL DIALOGS */}
      <RuleMatrixModal
        isOpen={isRuleMatrixOpen}
        onClose={() => setIsRuleMatrixOpen(false)}
        rules={outputs.rules || []}
        activeRuleId={outputs.activeRule.id}
      />

      <CurvesModal
        isOpen={isCurvesOpen}
        onClose={() => setIsCurvesOpen(false)}
        inputs={inputs}
      />

      <TelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        inputs={inputs}
        outputs={outputs}
      />
    </div>
  );
};

export default App;
