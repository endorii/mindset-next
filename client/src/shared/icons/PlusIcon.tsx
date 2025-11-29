import { IconProps } from "../interfaces/interfaces";

export function PlusIcon({ className }: IconProps) {
    return (
        <svg className={`${className ?? null}`} viewBox="0 0 24 24">
            <path d="M6 12H18M12 6V18" />
        </svg>
    );
}
