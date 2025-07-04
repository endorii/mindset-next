interface IChooseButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

function ChooseButton({ onClick, children }: IChooseButtonProps) {
    return (
        <button
            className="bg-black/80 text-white border border-white/10 shadow-lg rounded-xl hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center cursor-pointer px-[20px] py-[8px]"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ChooseButton;
