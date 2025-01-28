from sqlalchemy import create_engine, Column, Integer, Float, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the database URL
DATABASE_URL = "postgresql://postgres:123@localhost:5432/Turmerik"

# Create the database engine
engine = create_engine(DATABASE_URL)

# Initialize the base class for ORM models
Base = declarative_base()

# Define the SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define the VOIResults table
class VOIResults(Base):
    __tablename__ = "voi_results"
    id = Column(Integer, primary_key=True, index=True)
    cost = Column(Float, nullable=False)
    success_prob = Column(Float, nullable=False)
    roi = Column(Float, nullable=False)
    voi = Column(Float, nullable=False)

# Create the table in the database
Base.metadata.create_all(bind=engine)
