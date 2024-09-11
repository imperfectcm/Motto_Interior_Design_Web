'use client';

import { useFormState } from "react-dom";
import { UploadImageToS3 } from "./UploadImageAction";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";


interface ImageUploaderProps {
    images: ImageListType;
    setImages: Dispatch<SetStateAction<ImageListType>>;
}

export default function ImageUploader(props: ImageUploaderProps) {

    //State
    // const [images, setImages] = useState<ImageListType>([]);

    const maxNumber = 40;

    //Upload Immages To S3 Bucket
    // const uploadImagesToS3 = async () => {
    //     console.log("images: ", props.images)
    //     if (props.images.length > 0 && props.images[0].file as File) {
    //         props.images.map(async (image) => {
    //             const formData = new FormData();
    //             formData.append("file", image.file as File);
    //             formData.append("folderName", `${props.projectName}`);
    //             //Here I am calling the server action function
    //             const data = await UploadImageToS3(formData);
    //             console.log(data);
    //         })
    //     }
    // }

    const onChange = async (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        await props.setImages(imageList);
    };


    // const uploadImagesToS3Test = async () => {
    //     if (images.length > 0) {
    //         images.map(async (image) => {
    //             const formData = new FormData();
    //             formData.append("file", image.file as File);
    //             formData.append("folderName", "cm-test-upload-action");
    //             //Here I am calling the server action function
    //             const data = await UploadImageToS3(formData);
    //         })
    //     }
    // }


    return (
        <div className="off-white-bg relative">
            <ImageUploading
                value={props.images}
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
                    <section>
                        <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
                            <div className="col-span-full text-2xl">Project Images :</div>
                            {imageList.length === 0 &&
                                <button
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className={`border-2 border-dashed col-span-full rounded-md text-center py-12 hover:border-main ${isDragging ? "border-main" : "border-gray-300"}`}
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
                                    <div key={index} className={`relative col-span-1 group overflow-hidden flex flex-col`}>
                                        <img src={image.dataURL} alt="Image" className="w-full object-contain object-top grow" />
                                        <div className="image-item__btn-wrapper my-2 flex justify-center gap-4">
                                            <button className="w-1/3 bg-neutral-400 hover:bg-teal-700 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={() => onImageUpdate(index)}>Update</button>
                                            <button className="w-1/3 bg-neutral-400 hover:bg-red-800 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))

                            }
                        </div>
                        {imageList.length > 0 && <span className="flex justify-center mt-5">
                            <button className="w-1/3 bg-neutral-400 hover:bg-red-800 hover:duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={onImageRemoveAll}>Remove all images</button>
                        </span>}
                    </section>
                )}
            </ImageUploading>
            {/* <button onClick={props.uploadImagesToS3}>Upload all images</button> */}
        </div>
    )
}