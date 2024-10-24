"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

interface ProjectCardProps {
    project: any;
}

export const ProjectCard = (props: ProjectCardProps) => {
    const project = props.project;

    return (
        <a href={`projects/${project.name}`}>
            <motion.div
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0, ease: 'easeOut' }}
                className="relative hover:scale-103 duration-200">
                <span className="absolute w-full h-full hover-project-title rounded-lg opacity-0 hover:opacity-100 duration-300">
                    <div className="text-2xl">{project.name}</div>
                    <div>{project.size} sq. ft.</div>
                </span>
                <img className="w-full object-contain break-inside-avoid mb-5 rounded-lg"
                    src={project.cover[0]?.url}
                />
            </motion.div>
        </a>
    )
}