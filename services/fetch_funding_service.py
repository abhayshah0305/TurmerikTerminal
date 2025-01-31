import requests

def fetch_trial_funding(nct_id: str):
    """
    Fetch funding information for a clinical trial from NIH RePORTER.
    """
    url = "https://api.reporter.nih.gov/v2/projects/search"
    payload = {
        "criteria": {
            "advanced_text_search": {
                "operator": "and",
                "search_field": "projecttitle",
                "search_text": nct_id
            }
        },
        "include_fields": ["project_title", "fiscal_year", "award_amount", "direct_costs", "indirect_costs", "funding_mechanism"]
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code != 200:
        return None

    data = response.json()
    return data.get("results", [])
