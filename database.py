from sqlalchemy import create_engine, Column, String, Float, Integer, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session 

# Correct PostgreSQL connection string
DATABASE_URL = "postgresql://postgres:123@localhost:5432/Turmerik"

# ✅ Remove `connect_args={"check_same_thread": False}` since it's only for SQLite
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ensure models are imported and tables are created
from models import FundingProject  
Base.metadata.create_all(bind=engine)

def get_project_data(db: Session, project_num: str):
    return db.query(FundingProject).filter(FundingProject.project_num == project_num).first()