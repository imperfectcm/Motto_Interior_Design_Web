
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="z-40 relative grid grid-cols-10 h-28 w-dvw nav-bg">
            <Link className="col-span-2 col-start-5 nav-item text-xl" href="/">MOTTO DEISGN</Link>
            <Link className="col-span-1 nav-item text-xl" href="/about">About<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            <Link className="col-span-1 nav-item text-xl" href="/projects">Portfolio<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            <Link className="col-span-1 nav-item text-xl" href="/contact">Contact<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
        </nav>
    )
};

export default Navbar;