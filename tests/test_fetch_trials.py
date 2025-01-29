from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_fetch_clinical_trials():
    response = client.post(
        "/fetch-clinical-trials/",
        json={"search_term": "diabetes", "fields": "NCTId,BriefTitle", "page_size": 5}
    )
    assert response.status_code == 200
    assert "studies" in response.json()
