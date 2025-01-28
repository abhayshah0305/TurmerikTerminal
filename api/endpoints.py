from fastapi import APIRouter, HTTPException
from services.voi_calculator import calculate_voi
from pydantic import BaseModel, Field
from .models import VOIRequest

router = APIRouter()

@router.post("/calculate-voi/")
def calculate_voi_endpoint(request: VOIRequest):
    if request.success_prob < 0 or request.success_prob > 1:
        raise HTTPException(status_code=400, detail="success_prob must be between 0 and 1")
    voi = calculate_voi(request.cost, request.success_prob, request.roi)
    return {"voi": voi}

class VOIRequest(BaseModel):
    cost: float
    success_prob: float = Field(..., ge=0, le=1, description="Success probability must be between 0 and 1")
    roi: float
