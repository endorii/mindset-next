"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export function CustomCursor() {
    const mouse = {
        x: useMotionValue(-30),
        y: useMotionValue(-30),
    };

    const smoothOptions = { damping: 30, stiffness: 400, mass: 0.3 };

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

    const manageMouseEnter = () => cursorSize.set(30);
    const manageMouseLeave = () => cursorSize.set(15);

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
            className="fixed pointer-events-none"
            style={{
                // position: "absolute",
                width: animatedCursorSize,
                height: animatedCursorSize,
                border: "1px solid white",
                borderRadius: "50%",
                backgroundColor: "#00000080",
                // boxShadow: "0 0 70px 20px rgba(255, 255, 255, 1)",
                left: smoothMouse.x,
                top: smoothMouse.y,
                zIndex: "10000",
            }}
        />
    );
}
