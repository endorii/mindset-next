interface IButtonWithIconProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

function ButtonWithIcon({
    onClick,
    children,
    className,
}: IButtonWithIconProps) {
    return (
        <button
            className={`flex gap-[10px] items-center justify-center group border border-white/10 rounded-xl hover:bg-white transition-colors duration-300 px-[15px] py-[10px] cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonWithIcon;
