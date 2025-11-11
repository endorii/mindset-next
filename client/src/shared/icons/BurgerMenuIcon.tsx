interface BurgerMenuIconProps {
    className: string;
}

export function BurgerMenuIcon({ className }: BurgerMenuIconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <path d="M4 18L20 18" />
            <path d="M4 12L20 12" />
            <path d="M4 6L20 6" />
        </svg>
    );
}
