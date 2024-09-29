import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        let imagelist: { covers: any, images: any } = { covers: [], images: [] };

        const projectId = request.nextUrl.searchParams.get("projectId");
        if (!projectId) return NextResponse.json({ message: "No project id is provided." }, { status: 404 });

        const coverRes = await projectService.getProjectCover(projectId);
        if (!coverRes) return NextResponse.json({ message: "Failed to get cover image by project name." }, { status: 404 });
        imagelist.covers = coverRes;

        const imageRes = await projectService.getProjectImages(projectId);
        if (!imageRes) return NextResponse.json({ message: "Failed to get images by project name." }, { status: 404 });
        imagelist.images = imageRes;

        return NextResponse.json({ data: imagelist }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || error.toString() }, { status: 500 })
    }
}

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

        return NextResponse.json({ message: "Images uploaded to DB successfully." }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || error.toString() }, { status: 500 })
    }

}

