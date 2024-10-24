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
}

const HorizontalGallery = (props: HorizontalGalleryProps) => {
    const projectImages = props.projectImages;
    let boxHeight: number = 400;
    if (projectImages) boxHeight = (projectImages.length * 70);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 700, damping: 50 });
    const x = useTransform(smoothScrollYProgress, [0, 1], ["0%", "-95%"]);

    return (
        <div ref={targetRef} style={{ height: `${boxHeight}vh` }} >
            <div className="image-gallery">
                <ProjectInfo projectInfo={props.projectInfo} />
                <motion.div className="image-track" style={{ x }}>
                    {projectImages && projectImages.map((image, i) =>
                        < ImageContainer imageSource={image} key={i} />
                    )}
                </motion.div>
            </div>
        </div>
    )
};

export default HorizontalGallery;