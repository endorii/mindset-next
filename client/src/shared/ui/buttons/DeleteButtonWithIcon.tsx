interface IDeleteButtonWithIconProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

function DeleteButtonWithIcon({
    onClick,
    children,
    className,
}: IDeleteButtonWithIconProps) {
    return (
        <button
            className={`group bg-red-500/15 border border-white/10 rounded-xl hover:bg-red-500/70 transition-colors duration-300 px-3 py-2 cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default DeleteButtonWithIcon;
