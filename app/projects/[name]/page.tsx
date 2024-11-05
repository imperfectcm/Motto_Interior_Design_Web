'use server';

import { getProjectImages } from "@/controllers/images/get";
import { getProjectByDisplayId, getProjectByName } from "@/controllers/projects/get";
import React from "react";
import HorizontalGallery from "./components/HorizontalGallery";
import "./components/horizontalScroll.css"
import NavItems from "@/app/components/NavItems";
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";

interface ProjectDetailProps {
    params: {
        name: string;
    }
}

export default async function ProjectDetail(props: ProjectDetailProps) {
    const projectName = props.params.name.replaceAll("%20", " ");
    const projectInfo = await getProjectByName(projectName);
    const projectId = await projectInfo.id;
    const nextProject = await getProjectByDisplayId(projectInfo.display_id - 1);
    const relatedImages = await getProjectImages(projectId);
    const projectCovers = await relatedImages?.covers;
    const projectImages = await relatedImages?.images;

    const isAdmin = await authService.isAdminAuthenticated(cookies());
    return (

        <main>
            <nav className="z-30 fixed top-0 h-28 w-full nav-bg">
                <NavItems isAdmin={isAdmin} />
            </nav>
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