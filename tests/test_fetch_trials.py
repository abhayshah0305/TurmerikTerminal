from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_fetch_clinical_trials():
    response = client.post("/api/fetch-clinical-trials/", json={"search_term": "diabetes", "limit": 5})
    assert response.status_code == 200
    assert "trials" in response.json()

def test_fetch_trial_funding():
    response = client.post("/api/fetch-trial-funding/", json={"nct_id": "NCT03178773"})
    assert response.status_code == 200
    assert "funding" in response.json()

def test_calculate_voi():
    response = client.post("/api/calculate-voi/", json={"nct_id": "NCT03178773"})
    assert response.status_code == 200
    assert "voi" in response.json()
