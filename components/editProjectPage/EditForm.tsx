"use client";

import { useForm } from "react-hook-form";
import { projectFormData } from "../createProjectPage/createProjectForm";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import EditCoverContainer from "./EditCoverContainer";
import EditImageContainer from "./EditImageContainer";
import { UploadImageToS3 } from "../utils/uploadImageToS3/UploadImageAction";
import { Flip, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UpdateProjectBtn } from "./UpdateProjectBtn";
import { deleteImageFromS3 } from "../utils/deleteImageFromS3/deleteImageAction";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface EditFormProps {
    projectInfo: any;
    relatedImages: any;
}

const EditForm = (props: EditFormProps) => {
    const router = useRouter();
    const projectInfo = props.projectInfo;
    const relatedImages = props.relatedImages;

    const [projectName, setProjectName] = useState<string>(projectInfo.name)
    const [coverImages, setCoverImages] = useState<ImageListType>(relatedImages.covers);
    const [images, setImages] = useState<ImageListType>(relatedImages.images);
    const [isEditCovers, setIsEditCovers] = useState<boolean>(false);
    const [isEditImages, setIsEditImages] = useState<boolean>(false);
    const [swalProps, setSwalProps] = useState({});

    const projectUpdateFailedToast = () => toast.error("😭 Fail in updating project.", {
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

    const updateImagesToDBFailedToast = () => toast.error("😭 Fail in updating images to database.", {
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

    const successfullyUpdateToast = async () => {
        toast("Project update successfully", {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: false,
            transition: Flip,
            onClose: () => router.push("/admin")
        })
    }

    const successfullyDeleteToast = async () => {
        toast("Project delete successfully", {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: false,
            transition: Flip,
            onClose: () => router.push("/admin")
        })
    }

    const projectId: string = projectInfo.id;
    let coverImageUrlList: string[] = [];
    let coverKeyList: string[] = [];
    // let imageUrlList: string[] = [];
    // let imageKeyList: string[] = [];

    // const uploadCoverImagesToS3 = async (coverImages: ImageListType) => {
    //     if (coverImages.length === 0) return;
    //     if (coverImages.length > 0) {
    //         try {
    //             await Promise.all(coverImages.map(async (image) => {
    //                 if (image.file instanceof File) {
    //                     const formData = new FormData();
    //                     formData.append("file", image.file);
    //                     formData.append("folderName", projectName);
    //                     const data = await UploadImageToS3(formData);

    //                     if ('location' in data && 'key' in data) {
    //                         const coverImageUrl = data.location;
    //                         const coverKey = data.key;
    //                         coverImageUrlList.push(coverImageUrl);
    //                         coverKeyList.push(coverKey);
    //                         return data;
    //                     } else {
    //                         return data.message;
    //                     }
    //                 }
    //             }))
    //         } catch (error: any) {
    //             updateImagesToDBFailedToast();
    //             throw error;
    //         }
    //     };
    //     return { "Cover image url list": coverImageUrlList };
    // }

    const uploadImagesToS3 = async (imageList: ImageListType) => {
        if (imageList.length === 0) return;
        if (imageList.length > 0) {
            let imageUrlList: string[] = [];
            let imageKeyList: string[] = [];
            try {
                await Promise.all(imageList.map(async (image) => {
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
                        } else {
                            return data.message;
                        }
                    }
                }))
                return { imageUrlList: imageUrlList, imageKeyList: imageKeyList };
            } catch (error: any) {
                updateImagesToDBFailedToast();
                throw error;
            }
        }
    }

    const uploadCoverImagesToDB = async (coverImageUrlList: string[], coverKeyList: string[]) => {
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
                updateImagesToDBFailedToast();
                throw new Error(errorData.error || "Upload cover image to DB failed.")
            }
            const resData = await res.json()
            return resData.message;
        } catch (error) {
            updateImagesToDBFailedToast();
            throw error;
        }
    }

    const uploadProjectImagesToDB = async (imageUrlList: string[], imageKeyList: string[]) => {
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
                updateImagesToDBFailedToast();
                throw new Error(errorData.error || "Upload project image to DB failed.")
            }
            const resData = await res.json()
            return resData.message;
        } catch (error) {
            updateImagesToDBFailedToast();
            throw error;
        }
    }

    const deleteImageFromDB = async (imageList: any[]) => {
        if (!imageList.length) return;
        try {
            const res = await fetch("/api/project-images", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageList: imageList
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                updateImagesToDBFailedToast();
                throw new Error(errorData.error || "Project images delete failed.");
            }
            const response = await res.json()
            return response.message;
        } catch (error) {
            throw error;
        }
    }

    const deleteImagesAction = async (newImageList: ImageListType, oldImageList: ImageListType, newProjectName: string, oldProjectName: string) => {
        try {
            if (newImageList != oldImageList || newProjectName != oldProjectName) {
                await oldImageList.map(async (oldCoverImage: any) => {
                    try {
                        await deleteImageFromS3(oldCoverImage.key);
                        await deleteImageFromDB(oldImageList)
                    } catch (error) {
                        throw error;
                    }
                })
                if (newImageList.length > 0) {
                    try {
                        const imageData: { imageUrlList: string[], imageKeyList: string[] } | undefined = await uploadImagesToS3(newImageList);
                        if (imageData) {
                            await uploadCoverImagesToDB(imageData.imageUrlList, imageData.imageKeyList);
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    const updateProjectToDB = async (data: projectFormData, projectId: string) => {
        try {
            const res = await fetch("/api/project", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data, projectId }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                projectUpdateFailedToast();
                throw new Error(errorData.error || "Project create failed.");
            }
            const resData = await res.json()
            projectId = resData.data.id;
            return projectId;
        } catch (error) {
            throw error;
        }
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
            if (coverImages != relatedImages.covers || projectName != projectInfo.name) {
                await relatedImages.covers.map(async (oldCoverImage: any) => {
                    try {
                        await deleteImageFromS3(oldCoverImage.key);
                        await deleteImageFromDB(relatedImages.covers)
                    } catch (error) {
                        throw error;
                    }
                })
                if (coverImages.length > 0) {
                    try {
                        const imageData: { imageUrlList: string[], imageKeyList: string[] } | undefined = await uploadImagesToS3(coverImages);
                        if (imageData) {
                            await uploadCoverImagesToDB(imageData.imageUrlList, imageData.imageKeyList);
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }
            if (images != relatedImages.images || projectName != projectInfo.name) {
                await relatedImages.images.map(async (oldImage: any) => {
                    try {
                        await deleteImageFromS3(oldImage.key);
                        await deleteImageFromDB(relatedImages.images)
                    } catch (error) {
                        throw error;
                    }
                })
                if (images.length > 0) {
                    try {
                        const imageData: { imageUrlList: string[], imageKeyList: string[] } | undefined = await uploadProjectImagesToS3(images);
                        if (imageData) {
                            await uploadProjectImagesToDB(imageData.imageUrlList, imageData.imageKeyList);
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }
            await updateProjectToDB(data, projectId);
            await successfullyUpdateToast();
        } catch (error) {
            throw error;
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
                    } catch (error) {
                        throw error;
                    }
                })
                await deleteImageFromDB(relatedImages.covers)
            }
            if (relatedImages.images.length > 0) {
                await relatedImages.images.map(async (oldImage: any) => {
                    try {
                        await deleteImageFromS3(oldImage.key);
                    } catch (error) {
                        throw error;
                    }
                })
                await deleteImageFromDB(relatedImages.images)
            }
            await deleteProject(projectId);
            await successfullyDeleteToast();
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
                    coverImages={coverImages}
                    setCoverImages={setCoverImages} />

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
                        {...register("projectName", { required: true, value: projectInfo.name, onChange: (e) => setProjectName(e.target.value) })} />
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
                <UpdateProjectBtn
                    isSubmitting={isSubmitting} />
            </form>
            <button onClick={deletePopUp}>Delete Project</button>
        </main>
    )
}

export default EditForm;