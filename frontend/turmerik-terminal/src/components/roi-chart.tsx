"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectData } from "@/types/project-data"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

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
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

