"use client";

import PlusIcon from "@/components/Icons/PlusIcon";
import EditIcon from "@/components/Icons/EditIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
// import AddColorModal from "@/components/Modals/attributes/AddColorModal";
// import AddSizeModal from "@/components/Modals/attributes/AddSizeModal";
// import ColorInfoModal from "@/components/Modals/attributes/ColorInfoModal";
// import SizeInfoModal from "@/components/Modals/attributes/SizeInfoModal";
// import EditColorModal from "@/components/Modals/attributes/EditColorModal";
// import EditSizeModal from "@/components/Modals/attributes/EditSizeModal";
// import DeleteColorModal from "@/components/Modals/attributes/DeleteColorModal";
// import DeleteSizeModal from "@/components/Modals/attributes/DeleteSizeModal";
import { formatDate } from "@/lib/helpers/formatDate";
// import { useColors, useSizes } from "@/lib/hooks/useAttributes";
import { IColor, ISize, ModalType } from "@/types/types";
import React, { useState } from "react";

function AdminAttributes() {
    //   const { data: colors, isError: colorsError, isLoading: colorsLoading } = useColors();
    //   const { data: sizes, isError: sizesError, isLoading: sizesLoading } = useSizes();

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
    const [selectedSize, setSelectedSize] = useState<ISize | null>(null);

    const openModal = (
        type: ModalType,
        color: IColor | null = null,
        size: ISize | null = null
    ) => {
        setSelectedColor(color);
        setSelectedSize(size);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedColor(null);
        setSelectedSize(null);
        setActiveModal(null);
    };

    return (
        <div>
            {/* Colors Section */}
            <div className="text-2xl font-bold">Список кольорів:</div>
            <div className="flex justify-end">
                <button
                    className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                    //   onClick={() => openModal("addColor")}
                >
                    <div>Додати колір</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>
            {(colors ?? []).length > 0 ? (
                <div className="mt-[10px]">
                    <div className="grid grid-cols-[120px_0.7fr_150px_1fr_230px] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                        <div>Колір</div>
                        <div>Назва</div>
                        <div>Код</div>
                        <div>Додано/оновлено</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-gray-200 rounded-b-lg">
                        {colors?.map((color) => (
                            <div
                                key={color.id}
                                className="grid grid-cols-[120px_0.7fr_150px_1fr_230px] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
                            >
                                <div
                                    className="w-[50px] h-[50px] rounded"
                                    style={{ backgroundColor: color.hexCode }}
                                ></div>
                                <div>{color.name}</div>
                                <div>{color.hexCode}</div>
                                <div>
                                    {formatDate(color.createdAt)} /{" "}
                                    {formatDate(color.updatedAt)}
                                </div>
                                <div className="flex gap-[20px] justify-end">
                                    <button
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                        // onClick={() => openModal("infoColor", color)}
                                    >
                                        <InfoIcon className="w-[30px] stroke-black fill-none stroke-[2] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        // onClick={() => openModal("editColor", color)}
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <EditIcon className="w-[27px] fill-none stroke-black stroke-[2.3] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        // onClick={() => openModal("deleteColor", color)}
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <TrashIcon className="w-[30px] fill-none stroke-black stroke-[2] group-hover:stroke-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Кольори відсутні</div>
            )}

            {/* Sizes Section */}
            <div className="text-2xl font-bold mt-[40px]">Список розмірів:</div>
            <div className="flex justify-end">
                <button
                    className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                    //   onClick={() => openModal("addSize")}
                >
                    <div>Додати розмір</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>
            {(sizes ?? []).length > 0 ? (
                <div className="mt-[10px]">
                    <div className="grid grid-cols-[0.7fr_150px_1fr_230px] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                        <div>Назва</div>
                        <div>Тип</div>
                        <div>Додано/оновлено</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-gray-200 rounded-b-lg">
                        {sizes?.map((size) => (
                            <div
                                key={size.id}
                                className="grid grid-cols-[0.7fr_150px_1fr_230px] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
                            >
                                <div>{size.name}</div>
                                <div>{size.type || "Невідомий тип"}</div>
                                <div>
                                    {formatDate(size.createdAt)} /{" "}
                                    {formatDate(size.updatedAt)}
                                </div>
                                <div className="flex gap-[20px] justify-end">
                                    <button
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                        // onClick={() => openModal("infoSize", size)}
                                    >
                                        <InfoIcon className="w-[30px] stroke-black fill-none stroke-[2] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        // onClick={() => openModal("editSize", size)}
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <EditIcon className="w-[27px] fill-none stroke-black stroke-[2.3] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        // onClick={() => openModal("deleteSize", size)}
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <TrashIcon className="w-[30px] fill-none stroke-black stroke-[2] group-hover:stroke-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Розміри відсутні</div>
            )}

            {/* <AddColorModal isOpen={activeModal === "addColor"} onClose={closeModal} />
      <AddSizeModal isOpen={activeModal === "addSize"} onClose={closeModal} />
      {selectedColor && (
        <>
          <ColorInfoModal
            isOpen={activeModal === "infoColor"}
            onClose={closeModal}
            color={selectedColor}
          />
          <EditColorModal
            isOpen={activeModal === "editColor"}
            onClose={closeModal}
            color={selectedColor}
          />
          <DeleteColorModal
            isOpen={activeModal === "deleteColor"}
            onClose={closeModal}
            color={selectedColor}
          />
        </>
      )}
      {selectedSize && (
        <>
          <SizeInfoModal
            isOpen={activeModal === "infoSize"}
            onClose={closeModal}
            size={selectedSize}
          />
          <EditSizeModal
            isOpen={activeModal === "editSize"}
            onClose={closeModal}
            size={selectedSize}
          />
          <DeleteSizeModal
            isOpen={activeModal === "deleteSize", size)}
            onClose={closeModal}
            size={selectedSize}
          />
        </>
      )} */}
        </div>
    );
}

export default AdminAttributes;
