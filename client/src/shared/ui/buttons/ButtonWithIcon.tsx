interface IButtonWithIconProps {
    onClick: () => void;
    children: React.ReactNode;
}

function ButtonWithIcon({ onClick, children }: IButtonWithIconProps) {
    return (
        <button
            className="group border border-white/10 rounded-xl hover:bg-white transition-colors duration-300 px-3 py-2 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonWithIcon;
