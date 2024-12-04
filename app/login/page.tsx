
import turnToAdminPage from "@/components/checkAuth/turnToAdminPage";
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";
import LoginForm from "./_component/LoginForm";
import { adminLogin } from "@/controllers/admin";

const AdminLogin = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    await turnToAdminPage(isAdmin);
    return (<LoginForm />)
};

export default AdminLogin;