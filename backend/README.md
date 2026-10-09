# FuzzyCooling AI — Backend Service

High-performance Python backend powered by **FastAPI** and **scikit-fuzzy**, implementing a 9-Rule Mamdani Fuzzy Inference System for adaptive CPU/GPU liquid cooling actuation.

---

## Architecture Overview

- **Engine**: scikit-fuzzy Mamdani FIS (`centroid` defuzzification)
- **Framework**: FastAPI + Uvicorn
- **Input Universes**:
  - `cpu_temp`: 20°C – 100°C (`low`, `medium`, `high`, `critical`)
  - `gpu_temp`: 20°C – 95°C (`low`, `medium`, `high`, `critical`)
  - `load`: 0% – 100% (`idle`, `moderate`, `heavy`)
- **Output Universes**:
  - `pump`: 0% – 100% (`low`, `medium`, `high`)
  - `fan`: 0% – 100% (`off`, `slow`, `medium`, `fast`, `max`)

---

## Quickstart & Installation

### 1. Install Dependencies
```bash
cd backend
python3 -m pip install -r requirements.txt
```

### 2. Start the Backend Server
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at:
- **API Base**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

---

## API Endpoints

### `POST /api/cooling/predict`
Calculates real-time fuzzy inference outputs.

**Request Body**:
```json
{
  "cpu_temp": 60.0,
  "gpu_temp": 55.0,
  "load": 75.0
}
```

**Response**:
```json
{
  "cpu_temp": 60.0,
  "gpu_temp": 55.0,
  "load": 75.0,
  "pump_speed": 71.66,
  "fan_speed": 72.67,
  "status": "warning",
  "condition_description": "Elevated thermal dissipation • High fan & pump speed active",
  "pump_rpm": 3779,
  "fan_rpm": 1598,
  "flow_rate": 2.43,
  "acoustic_noise": 41.8,
  "heat_dissipated": 550,
  "pump_action_label": "HIGH",
  "fan_action_label": "FAST",
  "memberships": { ... },
  "active_rule": { ... },
  "firing_strength": 0.8
}
```

### `GET /api/health`
Health check status.
```json
{
  "status": "online",
  "service": "FuzzyCooling AI Backend",
  "version": "1.0.0"
}
```
