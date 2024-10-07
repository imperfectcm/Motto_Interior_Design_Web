
import EditPorjectBtn from "./EditProjectBtn";

interface ProjectCoversProps {
    projectList: any;
}

const ProjectCovers = (props: ProjectCoversProps) => {
    const coverList = props.projectList || [];

    return (
        <section className="grid grid-flow-row-dense grid-cols-3 gap-3 mb-10">
            {coverList?.length > 0 && coverList.map((project: any, index: number) => (
                <div key={index} className="flex flex-col place-items-center">
                    <img src={project.cover[0]?.url || "no-image.png"} alt={`Cover of project ${project.name}`} className="aspect-[3/4] grow object-cover" />
                    <div className="flex-wrap text-xl">Name: {project.name}</div>
                    <div className="flex-wrap">Size: {project.size} sq. ft.</div>
                    <div className="flex justify-center w-full">
                        <EditPorjectBtn projectName={project.name} />
                    </div>
                </div>
            ))}
        </section>
    )
};

export default ProjectCovers;