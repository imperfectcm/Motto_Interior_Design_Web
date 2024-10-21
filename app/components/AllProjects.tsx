
// import { promises as fs } from 'fs';

interface AllProjectsProps {
    projectList: any[];
}

export default function AllProjects(props: AllProjectsProps) {
    const projectList = props.projectList;

    return (
        <div className="col-start-2 col-span-6 row-start-3 row-span-3 overflow-x-auto snap-x snap-mandatory pb-3">
            <div className="w-full h-full flex flex-row homepage-cover-img">
                {projectList && projectList.map((project: any, index: number) => {
                    return (
                        <a href={`projects/${project.name}`} key={index} className="col-span-2 aspect-[3/4] snap-always snap-center">
                            <img className="object-cover aspect-[3/4] scale-90 hover:scale-100 duration-200 cursor-pointer"
                                id={`${index}`}
                                src={project.cover[0]?.url || "no-image.png"}
                                loading="lazy"
                                alt={`Cover of project ${project.name}`}
                            />
                        </a>
                    )
                })}
            </div>
        </div>
    )
}