
import { uploadImagesToDBFailedToast } from "../toastify/toast";

const uploadImagesToDB = async (imageUrlList: string[], imageKeyList: string[], projectId: string) => {
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

export default uploadImagesToDB;