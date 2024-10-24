"use client"

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface NavItemsProps {
    isAdmin: boolean;
}

const NavItems = (props: NavItemsProps) => {
    const { isAdmin } = props;
    return (
        <motion.div className="relative grid grid-cols-10 h-full w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
            <Link className="col-span-2 col-start-5 nav-item text-2xl motto-name" href="/">MOTTO DEISGN</Link>
            <Link className="col-span-1 nav-item text-xl" href="/about">About<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            <Link className="col-span-1 nav-item text-xl" href="/projects">Portfolio<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            <Link className="col-span-1 nav-item text-xl" href="/contact">Contact<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            {isAdmin &&
                <Link className="col-span-1 nav-item text-xl" href="/admin">Admin<FontAwesomeIcon className="nav-arrow" icon={faArrowRight} /></Link>
            }
        </motion.div>
    )
}

export default NavItems;