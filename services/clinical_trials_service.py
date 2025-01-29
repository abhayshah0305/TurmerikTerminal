import requests

def fetch_trials(search_term, fields, page_size):
    url = "https://clinicaltrials.gov/api/v2/studies"
    params = {
        'query.cond': search_term,
        'fields': fields,
        'pageSize': page_size
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch trials: {response.status_code}, {response.text}")
    return response.json()
