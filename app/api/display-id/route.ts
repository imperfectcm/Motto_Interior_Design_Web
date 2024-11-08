
export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { projectService } from "@/services/ProjectService";

export async function PUT(request: NextRequest) {
    try {
        const reqData = await request.json();
        if (!reqData) return NextResponse.json({ message: "No display id to update." }, { status: 404 })
        const { projectId, displayId } = reqData.data;
        const res = await projectService.updateProjectByDisplayId(projectId, displayId, cookies());
        if (res.success) return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}