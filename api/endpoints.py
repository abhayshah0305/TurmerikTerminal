from fastapi import APIRouter
from services.voi_calculator import calculate_voi


router = APIRouter()

@router.post("/calculate-voi/")
def calculate_voi_endpoint(cost: float, success_prob: float, roi: float):
    voi = calculate_voi(cost, success_prob, roi)
    return {"voi": voi}
