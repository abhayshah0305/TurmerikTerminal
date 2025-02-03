import requests
import logging

logging.basicConfig(level=logging.INFO)

def fetch_clinical_trials(search_term, limit=5):
    """
    Fetches clinical trials from ClinicalTrials.gov API v2.
    Extracts important fields: NCT ID, Brief Title, Conditions, and Study Status.
    """
    url = (
        f"https://clinicaltrials.gov/api/v2/studies?"
        f"query.cond={search_term}&"
        f"fields=protocolSection.identificationModule.nctId,"
        f"protocolSection.identificationModule.briefTitle,"
        f"protocolSection.conditionsModule.conditions,"
        f"protocolSection.statusModule.overallStatus"
    )

    logging.info(f"Requesting URL: {url}")
    response = requests.get(url)
    
    logging.info(f"Response Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        studies = data.get("studies", [])

        if not studies:
            logging.warning("No studies found in the API response.")
            return []

        extracted_studies = []
        for study in studies[:limit]:  # Limit the results manually
            extracted_studies.append({
                "nct_id": study.get("protocolSection", {}).get("identificationModule", {}).get("nctId", "N/A"),
                "brief_title": study.get("protocolSection", {}).get("identificationModule", {}).get("briefTitle", "N/A"),
                "conditions": study.get("protocolSection", {}).get("conditionsModule", {}).get("conditions", []),
                "overall_status": study.get("protocolSection", {}).get("statusModule", {}).get("overallStatus", "N/A")
            })

        logging.info(f"Extracted {len(extracted_studies)} studies.")
        return extracted_studies

    logging.error(f"API request failed with status {response.status_code}")
    return []