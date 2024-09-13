import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const reqData = await request.json();

        const projectId: string = reqData.projectId
        const coverImageUrlList: string[] = reqData.coverImageUrlList
        let sequence: number = 0;
        let coverId: number = 0;

        const uploadEachImage = async (coverImageUrlList: string[]) => {
            coverImageUrlList.forEach(async (coverImageUrl) => {
                sequence += 1;
                coverId += 1;
                await projectService.uploadCoverImagesToDB(projectId, coverImageUrl, sequence, coverId, cookies());
            })
        }

        await uploadEachImage(coverImageUrlList);

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