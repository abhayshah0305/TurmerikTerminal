"use client";

import { useState } from "react";
import { FinancialMetrics } from "./financial-metrics";
import { InvestmentDecision } from "./investment-decision";
import { QALYsChart } from "./qalys-chart";
import { ROIChart } from "./roi-chart";
import { fetchProjectData } from "@/lib/api"; // ✅ Import API function

export function TurmerikDashboard() {
  const [projectNumber, setProjectNumber] = useState(""); // User input
  const [projectData, setProjectData] = useState(null); // Stores API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // ✅ Function to call the API
  const fetchData = async () => {
    if (!projectNumber.trim()) {
      setError("❌ Please enter a valid NIH project number.");
      return;
    }

    setLoading(true);
    setError("");
    setProjectData(null); // Reset previous data

    try {
      const result = await fetchProjectData(projectNumber); // ✅ Call API function
      if (!result) {
        throw new Error("No data found. Please check the project number.");
      }
      setProjectData(result);
    } catch (err) {
      setError(err.message || "❌ Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-900">TurmerikTerminal: Investment Decision Support</h1>

        {/* Input Section */}
        <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
          <label className="text-lg font-semibold text-gray-800">
            Enter NIH Project Number
          </label>
          <input
            type="text"
            placeholder="e.g., 1R21AI175731-01"
            value={projectNumber}
            onChange={(e) => setProjectNumber(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mt-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={fetchData}
            className={`mt-3 w-full px-5 py-3 rounded-lg font-semibold ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"
            } text-white transition`}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>

          {/* Error Handling */}
          {error && <p className="text-red-500 mt-2 text-sm font-semibold">{error}</p>}
        </div>

        {/* Data Display */}
        {projectData && (
          <div className="mt-8">
            <FinancialMetrics data={projectData} />
            <InvestmentDecision data={projectData} />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <QALYsChart data={projectData} />
              <ROIChart data={projectData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}