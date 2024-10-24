"use client";

interface ProjectInfoProps {
    projectInfo: any;
}

const ProjectInfo = (props: ProjectInfoProps) => {
    const projectInfo = props.projectInfo;
    return (
        <div className="info pt-8 mr-8 gap-3">
            <div className="text-3xl font-bold mb-5">
                <div>{projectInfo.name}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Location :</div>
                <div className="text-sm font-semibold">{projectInfo.location}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Size :</div>
                <div className="text-sm font-semibold">{projectInfo.size} square footage</div>
            </div>
            {projectInfo.description &&
                <div>
                    <div className="text-lg font-bold">Description :</div>
                    <div className="text-sm font-semibold whitespace-pre-wrap">{projectInfo.description} square footage</div>
                </div>
            }
        </div>
    )
};

export default ProjectInfo;