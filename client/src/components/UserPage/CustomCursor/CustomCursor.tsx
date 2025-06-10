"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export default function CustomCursor() {
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    const cursorSize = useMotionValue(24);
    const animatedCursorSize = useSpring(cursorSize, smoothOptions);

    const manageMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX - cursorSize.get() / 2);
        mouse.y.set(clientY - cursorSize.get() / 2);
    };

    const manageMouseEnter = () => cursorSize.set(15);
    const manageMouseLeave = () => cursorSize.set(24);

    const applyCursorListeners = () => {
        const elements = document.querySelectorAll("button, a");
        elements.forEach((el) => {
            el.removeEventListener("mouseenter", manageMouseEnter);
            el.removeEventListener("mouseleave", manageMouseLeave);
            el.addEventListener("mouseenter", manageMouseEnter);
            el.addEventListener("mouseleave", manageMouseLeave);
        });
    };

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove);
        applyCursorListeners();

        const observer = new MutationObserver(() => {
            applyCursorListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.div
            className="fixed z-[1000] pointer-events-none border border-white"
            style={{
                width: animatedCursorSize,
                height: animatedCursorSize,
                borderRadius: "50%",
                backgroundColor: "black",
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
        />
    );
}
