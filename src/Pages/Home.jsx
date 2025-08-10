"use client"

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useSpring, useScroll } from "motion/react"
import Banner from '../Component/Banner/Banner';
import NewsLetter from '../Component/NewsLetter/NewsLetter';
import RecentBlog from '../Component/RecentBlog/RecentBlog';
import OurExpert from '../Component/OurExpert/OurExpert';
import TryOurAI from '../Component/TryAi/TryOurAI';



export default function Home() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        AOS.init({});
    }, [])
    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    zIndex: 10,
                    backgroundColor: "#ff0088",
                }}
            />
            <Content />
        </>
    )
}

function Content() {
    return (
        <div className='flex flex-col overflow-hidden'>
            <div

                // initial={{ opacity: 0, scale: 0 }}
                // whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 2 }}

            >
                <Banner />
            </div>



            <div

                initial={{ opacity: 0, translateX: "100%" }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 2 }}

            >
                <RecentBlog />
            </div>



            <div

                initial={{ opacity: 0, rotateX: "90deg" }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 2 }}
            >
                <NewsLetter />
            </div>
            <div>
                <OurExpert />
            </div>
            <div>
                <TryOurAI />
            </div>
        </div>
    )
}