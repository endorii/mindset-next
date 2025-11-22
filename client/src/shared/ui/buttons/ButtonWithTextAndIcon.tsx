interface IButtonWithTextAndIconProps {
    onClick: () => void;
    children: React.ReactNode;
}

export function ButtonWithTextAndIcon({
    onClick,
    children,
}: IButtonWithTextAndIconProps) {
    return (
        <button
            className="flex gap-[10px] group items-center justify-center border border-white/5 hover:bg-white hover:text-black transition-colors duration-300 px-[15px] py-[7px] w-full"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
