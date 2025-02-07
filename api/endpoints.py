from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from models import FundingProject
from services.clinical_trials_service import fetch_clinical_trials
import logging
import openai
import os

#Load OpenAI API Key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("ERROR: OpenAI API key is missing. Set it in the .env file.")

client = openai.OpenAI(api_key=api_key)

router = APIRouter()

#Request Models
class SearchRequest(BaseModel):
    search_term: str
    limit: int = 5

class FundingRequest(BaseModel):
    project_num: str

#Fetch Clinical Trials from ClinicalTrials.gov
@router.post("/api/fetch-clinical-trials/")
async def fetch_trials(request: SearchRequest):
    logging.info(f"Fetching trials for: {request.search_term} with limit {request.limit}")

    trials = fetch_clinical_trials(request.search_term, request.limit)

    if not trials:
        raise HTTPException(status_code=404, detail="No clinical trials found.")

    return {"trials": trials}

#Combined Endpoint: VOI Calculation + ChatGPT Investment Decision
BASELINE_ROI_PER_DOLLAR = 64.70  # Expected return per $1 spent

@router.post("/api/analyze-investment/")
def analyze_investment(request: FundingRequest, db: Session = Depends(get_db)):
    """
    This endpoint performs two functions:
    1. Calculates Value of Information (VOI) based on funding data.
    2. Uses ChatGPT to provide an investment decision.
    """

    #Fetch project data from DB
    project = db.query(FundingProject).filter(FundingProject.project_num == request.project_num).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")

    total_cost = (project.direct_cost or 0) + (project.indirect_cost or 0)
    if total_cost == 0:
        raise HTTPException(status_code=400, detail="Total cost cannot be zero.")

    #Step 1: Calculate Estimated ROI
    estimated_roi = total_cost * BASELINE_ROI_PER_DOLLAR

    #Step 2: Apply eNPV Adjustments for Decentralized Clinical Trials (DCTs)
    if project.uses_dct:
        estimated_roi *= 7  # Apply 7x ROI multiplier
        estimated_roi += 20_000_000  # Add $20M per drug entering Phase II

    #Step 3: Calculate Public Return on Investment using QALYs
    QALY_COST = 3_600_000_000 / 470_000  # Cost per QALY benchmark
    estimated_qalys = total_cost / QALY_COST
    public_roi = estimated_qalys * QALY_COST

    #Step 4: Compute VOI incorporating financial & public health benefits
    potential_future_savings = 0.2 * estimated_roi
    research_cost_avoidance = 0.1 * estimated_roi
    voi = (potential_future_savings + research_cost_avoidance) - total_cost

    #Generate ChatGPT Investment Decision
    chat_prompt = f"""
    💡 **Investment Decision Analysis**

    A clinical trial is being considered for continued funding. Based on the financial and scientific data below, should the funding continue? Provide a clear Yes or No decision with a justification.

    **Clinical Trial Details:**
    - **Project Title**: {project.project_title}
    - **Organization**: {project.org_name}
    - **Total Cost**: ${total_cost:,.2f}
    - **Estimated ROI**: ${estimated_roi:,.2f}
    - **Value of Information (VOI)**: ${voi:,.2f}
    - **ROI per Dollar Spent**: {BASELINE_ROI_PER_DOLLAR}
    - **Public ROI**: ${public_roi:,.2f}
    - **Estimated Quality-Adjusted Life Years (QALYs)**: {estimated_qalys:.2f}
    - **Uses Decentralized Clinical Trial (DCT) Method**: {project.uses_dct}

    **Decision:** Should this research be funded? Answer Yes or No, then provide a short explanation in simple terms.
    """

    # Call OpenAI API
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI trained in financial and biomedical decision-making."},
                {"role": "user", "content": chat_prompt}
            ],
            max_tokens=300
        )
        decision_text = response.choices[0].message.content

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

    #Response
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
        "uses_dct": project.uses_dct,
        "investment_decision": decision_text  
    }