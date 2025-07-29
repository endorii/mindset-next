interface IApproveButtonWithIconProps {
    onClick: () => void;
    children: React.ReactNode;
}

function ApproveButtonWithIcon({
    onClick,
    children,
}: IApproveButtonWithIconProps) {
    return (
        <button
            className="group bg-green-500/15 border border-white/10 rounded-xl hover:bg-green-500/70 transition-colors duration-300 px-4 py-2 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ApproveButtonWithIcon;
