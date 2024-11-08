
import { Dispatch, SetStateAction } from "react";
import EditPorjectBtn from "./EditProjectBtn";
import AddFeatureBtn from "./AddFeatureBtn";
import Image from "next/image";

interface AllProjectsProps {
    projectList: any;
    featureProject: any[];
    setFeatureProject: Dispatch<SetStateAction<any[]>>;
}

const AllProjects = (props: AllProjectsProps) => {
    const {
        projectList,
        featureProject,
        setFeatureProject
    } = props;
    const coverList = projectList || [];

    return (
        <section className="grid grid-flow-row-dense grid-cols-3 gap-5 mb-10">
            <div className="col-span-3 text-2xl flex font-bold justify-center">All Projects</div>
            {coverList?.length > 0 && coverList.map((project: any, index: number) => (
                <div key={index} className="flex flex-col place-items-center">
                    <div className="relative w-full aspect-[3/4] grow">
                        <Image src={project.cover[0]?.url || "/no-image.png"} alt={`Cover of project ${project.name}`}
                            fill
                            sizes="(max-width: 1200px) 100vw, 75vw"
                            className="relative object-cover" />
                    </div>
                    <div className="flex-wrap text-xl font-bold">Name: {project.name}</div>
                    <div className="flex-wrap">Size: {project.size} sq. ft.</div>
                    <div className="flex-wrap">Display ID: {project.display_id}</div>
                    <div className="flex justify-center w-full gap-3">
                        <EditPorjectBtn projectName={project.name} />
                        <AddFeatureBtn project={project} featureProject={featureProject} setFeatureProject={setFeatureProject} />
                    </div>
                </div>
            ))}
        </section>
    )
};

export default AllProjects;