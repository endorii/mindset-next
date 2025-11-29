import { IconProps } from "../interfaces/interfaces";

export function CheckIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={`${className ?? null}`}>
            <g>
                <path d="M6 12L10.2426 16.2426L18.727 7.75732" />
            </g>
        </svg>
    );
}
