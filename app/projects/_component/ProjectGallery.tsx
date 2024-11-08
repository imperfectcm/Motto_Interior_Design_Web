
import { ProjectCard } from "./ProjectCard";

interface ProjectGalleryProps {
    projectList: any[];
}

export const ProjectGallery = (props: ProjectGalleryProps) => {
    const projectList = props.projectList;

    return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 duration-200">
            {projectList.length > 0 && projectList.map((project: any, i: number) =>
                <ProjectCard project={project} key={i} />
            )}
        </div>
    )
}