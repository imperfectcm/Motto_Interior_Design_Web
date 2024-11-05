"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ImageContainerProps {
    imageSource: any;
}

const ImageContainer = (props: ImageContainerProps) => {
    const imageSource = props.imageSource;
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.3, });

    return (
        <motion.div ref={ref} animate={{ scale: inView ? 1 : 0.8 }} transition={{ duration: 0.5 }} className="origin-bottom group">
            <section className="h-[calc(100vh-14rem)] overflow-hidden rounded-lg" key={imageSource.id} >
                <img src={`${imageSource.url}`} alt="Project image"
                    className="h-full w-full object-contain group-hover:scale-103 duration-200" />
            </section>
        </motion.div>
    )
}

export default ImageContainer;