'use client';

import { useFormState } from "react-dom";
import { UploadImageToS3 } from "./UploadImageAction";
import { SubmitButton } from "./UploadImageButton";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useState } from "react";
import Image from "next/image";

export default function UploadImageTest() {

    //State
    const [image, setImage] = useState<ImageListType>([]);
    
    const maxNumber = 69;

    //OnImageChange
    const onImageChange = async (imageList: ImageListType) => {
        await setImage(imageList);
        if (imageList.length > 0 && imageList[0].file as File) {
            const formData = new FormData();
            formData.append("file", imageList[0].file as File);
            formData.append("folderName", "cm-test-upload-action");
            //Here I am calling the server action function
            const data = await UploadImageToS3(formData);
            console.log(data)
        }
    }


    return (
            <div className="off-white-bg relative">
                <ImageUploading
                    value={image}
                    onChange={onImageChange}
                    multiple
                    maxNumber={maxNumber}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
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
                            <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.length > 0 &&
                                imageList.map((image, index) => (
                                    <div key={index} className={`relative cursor-pointer group rounded-md overflow-hidden`}>
                                        <img src={image.dataURL} alt="Image" width={400} height={400} className="w-full object-cover object-top" />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </ImageUploading>
            </div>

    )
}