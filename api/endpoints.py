from fastapi import APIRouter, HTTPException
from services.clinical_trials_service import fetch_clinical_trials
from services.fetch_funding_service import fetch_trial_funding
from services.voi_calculator import calculate_voi

router = APIRouter()

@router.post("/api/fetch-clinical-trials/")
async def fetch_trials(search_term: str, limit: int = 5):
    """
    Fetch clinical trials based on a search term.
    """
    trials = fetch_clinical_trials(search_term, limit)
    if not trials:
        raise HTTPException(status_code=404, detail="No trials found.")
    return {"trials": trials}

@router.post("/api/fetch-trial-funding/")
async def fetch_funding(nct_id: str):
    """
    Fetch trial funding data using an NCT ID.
    """
    funding_info = fetch_trial_funding(nct_id)
    if not funding_info:
        raise HTTPException(status_code=404, detail="No funding information found.")
    return {"funding": funding_info}

@router.post("/api/calculate-voi/")
async def calculate_voi_endpoint(nct_id: str):
    """
    Calculate the Value of Information (VOI) for a given clinical trial.
    """
    voi_result = calculate_voi(nct_id)
    if not voi_result:
        raise HTTPException(status_code=500, detail="VOI calculation failed.")
    return {"voi": voi_result}
