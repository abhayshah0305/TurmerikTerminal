from sqlalchemy import create_engine, Column, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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