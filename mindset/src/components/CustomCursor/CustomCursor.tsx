"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export default function CustomCursor() {
    const cursorSize = 20;
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    const manageMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    };

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove);
        return () => window.removeEventListener("mousemove", manageMouseMove);
    }, []);

    return (
        <motion.div
            className="w-[20px] h-[20px] rounded-[50%] bg-black fixed z-1000 pointer-events-none border border-white group hover:w-[40px]"
            style={{ left: smoothMouse.x, top: smoothMouse.y }}
        ></motion.div>
    );
}
