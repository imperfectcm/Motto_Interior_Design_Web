
import { cookies } from "next/headers";
import { authService } from "@/services/AuthService";
import CheckAuth from "@/components/auth/CheckAuth";
import CreateProjectForm from "@/components/createProjectPage/createProjectForm";


const CreateProject = async () => {
    
    // get auth info
    const isAdmin = await authService.isAdminAuthenticated(cookies());

    // auth guard
    await CheckAuth(isAdmin);

    return (
        <CreateProjectForm />
    )

}

export default CreateProject;