'use client'

import style from "@/components/CSS/ScrollEffect.module.css"
import Image from 'next/image'

export function ScrollEffect() {
    
    return (
        <div className={style.container}>
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