"use client";

import Image from 'next/image'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';

interface FeatureTypeAProps {
    project: any;
}

export default function FeatureTypeA(props: FeatureTypeAProps) {
    const project = props.project;
    const projectName = project.name;

    return (
        <section className="homepage-feature-project-box relative w-full bg-slate-100">
            <motion.div className="absolute left-1/2 pl-20 end-10 w-1/3 h-full py-20 flex flex-col justify-around"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
                <div className="text-5xl font-bold">{project.name}</div>
                {project.description &&
                    <div className="font-light whitespace-pre-wrap">
                        {project.description}
                    </div>
                }
                <a href={`/projects/${projectName}`} className="white-neumor-btn flex items-center gap-3 w-fit rounded-full px-10 py-4">
                    EXPLORER<FontAwesomeIcon icon={faArrowRight} />
                </a>
            </motion.div>
            <motion.div className="absolute inset-y-10 right-1/2 w-2/5 flex justify-end img-shadow"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
                <Image src={project.cover[0]?.url} alt="Home Page Feature Projects Cover Image"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes='33vw'
                    className="aspect-[3/4]" />
            </motion.div>
            {project.cover[1] &&
                <motion.div className="absolute bottom-1/4 right-1/2 w-1/5 h-1/3 flex justify-end img-shadow"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
                    <Image src={project.cover[1]?.url} alt="Home Page Feature Projects Cover Image" loading="lazy"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes='33vw'
                        className="aspect-[1/1] translate-x-10" />
                </motion.div>
            }
        </section>
    );
}