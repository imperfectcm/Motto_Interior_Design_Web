import { projectService } from "@/services/ProjectService";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        const projectList = await projectService.getAllProjectsInfo();

        if (!projectList) {
            return NextResponse.json({ message: "Failed to get projects." }, { status: 404 });
        }

        return NextResponse.json({ data: projectList }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })

    }

}