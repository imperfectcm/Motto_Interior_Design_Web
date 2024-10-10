
import { cookies } from "next/headers";
import { authService } from "@/services/AuthService";
import checkAuth from "@/components/checkAuth/checkAuth";
import CreateProjectForm from "@/app/(admin)/admin/create-project/components/CreateProjectForm";
import getLastDisplayId from "@/components/getProjects/getLastDisplayId";

const CreateProject = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    await checkAuth(isAdmin);
    const lastDisplayId = await getLastDisplayId();

    return (<CreateProjectForm lastDisplayId={lastDisplayId}/>)
}

export default CreateProject;