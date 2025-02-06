import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectData } from "@/types/project-data"

export function FinancialMetrics({ data }: { data: ProjectData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <dt className="font-semibold">Total Cost</dt>
            <dd>${data.total_cost.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-semibold">Estimated ROI</dt>
            <dd>${data.estimated_roi.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-semibold">Value of Information (VOI)</dt>
            <dd>${data.voi.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-semibold">ROI per Dollar</dt>
            <dd>${data.roi_per_dollar.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="font-semibold">Public ROI</dt>
            <dd>${data.public_roi.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-semibold">Estimated QALYs</dt>
            <dd>{data.estimated_qalys.toFixed(2)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

