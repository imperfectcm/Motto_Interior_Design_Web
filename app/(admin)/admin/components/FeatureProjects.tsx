"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface FeatureProjectsProps {
    featureProject: any;
    setFeatureProject: Dispatch<SetStateAction<any[]>>;
    originFeature: any[];
    handleSave: () => Promise<void>;
}

const FeatureProjects = (props: FeatureProjectsProps) => {
    const { featureProject, setFeatureProject, originFeature, handleSave } = props;
    const handleRemoveFeature = (projectId: string) => {
        if (!featureProject || !setFeatureProject) return;
        setFeatureProject(featureProject.filter((project: any) => project.id !== projectId));
    }

    return (
        <section className="grid grid-flow-row-dense grid-cols-3 gap-5 pb-10 mb-10 border-b-2 border-slate-500">
            <div className="col-span-3 text-2xl flex font-bold justify-center">Feature Projects</div>
            {featureProject.length > 0 ? featureProject.map((project: any, index: number) => (
                <div key={index} className="relative flex flex-col place-items-center aspect-[3/4] grow ">
                    <Image src={project?.cover[0]?.url || "no-image.png"} alt={`Cover of project ${project.name}`} 
                    fill
                    sizes="(max-width: 1200px) 100vw, 75vw"
                    className="object-cover" />
                    <div className="flex-wrap text-xl font-bold">Name: {project.name}</div>
                    <div className="flex-wrap">Size: {project.size} sq. ft.</div>
                    <div className="flex justify-center w-full">
                        <button className="w-1/3 bg-neutral-400 hover:bg-red-900 duration-200 text-neutral-100 py-1 rounded-full cursor-pointer"
                            onClick={() => handleRemoveFeature(project.id)}>Remove Feature</button>
                    </div>
                </div>
            ))
                :
                <div className="col-span-3 flex justify-center">No feature projects</div>}
            {(JSON.stringify(featureProject) == JSON.stringify(originFeature)) ? "" :
                <div className="col-span-3 flex font-bold justify-center">
                    <button className="w-1/3 bg-neutral-400 hover:bg-sky-900 duration-200 text-neutral-100 py-3 rounded-full cursor-pointer"
                        onClick={handleSave}>Confirm Change</button>
                </div>}
        </section>
    )
}

export default FeatureProjects;