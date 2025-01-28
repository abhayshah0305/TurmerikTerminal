from sqlalchemy import Column, Integer, String, Float
from .database import Base

class ClinicalTrial(Base):
    __tablename__ = "clinical_trials"

    id = Column(Integer, primary_key=True, index=True)
    trial_name = Column(String, index=True)
    cost = Column(Float)
    success_probability = Column(Float)
    roi = Column(Float)
