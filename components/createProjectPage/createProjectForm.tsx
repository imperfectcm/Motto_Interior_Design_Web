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

    const { register, handleSubmit, formState: { errors } } = useForm<projectFormData>();

    const creatProject = async (data: projectFormData) => {

        try {
            const res = await fetch('/api/create-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data
                }),
            });

            if (!res.ok) {
                projectCreateFailedNotify();
                return ({ message: "Something goes wrong." })
            }

            const resData = await res.json()
            // alert(resData)
            toast(resData, {
                position: "top-center",
                autoClose: 3000,
                pauseOnHover: false,
                transition: Flip,
            });

            setTimeout(() => {
                router.push("/admin");
            }, 3000);


        } catch (error) {
            console.log(error)
            throw error;
        }

    }

    const [projectName, setProjectName] = useState("")
    const [images, setImages] = useState<ImageListType>([]);
    useEffect(() => {
        console.log(images)
    },
        [images]
    )

    const uploadImagesToS3 = async () => {
        console.log("images: ", images)
        if (images.length > 0 && images[0].file as File) {
            images.map(async (image) => {
                const formData = new FormData();
                formData.append("file", image.file as File);
                formData.append("folderName", `${projectName}`);
                //Here I am calling the server action function
                const data = await UploadImageToS3(formData);
                console.log(data);
            })
        }
    }

    return (
        <main className="flex justify-center items-center py-10">
            <form className="flex flex-col w-9/12 gap-y-5"
                onSubmit={handleSubmit((data) => creatProject(data))}>
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
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
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
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
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
                    <input className="p-1 bg-inherit border-b-2 border-slate-500 outline-0"
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

                <ImageUploader
                    images={images}
                    setImages={setImages}
                    uploadImagesToS3={uploadImagesToS3} />

                <div className="mt-5 flex justify-center items-center">
                    <input className="beige-neumor-btn rounded-full px-8 py-2" type="submit" value="Create project" />
                </div>

            </form>


        </main>
    );
}

export default CreateProjectForm;