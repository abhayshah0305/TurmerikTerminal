from sqlalchemy import Column, String, Float, Integer
from database import Base

class FundingProject(Base):
    __tablename__ = "funding_projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_num = Column(String, unique=True, index=True)
    org_name = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    award_amount = Column(Float)
    direct_cost = Column(Float)  
    indirect_cost = Column(Float)  
    agency_name = Column(String)
    project_title = Column(String)
    project_start_date = Column(String)
    project_end_date = Column(String)
    project_url = Column(String)