import { useEffect } from "react";

type UseEscapeKeyCloseProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const useEscapeKeyClose = ({ isOpen, onClose }: UseEscapeKeyCloseProps) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);
};
