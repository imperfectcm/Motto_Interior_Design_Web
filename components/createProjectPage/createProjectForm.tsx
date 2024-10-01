"use client";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { Flip, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/utils/uploadImageToS3/ImageUploader";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import { UploadImageToS3 } from "../utils/uploadImageToS3/UploadImageAction";
import CoverImageUploader from "../utils/uploadImageToS3/CoverImageUploader";
import { CreateProjectBtn } from "./createProjectBtn";
import React from "react";


const projectCreateFailedNotify = () => toast.error("😭 Fail to create project.", {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});

const uploadImagesToDBFailedNotify = () => toast.error("😭 Fail to upload images to database.", {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});

export type projectFormData = {
    projectName: string,
    year: number,
    location: string,
    apartmentName: string,
    size: number,
    householdSize: number,
    aboutProject: string
}

const CreateProjectForm = () => {

    const router = useRouter();

    const [projectName, setProjectName] = useState("")
    const [coverImages, setCoverImages] = useState<ImageListType>([]);
    const [images, setImages] = useState<ImageListType>([]);

    let projectId: string;
    let coverImageUrlList: string[] = [];
    let coverKeyList: string[] = [];
    let imageUrlList: string[] = [];
    let imageKeyList: string[] = [];


    const uploadImagesToS3 = async () => {

        if (coverImages.length > 0) {
            try {
                await Promise.all(coverImages.map(async (image) => {
                    if (image.file instanceof File) {
                        const formData = new FormData();
                        formData.append("file", image.file);
                        formData.append("folderName", projectName);
                        const data = await UploadImageToS3(formData);

                        if ('location' in data && 'key' in data) {
                            const coverImageUrl = data.location;
                            const coverKey = data.key;
                            coverImageUrlList.push(coverImageUrl);
                            coverKeyList.push(coverKey);
                            return data;
                        } else {
                            return data.message;
                        }
                    }
                }))
            } catch (error: any) {
                uploadImagesToDBFailedNotify();
                throw error;
            }
        };

        if (images.length > 0) {
            try {
                await Promise.all(images.map(async (image) => {
                    if (image.file instanceof File) {
                        const formData = new FormData();
                        formData.append("file", image.file);
                        formData.append("folderName", projectName);
                        const data = await UploadImageToS3(formData);

                        if ('location' in data && 'key' in data) {
                            const imageUrl = data.location;
                            const imageKey = data.key;
                            imageUrlList.push(imageUrl);
                            imageKeyList.push(imageKey);
                            return data;
                        } else {
                            return data.message;
                        }
                    }
                }))
            } catch (error: any) {
                uploadImagesToDBFailedNotify();
                throw new Error(error.message);
            }
        };

        return { "Cover image url list": coverImageUrlList, "image url list": imageUrlList };
    }


    const creatProjectToDB = async (data: projectFormData) => {

        try {
            const res = await fetch("/api/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                projectCreateFailedNotify();
                throw new Error(errorData.error || "Project create failed.");
            }

            const resData = await res.json()
            projectId = resData.data.id;
            return projectId;

        } catch (error) {
            throw error;
        }

    }


    const uploadCoverImagesToDB = async () => {

        if (!coverImageUrlList.length) return;

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

            if (!res.ok) {
                const errorData = await res.json();
                uploadImagesToDBFailedNotify();
                throw new Error(errorData.error || "Upload cover image to DB failed.")
            }

            const resData = await res.json()
            return resData.message;

        } catch (error) {
            throw error;
        }

    }


    const uploadImagesToDB = async () => {

        if (!imageUrlList.length) return;

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

            if (!res.ok) {
                const errorData = await res.json();
                uploadImagesToDBFailedNotify();
                throw new Error(errorData.error || "Upload image to DB failed.")
            }

            const resData = await res.json()
            return resData.message;

        } catch (error) {
            throw error;
        }

    }


    const successfullyUploadHandle = async () => {

        toast("Project created successfully", {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: false,
            transition: Flip,
            onClose: () => router.push("/admin")
        })

    }


    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isSubmitting
        } } = useForm<projectFormData>();


    const handleFormSubmit = async (data: projectFormData) => {

        if (!isValid) return;

        try {
            await uploadImagesToS3();
            await creatProjectToDB(data);
            await uploadCoverImagesToDB();
            await uploadImagesToDB();
            await successfullyUploadHandle();
        } catch (error) {
            throw error;
        }
    }


    return (
        <main className="flex justify-center items-center py-10">
            <form className="flex flex-col w-9/12 gap-y-5"
                onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col">
                    <label>Project name (專案名稱)</label>
                    <input
                        className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("projectName", {
                            required: true,
                            onChange: (e) => setProjectName(e.target.value)
                        })} />
                    <ErrorMessage errors={errors} name="projectName" />
                    <ErrorMessage
                        errors={errors}
                        name="projectName"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>Build year (完成年份)</label>
                    <input type="number" className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("year", { required: true })} />
                    <ErrorMessage errors={errors} name="year" />
                    <ErrorMessage
                        errors={errors}
                        name="year"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>Location (屋苑地區)</label>
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("location", { required: true })} />
                    <ErrorMessage errors={errors} name="location" />
                    <ErrorMessage
                        errors={errors}
                        name="location"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>Apartment name (屋苑名稱)</label>
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("apartmentName", { required: true })} />
                    <ErrorMessage errors={errors} name="apartmentName" />
                    <ErrorMessage
                        errors={errors}
                        name="apartmentName"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>Square foot size (單位呎數)</label>
                    <input type="number" className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("size", { required: true })} />
                    <ErrorMessage errors={errors} name="size" />
                    <ErrorMessage
                        errors={errors}
                        name="size"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>Household size (居住人數)</label>
                    <input type="number" className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("householdSize", { required: true })} />
                    <ErrorMessage errors={errors} name="householdSize" />
                    <ErrorMessage
                        errors={errors}
                        name="householdSize"
                        message="Required"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                </div>

                <div className="flex flex-col">
                    <label>About project (專案介紹)</label>
                    <textarea className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("aboutProject")} />
                </div>

                <CoverImageUploader
                    coverImages={coverImages}
                    setCoverImages={setCoverImages} />

                <ImageUploader
                    images={images}
                    setImages={setImages} />

                <CreateProjectBtn
                    isSubmitting={isSubmitting} />

            </form>

        </main>
    );
}

export default CreateProjectForm;