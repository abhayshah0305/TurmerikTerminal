from pydantic import BaseModel, Field
from sqlalchemy import Column, Integer, Float, create_engine, MetaData, Table

class VOIRequest(BaseModel):
    cost: float = Field(gt=0, description="Cost must be greater than 0")
    success_prob: float = Field(ge=0, le=1, description="Success probability must be between 0 and 1")
    roi: float = Field(gt=0, description="ROI must be greater than 0")

class VOIResponse(BaseModel):
    voi: float

# SQLAlchemy schema for PostgreSQL
metadata = MetaData()

voi_table = Table(
    "voi_results",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("cost", Float),
    Column("success_prob", Float),
    Column("roi", Float),
    Column("voi", Float),
)


