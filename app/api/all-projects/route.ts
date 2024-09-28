import { projectService } from "@/services/ProjectService";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        const projectList = await projectService.getAllProjectsInfo();

        if (!projectList) {
            return NextResponse.json({ message: "Failed to get projects." });
        }

        return NextResponse.json({ data: projectList });

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