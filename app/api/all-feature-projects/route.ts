import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const projectList = await projectService.getFeatureProjectsInfo();

        if (!projectList) {
            return NextResponse.json({ message: "No feature projects." }, { status: 404 });
        }

        return NextResponse.json({ data: projectList }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqData = await request.json();
        if (!reqData) return NextResponse.json({ message: "No data to update." }, { status: 404 })
        const
            {
                id,
                is_feature_project,
                feature_id,
            } = reqData.data
        const projectData = {
            "id": id,
            "is_feature_project": is_feature_project,
            "feature_id": feature_id
        };
        const res = await projectService.updateFeatureProjectById(projectData, cookies());
        return NextResponse.json({ data: res }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}