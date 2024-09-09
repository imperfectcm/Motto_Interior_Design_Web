import { authService, pb } from "@/services/AuthService";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { projectService } from "@/services/ProjectService";

export async function POST(request: NextRequest) {

    try {
        const reqData = await request.json();
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

        await projectService.createProject(projectData,cookies());
        return NextResponse.json("success");

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