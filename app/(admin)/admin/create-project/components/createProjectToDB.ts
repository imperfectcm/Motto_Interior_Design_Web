
import { projectCreateFailedToast } from "@/components/toastify/toast";
import { projectFormData } from "./CreateProjectForm";

const creatProjectToDB = async (data: projectFormData) => {
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

export default creatProjectToDB;