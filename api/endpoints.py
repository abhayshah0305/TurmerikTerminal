from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import SessionLocal, VOIResults
from api.models import VOIRequest
from services.voi_calculator import calculate_voi

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/api/calculate-voi/")
def calculate_voi_endpoint(request: VOIRequest, db: Session = Depends(get_db)):
    # Validate inputs
    if not (0 <= request.success_prob <= 1):
        raise HTTPException(
            status_code=422, detail="success_prob must be between 0 and 1."
        )

    # Calculate the VOI
    voi = calculate_voi(request.cost, request.success_prob, request.roi)

    # Save the results to the database
    db_result = VOIResults(
        cost=request.cost,
        success_prob=request.success_prob,
        roi=request.roi,
        voi=voi,
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)

    return {"id": db_result.id, "voi": db_result.voi}
