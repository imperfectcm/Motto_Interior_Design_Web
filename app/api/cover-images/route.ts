import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        if (!reqData) return;

        const projectId: string = reqData.projectId
        const coverImageUrlList: string[] = reqData.coverImageUrlList
        const coverKeyList: string[] = reqData.coverKeyList
        let sequence: number = 0;
        let coverId: number = 0;

        const uploadEachImage = async (coverImageUrlList: string[]) => {
            coverImageUrlList.forEach(async (coverImageUrl, i) => {
                const coverKey = coverKeyList[i];
                sequence += 1;
                coverId += 1;
                if (coverImageUrl.includes(" ")) {
                    const replacedUrl = coverImageUrl.replaceAll(" ", "%20");
                    await projectService.uploadCoverImagesToDB(projectId, replacedUrl, coverKey, sequence, coverId, cookies());
                } else {
                    await projectService.uploadCoverImagesToDB(projectId, coverImageUrl, coverKey, sequence, coverId, cookies());
                }
            })
        }

        await uploadEachImage(coverImageUrlList);
        return NextResponse.json({ message: "Images uploaded to DB successfully." }, { status: 200 });
    } catch (error: any) {
        throw new Error(error.message);
    }

}
