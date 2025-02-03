import requests

def fetch_clinical_trials(search_term, limit=5):
    url = f"https://clinicaltrials.gov/api/v2/studies?query.cond={search_term}&fields=protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle&limit={limit}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json().get("studies", [])
    return []