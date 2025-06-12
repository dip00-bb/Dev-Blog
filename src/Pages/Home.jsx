import React from 'react';
import Banner from '../Component/Banner/Banner';
import NewsLetter from '../Component/NewsLetter/NewsLetter';
import RecentBlog from '../Component/RecentBlog/RecentBlog';
import OurExpert from '../Component/OurExpert/OurExpert';
import TryOurAI from '../Component/TryAi/TryOurAI';
"use client"

import { motion, useSpring, useScroll } from "motion/react"



export default function Home() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

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
                    backgroundColor: "#ff0088",
                }}
            />
            <Content />
        </>
    )
}

function Content() {
    return (
        <>
            <Banner />
            <RecentBlog />
            <NewsLetter />
            <OurExpert />
            <TryOurAI />
        </>
    )
}