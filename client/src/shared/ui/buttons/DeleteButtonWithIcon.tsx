interface IDeleteButtonWithIconProps {
    onClick: () => void;
    children: React.ReactNode;
}

function DeleteButtonWithIcon({
    onClick,
    children,
}: IDeleteButtonWithIconProps) {
    return (
        <button
            className="group bg-red-500/15 border border-white/10 rounded-xl hover:bg-red-500/70 transition-colors duration-300 px-3 py-2 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default DeleteButtonWithIcon;
