'use client';

import ImageUploading, { ImageListType } from "react-images-uploading";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
    images: ImageListType;
    setImages: Dispatch<SetStateAction<ImageListType>>;
}

export default function ImageUploader(props: ImageUploaderProps) {
    const maxNumber = 40;
    const onChange = async (imageList: ImageListType) => { await props.setImages(imageList) };

    return (
        <div className="off-white-bg relative">
            <ImageUploading
                value={props.images}
                onChange={onChange}
                multiple
                maxNumber={maxNumber}>
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
                                    type="button">
                                    <div className={`${isDragging ? "pointer-events-none" : ""}`}>
                                        <Image src="/upload.png" width={90} height={90} alt="Upload" className="w-[70px] mx-auto" />
                                        <h6 className="text-base font-medium text-gray-600">Drop your image here, or <span className="text-main">browse</span></h6>
                                    </div>
                                </button>}
                            {imageList.length > 0 &&
                                imageList.map((image: any, index) => (
                                    <div key={index} className={`relative col-span-1 group overflow-hidden flex flex-col`}>
                                        <img src={image.dataURL || image.url} alt="Image" className="w-full object-contain object-top grow" />
                                        <div className="image-item__btn-wrapper my-2 flex justify-center gap-4">
                                            <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={() => onImageUpdate(index)}>Update</button>
                                            <button className="w-1/3 bg-neutral-400 hover:bg-red-800 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {imageList.length > 0 && <span className="flex justify-center mt-5">
                            <button className="w-1/3 bg-neutral-400 hover:bg-red-800 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer" onClick={onImageRemoveAll}>Remove all images</button>
                        </span>}
                    </section>
                )}
            </ImageUploading>
        </div>
    )
}