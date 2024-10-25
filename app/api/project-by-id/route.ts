import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const paramId = request.nextUrl.searchParams.get("displayId");
        console.log("paramId: ", paramId);
        if (!paramId) return NextResponse.json({ message: "No project display id is provided." }, { status: 404 });
        const displayId = ~~paramId;
        const res = await projectService.getProjectInfoByDisplayId(displayId);
        if (!res) return NextResponse.json({ message: "Failed to get project by display id." }, { status: 404 });
        return NextResponse.json({ data: res }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}