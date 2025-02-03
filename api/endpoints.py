from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.clinical_trials_service import fetch_clinical_trials
import logging

router = APIRouter()

class SearchRequest(BaseModel):
    search_term: str
    limit: int = 5

@router.post("/api/fetch-clinical-trials/")
async def fetch_trials(request: SearchRequest):
    logging.info(f"Fetching trials for: {request.search_term} with limit {request.limit}")
    
    trials = fetch_clinical_trials(request.search_term, request.limit)

    if not trials:
        raise HTTPException(status_code=404, detail="No clinical trials found.")

    return {"trials": trials}