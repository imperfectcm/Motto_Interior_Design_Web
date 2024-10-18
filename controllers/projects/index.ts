import { projectUpdateFailedToast } from "@/components/toastify/toast";
import { revalidateTag } from "next/cache";
import 'react-toastify/dist/ReactToastify.css';

export const updateFeatureProject = async (data: any) => {
    try {
        const res = await fetch("/api/all-feature-projects", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
        });
        revalidateTag('update-project');
        if (!res.ok) {
            const errorData = await res.json();
            projectUpdateFailedToast();
            throw new Error(errorData.error || "Project update failed.");
        }
        const resData = await res.json()
        data = resData.data;
        return data;
    } catch (error) {
        throw error;
    }
}