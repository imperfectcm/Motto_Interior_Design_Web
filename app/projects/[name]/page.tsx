'use server';

import { getProjectImages } from "@/controllers/images/get";
import { getProjectByDisplayId, getProjectByName } from "@/controllers/projects/get";
import React from "react";
import HorizontalGallery from "./components/HorizontalGallery";

interface ProjectDetailProps {
    params: {
        name: string;
    }
}

export default async function ProjectDetail(props: ProjectDetailProps) {
    const projectName = props.params.name.replaceAll("%20", " ");
    const projectInfo = await getProjectByName(projectName);
    const projectId = await projectInfo.id;
    const relatedImages = await getProjectImages(projectId);
    const projectCovers = await relatedImages?.covers;
    const projectImages = await relatedImages?.images;
    const nextProject = await getProjectByDisplayId(projectInfo.display_id - 1);

    return (
        <main>
            {relatedImages &&
                <HorizontalGallery
                    projectInfo={projectInfo}
                    projectName={projectName}
                    projectCovers={projectCovers}
                    projectImages={projectImages}
                    nextProject={nextProject} />
            }
        </main>
    );
}