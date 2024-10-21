import { uploadImagesToDBFailedToast } from "@/components/toastify/toast";

export const uploadImages = async (imageUrlList: string[], imageKeyList: string[], projectId: string, imageType: string = "image") => {
    if (!imageUrlList.length) return null;
    try {
        const res = await fetch("/api/project-images", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId,
                imageUrlList,
                imageKeyList,
                imageType
            }),
        });
        const resData = await res.json()
        return resData.message;
    } catch (error: any) {
        uploadImagesToDBFailedToast();
        throw new Error(error.message);
    }
}

export const deleteImages = async (imageList: any[]) => {
    if (!imageList.length) return;
    try {
        const res = await fetch("/api/project-images", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imageList: imageList
            }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            uploadImagesToDBFailedToast();
            throw new Error(errorData.error || "Project images delete failed.");
        }
        const response = await res.json()
        return response.message;
    } catch (error) {
        throw error;
    }
}