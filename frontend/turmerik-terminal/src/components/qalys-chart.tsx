"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell, Label } from "recharts";
import type { ProjectData } from "@/types/project-data";

export function QALYsChart({ data }: { data: ProjectData }) {
  const estimatedQALYs = Number(data.estimated_qalys.toFixed(2)); // Round off
  const remainingQALYs = Number((100 - data.estimated_qalys).toFixed(2)); // Ensure sum is 100%

  const chartData = [
    { name: "Estimated QALYs", value: estimatedQALYs, color: "#007bff" },
    { name: "Remaining", value: remainingQALYs, color: "#f4a742" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estimated QALYs Impact</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, value }) => `${value.toFixed(2)}`} // Round labels
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toFixed(2)} /> {/* Tooltip rounding */}
            <Legend verticalAlign="bottom" align="center" height={40} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}