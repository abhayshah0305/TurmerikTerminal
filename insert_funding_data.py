from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import FundingProject

# Ensure the database tables are created
FundingProject.__table__.create(bind=engine, checkfirst=True)

funding_data = [
    {
        "project_num": "5F32DK132864-02",
        "org_name": "DANA-FARBER CANCER INST",
        "city": "BOSTON",
        "state": "MA",
        "country": "UNITED STATES",
        "award_amount": 71792,
        "direct_cost": 71792,  
        "indirect_cost": 0,  
        "agency_name": "National Institute of Diabetes and Digestive and Kidney Diseases",
        "project_title": "Elucidating novel molecular mechanisms of irisin-mediated effects via integrin",
        "project_start_date": "2022-05-01T12:05:00Z",
        "project_end_date": "2025-04-30T12:04:00Z",
        "project_url": "https://reporter.nih.gov/project-details/10617263"
    },
    {
        "project_num": "1R21AI175731-01",
        "org_name": "UNIV OF ARKANSAS FOR MED SCIS",
        "city": "LITTLE ROCK",
        "state": "AR",
        "country": "UNITED STATES",
        "award_amount": 229500,
        "direct_cost": 150000,  
        "indirect_cost": 79500,  
        "agency_name": "National Institute of Allergy and Infectious Diseases",
        "project_title": "Pyroptotic Macrophages Traps Against Shigella Infection",
        "project_start_date": "2023-08-25T12:08:00Z",
        "project_end_date": "2025-07-31T12:07:00Z",
        "project_url": "https://reporter.nih.gov/project-details/10646015"
    },
    {
        "project_num": "5P42ES027725-04",
        "org_name": "BAYLOR COLLEGE OF MEDICINE",
        "city": "HOUSTON",
        "state": "TX",
        "country": "UNITED STATES",
        "award_amount": 244676,
        "direct_cost": 154370,  
        "indirect_cost": 90306,  
        "agency_name": "National Institute of Environmental Health Sciences",
        "project_title": "Project 2: Investigating the role of PAH exposures associated with superfund site proximity in preterm birth etiology through placental transcriptomics and metagenomics",
        "project_start_date": "2020-02-28T12:02:00Z",
        "project_end_date": "2025-01-31T12:01:00Z",
        "project_url": "https://reporter.nih.gov/project-details/10559699"
    },
    {
        "project_num": "5R01DK128187-03",
        "org_name": "BAYLOR COLLEGE OF MEDICINE",
        "city": "HOUSTON",
        "state": "TX",
        "country": "UNITED STATES",
        "award_amount": 1421433,
        "direct_cost": 1386797,  
        "indirect_cost": 34636,  
        "agency_name": "National Institute of Diabetes and Digestive and Kidney Diseases",
        "project_title": "Metformin in Pregnancy: Fetal Consequences & Long-term Offspring Outcomes in a NHP Model",
        "project_start_date": "2021-09-17T12:09:00Z",
        "project_end_date": "2024-07-31T12:07:00Z",
        "project_url": "https://reporter.nih.gov/project-details/10683230"
    },
    {
        "project_num": "7R01EY029409-05",
        "org_name": "UNIVERSITY OF MICHIGAN AT ANN ARBOR",
        "city": "ANN ARBOR",
        "state": "MI",
        "country": "UNITED STATES",
        "award_amount": 388089,
        "direct_cost": 248775,  
        "indirect_cost": 139314,  
        "agency_name": "National Eye Institute",
        "project_title": "Novel Treatments for Ocular Surface Diseases",
        "project_start_date": "2019-04-01T12:04:00Z",
        "project_end_date": "2025-03-31T12:03:00Z",
        "project_url": "https://reporter.nih.gov/project-details/10795227"
    }
]

# Insert data into database
def insert_funding_data():
    db: Session = SessionLocal()
    try:
        for project in funding_data:
            existing_project = db.query(FundingProject).filter_by(project_num=project["project_num"]).first()
            if existing_project:
                print(f"Skipping {project['project_num']}, already exists in the database.")
                continue
            
            new_project = FundingProject(**project)
            db.add(new_project)
        
        db.commit()
        print("Data inserted successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error inserting data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    insert_funding_data()