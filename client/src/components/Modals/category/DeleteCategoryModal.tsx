"use client";

import { ICategory } from "@/types/types";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ICategory | null;
}

export default function DeleteCategoryModal({
    isOpen,
    onClose,
    item,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">
                    Підтвердження видалення
                </h2>
                <p className="mb-6">Ви дійсно хочете видалити {item?.name}?</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            console.log("Колекцію було видалено");
                        }}
                        className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}
