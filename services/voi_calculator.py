def calculate_voi(cost, success_prob, roi):
    ev_current = cost * success_prob
    ev_perfect = roi
    return ev_perfect - ev_current
