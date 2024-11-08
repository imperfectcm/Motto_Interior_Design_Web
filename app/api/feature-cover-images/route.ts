
export const dynamic = 'force-dynamic';
import { projectService } from "@/services/ProjectService";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const res = await projectService.getFeatureProjectsInfo();
        if (!res) {
            return NextResponse.json({ message: "Failed to get feature projects." });
        }
        let featureProjectList;
        if (res.success) featureProjectList = res.data;
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