import { projectService } from "@/services/ProjectService";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        const projectList = await projectService.getAllProjectsInfo();

        if (!projectList) {
            return NextResponse.json({ message: "Failed to get projects." });
        }

        if (Array.isArray(projectList)) {
            for await (const project of projectList) {
                const cover = await projectService.getProjectCover(project.id);
                project.cover = cover;
            }
        }

        return NextResponse.json({ data: projectList }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }

}