
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";
import NavItems from "./NavItems";

const Navbar = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    return (
        <nav className="z-30 relative top-0 h-28 w-full nav-bg">
            <NavItems isAdmin={isAdmin} />
        </nav>
    )
};

export default Navbar;