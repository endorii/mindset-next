interface IButtonWithIconProps {
    onClick: () => void;
    children: React.ReactNode;
}

function ButtonWithIcon({ onClick, children }: IButtonWithIconProps) {
    return (
        <button
            className="flex gap-[10px] items-center justify-center group border border-white/10 rounded-xl hover:bg-white transition-colors duration-300 px-[15px] py-[10px] cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonWithIcon;
