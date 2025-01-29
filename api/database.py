from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from api.models import metadata, voi_table

DATABASE_URL = "postgresql://postgres:123@localhost:5432/Turmerik"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
metadata.create_all(bind=engine)

def save_voi_result(cost, success_prob, roi, voi):
    with engine.connect() as connection:
        insert_query = voi_table.insert().values(
            cost=cost, success_prob=success_prob, roi=roi, voi=voi
        )
        connection.execute(insert_query)
