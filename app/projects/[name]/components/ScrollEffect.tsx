'use client'

import style from "@/components/CSS/ScrollEffect.module.css"
import Image from 'next/image'
import { useCallback, useEffect, useState } from "react";
import { useHorizontalScroll } from "./horizontalScroll";
import ProjectInfo from "./ProjectInfo";


interface ScrollEffectProps {
    projectInfo: any;
    projectName: string;
    projectCovers?: any[];
    projectImages?: any[];
}

export function ScrollEffect(props: ScrollEffectProps) {
    const scrollRef = useHorizontalScroll();
    const projectCovers = props.projectCovers;
    const projectImages = props.projectImages;

    return (
        <div ref={scrollRef} className="track-container scroll-auto">
            <div className="track-pre"></div>
            <ProjectInfo projectInfo={props.projectInfo} />
            {
                projectImages && projectImages.length > 0 &&
                projectImages.map((image, index) => (
                    <div key={index} className="track-img">
                        <img
                            src={image.url}
                            alt={`Project ${props.projectName} ${index + 1}`}
                        />
                    </div>
                ))
            }
            <div className="track-after"></div>
        </div >
    );
}

// for testing scrolling effect

{/* {Array.from({ length: 9 }, (_, i) => (
    <div key={i} className={style.imgBox}>
        <img
            src={`/Project Chronology/0${(i % 9) + 1}.jpg`}
            alt={`Project Chronology ${i + 1}`} />
    </div>
))} */}