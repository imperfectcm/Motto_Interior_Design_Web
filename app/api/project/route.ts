
export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { projectService } from "@/services/ProjectService";

export async function GET(request: NextRequest) {
    try {
        const projectName = request.nextUrl.searchParams.get("projectName");
        if (!projectName) return NextResponse.json({ message: "No project name is provided." }, { status: 404 });
        const res = await projectService.getProjectInfoByName(projectName);
        if (!res) return NextResponse.json({ message: "Failed to get project by name." }, { status: 404 });
        if (res.success) return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        if (!reqData) return NextResponse.json({ message: "No data to create." }, { status: 404 })
        const projectData = {
            "name": reqData.data.projectName,
            "year": reqData.data.year,
            "location": reqData.data.location,
            "apartment_name": reqData.data.apartmentName,
            "size": reqData.data.size,
            "household_size": reqData.data.householdSize,
            "description": reqData.data.aboutProject,
            "display_id": reqData.data.displayId
        };
        const res = await projectService.createProject(projectData, cookies());
        return NextResponse.json({ data: res }, { status: 200 });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqData = await request.json();
        if (!reqData) return NextResponse.json({ message: "No data to update." }, { status: 404 })
        const
            {
                aboutProject,
                apartmentName,
                householdSize,
                location,
                projectName,
                size,
                year,
            } = reqData.data
        const projectId = reqData.projectId;
        const projectData = {
            "name": projectName,
            "year": year,
            "location": location,
            "apartment_name": apartmentName,
            "size": size,
            "household_size": householdSize,
            "description": aboutProject
        };
        const res = await projectService.updateProjectById(projectData, projectId, cookies());
        if (res.success) return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const reqData = await request.json();
    const projectId = reqData.projectId;
    try {
        const res = await projectService.deleteProjectById(projectId, cookies());
        if (res.success) return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });
        else return NextResponse.json({ error: res.error }, { status: 500 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 });
    }
}