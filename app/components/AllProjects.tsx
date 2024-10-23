"use client";

// import { promises as fs } from 'fs';
import Image from 'next/image';
import { motion } from "framer-motion";

interface AllProjectsProps {
    projectList: any[];
}

export default function AllProjects(props: AllProjectsProps) {
    const projectList = props.projectList;

    return (
        <motion.div className="col-start-2 col-span-6 row-start-3 row-span-3 overflow-x-auto snap-x snap-mandatory pb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
            <div className="w-full h-full flex flex-row homepage-cover-img">
                {projectList && projectList.map((project: any, index: number) => {
                    return (
                        <a href={`projects/${project.name}`} key={index} className="col-span-2 aspect-[3/4] snap-always snap-center">
                            <div className="relative aspect-[3/4] scale-90 hover:scale-100 duration-200 cursor-pointer">
                                <span className="z-10 absolute w-full h-full hover-project-title opacity-0 hover:opacity-100 duration-300">
                                    <div className="text-2xl">{project.name}</div>
                                    <div>{project.size} sq. ft.</div>
                                </span>
                                <Image className="aspect-[3/4]"
                                    id={`${index}`}
                                    src={project.cover[0]?.url || "no-image.png"}
                                    fill
                                    sizes='33vw'
                                    style={{ objectFit: "cover" }}
                                    alt={`Cover of project ${project.name}`}
                                />
                            </div>
                        </a>
                    )
                })}
            </div>
        </motion.div>
    )
}