"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import { ErrorMessage } from "@hookform/error-message"
import ImageUploader from "@/components/s3Actions/upload/ImageUploader";
import CoverImageUploader from "../../../../../components/s3Actions/upload/CoverImageUploader";
import { CreateProjectBtn } from "./CreateProjectBtn";
import { creatProjectToDB } from "@/controllers/projects";
import uploadMultiImages from "@/components/s3Actions/upload/uploadMultiImages";
import { projectCreateSuccessfully, projectCreateFailedToast } from "@/components/toastify/toast";
import { uploadImages } from "@/controllers/images";

interface CreateProjectFormProps {
    lastDisplayId: number;
}

export type projectFormData = {
    projectName: string,
    year: number,
    location: string,
    apartmentName: string,
    size: number,
    householdSize: number,
    aboutProject: string,
    displayId: number;
}

const CreateProjectForm = (props: CreateProjectFormProps) => {
    const lastDisplayId = props.lastDisplayId;
    const router = useRouter();
    const [coverImages, setCoverImages] = useState<ImageListType>([]);
    const [images, setImages] = useState<ImageListType>([]);

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
        return new Promise(async (resolve, reject) => {
            try {
                const projectId = await creatProjectToDB(data);
                const coverList = await uploadMultiImages(coverImages, projectId);
                const imageList = await uploadMultiImages(images, projectId);

                if (coverList) await uploadImages(coverList.imageUrlList, coverList.imageKeyList, projectId, "cover");
                if (imageList) await uploadImages(imageList.imageUrlList, imageList.imageKeyList, projectId);

                resolve(projectId);
            } catch (error) {
                reject(error);
            }
        }).then(async (projectId) => {
            await projectCreateSuccessfully(router);
        }).catch((error) => {
            projectCreateFailedToast();
            throw new Error(error.message);
        });
    }

    return (
        <main className="flex flex-col justify-center items-center py-10">
            <div className="flex flex-col w-9/12 gap-y-5">
                <CoverImageUploader
                    coverImages={coverImages}
                    setCoverImages={setCoverImages} />
                <ImageUploader
                    images={images}
                    setImages={setImages} />
            </div>
            <form className="flex flex-col w-9/12 gap-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col">
                    <label>Project name (專案名稱)</label>
                    <input
                        className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("projectName", { required: true, })} />
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
                    <textarea rows={4} className="p-1 bg-inherit border-b-2 border-slate-500 outline-0 whitespace-pre-wrap"
                        {...register("aboutProject")} />
                </div>
                <div className="flex flex-col">
                    <label>Project ID (專案編號)</label>
                    <input type="number" className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
                        {...register("displayId", { value: lastDisplayId + 1 })} value={lastDisplayId + 1} />
                </div>
                <CreateProjectBtn
                    isSubmitting={isSubmitting} />
            </form>
        </main>
    );
}

export default CreateProjectForm;
