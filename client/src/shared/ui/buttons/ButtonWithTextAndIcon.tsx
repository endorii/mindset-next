interface IButtonWithTextAndIconProps {
    onClick: () => void;
    children: React.ReactNode;
}

function ButtonWithTextAndIcon({
    onClick,
    children,
}: IButtonWithTextAndIconProps) {
    return (
        <button
            className="flex gap-[10px] items-center justify-center group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-[15px] py-[10px] cursor-pointer w-full"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonWithTextAndIcon;
