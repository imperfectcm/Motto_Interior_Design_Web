
import { authService } from "@/services/AuthService";
import { cookies, headers } from "next/headers"
import CreateProjectBtn from "@/components/adminPage/toCreateProjectPageBtn";
import CheckAuth from "@/components/auth/checkAuth";
import AllProjectCoversContainer from "@/components/adminPage/allProjectCoversContainer";


const admin = async () => {
    headers();

    // get auth info
    const isAdmin = await authService.isAdminAuthenticated(cookies());

    // auth guard
    await CheckAuth(isAdmin);

    return (
        <main className="py-10">
            <AllProjectCoversContainer />
            <CreateProjectBtn />
        </main>
    )
}

export default admin;