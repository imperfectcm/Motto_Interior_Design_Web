
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Flip, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const projectCreateFailedToast = () => toast.error("😭 Create project failed", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});

export const uploadImagesToDBFailedToast = () => toast.error("😭 Upload images to database failed", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});

export const projectCreateSuccessfully = async (router: AppRouterInstance) => {
    toast("Project created successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        transition: Flip,
        onClose: () => router.push("/admin")
    })
}

export const projectUpdateFailedToast = () => toast.error("😭 Update project failed", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});

export const projectUpdateSuccessfully = async (router: AppRouterInstance) => {
    toast("Project updated successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        transition: Flip,
        onClose: () => router.push("/admin")
    })
}

export const projectDeleteSuccessfully = async (router: AppRouterInstance) => {
    toast("Project delete successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        transition: Flip,
        onClose: () => router.push("/admin")
    })
}

export const setFeatureProjectSuccessfully = async () => {
    toast("Set feature projects successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        transition: Flip,
        onClose: () => location.reload()
    })
}

export const setFeatureProjectFailedToast = () => toast.error("😭 Set feature projects failed", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});