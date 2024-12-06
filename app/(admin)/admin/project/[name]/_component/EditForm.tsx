"use client";

import { useForm } from "react-hook-form";
import { projectFormData } from "../../../create-project/_component/CreateProjectForm";
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
import { projectDeleteSuccessfully, projectUpdateSuccessfully } from "@/components/toastify/toast";
import uploadMultiImages from "@/components/s3Actions/upload/uploadMultiImages";
import { deleteProject, updateProjectDisplayId, updateProjectToDB } from "@/controllers/projects";
import { deleteImages, uploadImages } from "@/controllers/images";
import ActionLoading from "@/components/actionLoading/ActionLoading";

interface EditFormProps {
    projectInfo: any;
    relatedImages: any;
    projectList: any;
}

const EditForm = (props: EditFormProps) => {
    const router = useRouter();
    const { projectInfo, relatedImages, projectList } = props;
    const projectId: string = projectInfo.id;
    const displayId = projectInfo.display_id;

    const [covers, setCovers] = useState<ImageListType>(relatedImages.covers);
    const [images, setImages] = useState<ImageListType>(relatedImages.images);
    const [isEditCovers, setIsEditCovers] = useState<boolean>(false);
    const [isEditImages, setIsEditImages] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
    const deleteUnwantedImage = async (projectImages: any[]) => {
        let resList: any[] = [];
        for await (const item of projectImages) {
            const s3Res = await deleteImageFromS3(item.key);
            const res = await deleteImages([item]);
            resList.push([s3Res, res]);
        }
        return resList;
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

    const deleteSwal = withReactContent(Swal)
    const deletePopUp = async () => {
        deleteSwal.fire({
            title: "Do you want to delete this project?",
            confirmButtonText: "Delete",
            confirmButtonColor: "#DC2626",
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
            setIsDeleting(true);
            const affectProjects = [...projectList.filter((project: any) => project.display_id > displayId)]
            let removedCovers: any[] = [];
            if (relatedImages.covers.length == 0) removedCovers.push("no original covers")
            if (relatedImages.covers.length > 0) {
                try {
                    removedCovers = await deleteUnwantedImage(relatedImages.covers);
                } catch (error: any) {
                    console.log(error.message);
                    removedCovers = [];
                }
            }
            let removedImages: any[] = [];
            if (relatedImages.images.length == 0) removedImages.push("no original images")
            if (relatedImages.images.length > 0) {
                try {
                    removedImages = await deleteUnwantedImage(relatedImages.images);
                } catch (error: any) {
                    console.log(error.message);
                    removedImages = [];
                }
            }
            if (removedCovers.length > 0 && removedImages.length > 0) {
                if (affectProjects.length > 0) {
                    for await (const project of affectProjects) {
                        await updateProjectDisplayId({ projectId: project.id, displayId: (project.display_id - 1) })
                    }
                }
                await deleteProject(projectId);
                await projectDeleteSuccessfully(router);
            }
        } catch (error: any) {
            throw new Error(error.message);
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
                    <textarea rows={4} className="p-1 bg-inherit border-b-2 border-slate-500 outline-0 whitespace-pre-wrap"
                        {...register("aboutProject", { value: projectInfo.description })} />
                </div>
                <UpdateProjectBtn
                    isSubmitting={isSubmitting} />
            </form>
            {isDeleting ? <ActionLoading />
                :
                <div className="mt-5 flex justify-center items-center">
                    <button className="beige-neumor-btn rounded-full px-8 py-2 text-slate-200 bg-red-600 hover:bg-red-900"
                        onClick={deletePopUp}>Delete Project</button>
                </div>
            }
        </main>
    )
}

export default EditForm;
