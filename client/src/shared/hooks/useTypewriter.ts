"use client";

import { useEffect, useState } from "react";

export default function useTypewriter(text: string = "", speed: number = 100) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!text || index > text.length) return;

        const timeout = setTimeout(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, index, speed]);

    return displayedText;
}
