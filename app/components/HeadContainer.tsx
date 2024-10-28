"use client";

import Image from 'next/image';
import { motion } from "framer-motion";
import Hero from '@/public/heroImage/hero-sample.jpg';

export default function HeadContainer() {
    return (
        <section className="relative h-screen w-full flex">
            <motion.div className="z-10 absolute bottom-1/2 end-1/2 mr-10 text-9xl font-bold"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 0, ease: 'easeOut' }}>
                Motto
            </motion.div>
            <motion.div className="z-10 absolute top-1/2 end-[41%] text-5xl font-medium text-right"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0, ease: 'easeOut' }}>
                Interior Design
            </motion.div>
            <motion.div className="z-10 absolute top-2/3 end-[41%] text-2xl font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0, ease: 'easeOut' }}>
                Choices of lifestyle. Not just design.
            </motion.div>
            <div className="z-0 fixed h-screen w-2/5 right-0">
                <Image
                    src={Hero}
                    alt="Main Page Cover Image"
                    fill
                    sizes="75vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="homepage-poster"
                />
            </div>
        </section>
    );
}