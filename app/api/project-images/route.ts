import { projectService } from "@/services/ProjectService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        let imagelist: { covers: any, images: any } = { covers: [], images: [] };

        const projectId = request.nextUrl.searchParams.get("projectId");
        if (!projectId) return NextResponse.json({ message: "No project id is provided." }, { status: 404 });

        const coverRes = await projectService.getProjectCover(projectId);
        imagelist.covers = coverRes;

        const imageRes = await projectService.getProjectImages(projectId);
        imagelist.images = imageRes;

        if (!coverRes && !imageRes) return NextResponse.json({ message: "Failed to get images by project name." }, { status: 404 });
        return NextResponse.json({ data: imagelist }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || error.toString() }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        if (!reqData) return;
        const projectId: string = reqData.projectId
        const imageUrlList: string[] = reqData.imageUrlList
        const imageKeyList: string[] = reqData.imageKeyList
        const imageType = reqData.imageType

        const uploadEachCover = async (coverImageUrlList: string[], coverKeyList: string[]) => {
            let coverList: any[] = [];
            try {
                if (coverImageUrlList.length == 0) return coverList.push("no cover images needed to upload");
                for (let i = 0; i < coverImageUrlList.length; i++) {
                    const coverUrl = coverImageUrlList[i];
                    const coverKey = coverKeyList[i];
                    let newUrl = coverUrl.includes(" ") ? coverUrl.replaceAll(" ", "%20") : coverUrl;
                    const res = await projectService.uploadCoverImages(projectId, newUrl, coverKey, (i + 1), (i + 1), cookies());
                    if (res.success) coverList.push(res.data);
                }
                return coverList;
            } catch (error: any) {
                throw new Error(error.message);
            }
        };
        const uploadEachImage = async (imageUrlList: string[], imageKeyList: string[]) => {
            let imageList: any[] = [];
            try {
                if (imageUrlList.length == 0) return imageList.push("no images needed to upload");
                for (let i = 0; i < imageUrlList.length; i++) {
                    const imageUrl = imageUrlList[i];
                    const imageKey = imageKeyList[i];
                    let newUrl = imageUrl.includes(" ") ? imageUrl.replaceAll(" ", "%20") : imageUrl;
                    const res = await projectService.uploadImages(projectId, newUrl, imageKey, (i + 1), cookies());
                    if (res.success) imageList.push(res.data);
                }
                return imageList;
            } catch (error: any) {
                throw new Error(error.message);
            }
        };
        let response: any = [];
        if (imageType === "cover") {
            response = await uploadEachCover(imageUrlList, imageKeyList);
        } else if (imageType === "image") {
            response = await uploadEachImage(imageUrlList, imageKeyList);
        } else return;
        if (response.length > 0) return NextResponse.json({ message: "Images uploaded to DB successfully." }, { status: 200 });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const reqData = await request.json();
        const imageList = reqData.imageList;
        const deleteEachImage = async (imageList: any[]) => {
            let result: any[] = [];
            for await (const image of imageList) {
                const imageId = image.id;
                const res = await projectService.deleteImageFromDB(imageId, cookies());
                if (res.success) result.push(res);
            }
            return result;
        };
        const response = await deleteEachImage(imageList);
        if (response.length > 0) return NextResponse.json({ message: "Images deleted from DB successfully." }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}