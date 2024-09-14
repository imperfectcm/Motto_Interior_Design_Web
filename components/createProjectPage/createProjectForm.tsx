"use client";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { Flip, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/utils/uploadImageToS3/ImageUploader";
import { useEffect, useState } from "react";
import { ImageListType } from "react-images-uploading";
import { UploadImageToS3 } from "../utils/uploadImageToS3/UploadImageAction";
import CoverImageUploader from "../utils/uploadImageToS3/CoverImageUploader";
import { CreateProjectBtn } from "./createProjectBtn";


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

    const [isUploading, setIsUploading] = useState(false);
    const [btnContent, setBtnContent] = useState("Create Project");

    useEffect(() => {
        if (!isUploading) {
            return;
        }
        return setBtnContent("Uploading...")
    }, [isUploading]);

    const [projectName, setProjectName] = useState("")
    const [coverImages, setCoverImages] = useState<ImageListType>([]);
    const [images, setImages] = useState<ImageListType>([]);

    let projectId: string;
    let coverImageUrlList: string[] = [];
    let imageUrlList: string[] = [];


    const uploadImagesToS3 = async () => {

        if (images.length > 0) {

            await Promise.all(coverImages.map(async (image) => {
                if (image.file instanceof File) {
                    const formData = new FormData();
                    formData.append("file", image.file);
                    formData.append("folderName", projectName);
                    const coverImageUrl = await UploadImageToS3(formData);
                    coverImageUrlList.push(coverImageUrl.toString());
                }
            }));

            await Promise.all(images.map(async (image) => {
                if (image.file instanceof File) {
                    const formData = new FormData();
                    formData.append("file", image.file);
                    formData.append("folderName", projectName);
                    const imageUrl = await UploadImageToS3(formData);
                    imageUrlList.push(imageUrl.toString());
                }
            }));

            return imageUrlList;
        }

    }


    const creatProjectToDB = async (data: projectFormData) => {

        try {
            const res = await fetch("/api/create-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data
                }),
            });

            if (!res.ok) {
                projectCreateFailedNotify();
                return ({ message: "Project create failed." })
            }

            const resData = await res.json()
            projectId = resData.id;
            return resData;

        } catch (error) {
            console.log(error)
            throw error;
        }

    }


    const uploadCoverImagesToDB = async () => {

        if (!coverImageUrlList.length) return;

        try {

            const res = await fetch("/api/upload-cover-images-to-db", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "projectId": projectId,
                    "coverImageUrlList": coverImageUrlList
                }),
            });

            if (!res.ok) {
                uploadImagesToDBFailedNotify();
                return ({ message: "Upload image to DB failed." })
            }

            const resData = await res.json()
            return resData;

        } catch (error) {
            console.log(error)
            throw error;
        }

    }


    const uploadImagesToDB = async () => {

        if (!imageUrlList.length) return;

        try {

            const res = await fetch("/api/upload-images-to-db", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "projectId": projectId,
                    "imageUrlList": imageUrlList
                }),
            });

            if (!res.ok) {
                uploadImagesToDBFailedNotify();
                return ({ message: "Upload image to DB failed." })
            }

            const resData = await res.json()
            return resData;

        } catch (error) {
            console.log(error)
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


    const { register, handleSubmit, formState: { errors } } = useForm<projectFormData>();

    const handleFormSubmit = async (data: projectFormData) => {

        try {
            await uploadImagesToS3();
            await creatProjectToDB(data);
            await uploadCoverImagesToDB();
            await uploadImagesToDB();
            await successfullyUploadHandle();

        } catch (error) {
            console.log(error)
            console.error("Error: ", error);
        }

    }


    return (
        <main className="flex justify-center items-center py-10">
            <form className="flex flex-col w-9/12 gap-y-5"
                onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
                <div className="flex flex-col">
                    <label>Project name (專案名稱)</label>
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
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
                    btnContent={btnContent}
                    setIsUploading={setIsUploading} />
                {/* <div className="mt-5 flex justify-center items-center">
                    <input className="beige-neumor-btn rounded-full px-8 py-2" type="submit" value="Create project" />
                </div> */}

            </form>

        </main>
    );
}

export default CreateProjectForm;