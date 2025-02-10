"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { jsPDF } from "jspdf";
import { ProjectInfo } from "./project-info";
import { FinancialMetrics } from "./financial-metrics";
import { InvestmentDecision } from "./investment-decision";
import { fetchProjectData } from "@/lib/api";

const QALYsChart = dynamic(() => import("./qalys-chart").then((mod) => mod.QALYsChart), { ssr: false });
const ROIChart = dynamic(() => import("./roi-chart").then((mod) => mod.ROIChart), { ssr: false });

export function TurmerikDashboard() {
  const [projectNumber, setProjectNumber] = useState("");
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const exportToPDF = () => {
    if (!projectData) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Investment Decision Report", 20, 20);
    doc.setFont("helvetica", "normal");

    
    doc.text(`Project Title: ${projectData.project_title}`, 20, 40);
    doc.text(`Organization: ${projectData.organization}`, 20, 50);
    doc.text(`Funding Agency: ${projectData.funding_agency}`, 20, 60);
    doc.text(`Project URL: ${projectData.project_url}`, 20, 70);
    doc.text(`Uses DCT: ${projectData.uses_dct ? "Yes" : "No"}`, 20, 80);

    
    doc.text("Financial Metrics:", 20, 100);
    doc.text(`Total Cost: $${projectData.total_cost.toLocaleString()}`, 20, 110);
    doc.text(`Estimated ROI: $${projectData.estimated_roi.toLocaleString()}`, 20, 120);
    doc.text(`VOI: $${projectData.voi.toLocaleString()}`, 20, 130);
    doc.text(`ROI per Dollar: $${projectData.roi_per_dollar.toFixed(2)}`, 20, 140);
    doc.text(`Public ROI: $${projectData.public_roi.toLocaleString()}`, 20, 150);
    doc.text(`Estimated QALYs: ${projectData.estimated_qalys.toFixed(2)}`, 20, 160);

    doc.text("Investment Decision:", 20, 180);
    doc.setFont("helvetica", "bold");
    const decision = projectData.investment_decision.split("\n\n");
    doc.text(decision[0], 20, 190);
    doc.setFont("helvetica", "normal");
    doc.text(decision[1], 20, 200, { maxWidth: 170 });
    doc.save(`Investment_Report_${projectData.project_num}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Investment Decision Analysis
        </h1>


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

          {error && <p className="text-red-500 mt-2 text-sm font-semibold">{error}</p>}
        </div>

        {isClient && projectData && (
          <div className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <ProjectInfo data={projectData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <FinancialMetrics data={projectData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <InvestmentDecision data={projectData} />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <QALYsChart data={projectData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <ROIChart data={projectData} />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={exportToPDF}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Export Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}