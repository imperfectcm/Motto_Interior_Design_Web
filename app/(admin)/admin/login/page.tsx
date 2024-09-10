import LoginForm from "@/components/adminLoginPage/loginForm";
import TurnToAdminPage from "@/components/utils/turnToAdminPage/TurnToAdminPage";
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";


const AdminLogin = async () => {

    // get auth info
    const isAdmin = await authService.isAdminAuthenticated(cookies());

    // auth guard
    if (isAdmin) await TurnToAdminPage(isAdmin);

    return (
        <LoginForm />
    )

};

export default AdminLogin;