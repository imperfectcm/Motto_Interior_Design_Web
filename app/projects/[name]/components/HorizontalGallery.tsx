'use client'

import React from "react";
import "./horizontalScroll.css"
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import ImageContainer from "./ImageContainer";
import ProjectInfo from "./ProjectInfo";

interface HorizontalGalleryProps {
    projectInfo: any;
    projectName: string;
    projectCovers?: any[];
    projectImages?: any[];
    nextProject?: any;
}

const HorizontalGallery = (props: HorizontalGalleryProps) => {
    const projectImages = props.projectImages;
    const nextProject = props.nextProject;
    console.log("nextProject: ", nextProject)
    let boxHeight: number = 400;
    if (projectImages) boxHeight = (projectImages.length * 70);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 700, damping: 50 });
    const x = useTransform(smoothScrollYProgress, [0, 1], ["0%", "-100%"]);

    return (
        <section ref={targetRef} style={{ height: `${boxHeight}vh` }} className="image-page-body">
            <div className="image-gallery">
                <ProjectInfo projectInfo={props.projectInfo} />
                <motion.div className="image-track" style={{ x }}>
                    {projectImages && projectImages.map((image, i) =>
                        <ImageContainer imageSource={image} key={i} />
                    )}
                    {nextProject.name &&
                        <div className="next-project text-4xl">
                            <div className="text-base">Next Project</div>
                            <a href={`${nextProject.name}`} className="">{nextProject.name}</a>
                        </div>
                    }
                </motion.div>
            </div>
        </section>
    )
};

export default HorizontalGallery;