
import EditForm from "@/app/(admin)/admin/project/[name]/components/EditForm";
import checkAuth from "@/components/checkAuth/checkAuth";
import getProjectByName from "@/components/getProjects/getProjectByName";
import getProjectImages from "@/components/getImages/getProjectImages";
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";


export default async function EditProject({ params }: { params: { name: string }; }) {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    await checkAuth(isAdmin);
    const projectName = params.name.replaceAll("%20", " ");
    const projectInfo = await getProjectByName(projectName);
    const projectId = projectInfo?.id;
    const relatedImages = await getProjectImages(projectId);

    return (
        < EditForm
            projectInfo={projectInfo}
            relatedImages={relatedImages}
        />
    );
}