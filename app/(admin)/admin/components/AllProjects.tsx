
import { Dispatch, SetStateAction } from "react";
import EditPorjectBtn from "./EditProjectBtn";
import AddFeatureBtn from "./AddFeatureBtn";

interface AllProjectsProps {
    projectList: any;
    lastDisplayId: number;
    featureProject: any[];
    setFeatureProject: Dispatch<SetStateAction<any[]>>;
}

const AllProjects = (props: AllProjectsProps) => {
    const {
        projectList,
        lastDisplayId,
        featureProject,
        setFeatureProject
    } = props;
    const coverList = props.projectList || [];

    return (
        <section className="grid grid-flow-row-dense grid-cols-3 gap-5 mb-10">
            <div className="col-span-3 text-2xl flex font-bold justify-center">All Projects</div>
            {coverList?.length > 0 && coverList.map((project: any, index: number) => (
                <div key={index} className="flex flex-col place-items-center">
                    <img src={project.cover[0]?.url || "no-image.png"} alt={`Cover of project ${project.name}`} className="aspect-[3/4] grow object-cover" />
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