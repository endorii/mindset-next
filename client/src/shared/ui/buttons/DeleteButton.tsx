interface IDeleteButton {
    onClick?: () => void;
    type?: "reset" | "button" | "submit" | undefined;
    disabled?: boolean;
    children: React.ReactNode;
}

function DeleteButton({
    onClick,
    type = "button",
    disabled,
    children,
}: IDeleteButton) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="flex gap-[15px] px-[25px] py-[10px] items-center cursor-pointer border border-red-950 bg-red-900 rounded-xl hover:bg-red-700 group transition-all duration-300 hover:text-white"
        >
            {children}
        </button>
    );
}

export default DeleteButton;
