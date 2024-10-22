"use client";

import { useForm } from "react-hook-form";
import { projectFormData } from "../../../create-project/components/CreateProjectForm";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import EditCoverContainer from "./EditCoverContainer";
import EditImageContainer from "./EditImageContainer";
import 'react-toastify/dist/ReactToastify.css';
import { UpdateProjectBtn } from "./UpdateProjectBtn";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteImageFromS3 } from "../../../../../../components/s3Actions/delete/deleteImageAction";
import { projectDeleteSuccessfully, projectUpdateFailedToast, projectUpdateSuccessfully, uploadImagesToDBFailedToast } from "@/components/toastify/toast";
import uploadMultiImages from "@/components/s3Actions/upload/uploadMultiImages";
import { updateProjectToDB } from "@/controllers/projects";
import { deleteImages, uploadImages } from "@/controllers/images";

interface EditFormProps {
    projectInfo: any;
    relatedImages: any;
}

const EditForm = (props: EditFormProps) => {
    const router = useRouter();
    const { projectInfo, relatedImages } = props;
    const projectId: string = projectInfo.id;

    const [covers, setCovers] = useState<ImageListType>(relatedImages.covers);
    const [images, setImages] = useState<ImageListType>(relatedImages.images);
    const [isEditCovers, setIsEditCovers] = useState<boolean>(false);
    const [isEditImages, setIsEditImages] = useState<boolean>(false);

    const checkUnwantedImage = async (oldImages: string[], newImages: any[]): Promise<any[]> => {
        const newImageSet = new Set(newImages);
        return new Promise((resolve, reject) => {
            const unwantedImages = oldImages.filter(image => !newImageSet.has(image));
            resolve(unwantedImages);
        });
    }
    const checkNewImage = async (oldImages: string[], newImages: any[]): Promise<any[]> => {
        const oldImageSet = new Set(oldImages);
        return new Promise((resolve, reject) => {
            const newAddImages = newImages.filter(image => !oldImageSet.has(image));
            resolve(newAddImages);
        });
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
            // handle covers
            let unwantedCovers: any[] = [];
            let newAddCovers: any[] = [];
            await checkUnwantedImage(relatedImages.covers, covers)
                .then(unwnatedImgs => {
                    unwantedCovers = unwnatedImgs;
                })
            await checkNewImage(relatedImages.covers, covers)
                .then(newImgs => {
                    newAddCovers = newImgs;
                })
            if (unwantedCovers.length > 0) {
                for await (const item of unwantedCovers) {
                    try {
                        await deleteImageFromS3(item.key);
                        await deleteImages([item]);
                    } catch (error: any) {
                        console.log(error.message);
                    }
                }
            }
            if (newAddCovers.length > 0) {
                try {
                    const imageInfo: { imageUrlList: string[], imageKeyList: string[] } | undefined = await uploadMultiImages(newAddCovers, projectId);
                    if (imageInfo) await uploadImages(imageInfo.imageUrlList, imageInfo.imageKeyList, projectId, "cover");
                } catch (error: any) {
                    console.log(error.message);
                }
            }
            // handle images
            let unwantedImages: any[] = [];
            let newAddImages: any[] = [];
            await checkUnwantedImage(relatedImages.images, images)
                .then(unwnatedImgs => {
                    unwantedImages = unwnatedImgs;
                })
            await checkNewImage(relatedImages.images, images)
                .then(newImgs => {
                    newAddImages = newImgs;
                })
            if (unwantedImages.length > 0) {
                for await (const item of unwantedImages) {
                    try {
                        await deleteImageFromS3(item.key);
                        await deleteImages([item]);
                    } catch (error: any) {
                        console.log(error.message);
                    }
                }
            }
            if (newAddImages.length > 0) {
                try {
                    const imageInfo: { imageUrlList: string[], imageKeyList: string[] } | undefined = await uploadMultiImages(newAddImages, projectId);
                    if (imageInfo) await uploadImages(imageInfo.imageUrlList, imageInfo.imageKeyList, projectId);
                } catch (error: any) {
                    console.log(error.message);
                }
            }
            // update project info
            await updateProjectToDB(data, projectId);
            await projectUpdateSuccessfully(router);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const deleteProject = async (projectId: string) => {
        try {
            const res = await fetch("/api/project", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectId }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Delete project failed.");
            }
            const resData = await res.json()
            return resData;
        } catch (error) {
            throw error;
        }
    }

    const deleteSwal = withReactContent(Swal)
    const deletePopUp = async () => {
        deleteSwal.fire({
            title: "Do you want to delete this project?",
            confirmButtonText: "Delete",
            showCancelButton: true
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await handleDelete();
            }
        });
    }

    const handleDelete = async () => {
        try {
            if (relatedImages.covers.length > 0) {
                await relatedImages.covers.map(async (oldCoverImage: any) => {
                    try {
                        await deleteImageFromS3(oldCoverImage.key);
                        await deleteImages(relatedImages.covers)
                    } catch (error) {
                        throw error;
                    }
                })
            }
            if (relatedImages.images.length > 0) {
                await relatedImages.images.map(async (oldImage: any) => {
                    try {
                        await deleteImageFromS3(oldImage.key);
                        await deleteImages(relatedImages.images)
                    } catch (error) {
                        throw error;
                    }
                })
            }
            await deleteProject(projectId);
            await projectDeleteSuccessfully(router);
        } catch (error) {
            throw error;
        }
    }

    return (
        <main className="flex flex-col justify-center items-center py-10">
            <div className="flex flex-col w-9/12 gap-y-5">
                <EditCoverContainer
                    isEditCovers={isEditCovers}
                    setIsEditCovers={setIsEditCovers}
                    coverImages={covers}
                    setCoverImages={setCovers} />

                <EditImageContainer
                    isEditImages={isEditImages}
                    setIsEditImages={setIsEditImages}
                    images={images}
                    setImages={setImages} />
            </div>
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
                    <textarea className="p-1 bg-inherit border-b-2 border-slate-500 outline-0 whitespace-pre-wrap"
                        {...register("aboutProject", { value: projectInfo.description })} />
                </div>
                <UpdateProjectBtn
                    isSubmitting={isSubmitting} />
            </form>
            <button onClick={deletePopUp}>Delete Project</button>
        </main>
    )
}

export default EditForm;
