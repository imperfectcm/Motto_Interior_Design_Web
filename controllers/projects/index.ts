import { projectFormData } from "@/app/(admin)/admin/create-project/components/CreateProjectForm";
import { projectUpdateFailedToast } from "@/components/toastify/toast";
import 'react-toastify/dist/ReactToastify.css';

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
            cache: 'no-cache',
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