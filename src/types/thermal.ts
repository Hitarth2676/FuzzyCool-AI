export interface SensorInputs {
  cpuTemp: number; // 20 - 100 °C
  gpuTemp: number; // 20 - 95 °C
  systemLoad: number; // 0 - 100 %
}

export type TempCategory = 'COOL' | 'WARM' | 'HOT' | 'CRITICAL';
export type LoadCategory = 'IDLE' | 'MODERATE' | 'HEAVY';

export interface MembershipDegrees {
  cpu: {
    low: number;
    medium: number;
    high: number;
    crit: number;
  };
  gpu: {
    low: number;
    medium: number;
    high: number;
    crit: number;
  };
  load: {
    idle: number;
    moderate: number;
    heavy: number;
  };
}

export interface FuzzyRule {
  id: number;
  name: string;
  condition: string;
  consequent: string;
  antecedentText: string;
  consequentText: string;
  weight: number;
  firingStrength: number;
  pumpTarget: 'LOW' | 'MED' | 'HIGH' | 'MAX';
  fanTarget: 'LOW' | 'MED' | 'HIGH' | 'MAX';
}

export type SystemConditionStatus = 'NORMAL' | 'WARM' | 'HIGH' | 'CRITICAL';

export interface ActuationOutputs {
  pumpSpeed: number; // percentage 0 - 100%
  pumpRpm: number;
  fanSpeed: number; // percentage 0 - 100%
  fanRpm: number;
  flowRate: number; // L/min
  acousticNoise: number; // dBA
  heatDissipated: number; // W
  systemCondition: SystemConditionStatus;
  conditionDescription: string;
  activeRule: FuzzyRule;
  rules: FuzzyRule[];
  firingStrength: number;
  memberships: MembershipDegrees;
  pumpActionLabel: 'LOW' | 'MODERATE' | 'HIGH' | 'MAX';
  fanActionLabel: 'LOW' | 'MODERATE' | 'HIGH' | 'MAX';
}

export interface ScenarioPreset {
  id: string;
  name: string;
  label: string;
  cpu: number;
  gpu: number;
  load: number;
}
