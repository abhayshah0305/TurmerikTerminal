import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ProjectData } from "@/types/project-data"

export function InvestmentDecision({ data }: { data: ProjectData }) {
  // Split the decision and justification
  const [decision, justification] = data.investment_decision.split("\n\n")

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Investment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={decision.includes("Yes") ? "default" : "destructive"}>
          <AlertTitle className="text-lg font-semibold">{decision.replace("**Decision:**", "Decision:")}</AlertTitle>
          <AlertDescription className="mt-4 whitespace-pre-wrap">
            {justification.replace("**Justification:**", "Justification:")}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

