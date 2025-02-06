import type { ProjectData } from "@/types/project-data"

export async function fetchProjectData(projectNum: string): Promise<ProjectData> {
  // In a real application, you would make an API call here
  // For this example, we'll simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulated API response
  const data: ProjectData = {
    project_num: projectNum,
    project_title: "Pyroptotic Macrophages Traps Against Shigella Infection",
    organization: "UNIV OF ARKANSAS FOR MED SCIS",
    total_cost: 229500,
    estimated_roi: 14848650,
    voi: 4225095,
    roi_per_dollar: 64.7,
    public_roi: 229500,
    estimated_qalys: 29.9625,
    funding_agency: "National Institute of Allergy and Infectious Diseases",
    project_url: "https://reporter.nih.gov/project-details/10646015",
    uses_dct: false,
    investment_decision:
      "**Decision:** Yes\n\n**Justification:** The investment in this clinical trial is justified based on multiple factors. First, the estimated ROI is significantly higher than the total cost, implying a strong potential of financial gain. Moreover, the ROI per Dollar Spent is 64.7, which is quite high and promising. Secondly, the Value of Information (VOI) is substantial, indicating that the findings could have a large impact on future research or treatment options. Lastly, even though it does not utilize the Decentralized Clinical Trial (DCT) method, the trial's projected Quality-Adjusted Life Years (QALYs) is relatively high signifying it could improve people's length and quality of life upon successful completion. Despite the equal amounts in total cost and public ROI which don't show public direct financial benefits, the Value of Information and QALYs greatly enhance public indirect benefits.",
  }

  return data
}

