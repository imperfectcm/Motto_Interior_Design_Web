
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { projectService } from "@/services/ProjectService";


export async function GET(request: NextRequest) {

    try {
        const reqData = await request.json();

        const projectName = reqData.projectName;

        const res = await projectService.getProjectInfoByName(projectName);

        if (!res) {
            return NextResponse.json({ message: "Failed to get project by name." });
        }

        return NextResponse.json({ data: res });

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || error.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
    }

}


export async function POST(request: NextRequest) {

    try {

        const reqData = await request.json();

        if (!reqData) return NextResponse.json({ message: "No data to create." }, { status: 404 })

        const
            {
                aboutProject,
                apartmentName,
                householdSize,
                location,
                projectName,
                size,
                year
            } = reqData.data

        const projectData = {
            "name": projectName,
            "year": year,
            "location": location,
            "apartment_name": apartmentName,
            "size": size,
            "household_size": householdSize,
            "description": aboutProject
        };

        const res = await projectService.createProject(projectData, cookies());

        return NextResponse.json({ data: res }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || error.toString() }, { status: 500 }
        )
    }

}