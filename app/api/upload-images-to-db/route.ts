import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const reqData = await request.json();

        console.log(reqData);

        console.log("reqData.projectName: ", reqData.projectName)
        console.log("reqData.imageUrlList: ", reqData.imageUrlList)

        const projectName: string = reqData.projectName
        const imageUrlList: string[] = reqData.imageUrlList

        await projectService.uploadImagesToDB(projectName, imageUrlList, cookies());

        return NextResponse.json("Images uploaded to DB successfully.");

    } catch (error: any) {
        console.log(error);
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