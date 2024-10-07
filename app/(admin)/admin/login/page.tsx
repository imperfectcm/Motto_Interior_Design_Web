import LoginForm from "@/app/(admin)/admin/login/components/loginForm";
import TurnToAdminPage from "@/components/utils/turnToAdminPage/TurnToAdminPage";
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";

const AdminLogin = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    if (isAdmin) await TurnToAdminPage(isAdmin);

    return (<LoginForm />)
};

export default AdminLogin;