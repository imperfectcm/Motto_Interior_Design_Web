
import { authService } from "@/services/AuthService";
import { cookies, headers } from "next/headers"
import CreateProjectBtn from "@/components/adminPage/toCreateProjectPageBtn";
import CheckAuth from "@/components/auth/checkAuth";
import AllProjectCoversContainer from "@/components/adminPage/allProjectCoversContainer";
import getAllProjectCovers from "@/components/utils/GetAllProjectCover";


const admin = async () => {
    headers();

    // get auth info
    const isAdmin = await authService.isAdminAuthenticated(cookies());

    // auth guard
    await CheckAuth(isAdmin);

    const projectList = await getAllProjectCovers();

    return (
        <main className="py-10">
            <AllProjectCoversContainer projectList={projectList} />
            <CreateProjectBtn />
        </main>
    )
}

export default admin;