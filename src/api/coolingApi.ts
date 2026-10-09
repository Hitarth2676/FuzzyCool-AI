/**
 * REST API Client for FuzzyCooling AI Python Backend
 * Connects React frontend to FastAPI scikit-fuzzy inference engine.
 * Features in-flight request deduplication and graceful offline fallback.
 */

import { SensorInputs, ActuationOutputs, SystemConditionStatus, FuzzyRule } from '../types/thermal';
import { computeActuationOutputs } from '../utils/fuzzyEngine';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

export interface BackendRuleDetail {
  id: number;
  name: string;
  condition: string;
  consequent: string;
  antecedent_text: string;
  consequent_text: string;
  firing_strength: number;
  pump_target: 'LOW' | 'MED' | 'HIGH' | 'MAX';
  fan_target: 'OFF' | 'SLOW' | 'MED' | 'FAST' | 'MAX';
}

export interface BackendPredictResponse {
  cpu_temp: number;
  gpu_temp: number;
  load: number;
  pump_speed: number;
  fan_speed: number;
  status: 'normal' | 'warm' | 'warning' | 'critical';
  condition_description: string;
  pump_rpm: number;
  fan_rpm: number;
  flow_rate: number;
  acoustic_noise: number;
  heat_dissipated: number;
  pump_action_label: string;
  fan_action_label: string;
  memberships: {
    cpu: { low: number; medium: number; high: number; crit: number };
    gpu: { low: number; medium: number; high: number; crit: number };
    load: { idle: number; moderate: number; heavy: number };
  };
  active_rule: {
    id: number;
    name: string;
    condition: string;
    consequent: string;
    antecedent_text?: string;
    consequent_text?: string;
    firing_strength?: number;
    pump_target?: string;
    fan_target?: string;
  };
  rules?: BackendRuleDetail[];
  firing_strength: number;
}

// In-flight request coordinator to avoid duplicate network flooding during animations
let activeAbortController: AbortController | null = null;
let lastRequestKey = '';
let lastCachedResult: ActuationOutputs | null = null;

/**
 * Health check to verify FastAPI connection
 */
export async function checkBackendHealth(): Promise<{ status: string; service: string } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Sends sensor readings to FastAPI and returns real scikit-fuzzy inference results
 */
export async function predictCoolingFromBackend(
  inputs: SensorInputs
): Promise<ActuationOutputs> {
  const roundedCpu = Math.round(inputs.cpuTemp * 10) / 10;
  const roundedGpu = Math.round(inputs.gpuTemp * 10) / 10;
  const roundedLoad = Math.round(inputs.systemLoad);

  const requestKey = `${roundedCpu}-${roundedGpu}-${roundedLoad}`;

  if (requestKey === lastRequestKey && lastCachedResult) {
    return lastCachedResult;
  }

  // Cancel prior in-flight request if a new input arrived
  if (activeAbortController) {
    activeAbortController.abort();
  }

  activeAbortController = new AbortController();
  const currentController = activeAbortController;

  try {
    const timeoutId = setTimeout(() => currentController.abort(), 2500);

    const response = await fetch(`${API_BASE_URL}/api/cooling/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpu_temp: roundedCpu,
        gpu_temp: roundedGpu,
        load: roundedLoad,
      }),
      signal: currentController.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const data: BackendPredictResponse = await response.json();

    // Map backend status to frontend SystemConditionStatus
    let mappedStatus: SystemConditionStatus = 'NORMAL';
    if (data.status === 'critical') mappedStatus = 'CRITICAL';
    else if (data.status === 'warning') mappedStatus = 'HIGH';
    else if (data.status === 'warm') mappedStatus = 'WARM';

    // Map pump and fan action labels
    const pumpAction = (data.pump_action_label === 'HIGH'
      ? 'HIGH'
      : data.pump_action_label === 'MEDIUM'
      ? 'MODERATE'
      : 'LOW') as 'LOW' | 'MODERATE' | 'HIGH' | 'MAX';

    const fanAction = (data.fan_action_label === 'MAX'
      ? 'MAX'
      : data.fan_action_label === 'FAST'
      ? 'HIGH'
      : data.fan_action_label === 'MEDIUM'
      ? 'MODERATE'
      : 'LOW') as 'LOW' | 'MODERATE' | 'HIGH' | 'MAX';

    // Construct full FuzzyRule object from backend data
    const activeRule: FuzzyRule = {
      id: data.active_rule.id,
      name: data.active_rule.name,
      condition: data.active_rule.condition,
      consequent: data.active_rule.consequent,
      antecedentText: data.active_rule.antecedent_text || data.active_rule.condition,
      consequentText: data.active_rule.consequent_text || data.active_rule.consequent,
      weight: 1.0,
      firingStrength: data.firing_strength,
      pumpTarget: data.pump_speed >= 75 ? 'HIGH' : data.pump_speed >= 40 ? 'MED' : 'LOW',
      fanTarget: data.fan_speed >= 85 ? 'MAX' : data.fan_speed >= 60 ? 'HIGH' : data.fan_speed >= 35 ? 'MED' : 'LOW',
    };

    // Map all 9 rules from backend if provided, otherwise fallback
    const mappedRules: FuzzyRule[] = (data.rules && data.rules.length > 0)
      ? data.rules.map((r) => ({
          id: r.id,
          name: r.name,
          condition: r.condition,
          consequent: r.consequent,
          antecedentText: r.antecedent_text || r.condition,
          consequentText: r.consequent_text || r.consequent,
          weight: 1.0,
          firingStrength: r.firing_strength,
          pumpTarget: (r.pump_target === 'MED' ? 'MED' : r.pump_target === 'HIGH' ? 'HIGH' : 'LOW') as any,
          fanTarget: (r.fan_target === 'FAST' ? 'HIGH' : r.fan_target === 'MAX' ? 'MAX' : r.fan_target === 'MED' ? 'MED' : r.fan_target === 'SLOW' ? 'LOW' : 'LOW') as any,
        }))
      : computeActuationOutputs(inputs).rules;

    const result: ActuationOutputs = {
      pumpSpeed: data.pump_speed,
      pumpRpm: data.pump_rpm,
      fanSpeed: data.fan_speed,
      fanRpm: data.fan_rpm,
      flowRate: data.flow_rate,
      acousticNoise: data.acoustic_noise,
      heatDissipated: data.heat_dissipated,
      systemCondition: mappedStatus,
      conditionDescription: data.condition_description,
      activeRule,
      rules: mappedRules,
      firingStrength: data.firing_strength,
      memberships: data.memberships,
      pumpActionLabel: pumpAction,
      fanActionLabel: fanAction,
    };

    lastRequestKey = requestKey;
    lastCachedResult = result;

    return result;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      // Return previous cached result or fallback if aborted due to newer input
      return lastCachedResult || computeActuationOutputs(inputs);
    }
    console.warn('Backend unavailable, falling back to local Mamdani engine:', error);
    return computeActuationOutputs(inputs);
  }
}
