
import "./horizontalScroll.css"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ImageContainerProps {
    imageSource: any;
}

const ImageContainer = (props: ImageContainerProps) => {
    const imageSource = props.imageSource;
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, });

    return (
        <motion.div ref={ref} animate={{ scale: isInView ? 1 : 0.8 }} transition={{ duration: 0.5 }} className="imgAni">
            <section className="image-column" key={imageSource.id} >
                <img src={`${imageSource.url}`} alt="Project image" className="image h-full object-contain" />
            </section>
        </motion.div>
    )
}

export default ImageContainer;