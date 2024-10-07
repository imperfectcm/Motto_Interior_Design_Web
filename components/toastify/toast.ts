
import { useRouter } from "next/navigation";
import { Flip, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const projectCreateFailedToast = () => toast.error("😭 Create project failed", {
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

export const uploadImagesToDBFailedToast = () => toast.error("😭 Upload images to database failed", {
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

export const projectCreateSuccessfully = async () => {
    const router = useRouter();
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
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
});

export const projectUpdateSuccessfully = async () => {
    const router = useRouter();
    toast("Project updated successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        transition: Flip,
        onClose: () => router.push("/admin")
    })
}

export const projectDeleteSuccessfully = async () => {
    const router = useRouter();
    toast("Project delete successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        transition: Flip,
        onClose: () => router.push("/admin")
    })
}