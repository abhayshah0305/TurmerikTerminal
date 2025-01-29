from fastapi import APIRouter, HTTPException
from services.clinical_trials_service import fetch_trials
from services.voi_calculator import calculate_voi
from api.models import VOIRequest, VOIResponse
from api.database import save_voi_result

router = APIRouter()

@router.post("/fetch-clinical-trials/")
def fetch_clinical_trials(search_term: str, fields: str, page_size: int):
    try:
        data = fetch_trials(search_term, fields, page_size)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/calculate-voi/", response_model=VOIResponse)
def calculate_voi_endpoint(request: VOIRequest):
    try:
        voi = calculate_voi(request.cost, request.success_prob, request.roi)
        save_voi_result(request.cost, request.success_prob, request.roi, voi)
        return VOIResponse(voi=voi)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
