"use client";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCollectionModal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-bold mb-4">Додавання колекції</h2>
                <div className="flex gap-[20px] justify-between">
                    <div className="flex flex-col gap-[20px] w-[50%]">
                        <div className="flex flex-col">
                            <label htmlFor="name">Назва</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="border-b py-2 px-1 outline-0"
                                placeholder="Назва колекції"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="path">Шлях</label>
                            <input
                                id="path"
                                name="path"
                                type="text"
                                className="border-b py-2 px-1 outline-0"
                                placeholder="Шлях (URL)"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="banner">Банер</label>
                            <input
                                id="banner"
                                name="banner"
                                type="file"
                                className="border-b py-2 px-1 outline-0"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] w-[50%]">
                        <div className="flex flex-col">
                            <label htmlFor="bannerUrl">Банер (URL)</label>
                            <input
                                id="bannerUrl"
                                name="bannerUrl"
                                type="text"
                                disabled
                                className="border-b py-2 px-1 outline-0 disabled:opacity-35 disabled:cursor-not-allowed"
                            />
                        </div>
                        <img
                            className="h-[50vh] object-contain"
                            src={"/placeholder.png"}
                            alt={"Банер"}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                    >
                        Відмінити
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            console.log("Колекцію було додано");
                        }}
                        className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                    >
                        Додати
                    </button>
                </div>
            </div>
        </div>
    );
}
