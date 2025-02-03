import requests

def fetch_trial_funding(study_title: str):
    """
    Fetch funding information for a clinical trial using the study title (not NCT ID).
    """
    url = "https://api.reporter.nih.gov/v2/projects/search"
    
    payload = {
        "criteria": {
            "advanced_text_search": {
                "operator": "or",
                "search_field": "terms",
                "search_text": study_title
            },
            "fiscal_years": [2024, 2023, 2022, 2021, 2020]  # Ensure it searches recent projects
        },
        "include_fields": [
            "project_title", "fiscal_year", "award_amount", "direct_costs",
            "indirect_costs", "funding_mechanism", "organization_name",
            "project_start_date", "project_end_date"
        ],
        "limit": 5,  # Get multiple results for accuracy
        "sorted_by_relevance": True
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code != 200:
        return None

    data = response.json()
    return data.get("results", [])