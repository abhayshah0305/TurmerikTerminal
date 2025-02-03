from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from services.clinical_trials_service import fetch_clinical_trials
from services.voi_calculator import calculate_voi
from database import get_db
from models import FundingProject

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

@router.get("/api/fetch-trial-funding/")
async def fetch_funding(project_num: str, db: Session = Depends(get_db)):
    """
    Fetch trial funding data from the **database** instead of making an API call.
    """
    funding_info = db.query(FundingProject).filter(FundingProject.project_num == project_num).first()
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