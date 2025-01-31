import requests

def fetch_clinical_trials(search_term: str, limit: int = 5):
    """
    Fetch clinical trials from ClinicalTrials.gov API.
    """
    url = f"https://clinicaltrials.gov/api/v2/studies?query.cond={search_term}&fields=protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions&pageSize={limit}"

    response = requests.get(url)
    
    if response.status_code != 200:
        return None

    data = response.json()
    return data.get("studies", [])
