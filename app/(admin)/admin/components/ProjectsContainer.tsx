"use client";

import { useState } from "react";

import FeatureProjects from "./FeatureProjects";
import AllProjects from "./AllProjects";
import { useRouter } from "next/navigation";
import { updateFeatureProject } from "@/controllers/projects";

interface ProjectCoverContainerProps {
    projectList: any;
    lastDisplayId: number;
}

const ProjectsContainer = (props: ProjectCoverContainerProps) => {
    const router = useRouter();
    const { projectList, lastDisplayId } = props;
    const originFeature = [...projectList.filter((project: any) => project.is_feature_project === true)]
        .sort((a: any, b: any) => a.feature_id - b.feature_id);
    const [featureProject, setFeatureProject] = useState<any[]>(originFeature);

    const removeOriginFeature = async (originFeature: any[]) => {
        let result: any[] = []
        if (originFeature.length === 0) result.push("no original features")
        for (const campaign of originFeature) {
            try {
                const data = { id: campaign.id, is_feature_project: false, feature_id: 0 };
                const res = await updateFeatureProject(data);
                if (res.success) { 
                    result.push(res);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (result.length > 0) {
            return true;
        }
        return false;
    }
    const addFeature = async (featureProject: any[]) => {
        let id: number = 0;
        let result: any[] = []
        if (featureProject.length === 0) result.push("no new features")
        for (const campaign of featureProject) {
            try {
                id = id + 1;
                const data = { id: campaign.id, is_feature_project: true, feature_id: id };
                const res = await updateFeatureProject(data);
                if (res.success) {
                    result.push(res);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (result.length > 0) {
            return true;
        }
        return false;
    }
    const handleSave = async () => {
        if (JSON.stringify(featureProject) == JSON.stringify(originFeature)) {
            alert("No changes made.");
            return;
        }
        try {
            const removed = await removeOriginFeature(originFeature);
            const added = await addFeature(featureProject);
            if (removed && added) router.push("/admin")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <FeatureProjects
                featureProject={featureProject}
                setFeatureProject={setFeatureProject}
                originFeature={originFeature}
                handleSave={handleSave} />
            <AllProjects
                projectList={projectList}
                lastDisplayId={lastDisplayId}
                featureProject={featureProject}
                setFeatureProject={setFeatureProject} />
        </main>
    )
};

export default ProjectsContainer;