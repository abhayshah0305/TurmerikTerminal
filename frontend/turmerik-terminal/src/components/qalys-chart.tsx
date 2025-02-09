"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectData } from "@/types/project-data"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function QALYsChart({ data }: { data: ProjectData }) {
  const chartData = [
    { name: "Estimated QALYs", value: data.estimated_qalys },
    { name: "Remaining", value: 100 - data.estimated_qalys }, // Assuming 100 is the maximum QALY
  ]

  const COLORS = ["#0088FE", "#FFBB28"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estimated QALYs Impact</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

