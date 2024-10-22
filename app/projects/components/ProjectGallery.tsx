
interface ProjectGalleryProps {
    projectList: any[];
}

export const ProjectGallery = (props: ProjectGalleryProps) => {
    const projectList = props.projectList;
    return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 duration-200">
            {projectList.length > 0 && projectList.map((project: any, i: number) =>
                <a href={`projects/${project.name}`} key={i}>
                    <div className="relative hover:scale-105 duration-200">
                        <span className="absolute w-full h-full hover-project-title rounded-lg opacity-0 hover:opacity-100 duration-300">
                            <div className="text-2xl">{project.name}</div>
                            <div>{project.size} sq. ft.</div>
                        </span>
                        <img className="w-full object-contain break-inside-avoid mb-5 rounded-lg"
                            src={project.cover[0]?.url}
                        />
                    </div>
                </a>
            )}
        </div>
    )
}