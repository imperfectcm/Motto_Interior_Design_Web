
import { ImageListType } from "react-images-uploading";
import { uploadAction } from "./uploadAction";
import { uploadImagesToDBFailedToast } from "@/components/toastify/toast";

const uploadMultiImages = async (imageList: ImageListType, projectId: string) => {
    if (imageList.length === 0) return undefined;
    let imageUrlList: string[] = [];
    let imageKeyList: string[] = [];

    try {
        for (const image of imageList) {
            if (image.file instanceof File) {
                const formData = new FormData();
                formData.append("file", image.file);
                formData.append("folderName", projectId);
                const data = await uploadAction(formData);

                if ('location' in data && 'key' in data) {
                    const imageUrl = data.location;
                    const imageKey = data.key;
                    imageUrlList.push(imageUrl);
                    imageKeyList.push(imageKey);
                }
            }
        }
        const imageInfo = { imageUrlList, imageKeyList }
        return imageInfo;
    } catch (error: any) {
        uploadImagesToDBFailedToast();
        throw new Error(error.message);
    };
}

export default uploadMultiImages;