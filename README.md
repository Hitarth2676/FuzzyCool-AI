# FuzzyCool AI ❄️⚡

> **Intelligent Adaptive Thermal Management & Actuation Dashboard powered by Mamdani Fuzzy Inference System (FIS).**

FuzzyCool AI provides real-time, precision multi-variable thermal regulation for high-performance computing hardware (CPU, GPU, and system load). By combining a Python **FastAPI** + **scikit-fuzzy** inference engine with a dynamic **React 19** + **TypeScript** dashboard, FuzzyCool AI simulates and actuates pump and fan speeds with minimal acoustic footprint and optimal heat dissipation.

---

## 🌟 Key Features

- **9-Rule Mamdani Fuzzy Inference System**:
  - Multi-input antecedent resolution: CPU Temperature (20°C–100°C), GPU Temperature (20°C–95°C), and Compute Load (0%–100%).
  - Centroid defuzzification for smooth pump (0–100%) and radiator fan (0–100%) PWM modulation.
- **Interactive Full-Stack Architecture**:
  - **FastAPI backend** providing sub-millisecond REST evaluation endpoints.
  - **React 19 + Vite frontend** with real-time SVG hydraulic flow loops, thermal heatmaps, and acoustic telemetry.
  - Automatic fallback between local client calculation and live Python server.
- **Live Diagnostics & Explainability**:
  - Rule activation matrix displaying real-time firing strengths for all 9 rules.
  - Triangular membership function (Trimf) visualization modals.
  - Hydraulic flow, RPM, and acoustic dB estimation.

---

## 🏗️ Project Architecture

```
FuzzyCool AI/
├── backend/                  # Python FastAPI & scikit-fuzzy FIS Engine
│   ├── fuzzy_controller.py   # Mamdani FIS model & defuzzification logic
│   ├── main.py               # REST API service & Pydantic schemas
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend-specific documentation
├── src/                      # React 19 + TypeScript Frontend
│   ├── api/                  # REST client & failover coordinator
│   ├── components/           # UI panels, visualizers, and modals
│   ├── types/                # TypeScript interfaces & domain types
│   ├── utils/                # Fallback fuzzy engine & math utilities
│   ├── App.tsx               # Main state controller
│   └── main.tsx              # React entrypoint
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (v3.10+ recommended)

---

### 1. Start the Python Backend

```bash
cd backend

# Install dependencies
python3 -m pip install -r requirements.txt

# Run the FastAPI server
python3 main.py
```
> The API will start at `http://localhost:8000`.  
> Interactive Swagger docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2. Start the Frontend Dashboard

In a new terminal window:

```bash
# In project root directory
npm install

# Start Vite dev server
npm run dev
```
> Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 🧠 Fuzzy Logic Specification

### Input Linguistic Universes
- **CPU Temperature**: `Low` [20, 20, 40], `Medium` [35, 50, 65], `High` [55, 70, 85], `Critical` [75, 100, 100]
- **GPU Temperature**: `Low` [20, 20, 38], `Medium` [30, 45, 60], `High` [50, 65, 80], `Critical` [72, 95, 95]
- **System Load**: `Idle` [0, 0, 35], `Moderate` [20, 50, 80], `Heavy` [70, 100, 100]

### Output Actuations
- **Coolant Pump (0–100%)**: `Low`, `Medium`, `High`
- **Radiator Fans (0–100%)**: `Off`, `Slow`, `Medium`, `Fast`, `Max`

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Python 3, FastAPI, Uvicorn, scikit-fuzzy, NumPy, SciPy, Pydantic

---

## 📄 License

MIT License. Designed and developed for academic and engineering demonstrations.
