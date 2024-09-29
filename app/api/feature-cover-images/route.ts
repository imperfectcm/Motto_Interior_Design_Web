import { projectService } from "@/services/ProjectService";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        const featureProjectList = await projectService.getFeatureProjectsInfo();

        if (!featureProjectList) {
            return NextResponse.json({ message: "Failed to get feature projects." });
        }

        if (Array.isArray(featureProjectList)) {
            for await (const project of featureProjectList) {
                const cover = await projectService.getProjectCover(project.id);
                project.cover = cover;
            }
        }

        return NextResponse.json({ data: featureProjectList }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || error.toString() }, { status: 500 })
    }

}