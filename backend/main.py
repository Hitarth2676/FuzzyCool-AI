"""
FastAPI Backend Application for FuzzyCooling AI
Provides high-performance REST API endpoints powered by scikit-fuzzy.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
import uvicorn
import logging

from fuzzy_controller import fuzzy_controller

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("fuzzycooling-backend")

app = FastAPI(
    title="FuzzyCooling AI Backend",
    description="Real-time 9-Rule scikit-fuzzy inference engine for CPU/GPU water cooling control",
    version="1.0.0",
)

# Enable CORS for React Frontend (running on port 3000 or any origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------------------------------------------
# Request & Response Schemas
# -----------------------------------------------------------------------------
class CoolingPredictRequest(BaseModel):
    cpu_temp: float = Field(
        ...,
        ge=20.0,
        le=100.0,
        description="CPU Temperature in Celsius (20–100°C)",
        examples=[60.0],
    )
    gpu_temp: float = Field(
        ...,
        ge=20.0,
        le=95.0,
        description="GPU Temperature in Celsius (20–95°C)",
        examples=[55.0],
    )
    load: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="System Compute Load in Percentage (0–100%)",
        examples=[75.0],
    )


class RuleInfo(BaseModel):
    id: int
    name: str
    condition: str
    consequent: str


class ActiveRuleInfo(BaseModel):
    id: int
    name: str
    condition: str
    consequent: str
    antecedent_text: Optional[str] = None
    consequent_text: Optional[str] = None
    firing_strength: Optional[float] = None
    pump_target: Optional[str] = None
    fan_target: Optional[str] = None


class RuleDetailInfo(BaseModel):
    id: int
    name: str
    condition: str
    consequent: str
    antecedent_text: str
    consequent_text: str
    firing_strength: float
    pump_target: str
    fan_target: str


class CoolingPredictResponse(BaseModel):
    cpu_temp: float
    gpu_temp: float
    load: float
    pump_speed: float
    fan_speed: float
    status: str
    condition_description: str
    pump_rpm: int
    fan_rpm: int
    flow_rate: float
    acoustic_noise: float
    heat_dissipated: int
    pump_action_label: str
    fan_action_label: str
    memberships: Dict[str, Any]
    active_rule: ActiveRuleInfo
    rules: List[RuleDetailInfo]
    firing_strength: float


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str = "1.0.0"


# -----------------------------------------------------------------------------
# API Endpoints
# -----------------------------------------------------------------------------
@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend operational status."""
    return HealthResponse(
        status="online",
        service="FuzzyCooling AI Backend",
        version="1.0.0",
    )


@app.post(
    "/api/cooling/predict",
    response_model=CoolingPredictResponse,
    tags=["Inference"],
    summary="Compute Fuzzy Logic Control Actuation",
)
async def predict_cooling(payload: CoolingPredictRequest):
    """
    Evaluates CPU temp, GPU temp, and load against the 9-Rule Mamdani FIS model.
    Runs scikit-fuzzy inference with centroid defuzzification and returns pump & fan actuation.
    """
    try:
        result = fuzzy_controller.predict(
            cpu=payload.cpu_temp,
            gpu=payload.gpu_temp,
            load_val=payload.load,
        )
        return CoolingPredictResponse(**result)
    except Exception as e:
        logger.error(f"Fuzzy inference error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fuzzy Inference Engine failed: {str(e)}",
        )


@app.get("/api/rules", response_model=List[RuleInfo], tags=["Knowledge Base"])
async def get_fuzzy_rules():
    """Returns the 9 core fuzzy logic rules implemented in the controller."""
    return [
        RuleInfo(
            id=1,
            name="RULE #1 (IDLE COOLING)",
            condition="IF (CPU is LOW) AND (GPU is LOW) AND (LOAD is IDLE)",
            consequent="THEN (PUMP is LOW) AND (FAN is OFF)",
        ),
        RuleInfo(
            id=2,
            name="RULE #2 (HIGH THERMAL ALERT)",
            condition="IF (CPU is HIGH) OR (GPU is HIGH)",
            consequent="THEN (PUMP is HIGH) AND (FAN is FAST)",
        ),
        RuleInfo(
            id=3,
            name="RULE #3 (CRITICAL EMERGENCY)",
            condition="IF (CPU is CRITICAL) OR (GPU is CRITICAL)",
            consequent="THEN (PUMP is HIGH) AND (FAN is MAX)",
        ),
        RuleInfo(
            id=4,
            name="RULE #4 (HEAVY LOAD DISSIPATION)",
            condition="IF (LOAD is HEAVY) AND (CPU is MEDIUM)",
            consequent="THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)",
        ),
        RuleInfo(
            id=5,
            name="RULE #5 (MODERATE CPU TRANSIENT)",
            condition="IF (CPU is MEDIUM) AND (GPU is LOW)",
            consequent="THEN (PUMP is MEDIUM) AND (FAN is SLOW)",
        ),
        RuleInfo(
            id=6,
            name="RULE #6 (GPU BURST SURGE)",
            condition="IF (GPU is HIGH) AND (CPU is LOW)",
            consequent="THEN (PUMP is MEDIUM) AND (FAN is FAST)",
        ),
        RuleInfo(
            id=7,
            name="RULE #7 (BASE EQUILIBRIUM)",
            condition="IF (LOAD is IDLE) AND (CPU is LOW) AND (GPU is LOW)",
            consequent="THEN (PUMP is LOW) AND (FAN is OFF)",
        ),
        RuleInfo(
            id=8,
            name="RULE #8 (DUAL HIGH STRESS)",
            condition="IF (CPU is HIGH) AND (GPU is HIGH)",
            consequent="THEN (PUMP is HIGH) AND (FAN is MAX)",
        ),
        RuleInfo(
            id=9,
            name="RULE #9 (STANDARD GAMING)",
            condition="IF (CPU is MEDIUM) AND (GPU is MEDIUM) AND (LOAD is MODERATE)",
            consequent="THEN (PUMP is MEDIUM) AND (FAN is MEDIUM)",
        ),
    ]


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
