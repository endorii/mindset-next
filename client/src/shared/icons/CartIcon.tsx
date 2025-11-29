import { IconProps } from "../interfaces/interfaces";

export function CartIcon({ className }: IconProps) {
    return (
        <svg className={`${className ?? null}`} viewBox="0 0 24 24">
            <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11M20 7L18 3H6L4 7M20 7H4M20 7V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V7" />
        </svg>
    );
}
