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
            className="fixed inset-0 bg-black/85 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black text-white bg-gradient-to-br from-black/0 to-white/3 border border-white/10 p-[40px] h-auto max-h-[80vh] shadow-lg overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-4xl font-perandory tracking-wider mb-4">
                    {modalTitle}
                </h4>
                {/* <hr className="border-t border-white/10 py-[10px]" /> */}
                {children}
            </div>
        </div>
    );
}
