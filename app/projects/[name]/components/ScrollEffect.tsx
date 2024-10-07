'use client'

import style from "@/components/CSS/ScrollEffect.module.css"
import Image from 'next/image'
import { useCallback, useEffect, useState } from "react";
import { useHorizontalScroll } from "../../../../components/utils/horizontalScroll";

interface ScrollEffectProps {
    projectName: string;
    projectImages: any[];
}

export function ScrollEffect(props: ScrollEffectProps) {
    const scrollRef = useHorizontalScroll();
    const projectImages = props.projectImages;

    return (
        <div ref={scrollRef} className={style.container}>
            <div className={style.pre}></div>
            {projectImages.length && projectImages.map((image, index) => (
                <div key={index} className={style.imgBox}>
                    <img
                        src={image.url}
                        alt={`Project ${props.projectName} ${index + 1}`}
                    />
                </div>
            ))}
            {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className={style.imgBox}>
                    <img
                        src={`/Project Chronology/0${(i % 9) + 1}.jpg`}
                        alt={`Project Chronology ${i + 1}`}
                    />
                </div>
            ))}
            <div className={style.after}></div>
        </div>
    );

    return (
        <div ref={scrollRef} className={style.container}>
            <div className={style.pre}></div>
            <div className={style.div}>
                <Image
                    src="/Project Chronology/01.jpg"
                    alt=""
                    priority
                    fill
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/02.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/03.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/04.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/05.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/06.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/07.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/08.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/09.jpg"
                    fill
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/01.jpg"
                    fill
                    alt=""
                />
            </div>
            <div className={style.after}></div>
        </div>
    );
}