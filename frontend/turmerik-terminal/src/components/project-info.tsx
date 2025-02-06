import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectData } from "@/types/project-data"

export function ProjectInfo({ data }: { data: ProjectData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold">Project Title</dt>
            <dd>{data.project_title}</dd>
          </div>
          <div>
            <dt className="font-semibold">Organization</dt>
            <dd>{data.organization}</dd>
          </div>
          <div>
            <dt className="font-semibold">Funding Agency</dt>
            <dd>{data.funding_agency}</dd>
          </div>
          <div>
            <dt className="font-semibold">Project URL</dt>
            <dd>
              <a
                href={data.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on NIH Reporter
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Uses Decentralized Clinical Trials</dt>
            <dd>{data.uses_dct ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

