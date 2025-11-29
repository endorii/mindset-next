import { IconProps } from "../interfaces/interfaces";

export function CloseIcon({ className }: IconProps) {
    return (
        <svg viewBox="-0.5 0 25 25" className={`${className ?? null}`}>
            <path d="M3 21.32L21 3.32001" />
            <path d="M3 3.32001L21 21.32" />
        </svg>
    );
}
