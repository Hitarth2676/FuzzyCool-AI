"""
Fuzzy Logic Controller for CPU & GPU Water-Cooling System
Implements the exact 9-Rule Mamdani FIS model from the design notebook using scikit-fuzzy.
"""

import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
from typing import Dict, Any, List, Tuple


class FuzzyCoolingController:
    def __init__(self):
        # 1. Define Input Universes (Antecedents)
        self.cpu_universe = np.arange(20, 101, 1)
        self.gpu_universe = np.arange(20, 96, 1)
        self.load_universe = np.arange(0, 101, 1)

        # 2. Define Output Universes (Consequents)
        self.pump_universe = np.arange(0, 101, 1)
        self.fan_universe = np.arange(0, 101, 1)

        self.cpu_temp = ctrl.Antecedent(self.cpu_universe, 'cpu_temp')
        self.gpu_temp = ctrl.Antecedent(self.gpu_universe, 'gpu_temp')
        self.load = ctrl.Antecedent(self.load_universe, 'load')

        self.pump = ctrl.Consequent(self.pump_universe, 'pump')
        self.fan = ctrl.Consequent(self.fan_universe, 'fan')

        # 3. CPU Temperature Membership Functions
        self.cpu_mf = {
            'low': [20, 20, 40],
            'medium': [35, 50, 65],
            'high': [55, 70, 85],
            'critical': [75, 100, 100],
        }
        for name, params in self.cpu_mf.items():
            self.cpu_temp[name] = fuzz.trimf(self.cpu_universe, params)

        # 4. GPU Temperature Membership Functions
        self.gpu_mf = {
            'low': [20, 20, 38],
            'medium': [30, 45, 60],
            'high': [50, 65, 80],
            'critical': [72, 95, 95],
        }
        for name, params in self.gpu_mf.items():
            self.gpu_temp[name] = fuzz.trimf(self.gpu_universe, params)

        # 5. System Load Membership Functions
        self.load_mf = {
            'idle': [0, 0, 35],
            'moderate': [20, 50, 80],
            'heavy': [70, 100, 100],
        }
        for name, params in self.load_mf.items():
            self.load[name] = fuzz.trimf(self.load_universe, params)

        # 6. Pump Speed (Output) Membership Functions
        self.pump_mf = {
            'low': [0, 0, 40],
            'medium': [30, 50, 70],
            'high': [60, 100, 100],
        }
        for name, params in self.pump_mf.items():
            self.pump[name] = fuzz.trimf(self.pump_universe, params)

        # 7. Fan Speed (Output) Membership Functions
        self.fan_mf = {
            'off': [0, 0, 20],
            'slow': [10, 30, 50],
            'medium': [35, 50, 65],
            'fast': [55, 75, 90],
            'max': [80, 100, 100],
        }
        for name, params in self.fan_mf.items():
            self.fan[name] = fuzz.trimf(self.fan_universe, params)

        # 8. Define EXACTLY the 9 Core Rules from Design Notebook
        self.rule1 = ctrl.Rule(
            self.cpu_temp['low'] & self.gpu_temp['low'] & self.load['idle'],
            (self.pump['low'], self.fan['off'])
        )
        self.rule2 = ctrl.Rule(
            self.cpu_temp['high'] | self.gpu_temp['high'],
            (self.pump['high'], self.fan['fast'])
        )
        self.rule3 = ctrl.Rule(
            self.cpu_temp['critical'] | self.gpu_temp['critical'],
            (self.pump['high'], self.fan['max'])
        )
        self.rule4 = ctrl.Rule(
            self.load['heavy'] & self.cpu_temp['medium'],
            (self.pump['medium'], self.fan['medium'])
        )
        self.rule5 = ctrl.Rule(
            self.cpu_temp['medium'] & self.gpu_temp['low'],
            (self.pump['medium'], self.fan['slow'])
        )
        self.rule6 = ctrl.Rule(
            self.gpu_temp['high'] & self.cpu_temp['low'],
            (self.pump['medium'], self.fan['fast'])
        )
        self.rule7 = ctrl.Rule(
            self.load['idle'] & self.cpu_temp['low'] & self.gpu_temp['low'],
            (self.pump['low'], self.fan['off'])
        )
        self.rule8 = ctrl.Rule(
            self.cpu_temp['high'] & self.gpu_temp['high'],
            (self.pump['high'], self.fan['max'])
        )
        self.rule9 = ctrl.Rule(
            self.cpu_temp['medium'] & self.gpu_temp['medium'] & self.load['moderate'],
            (self.pump['medium'], self.fan['medium'])
        )

        # Exactly 9 rules list
        self.rules = [
            self.rule1, self.rule2, self.rule3, self.rule4,
            self.rule5, self.rule6, self.rule7, self.rule8,
            self.rule9
        ]

        # Instantiate Master Control System with exactly the 9 rules
        self.control_system = ctrl.ControlSystem(self.rules)

    def calculate_memberships(self, cpu: float, gpu: float, load_val: float) -> Dict[str, Any]:
        """Calculates exact membership degrees for inputs."""
        cpu_clamped = np.clip(cpu, 20, 100)
        gpu_clamped = np.clip(gpu, 20, 95)
        load_clamped = np.clip(load_val, 0, 100)

        cpu_m = {
            'low': float(fuzz.interp_membership(self.cpu_universe, self.cpu_temp['low'].mf, cpu_clamped)),
            'medium': float(fuzz.interp_membership(self.cpu_universe, self.cpu_temp['medium'].mf, cpu_clamped)),
            'high': float(fuzz.interp_membership(self.cpu_universe, self.cpu_temp['high'].mf, cpu_clamped)),
            'crit': float(fuzz.interp_membership(self.cpu_universe, self.cpu_temp['critical'].mf, cpu_clamped)),
        }

        gpu_m = {
            'low': float(fuzz.interp_membership(self.gpu_universe, self.gpu_temp['low'].mf, gpu_clamped)),
            'medium': float(fuzz.interp_membership(self.gpu_universe, self.gpu_temp['medium'].mf, gpu_clamped)),
            'high': float(fuzz.interp_membership(self.gpu_universe, self.gpu_temp['high'].mf, gpu_clamped)),
            'crit': float(fuzz.interp_membership(self.gpu_universe, self.gpu_temp['critical'].mf, gpu_clamped)),
        }

        load_m = {
            'idle': float(fuzz.interp_membership(self.load_universe, self.load['idle'].mf, load_clamped)),
            'moderate': float(fuzz.interp_membership(self.load_universe, self.load['moderate'].mf, load_clamped)),
            'heavy': float(fuzz.interp_membership(self.load_universe, self.load['heavy'].mf, load_clamped)),
        }

        return {
            'cpu': cpu_m,
            'gpu': gpu_m,
            'load': load_m,
        }

    def evaluate_all_rules(self, m: Dict[str, Any]) -> Tuple[List[Dict[str, Any]], Dict[str, Any], float]:
        """
        Calculates the real firing strength of all 9 original Mamdani rules
        and identifies the active (strongest) rule.
        """
        cpu = m['cpu']
        gpu = m['gpu']
        load = m['load']

        # Rule 1: IF (CPU is LOW) AND (GPU is LOW) AND (LOAD is IDLE) THEN (PUMP is LOW) AND (FAN is OFF)
        r1_val = min(cpu['low'], gpu['low'], load['idle'])

        # Rule 2: IF (CPU is HIGH) OR (GPU is HIGH) THEN (PUMP is HIGH) AND (FAN is FAST)
        r2_val = max(cpu['high'], gpu['high'])

        # Rule 3: IF (CPU is CRITICAL) OR (GPU is CRITICAL) THEN (PUMP is HIGH) AND (FAN is MAX)
        r3_val = max(cpu['crit'], gpu['crit'])

        # Rule 4: IF (LOAD is HEAVY) AND (CPU is MEDIUM) THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)
        r4_val = min(load['heavy'], cpu['medium'])

        # Rule 5: IF (CPU is MEDIUM) AND (GPU is LOW) THEN (PUMP is MEDIUM) AND (FAN is SLOW)
        r5_val = min(cpu['medium'], gpu['low'])

        # Rule 6: IF (GPU is HIGH) AND (CPU is LOW) THEN (PUMP is MEDIUM) AND (FAN is FAST)
        r6_val = min(gpu['high'], cpu['low'])

        # Rule 7: IF (LOAD is IDLE) AND (CPU is LOW) AND (GPU is LOW) THEN (PUMP is LOW) AND (FAN is OFF)
        r7_val = min(load['idle'], cpu['low'], gpu['low'])

        # Rule 8: IF (CPU is HIGH) AND (GPU is HIGH) THEN (PUMP is HIGH) AND (FAN is MAX)
        r8_val = min(cpu['high'], gpu['high'])

        # Rule 9: IF (CPU is MEDIUM) AND (GPU is MEDIUM) AND (LOAD is MODERATE) THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)
        r9_val = min(cpu['medium'], gpu['medium'], load['moderate'])

        all_rules = [
            {
                'id': 1,
                'name': 'RULE #1',
                'condition': 'IF (CPU is LOW) AND (GPU is LOW) AND (LOAD is IDLE)',
                'consequent': 'THEN (PUMP is LOW) AND (FAN is OFF)',
                'antecedent_text': 'IF (CPU is LOW) AND (GPU is LOW) AND (LOAD is IDLE)',
                'consequent_text': 'THEN (PUMP is LOW) AND (FAN is OFF)',
                'firing_strength': round(float(r1_val), 3),
                'pump_target': 'LOW',
                'fan_target': 'OFF',
            },
            {
                'id': 2,
                'name': 'RULE #2',
                'condition': 'IF (CPU is HIGH) OR (GPU is HIGH)',
                'consequent': 'THEN (PUMP is HIGH) AND (FAN is FAST)',
                'antecedent_text': 'IF (CPU is HIGH) OR (GPU is HIGH)',
                'consequent_text': 'THEN (PUMP is HIGH) AND (FAN is FAST)',
                'firing_strength': round(float(r2_val), 3),
                'pump_target': 'HIGH',
                'fan_target': 'FAST',
            },
            {
                'id': 3,
                'name': 'RULE #3',
                'condition': 'IF (CPU is CRITICAL) OR (GPU is CRITICAL)',
                'consequent': 'THEN (PUMP is HIGH) AND (FAN is MAX)',
                'antecedent_text': 'IF (CPU is CRITICAL) OR (GPU is CRITICAL)',
                'consequent_text': 'THEN (PUMP is HIGH) AND (FAN is MAX)',
                'firing_strength': round(float(r3_val), 3),
                'pump_target': 'HIGH',
                'fan_target': 'MAX',
            },
            {
                'id': 4,
                'name': 'RULE #4',
                'condition': 'IF (LOAD is HEAVY) AND (CPU is MEDIUM)',
                'consequent': 'THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)',
                'antecedent_text': 'IF (LOAD is HEAVY) AND (CPU is MEDIUM)',
                'consequent_text': 'THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)',
                'firing_strength': round(float(r4_val), 3),
                'pump_target': 'MED',
                'fan_target': 'MED',
            },
            {
                'id': 5,
                'name': 'RULE #5',
                'condition': 'IF (CPU is MEDIUM) AND (GPU is LOW)',
                'consequent': 'THEN (PUMP is MEDIUM) AND (FAN is SLOW)',
                'antecedent_text': 'IF (CPU is MEDIUM) AND (GPU is LOW)',
                'consequent_text': 'THEN (PUMP is MEDIUM) AND (FAN is SLOW)',
                'firing_strength': round(float(r5_val), 3),
                'pump_target': 'MED',
                'fan_target': 'SLOW',
            },
            {
                'id': 6,
                'name': 'RULE #6',
                'condition': 'IF (GPU is HIGH) AND (CPU is LOW)',
                'consequent': 'THEN (PUMP is MEDIUM) AND (FAN is FAST)',
                'antecedent_text': 'IF (GPU is HIGH) AND (CPU is LOW)',
                'consequent_text': 'THEN (PUMP is MEDIUM) AND (FAN is FAST)',
                'firing_strength': round(float(r6_val), 3),
                'pump_target': 'MED',
                'fan_target': 'FAST',
            },
            {
                'id': 7,
                'name': 'RULE #7',
                'condition': 'IF (LOAD is IDLE) AND (CPU is LOW) AND (GPU is LOW)',
                'consequent': 'THEN (PUMP is LOW) AND (FAN is OFF)',
                'antecedent_text': 'IF (LOAD is IDLE) AND (CPU is LOW) AND (GPU is LOW)',
                'consequent_text': 'THEN (PUMP is LOW) AND (FAN is OFF)',
                'firing_strength': round(float(r7_val), 3),
                'pump_target': 'LOW',
                'fan_target': 'OFF',
            },
            {
                'id': 8,
                'name': 'RULE #8',
                'condition': 'IF (CPU is HIGH) AND (GPU is HIGH)',
                'consequent': 'THEN (PUMP is HIGH) AND (FAN is MAX)',
                'antecedent_text': 'IF (CPU is HIGH) AND (GPU is HIGH)',
                'consequent_text': 'THEN (PUMP is HIGH) AND (FAN is MAX)',
                'firing_strength': round(float(r8_val), 3),
                'pump_target': 'HIGH',
                'fan_target': 'MAX',
            },
            {
                'id': 9,
                'name': 'RULE #9',
                'condition': 'IF (CPU is MEDIUM) AND (GPU is MEDIUM) AND (LOAD is MODERATE)',
                'consequent': 'THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)',
                'antecedent_text': 'IF (CPU is MEDIUM) AND (GPU is MEDIUM) AND (LOAD is MODERATE)',
                'consequent_text': 'THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)',
                'firing_strength': round(float(r9_val), 3),
                'pump_target': 'MED',
                'fan_target': 'MED',
            },
        ]

        # Prioritize rules by strength, then by critical severity on ties (Rule 3 > Rule 8 > Rule 2 > etc.)
        priority_order = {3: 90, 8: 80, 2: 70, 6: 60, 4: 50, 9: 40, 5: 30, 1: 20, 7: 10}

        def rule_sort_key(r):
            return (r['firing_strength'], priority_order.get(r['id'], 0))

        active_rule = max(all_rules, key=rule_sort_key)
        max_strength = active_rule['firing_strength']

        return all_rules, active_rule, max_strength

    def predict(self, cpu: float, gpu: float, load_val: float) -> Dict[str, Any]:
        """
        Creates a fresh, isolated simulation instance of the 9-Rule Mamdani ControlSystem
        and runs scikit-fuzzy inference.
        """
        cpu_clamped = float(np.clip(cpu, 20.0, 100.0))
        gpu_clamped = float(np.clip(gpu, 20.0, 95.0))
        load_clamped = float(np.clip(load_val, 0.0, 100.0))

        # 1. Memberships and All 9 Rule Firing Strengths
        memberships = self.calculate_memberships(cpu_clamped, gpu_clamped, load_clamped)
        all_rules, active_rule, firing_strength = self.evaluate_all_rules(memberships)

        # 2. Instantiate fresh simulation with exactly the 9 rules
        sim = ctrl.ControlSystemSimulation(self.control_system)
        sim.input['cpu_temp'] = cpu_clamped
        sim.input['gpu_temp'] = gpu_clamped
        sim.input['load'] = load_clamped

        try:
            # 3. Run Mamdani Fuzzy Inference with Centroid Defuzzification
            sim.compute()
            raw_pump = float(sim.output.get('pump', 20.0))
            raw_fan = float(sim.output.get('fan', 10.0))
        except Exception:
            # If input is in an extreme transition region where sum of area is 0,
            # estimate based on active rule targets
            if active_rule['pump_target'] == 'HIGH':
                raw_pump = 75.0
            elif active_rule['pump_target'] == 'MED':
                raw_pump = 50.0
            else:
                raw_pump = 20.0

            if active_rule['fan_target'] == 'MAX':
                raw_fan = 90.0
            elif active_rule['fan_target'] == 'FAST':
                raw_fan = 75.0
            elif active_rule['fan_target'] == 'MED':
                raw_fan = 50.0
            elif active_rule['fan_target'] == 'SLOW':
                raw_fan = 30.0
            else:
                raw_fan = 10.0

        pump_speed = round(float(np.clip(raw_pump, 0.0, 100.0)), 2)
        fan_speed = round(float(np.clip(raw_fan, 0.0, 100.0)), 2)

        # 4. Determine System Condition Status
        if cpu_clamped >= 80.0 or gpu_clamped >= 78.0 or active_rule['id'] == 3:
            status = 'critical'
            condition_desc = 'Critical thermal surge • Turbo cooling override engaged'
        elif cpu_clamped >= 60.0 or gpu_clamped >= 55.0 or load_clamped >= 70.0 or active_rule['id'] in [2, 6, 8]:
            status = 'warning'
            condition_desc = 'Elevated thermal dissipation • High fan & pump speed active'
        elif cpu_clamped >= 45.0 or gpu_clamped >= 40.0:
            status = 'warm'
            condition_desc = 'Moderate thermal load • Nominal hydrodynamic flow'
        else:
            status = 'normal'
            condition_desc = 'Thermal equilibrium maintained • Low acoustic profile'

        # 5. Physical telemetry metrics
        pump_rpm = int(1200 + (pump_speed / 100.0) * 3600)
        fan_rpm = int((fan_speed / 100.0) * 2200)
        flow_rate = round(0.5 + (pump_speed / 100.0) * 2.7, 2)
        acoustic_noise = round(20.0 + (fan_speed / 100.0) * 30.0, 1)
        heat_dissipated = int(80 + (cpu_clamped / 100.0) * 350 + (gpu_clamped / 95.0) * 450)

        return {
            'cpu_temp': round(cpu_clamped, 1),
            'gpu_temp': round(gpu_clamped, 1),
            'load': round(load_clamped, 1),
            'pump_speed': pump_speed,
            'fan_speed': fan_speed,
            'status': status,
            'condition_description': condition_desc,
            'pump_rpm': pump_rpm,
            'fan_rpm': fan_rpm,
            'flow_rate': flow_rate,
            'acoustic_noise': acoustic_noise,
            'heat_dissipated': heat_dissipated,
            'pump_action_label': self._get_pump_label(pump_speed),
            'fan_action_label': self._get_fan_label(fan_speed),
            'memberships': memberships,
            'active_rule': active_rule,
            'rules': all_rules,
            'firing_strength': firing_strength,
        }

    def _get_pump_label(self, speed: float) -> str:
        if speed >= 65:
            return 'HIGH'
        if speed >= 35:
            return 'MEDIUM'
        return 'LOW'

    def _get_fan_label(self, speed: float) -> str:
        if speed >= 85:
            return 'MAX'
        if speed >= 60:
            return 'FAST'
        if speed >= 40:
            return 'MEDIUM'
        if speed >= 15:
            return 'SLOW'
        return 'OFF'


# Singleton controller instance
fuzzy_controller = FuzzyCoolingController()
