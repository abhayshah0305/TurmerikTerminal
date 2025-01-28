from sqlalchemy import Column, Integer, String, Float
from .database import Base
from pydantic import BaseModel, Field

class ClinicalTrial(Base):
    __tablename__ = "clinical_trials"

    id = Column(Integer, primary_key=True, index=True)
    trial_name = Column(String, index=True)
    cost = Column(Float)
    success_probability = Column(Float)
    roi = Column(Float)

class VOIRequest(BaseModel):
    cost: float
    success_prob: float = Field(..., ge=0, le=1, description="Success probability must be between 0 and 1")
    roi: float

