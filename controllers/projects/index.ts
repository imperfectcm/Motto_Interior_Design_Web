
import { projectFormData } from "@/app/(admin)/admin/create-project/components/CreateProjectForm";
import { projectCreateFailedToast, projectUpdateFailedToast } from "@/components/toastify/toast";
import 'react-toastify/dist/ReactToastify.css';

export const creatProjectToDB = async (data: projectFormData) => {
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
        if (res.ok) {
            const resData = await res.json()
            const projectId = resData.data.id;
            return projectId;
        }
    } catch (error: any) {
        projectCreateFailedToast();
        throw new Error(error.message);
    }
}

export const updateProjectToDB = async (data: projectFormData, projectId: string) => {
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
            throw new Error(errorData.error || "Project update failed.");
        }
        const resData = await res.json()
        const id = resData.data.id;
        return id;
    } catch (error) {
        throw error;
    }
}

export const updateFeatureProject = async (data: any) => {
    try {
        const res = await fetch("/api/all-feature-projects", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            projectUpdateFailedToast();
            throw new Error(errorData.error || "Project update failed.");
        }
        const resData = await res.json();
        data = resData.data;
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateProjectDisplayId = async (data: any) => {
    try {
        const res = await fetch("/api/display-id", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            projectUpdateFailedToast();
            throw new Error(errorData.error || "Project update failed.");
        }
        const resData = await res.json();
        data = resData.data;
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteProject = async (projectId: string) => {
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