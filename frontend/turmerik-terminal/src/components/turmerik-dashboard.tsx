"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "../components/ui/use-toast"
import type { ProjectData } from "@/types/project-data"
import { fetchProjectData } from "../lib/api"
import { ProjectInfo } from "./project-info"
import { FinancialMetrics } from "./financial-metrics"
import { ROIChart } from "./roi-chart"
import { QALYsChart } from "./qalys-chart"
import { InvestmentDecision } from "./investment-decision"

export function TurmerikDashboard() {
  const [projectNum, setProjectNum] = useState("")
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await fetchProjectData(projectNum)
      setProjectData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch project data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter NIH Project Number</CardTitle>
          <CardDescription>Input a valid NIH project number to fetch and analyze data.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              value={projectNum}
              onChange={(e) => setProjectNum(e.target.value)}
              placeholder="e.g., 1R21AI175731-01"
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Fetch Data"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {projectData && (
        <>
          <InvestmentDecision data={projectData} />
          <ProjectInfo data={projectData} />
          <FinancialMetrics data={projectData} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ROIChart data={projectData} />
            <QALYsChart data={projectData} />
          </div>
        </>
      )}
    </div>
  )
}

