interface IChooseButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    isActive?: boolean;
}

function ChooseButton({
    onClick,
    children,
    isActive = false,
}: IChooseButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`transition-colors duration-300 flex items-center justify-center cursor-pointer px-[20px] py-[8px] sm:text-sm rounded-xl border shadow-lg xs:w-full
                ${
                    isActive
                        ? "bg-white text-black border-white"
                        : "bg-black/80 text-white border-white/10 hover:bg-white hover:text-black"
                }
            `}
        >
            {children}
        </button>
    );
}

export default ChooseButton;
