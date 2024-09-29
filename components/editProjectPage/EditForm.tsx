"use client";

import { useForm } from "react-hook-form";
import { projectFormData } from "../createProjectPage/createProjectForm";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import ImageUploader from "../utils/uploadImageToS3/ImageUploader";
import EditCoverContainer from "./EditCoverContainer";
import EditImageContainer from "./EditImageContainer";

interface EditFormProps {
    projectInfo: any;
    relatedImages: any;
}

const EditForm = (props: EditFormProps) => {

    const projectInfo = props.projectInfo;
    const relatedImages = props.relatedImages;

    const [coverImages, setCoverImages] = useState<ImageListType>(relatedImages.covers);
    const [images, setImages] = useState<ImageListType>(relatedImages.images);
    const [isEditCovers, setIsEditCovers] = useState<boolean>(false);
    const [isEditImages, setIsEditImages] = useState<boolean>(false);

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

            // check cover images difference
            // if different, delete old cover images on S3, upload new cover images to S3
            // return new cover images url, save
            // remove old and create new cover images on DB


            // check images difference
            // if different, delete old images on S3, upload new images to S3
            // return new images url, save
            // remove old and create new images on DB


            // check project info difference
            // if different, update


            // await uploadImagesToS3();
            // await creatProjectToDB(data);
            // await uploadCoverImagesToDB();
            // await uploadImagesToDB();
            // await successfullyUploadHandle();

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
                        {...register("projectName", { required: true, value: projectInfo.name })} />
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
                        {...register("year", { required: true, value: projectInfo.year })} />
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
                        {...register("location", { required: true, value: projectInfo.location })} />
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
                        {...register("apartmentName", { required: true, value: projectInfo.apartment_name })} />
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
                        {...register("size", { required: true, value: projectInfo.size })} />
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
                        {...register("householdSize", { required: true, value: projectInfo.household_size })} />
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
                        {...register("aboutProject", { value: projectInfo.description })} />
                </div>

                <EditCoverContainer
                    isEditCovers={isEditCovers}
                    setIsEditCovers={setIsEditCovers}
                    coverImages={coverImages}
                    setCoverImages={setCoverImages} />

                <EditImageContainer
                    isEditImages={isEditImages}
                    setIsEditImages={setIsEditImages}
                    images={images}
                    setImages={setImages} />

                {/* <CreateProjectBtn
                    isSubmitting={isSubmitting} /> */}

            </form>

        </main>
    )
}

export default EditForm;