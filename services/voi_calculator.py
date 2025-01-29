def calculate_voi(cost, success_prob, roi):
    if not (0 <= success_prob <= 1):
        raise ValueError("Success probability must be between 0 and 1.")
    return (success_prob * roi) - cost
