
import { authService } from "@/services/AuthService";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookies } from "next/headers";
import Link from 'next/link'

const Navbar = async () => {
    const isAdmin = await authService.isAdminAuthenticated(cookies());
    return (
        <nav className="z-40 relative grid grid-cols-10 h-28 w-full nav-bg">
            <Link className="col-span-2 col-start-5 nav-item text-xl" href="/">MOTTO DEISGN</Link>
            <Link className="col-span-1 nav-item text-xl" href="/about">About<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            <Link className="col-span-1 nav-item text-xl" href="/projects">Portfolio<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            <Link className="col-span-1 nav-item text-xl" href="/contact">Contact<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            {isAdmin &&
                <Link className="col-span-1 nav-item text-xl" href="/admin">Admin<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            }
        </nav>
    )
};

export default Navbar;