"use client";

import { useState } from "react";
import { ProjectInfo } from "./project-info"; // ✅ Import ProjectInfo
import { FinancialMetrics } from "./financial-metrics";
import { InvestmentDecision } from "./investment-decision";
import { QALYsChart } from "./qalys-chart";
import { ROIChart } from "./roi-chart";
import { fetchProjectData } from "@/lib/api";

export function TurmerikDashboard() {
  const [projectNumber, setProjectNumber] = useState(""); // User input
  const [projectData, setProjectData] = useState(null); // Stores API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Function to call the API
  const fetchData = async () => {
    if (!projectNumber.trim()) {
      setError("Please enter a valid NIH project number.");
      return;
    }

    setLoading(true);
    setError("");
    setProjectData(null);

    try {
      const result = await fetchProjectData(projectNumber);
      if (!result) {
        throw new Error("No data found. Please check the project number.");
      }
      setProjectData(result);
    } catch (err) {
      setError(err.message || "Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="max-w-6xl w-full"> {/* Increased width */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Investment Decision Analysis
        </h1>

        {/* Input Section */}
        <div className="bg-white shadow-md p-6 mt-6 rounded-lg w-full">
          <label className="text-lg font-semibold text-gray-800">
            Enter NIH Project Number:
          </label>
          <div className="flex items-center gap-4 mt-3">
            <input
              type="text"
              placeholder="e.g., 1R21AI175731-01"
              value={projectNumber}
              onChange={(e) => setProjectNumber(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={fetchData}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition 
              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"}
              w-auto min-w-[130px] whitespace-nowrap text-center`}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Data"}
            </button>
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500 mt-2 text-sm font-semibold">{error}</p>}
        </div>

        {/* Data Display */}
        {projectData && (
          <div className="mt-8 space-y-6">
            {/* ✅ Project Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <ProjectInfo data={projectData} />
            </div>

            {/* Financial Metrics */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <FinancialMetrics data={projectData} />
            </div>

            {/* Investment Decision */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <InvestmentDecision data={projectData} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <QALYsChart data={projectData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <ROIChart data={projectData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}