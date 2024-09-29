import { projectFormData } from "@/components/createProjectPage/createProjectForm";
import EditForm from "@/components/editProjectPage/EditForm";
import getProjectImages from "@/components/utils/getProjectImages";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";


export default async function EditProject({ params }: { params: { name: string }; }) {

    const projectName = params.name.replaceAll("%20", " ");

    const getProjectByName = async () => {
        try {

            const res = await fetch(`${process.env.WEB_URL}/api/project?projectName=${projectName}`);

            if (!res.ok) {
                const errorData = await res.json();
                return errorData.message;
            }

            const response = await res.json();
            const data = response.data;

            return data;

        } catch (error: any) {
            throw error;
        }
    }

    const projectInfo = await getProjectByName();
    const projectId = projectInfo?.id;


    // const getRelatedImages = async () => {
    //     try {

    //         const res = await fetch(`http://localhost:3000/api/project-images?projectId=${projectId}`);

    //         if (!res.ok) {
    //             const errorData = await res.json();
    //             return errorData.message;
    //         }

    //         const response = await res.json();
    //         const data = response.data;

    //         return data;
    //     } catch (error: any) {
    //         throw error;
    //     }
    // }

    const relatedImages = await getProjectImages(projectId);

    console.log(projectInfo)
    console.log(relatedImages)


    return (
        < EditForm
            projectInfo={projectInfo}
            relatedImages={relatedImages}
        />
    );


}