def calculate_voi(nct_id: str):
    """
    Calculate the Value of Information (VOI) for a given trial.
    """
    from services.fetch_funding_service import fetch_trial_funding

    funding_info = fetch_trial_funding(nct_id)
    
    if not funding_info:
        return None

    # Extract financial data
    total_funding = sum(trial.get("award_amount", 0) for trial in funding_info)
    direct_costs = sum(trial.get("direct_costs", 0) for trial in funding_info)
    indirect_costs = sum(trial.get("indirect_costs", 0) for trial in funding_info)

    # Placeholder values for success probability & ROI calculations
    success_prob = 0.6  # Example: Can be adjusted based on historical data
    estimated_roi = total_funding * success_prob  # Example calculation

    voi_result = {
        "nct_id": nct_id,
        "total_funding": total_funding,
        "direct_costs": direct_costs,
        "indirect_costs": indirect_costs,
        "success_prob": success_prob,
        "estimated_roi": estimated_roi
    }

    return voi_result
