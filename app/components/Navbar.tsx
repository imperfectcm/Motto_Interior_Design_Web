
import { authService } from "@/services/AuthService";
import { cookies } from "next/headers";
import NavItems from "./NavItems";

const Navbar = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    return (
        <nav className="z-40 relative h-28 w-full nav-bg">
            <NavItems isAdmin={isAdmin} />
        </nav>
    )
};

export default Navbar;