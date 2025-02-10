import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons"
import type { ProjectData } from "@/types/project-data"

export function FinancialMetrics({ data }: { data: ProjectData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* Total Cost */}
          <div>
            <dt className="font-semibold flex items-center gap-2">
              Total Cost
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full shadow-md cursor-pointer">
                      <InfoCircledIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white p-2 rounded-md">
                    <p>The total financial investment required for this project.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd>${data.total_cost.toLocaleString()}</dd>
          </div>

          {/* Estimated ROI */}
          <div>
            <dt className="font-semibold flex items-center gap-2">
              Estimated ROI
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full shadow-md cursor-pointer">
                      <InfoCircledIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white p-2 rounded-md">
                    <p>Expected Return on Investment from the project.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd>${data.estimated_roi.toLocaleString()}</dd>
          </div>

          {/* Value of Information (VOI) */}
          <div>
            <dt className="font-semibold flex items-center gap-2">
              Value of Information (VOI)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full shadow-md cursor-pointer">
                      <InfoCircledIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white p-2 rounded-md">
                    <p>Represents the potential impact of additional research.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd>${data.voi.toLocaleString()}</dd>
          </div>

          {/* ROI per Dollar */}
          <div>
            <dt className="font-semibold flex items-center gap-2">
              ROI per Dollar
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full shadow-md cursor-pointer">
                      <InfoCircledIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white p-2 rounded-md max-w-[350px] text-sm">
                    <p>Return on Investment per dollar spent.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd>${data.roi_per_dollar.toFixed(2)}</dd>
          </div>

          {/* Public ROI */}
          <div>
            <dt className="font-semibold flex items-center gap-2">
              Public ROI
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full shadow-md cursor-pointer">
                      <InfoCircledIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white p-2 rounded-md max-w-[350px] text-sm">
                    <p>Expected return to the public sector.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd>${data.public_roi.toLocaleString()}</dd>
          </div>

          {/* Estimated QALYs */}
          <div>
            <dt className="font-semibold flex items-center gap-2">
              Estimated QALYs
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full shadow-md cursor-pointer">
                      <InfoCircledIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white p-2 rounded-md max-w-[350px] text-sm">
                    <p>
                      QALYs (Quality-Adjusted Life Years) measure the effectiveness of medical
                      interventions by combining life expectancy and quality of life into a single
                      value. One QALY equals one year of life in perfect health, while years lived
                      with illness are weighted accordingly. It is calculated as:
                      QALYs = Life Years Gained × Quality of Life Weight.
                    </p>                  
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd>{data.estimated_qalys.toFixed(2)}</dd>
          </div>

        </dl>
      </CardContent>
    </Card>
  )
}