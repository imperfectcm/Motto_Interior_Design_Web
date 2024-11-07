"use client";

import { useEffect, useState } from "react";
import FeatureProjects from "./FeatureProjects";
import AllProjects from "./AllProjects";
import { updateFeatureProject } from "@/controllers/projects";
import { setFeatureProjectFailedToast, setFeatureProjectSuccessfully } from "@/components/toastify/toast";
import { clientGetLastDisplayId, clientGetProjectsWithCovers } from "@/controllers/projects/get";

interface ProjectCoverContainerProps {
    projectList: any;
}

const ProjectsContainer = (props: ProjectCoverContainerProps) => {
    const { projectList } = props;
    let originFeature = [...projectList.filter((project: any) => project.is_feature_project === true)]
        .sort((a: any, b: any) => a.feature_id - b.feature_id);
    const [projects, setProjects] = useState<any[]>(projectList);
    const [originFeatureProject, setOriginFeatureProject] = useState<any[]>(originFeature);
    const [featureProject, setFeatureProject] = useState<any[]>(originFeature);

    // const getAllProjectList = async () => {
    //     const projectList: any = await clientGetProjectsWithCovers();
    //     setProjects(projectList);
    //     const originFeature = [...projectList.filter((project: any) => project.is_feature_project === true)]
    //         .sort((a: any, b: any) => a.feature_id - b.feature_id);
    //     setOriginFeatureProject(originFeature);
    //     setFeatureProject(originFeature);
    // }

    // useEffect(() => {
    //     console.log("new render")
    //     getAllProjectList();
    // }, [])




    const removeOriginFeature = async (originFeature: any[]) => {
        let result: any[] = []
        if (originFeature.length === 0) result.push("no original features")
        for (const project of originFeature) {
            try {
                const data = { id: project.id, is_feature_project: false, feature_id: 0 };
                const res = await updateFeatureProject(data);
                if (res.success) {
                    result.push(res);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (result.length > 0) return true; else return false;
    }
    const addFeature = async (featureProject: any[]) => {
        let id: number = 0;
        let result: any[] = []
        if (featureProject.length === 0) result.push("no new features")
        for (const project of featureProject) {
            try {
                id = id + 1;
                const data = { id: project.id, is_feature_project: true, feature_id: id };
                const res = await updateFeatureProject(data);
                if (res.success) {
                    result.push(res.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (result.length > 0) return true; else return false;
    }
    const handleSave = async () => {
        if (JSON.stringify(featureProject) == JSON.stringify(originFeatureProject)) {
            alert("No changes made.");
            return;
        }
        try {
            const removed = await removeOriginFeature(originFeatureProject);
            const added = await addFeature(featureProject);
            if (removed && added) await setFeatureProjectSuccessfully();
        } catch (error) {
            console.log(error)
            await setFeatureProjectFailedToast();
        }
    }

    return (
        <main>
            <FeatureProjects
                featureProject={featureProject}
                setFeatureProject={setFeatureProject}
                originFeature={originFeatureProject}
                handleSave={handleSave}
            />
            <AllProjects
                projectList={projects}
                featureProject={featureProject}
                setFeatureProject={setFeatureProject}
            />
        </main>
    )
};

export default ProjectsContainer;