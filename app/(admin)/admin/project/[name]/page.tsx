
import { getProjectImages } from "@/controllers/images/get";
import { getProjectByName, serverGetProjectsWithCovers } from "@/controllers/projects/get";
import EditForm from "./_component/EditForm";

export default async function EditProject({ params }: { params: { name: string }; }) {
    const projectName = params.name.replaceAll("%20", " ");
    const projectList = await serverGetProjectsWithCovers();
    const projectInfo = await getProjectByName(projectName);
    const projectId = projectInfo?.id;
    const relatedImages = await getProjectImages(projectId);

    return (
        < EditForm
            projectInfo={projectInfo}
            relatedImages={relatedImages}
            projectList={projectList}
        />
    );
}