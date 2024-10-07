import { projectService } from "@/services/ProjectService";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await projectService.getAllProjectsInfo();
        if (!res) return NextResponse.json({ message: "No projects got." }, { status: 404 });
        if (res.success) {
            const projectList = res.data;
            return NextResponse.json({ data: projectList }, { status: 200 });
        } else
            return NextResponse.json({ error: res.error }, { status: 500 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}