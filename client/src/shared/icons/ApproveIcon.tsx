import { IconProps } from "../interfaces/interfaces";

export function ApproveIcon({ className }: IconProps) {
    return (
        <svg className={`${className ?? null}`} viewBox="0 0 24 24">
            <path d="M19.3,5.3L9,15.6l-4.3-4.3l-1.4,1.4l5,5L9,18.4l0.7-0.7l11-11L19.3,5.3z" />
            <rect />
        </svg>
    );
}
