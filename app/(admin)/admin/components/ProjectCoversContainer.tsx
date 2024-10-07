import ProjectCovers from "./ProjectCovers";

interface ProjectCoverContainerProps {
    projectList: any;
}

const ProjectCoversContainer = (props: ProjectCoverContainerProps) => {
    const projectList = props.projectList;

    return (
        <main>
            <ProjectCovers projectList={projectList} />
        </main>
    )
};

export default ProjectCoversContainer;