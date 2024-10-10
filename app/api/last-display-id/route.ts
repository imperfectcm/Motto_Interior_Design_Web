
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { projectService } from "@/services/ProjectService";

export async function GET(request: NextRequest) {
    try {
        const res = await projectService.getLastDisplayId();
        if (!res) return NextResponse.json({ message: "Get latest project display id failed." }, { status: 404 });
        if (res.success) return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error: any) {
        throw new Error(error.message);
    }
}