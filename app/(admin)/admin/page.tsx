
import { authService } from "@/services/AuthService";
import { cookies, headers } from "next/headers"
import CreateProjectBtn from "@/app/(admin)/admin/components/CreateProjectBtn";
import CheckAuth from "@/components/checkAuth/checkAuth";
import getAllProjectCovers from "@/components/getProjects/getAllProjectsWithCovers";
import ProjectCoversContainer from "./components/ProjectCoversContainer";


const admin = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    await CheckAuth(isAdmin);
    const projectList = await getAllProjectCovers();

    return (
        <main className="py-10">
            <ProjectCoversContainer projectList={projectList} />
            <CreateProjectBtn />
        </main>
    )
}

export default admin;