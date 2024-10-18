
import { authService } from "@/services/AuthService";
import { cookies, headers } from "next/headers"
import CreateProjectBtn from "@/app/(admin)/admin/components/CreateProjectBtn";
import checkAuth from "@/components/checkAuth/checkAuth";
import ProjectsContainer from "./components/ProjectsContainer";
import { serverGetProjectsWithCovers } from "@/controllers/projects/get";

const admin = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    await checkAuth(isAdmin);
    const projectList = await serverGetProjectsWithCovers();
    return (
        <main className="py-10 px-5">
            <ProjectsContainer projectList={projectList} lastDisplayId={projectList[0].display_id} />
            <CreateProjectBtn />
        </main>
    )
}

export default admin;