"use client";

import { motion } from "framer-motion";

const Introduction = () => {
    return (
        <article className="flex flex-col items-center">
            <section className="text-2xl mb-10 h-dvh inline-flex flex-col justify-center gap-36 -translate-y-20">
                <motion.div className="inline-flex flex-col gap-10"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
                    <div>
                        我們的名字 <span className="font-semibold">Motto</span> 來自日文單字 &quot;もっと&quot; ，意思是 &quot;更多&quot; 。
                    </div>
                    <div>
                        它也是一個有趣的雙關語提醒我設計座右銘(Motto)：為您的家創造更多可能性。
                    </div>
                </motion.div>
                <motion.div className="inline-flex flex-col gap-10"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}>
                    <div>
                        Our name, <span className="font-semibold">Motto</span>, comes from the Japanese word &quot;もっと&quot; , which means &quot;more&quot;.
                    </div>
                    <div>
                        It also serves as a playful reminder of my design philosophy: to create more possibilities for your home.
                    </div>
                </motion.div>
            </section>

            <section className="h-dvh inline-flex flex-col justify-center gap-36">
                <motion.div className="inline-flex flex-col"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}>
                    <div className="text-4xl font-bold mb-5">
                        我們相信
                    </div>
                    <div className="flex flex-col gap-3 mb-14">
                        <div>
                            <div className="font-semibold">用心聆聽：</div>
                            我們重視你您的每個想法，因為理解你就是設計的起點。
                        </div>
                        <div>
                            <div className="font-semibold">創新實用：</div>
                            我們追求創意，但絕不會忘記生活需求。
                        </div>
                        <div>
                            <div className="font-semibold">不忘細節：</div>
                            從整體規劃到細節，每個環節都值得我們用心關注。
                        </div>
                    </div>
                    <div>
                        <div>我們不僅設計空間，更在乎你在其中的生活體驗。</div>
                        <div>將您的想法和需求轉化現實，創做造出既實用又富有個性的生活環境。每個項目都是獨特的故事，我們期待能與你一同創作這個故事，為您的生活空間注入更多驚喜。</div>
                    </div>
                </motion.div>

                <motion.div className="inline-flex flex-col"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}>
                    <div className="text-4xl font-bold mb-5">
                        We believe in
                    </div>
                    <div className="flex flex-col gap-3 mb-14">
                        <div>
                            <div className="font-semibold"> **Attentive Listening**</div>
                            We appreciate every idea you share, as grasping your needs is the foundation of our design process.
                        </div>
                        <div>
                            <div className="font-semibold">**Innovative and Practical**</div>
                            We strive for creativity while always keeping the essential needs of daily life in mind.
                        </div>
                        <div>
                            <div className="font-semibold">**Attention to detail**</div>
                            Every elements warrants our careful attention, from the overall planning to the finer details.
                        </div>
                    </div>
                    <div>
                        <div>We don&apos;t simply design spaces; we prioritize your living experience within them.</div>
                        <div>We bring your ideas and needs to life, crafting practical yet distinctive environments.</div>
                    </div>
                </motion.div>
            </section>
        </article>
    );
}

export default Introduction;