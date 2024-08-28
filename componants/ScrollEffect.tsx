import style from "@/componants/CSS/ScrollEffect.module.css"
import Image from 'next/image'

export function ScrollEffect() {
    
    
    return (
        <div className={style.container}>
            <div className={style.pre}></div>
            <div className={style.div}>
                <Image
                    src="/Project Chronology/01.jpg"
                    width={500}
                    height={500}
                    alt=""
                    priority
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/02.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/03.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/04.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/05.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/06.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/07.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/08.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/09.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>

            <div className={style.div}>
                <Image
                    src="/Project Chronology/01.jpg"
                    width={500}
                    height={500}
                    alt=""
                />
            </div>
            <div className={style.after}></div>
        </div>
    );
}