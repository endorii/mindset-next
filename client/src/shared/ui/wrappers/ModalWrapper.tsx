interface IModalWrapperProps {
    onClose: () => void;
    children: React.ReactNode;
    modalTitle: string;
}

export function ModalWrapper({
    onClose,
    children,
    modalTitle,
}: IModalWrapperProps) {
    return (
        <div
            className="fixed inset-0 bg-black/85 flex items-center products-center justify-center z-100 cursor-pointer px-[40px]"
            onClick={onClose}
        >
            <div
                className="flex flex-col gap-[17px] bg-black text-white bg-gradient-to-br from-black/0 to-white/3 border border-white/10 p-[40px] pb-[25px] h-auto max-h-[80vh] min-w-[800px] md:min-w-auto shadow-lg overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-4xl font-perandory tracking-wider">
                    {modalTitle}
                </h4>
                <hr className="border-t border-white/10" />
                {children}
            </div>
        </div>
    );
}
