import type { ProjectData } from "@/types/project-data"

export async function fetchProjectData(projectNum: string): Promise<ProjectData | null> {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/analyze-investment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ project_num: projectNum }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }

    const data: ProjectData = await response.json();
    console.log("✅ Investment Data Fetched:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching investment analysis:", error);
    return null; // Return null in case of an error
  }
}