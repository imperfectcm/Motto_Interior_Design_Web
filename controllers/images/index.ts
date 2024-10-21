import { uploadImagesToDBFailedToast } from "@/components/toastify/toast";

export const uploadCoverImages = async (coverImageUrlList: string[], coverKeyList: string[], projectId: string) => {
    if (!coverImageUrlList.length) return null;
    try {
        const res = await fetch("/api/cover-images", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "projectId": projectId,
                "coverImageUrlList": coverImageUrlList,
                "coverKeyList": coverKeyList
            }),
        });
        const resData = await res.json();
        return resData.message;
    } catch (error: any) {
        uploadImagesToDBFailedToast();
        throw new Error(error.message);
    }
}

export const uploadImages = async (imageUrlList: string[], imageKeyList: string[], projectId: string) => {
    if (!imageUrlList.length) return null;
    try {
        const res = await fetch("/api/project-images", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "projectId": projectId,
                "imageUrlList": imageUrlList,
                "imageKeyList": imageKeyList
            }),
        });
        const resData = await res.json()
        return resData.message;
    } catch (error: any) {
        uploadImagesToDBFailedToast();
        throw new Error(error.message);
    }
}