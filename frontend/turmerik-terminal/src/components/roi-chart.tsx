"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectData } from "@/types/project-data"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Label } from "recharts"

export function ROIChart({ data }: { data: ProjectData }) {
  const chartData = [
    { name: "Total Cost", value: data.total_cost },
    { name: "Estimated ROI", value: data.estimated_roi },
    { name: "VOI", value: data.voi },
    { name: "Public ROI", value: data.public_roi },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]"> {/* Increased height */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 80 }}>
            
            {/* X-Axis with adjusted label position */}
            <XAxis dataKey="name" tick={{ fontSize: 12 }}>
              
            </XAxis>
            
            {/* Y-Axis with added padding */}
            <YAxis tickFormatter={(value) => value.toLocaleString()} tick={{ fontSize: 12 }} padding={{ top: 15, bottom: 0 }}>
              <Label value="Amount ($)" angle={-90} position="insideLeft" offset={-50} />
            </YAxis>

            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}