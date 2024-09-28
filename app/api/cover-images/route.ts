import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const reqData = await request.json();

        if (!reqData) return;

        const projectId: string = reqData.projectId
        const coverImageUrlList: string[] = reqData.coverImageUrlList
        let sequence: number = 0;
        let coverId: number = 0;

        const uploadEachImage = async (coverImageUrlList: string[]) => {
            coverImageUrlList.forEach(async (coverImageUrl) => {
                sequence += 1;
                coverId += 1;
                if (coverImageUrl.includes(" ")) {
                    const replacedUrl = coverImageUrl.replaceAll(" ", "%20");
                    await projectService.uploadCoverImagesToDB(projectId, replacedUrl, sequence, coverId, cookies());
                } else {
                    await projectService.uploadCoverImagesToDB(projectId, coverImageUrl, sequence, coverId, cookies());
                }
            })
        }

        await uploadEachImage(coverImageUrlList);

        return NextResponse.json({ message: "Images uploaded to DB successfully." }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message || error.toString() }, { status: 500 }
        )
    }

}