import { ScrollEffect } from "@/app/projects/[name]/components/ScrollEffect";
import { getProjectImages } from "@/controllers/images/get";
import { getProjectByName } from "@/controllers/projects/get";
import React from "react";

interface ProjectDetailProps {
    params: {
        name: string;
    }
}

export default async function ProjectDetail(props: ProjectDetailProps) {
    const projectName = props.params.name.replaceAll("%20", " ");
    const projectInfo = await getProjectByName(projectName);
    const projectId = await projectInfo?.id;
    const relatedImages = await getProjectImages(projectId);
    const projectCovers = await relatedImages?.covers;
    const projectImages = await relatedImages?.images;

    return (
        <div>
            <ScrollEffect
                projectName={projectName}
                projectCovers={projectCovers}
                projectImages={projectImages} />
        </div>
    );
}