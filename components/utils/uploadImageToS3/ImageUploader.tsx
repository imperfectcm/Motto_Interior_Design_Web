'use client';

import { useFormState } from "react-dom";
import { UploadImageToS3 } from "./UploadImageAction";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useState } from "react";
import Image from "next/image";

export default function ImageUploader() {

    //State
    const [images, setImages] = useState<ImageListType>([]);

    const maxNumber = 69;

    //Upload Immages To S3 Bucket
    const uploadImagesToS3 = async (imageList: ImageListType) => {
        if (imageList.length > 0 && imageList[0].file as File) {
            imageList.map(async (image) => {
                const formData = new FormData();
                formData.append("file", image.file as File);
                formData.append("folderName", "cm-test-upload-action");
                //Here I am calling the server action function
                const data = await UploadImageToS3(formData);

            })
        }
    }

    const onChange = async (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        await setImages(imageList);
    };


    const uploadImagesToS3Test = async () => {
        console.log("hi")
        if (images.length > 0) {
            images.map(async (image) => {
                const formData = new FormData();
                formData.append("file", image.file as File);
                formData.append("folderName", "cm-test-upload-action");
                //Here I am calling the server action function
                const data = await UploadImageToS3(formData);
                console.log(data)

            })
        }
    }


    return (
        <div className="off-white-bg relative">
            <ImageUploading
                value={images}
                onChange={onChange}
                multiple
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    <div>
                        {imageList.length === 0 &&
                            <button
                                onClick={onImageUpload}
                                {...dragProps}
                                className={`border-2 border-dashed w-full rounded-md text-center py-12 hover:border-main ${isDragging ? "border-main" : "border-gray-300"}`}
                                type="button"
                            >
                                <div className={`${isDragging ? "pointer-events-none" : ""}`}>
                                    <Image src="/upload.png" width={90} height={90} alt="Upload" className="w-[70px] mx-auto" />
                                    <h6 className="text-base font-medium text-gray-600">Drop your image here, or <span className="text-main">browse</span></h6>
                                </div>
                            </button>
                        }
                        {imageList.length > 0 &&
                            imageList.map((image, index) => (
                                <div key={index} className={`relative cursor-pointer group rounded-md overflow-hidden`}>
                                    <img src={image.dataURL} alt="Image" width={400} height={400} className="w-full object-cover object-top" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                        <button onClick={onImageRemoveAll}>Remove all images</button>
                    </div>
                )}
            </ImageUploading>
            <button onClick={uploadImagesToS3Test}>Upload all images</button>
        </div>

    )
}