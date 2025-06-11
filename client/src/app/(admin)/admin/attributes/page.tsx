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
import { IColor, ISize, ModalType } from "@/types/types";
import React, { useState } from "react";
import { useColors } from "@/lib/hooks/useColors";
import { useTypes } from "@/lib/hooks/useTypes";
import { useSizes } from "@/lib/hooks/useSizes";
import SearchIcon from "@/components/Icons/SearchIcon";

function AdminAttributes() {
    const { data: colors } = useColors();

    const { data: types } = useTypes();

    const { data: sizes } = useSizes();

    const [selectedAttribute, setSelectedAttribute] =
        useState<string>("кольори");

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
    const [selectedSize, setSelectedSize] = useState<ISize | null>(null);

    const attributes = ["кольори", "типи", "розміри"];

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
            <div className="flex gap-[15px] items-center mb-[30px]">
                <div>Оберіть атрибут:</div>
                <ul className="flex gap-[5px]">
                    {attributes.map((attribute, i) => (
                        <li
                            className={`flex group items-center gap-[10px] px-[25px] py-[7px] ${
                                attribute === selectedAttribute
                                    ? "text-black bg-white border-black"
                                    : "text-white bg-black border-transparent"
                            }  border hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer`}
                            key={i}
                            onClick={() => setSelectedAttribute(attribute)}
                        >
                            {attribute}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedAttribute === "кольори" ? (
                <>
                    <div className="text-2xl font-bold">Список кольорів:</div>
                    <div className="flex justify-between items-center mt-[15px]">
                        <div className="relative">
                            <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                            <input
                                type="text"
                                className="border-b text-xs py-2 outline-0 w-[200px] pr-[25px]"
                                placeholder="пошук по назві"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                                //   onClick={() => openModal("addColor")}
                            >
                                <div>Додати колір</div>
                                <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                            </button>
                        </div>
                    </div>
                    {(colors ?? []).length > 0 ? (
                        <div className="mt-[10px]">
                            <div className="grid grid-cols-[120px_1fr_0.5fr_1fr] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                                <div>Колір</div>
                                <div>Назва</div>
                                <div>Код</div>
                                <div className="text-right">Дії</div>
                            </div>
                            <div className="border border-gray-200 rounded-b-lg">
                                {colors?.map((color) => (
                                    <div
                                        key={color.id}
                                        className="grid grid-cols-[120px_1fr_0.5fr_1fr] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
                                    >
                                        <div className="border border-gray-300 border-dashed rounded w-[52px] h-[52px]">
                                            <div
                                                className="w-[50px] h-[50px] rounded"
                                                style={{
                                                    backgroundColor:
                                                        color.hexCode,
                                                }}
                                            ></div>
                                        </div>
                                        <div>{color.name}</div>
                                        <div>{color.hexCode}</div>
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
                </>
            ) : selectedAttribute === "типи" ? (
                <>
                    <div className="text-2xl font-bold">Список типів:</div>
                    <div className="flex justify-between items-center mt-[15px]">
                        <div className="relative">
                            <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                            <input
                                type="text"
                                className="border-b text-xs py-2 outline-0 w-[200px] pr-[25px]"
                                placeholder="пошук по назві"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                                //   onClick={() => openModal("addColor")}
                            >
                                <div>Додати тип</div>
                                <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                            </button>
                        </div>
                    </div>
                    {(types ?? []).length > 0 ? (
                        <div className="mt-[10px]">
                            <div className="grid grid-cols-[120px_1fr] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                                <div>Назва</div>
                                <div className="text-right">Дії</div>
                            </div>
                            <div className="border border-gray-200 rounded-b-lg">
                                {types?.map((type) => (
                                    <div
                                        key={type.id}
                                        className="grid grid-cols-[120px_1fr] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
                                    >
                                        <div>{type.name}</div>
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
                        <div>Типи відсутні</div>
                    )}
                </>
            ) : selectedAttribute === "розміри" ? (
                <>
                    <div className="text-2xl font-bold">Список розмірів:</div>
                    <div className="flex justify-between items-center mt-[15px]">
                        <div className="relative">
                            <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                            <input
                                type="text"
                                className="border-b text-xs py-2 outline-0 w-[200px] pr-[25px]"
                                placeholder="пошук по назві"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                                //   onClick={() => openModal("addColor")}
                            >
                                <div>Додати розмір</div>
                                <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                            </button>
                        </div>
                    </div>
                    {(sizes ?? []).length > 0 ? (
                        <div className="mt-[10px]">
                            <div className="grid grid-cols-[120px_1fr] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                                <div>Назва</div>
                                <div className="text-right">Дії</div>
                            </div>
                            <div className="border border-gray-200 rounded-b-lg">
                                {sizes?.map((size) => (
                                    <div
                                        key={size.id}
                                        className="grid grid-cols-[120px_1fr] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
                                    >
                                        <div>{size.name}</div>
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
                        <div>Розміри відсутні</div>
                    )}
                </>
            ) : (
                <div>Дані не знайдено</div>
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
