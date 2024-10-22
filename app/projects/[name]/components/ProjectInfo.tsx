

interface ProjectInfoProps {
    projectInfo: any;
}

const ProjectInfo = (props: ProjectInfoProps) => {
    const projectInfo = props.projectInfo;
    return (
        <div className="track-title pt-8 mr-8 gap-4">
            <div className="text-3xl font-bold">
                <div>{projectInfo.name}</div>
            </div>
            <div>
                <div className="text-2xl font-bold">Location :</div>
                <div className="font-semibold">{projectInfo.location}</div>
            </div>
            <div>
                <div className="text-2xl font-bold">Size :</div>
                <div className="font-semibold">{projectInfo.size} square footage</div>
            </div>
            {projectInfo.description &&
                <div>
                    <div className="text-2xl font-bold">Description :</div>
                    <div className="font-semibold whitespace-pre-wrap">{projectInfo.description} square footage</div>
                </div>
            }
        </div>
    )
};

export default ProjectInfo;