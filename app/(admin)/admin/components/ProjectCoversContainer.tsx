import ProjectCovers from "./ProjectCovers";

interface ProjectCoverContainerProps {
    projectList: any;
    lastDisplayId: number;
}

const ProjectCoversContainer = (props: ProjectCoverContainerProps) => {
    const { projectList, lastDisplayId } = props;

    return (
        <main>
            <ProjectCovers projectList={projectList} lastDisplayId={lastDisplayId} />
        </main>
    )
};

export default ProjectCoversContainer;