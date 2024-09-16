import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const reqData = await request.json();

        const projectId: string = reqData.projectId
        const imageUrlList: string[] = reqData.imageUrlList
        let sequence: number = 0;

        const uploadEachImage = async (imageUrlList: string[]) => {
            imageUrlList.forEach(async (imageUrl) => {
                sequence += 1;
                if (imageUrl.includes(" ")) {
                    const replacedUrl = imageUrl.replaceAll(" ", "%20");
                    await projectService.uploadImagesToDB(projectId, replacedUrl, sequence, cookies());
                } else {
                    await projectService.uploadImagesToDB(projectId, imageUrl, sequence, cookies());
                }
            })
        }

        await uploadEachImage(imageUrlList);

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