
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers"
import CreateProjectBtn from "@/components/adminPage/ToCreateProjectPageBtn";
import CheckAuth from "@/components/auth/CheckAuth";


const admin = async () => {

    // get auth info
    const isAdmin = await authService.isAdminAuthenticated(cookies());

    // auth guard
    await CheckAuth(isAdmin);

    return (
        <main>
            <CreateProjectBtn />
        </main>
    )
}

export default admin;