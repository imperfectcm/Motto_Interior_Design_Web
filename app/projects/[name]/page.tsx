import { ScrollEffect } from "@/app/projects/[name]/components/ScrollEffect";
import getProjectImages from "@/components/getImages/getProjectImages";
import React from "react";

interface ProjectDetailProps {
    params: {
        name: string;
    }
}

export default async function ProjectDetail(props: ProjectDetailProps) {
    const projectName = props.params.name.replaceAll("%20", " ");

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
    const projectImages = relatedImages?.images;

    return (
        <div>
            <ScrollEffect
                projectName={projectName}
                projectImages={projectImages} />
        </div>
    );
}