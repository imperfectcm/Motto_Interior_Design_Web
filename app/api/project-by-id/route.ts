import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const paramId = request.nextUrl.searchParams.get("displayId");
        if (!paramId) return NextResponse.json({ message: "No project display id is provided." }, { status: 404 });
        const displayId = ~~paramId;
        if (displayId === 0) return NextResponse.json({ message: "No more projects." }, { status: 404 });
        const res = await projectService.getProjectInfoByDisplayId(displayId);
        if (!res) return NextResponse.json({ message: "Failed to get project by display id." }, { status: 404 });
        if (res.success) return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}