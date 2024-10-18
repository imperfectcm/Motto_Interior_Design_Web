"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface AddFeatureBtnProps {
    project: any;
    featureProject: any[];
    setFeatureProject: Dispatch<SetStateAction<any[]>>;
}

const AddFeatureBtn = (props: AddFeatureBtnProps) => {
    const {
        project,
        featureProject,
        setFeatureProject,
    } = props;
    const handleAddFeature = (item: any, projectId: string) => {
        if (!featureProject || !setFeatureProject) return;
        if (featureProject.find((project: any) => project.id === projectId)) {
            alert("This project is already a feature project.");
            return;
        }
        if (featureProject.length >= 3) {
            setFeatureProject(featureProject.shift());
            setFeatureProject([...featureProject, item]);
            return;
        }
        setFeatureProject([...featureProject, item]);
    }

    return (
        <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer"
            onClick={() => handleAddFeature(project, project.id)}>Add To Feature</button>
    )
}

export default AddFeatureBtn;