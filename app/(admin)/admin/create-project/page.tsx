
import { cookies } from "next/headers";
import { authService } from "@/services/AuthService";
import checkAuth from "@/components/checkAuth/checkAuth";
import CreateProjectForm from "@/app/(admin)/admin/create-project/components/CreateProjectForm";

const CreateProject = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    await checkAuth(isAdmin);

    return (<CreateProjectForm />)
}

export default CreateProject;