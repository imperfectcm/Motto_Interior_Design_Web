
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers"
import CreateProjectBtn from "@/components/adminPage/ToCreateProjectPageBtn";
import CheckAuth from "@/components/auth/CheckAuth";
import AllProjectCoversContainer from "@/components/adminPage/AllProjectCoversContainer";


const admin = async () => {

    // get auth info
    const isAdmin = await authService.isAdminAuthenticated(cookies());

    // auth guard
    await CheckAuth(isAdmin);

    return (
        <main>
            <AllProjectCoversContainer />
            <CreateProjectBtn />
        </main>
    )
}

export default admin;