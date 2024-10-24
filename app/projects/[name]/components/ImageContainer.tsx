
import "./horizontalScroll.css"
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
        <motion.div ref={ref} animate={{ scale: inView ? 1 : 0.8 }} transition={{ duration: 0.5 }} className="image-column">
            <section className="image" key={imageSource.id} >
                <img src={`${imageSource.url}`} alt="Project image" className="h-full w-full object-contain" />
            </section>
        </motion.div>
    )
}

export default ImageContainer;