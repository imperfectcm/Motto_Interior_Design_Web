
import { uploadImagesToDBFailedToast } from "../toastify/toast";

const uploadCoverImagesToDB = async (coverImageUrlList: string[], coverKeyList: string[], projectId: string) => {
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

export default uploadCoverImagesToDB;