from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from models import FundingProject
from services.clinical_trials_service import fetch_clinical_trials
import logging

router = APIRouter()

### ✅ Request Models
class SearchRequest(BaseModel):
    search_term: str
    limit: int = 5

class FundingRequest(BaseModel):
    project_num: str

### ✅ Fetch Clinical Trials from ClinicalTrials.gov
@router.post("/api/fetch-clinical-trials/")
async def fetch_trials(request: SearchRequest):
    logging.info(f"Fetching trials for: {request.search_term} with limit {request.limit}")
    
    trials = fetch_clinical_trials(request.search_term, request.limit)

    if not trials:
        raise HTTPException(status_code=404, detail="No clinical trials found.")

    return {"trials": trials}


### ✅ Fetch NIH Funding Data (Manual Approach)
@router.post("/api/fetch-trial-funding/")
async def fetch_funding(request: FundingRequest, db: Session = Depends(get_db)):
    project = db.query(FundingProject).filter(FundingProject.project_num == request.project_num).first()

    if not project:
        raise HTTPException(status_code=404, detail="No funding data found for the given project number.")

    return {
        "project_num": project.project_num,
        "organization": project.org_name,
        "award_amount": project.award_amount,
        "direct_cost": project.direct_cost,
        "indirect_cost": project.indirect_cost,
        "funding_agency": project.agency_name,
        "project_title": project.project_title,
        "project_url": project.project_url
    }


### ✅ VOI Calculation Endpoint
BASELINE_ROI_PER_DOLLAR = 64.70  # Expected return per $1 spent

@router.post("/api/calculate-voi/")
def calculate_voi(request: FundingRequest, db: Session = Depends(get_db)):
    """
    Calculate Value of Information (VOI) based on NIH funding data, incorporating:
    - Expected Net Present Value (eNPV) models for Decentralized Clinical Trials (DCTs)
    - Public Return on Investment (Public ROI) using QALY models
    """

    project = db.query(FundingProject).filter(FundingProject.project_num == request.project_num).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")

    total_cost = (project.direct_cost or 0) + (project.indirect_cost or 0)
    
    if total_cost == 0:
        raise HTTPException(status_code=400, detail="Total cost cannot be zero.")

    # Step 1: Calculate Estimated ROI
    estimated_roi = total_cost * BASELINE_ROI_PER_DOLLAR  # Default ROI multiplier

    # Step 2: Apply eNPV Adjustments for DCTs (if applicable)
    if project.uses_dct:  # Check if the study uses DCTs
        estimated_roi *= 7  # Apply 7x ROI multiplier
        estimated_roi += 20_000_000  # Add $20M per drug entering Phase II

    # Step 3: Calculate Public Return on Investment using QALYs
    # Reference: $3.6B spent for 470,000 QALYs → $7,660 per QALY
    QALY_COST = 3_600_000_000 / 470_000  # Cost per QALY benchmark
    estimated_qalys = total_cost / QALY_COST  # Estimate QALYs generated
    public_roi = estimated_qalys * QALY_COST  # Calculate public ROI

    # Step 4: Compute VOI incorporating financial & public health benefits
    potential_future_savings = 0.2 * estimated_roi
    research_cost_avoidance = 0.1 * estimated_roi
    voi = (potential_future_savings + research_cost_avoidance) - total_cost

    return {
        "project_num": project.project_num,
        "project_title": project.project_title,
        "organization": project.org_name,
        "total_cost": total_cost,
        "estimated_roi": estimated_roi,
        "voi": voi,
        "roi_per_dollar": BASELINE_ROI_PER_DOLLAR,
        "public_roi": public_roi,
        "estimated_qalys": estimated_qalys,
        "funding_agency": project.agency_name,
        "project_url": project.project_url,
        "uses_dct": project.uses_dct
    }