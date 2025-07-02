"use client";

import {
    AddColorModal,
    AddSizeModal,
    AddTypeModal,
    DeleteColorModal,
    DeleteSizeModal,
    DeleteTypeModal,
    EditColorModal,
    EditSizeModal,
    EditTypeModal,
} from "@/features/admin";
import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { IColor } from "@/features/admin/attributes/product-colors/types/product-color.types";
import { useSizes } from "@/features/admin/attributes/product-sizes/hooks/useSizes";
import { ISize } from "@/features/admin/attributes/product-sizes/types/product-size.types";
import { useTypes } from "@/features/admin/attributes/product-types/hooks/useTypes";
import { IType } from "@/features/admin/attributes/product-types/types/product-type.types";
import { EditIcon, PlusIcon, TrashIcon } from "@/shared/icons";
import { AttributeModalType } from "@/shared/types/types";
import { useState } from "react";

function AdminAttributes() {
    const { data: colors } = useColors();

    const { data: types } = useTypes();

    const { data: sizes } = useSizes();

    const [selectedAttribute, setSelectedAttribute] =
        useState<string>("кольори");

    const [activeModal, setActiveModal] = useState<AttributeModalType>(null);
    const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
    const [selectedType, setSelectedType] = useState<IColor | null>(null);
    const [selectedSize, setSelectedSize] = useState<ISize | null>(null);

    const attributes = ["кольори", "типи", "розміри"];

    const openAddColorModal = () => {
        setActiveModal("addColor");
    };

    const openEditColorModal = (color: IColor) => {
        setSelectedColor(color);
        setActiveModal("editColor");
    };

    const openDeleteColorModal = (color: IColor) => {
        setSelectedColor(color);
        setActiveModal("deleteColor");
    };

    const openAddTypeModal = () => {
        setActiveModal("addType");
    };

    const openEditTypeModal = (type: IType) => {
        setSelectedType(type);
        setActiveModal("editType");
    };

    const openDeleteTypeModal = (type: IType) => {
        setSelectedType(type);
        setActiveModal("deleteType");
    };

    const openAddSizeModal = () => {
        setActiveModal("addSize");
    };

    const openEditSizeModal = (size: ISize) => {
        setSelectedSize(size);
        setActiveModal("editSize");
    };

    const openDeleteSizeModal = (size: ISize) => {
        setSelectedSize(size);
        setActiveModal("deleteSize");
    };

    const closeModal = () => {
        setSelectedColor(null);
        setSelectedSize(null);
        setActiveModal(null);
    };

    // TODO: ВЕРХНІ ФУНКЦІЇ ПОТРІБНО ОПТИМІЗУВАТИ, РОЗДІЛИТИ АТРИБУТИ ПО КОМПОНЕНТАМ

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-semibold">Оберіть атрибут:</div>
                <ul className="flex gap-[10px]">
                    {attributes.map((attribute, i) => (
                        <li
                            className={`className="border border-white/10 rounded-xl px-3 py-2 ${
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
                    <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <div className="text-2xl font-bold">
                            Список кольорів:
                        </div>
                        <button
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                            onClick={openAddColorModal}
                        >
                            <div>Додати колір</div>
                            <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                        </button>
                    </div>

                    {/* <div className="flex justify-between items-center mt-[15px]">
                        <div className="relative">
                            <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                            <input
                                type="text"
                                className="border-b text-xs py-2 outline-0 w-[200px] pr-[25px]"
                                placeholder="пошук по назві"
                            />
                        </div>
                    </div> */}

                    {(colors ?? []).length > 0 ? (
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <div className="grid grid-cols-[120px_1fr_0.5fr_1fr] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                                <div>Колір</div>
                                <div>Назва</div>
                                <div>Код</div>
                                <div className="text-right">Дії</div>
                            </div>
                            <div className="border border-white/10 rounded-xl">
                                {colors?.map((color) => (
                                    <div
                                        key={color.id}
                                        className="grid grid-cols-[120px_1fr_0.5fr_1fr] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                                    >
                                        <div className="border border-white/10 rounded w-[52px] h-[52px]">
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
                                        <div className="flex gap-[10px] justify-end">
                                            <button
                                                onClick={() =>
                                                    openEditColorModal(color)
                                                }
                                                className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            >
                                                <EditIcon className="w-[27px] fill-none stroke-white stroke-[2.3] group-hover:stroke-black" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openDeleteColorModal(color)
                                                }
                                                className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            >
                                                <TrashIcon className="w-[30px] fill-none stroke-white stroke-[2] group-hover:stroke-black" />
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
                    <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <div className="text-2xl font-bold">Список типів:</div>
                        <button
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                            onClick={openAddTypeModal}
                        >
                            <div>Додати тип</div>
                            <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                        </button>
                    </div>
                    {(types ?? []).length > 0 ? (
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <div className="grid grid-cols-[1fr_1fr] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                                <div>Назва</div>
                                <div className="text-right">Дії</div>
                            </div>
                            <div className="border border-white/10 rounded-xl">
                                {types?.map((type) => (
                                    <div
                                        key={type.id}
                                        className="grid grid-cols-[1fr_1fr] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                                    >
                                        <div>{type.name}</div>
                                        <div className="flex gap-[10px] justify-end">
                                            <button
                                                onClick={() =>
                                                    openEditTypeModal(type)
                                                }
                                                className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            >
                                                <EditIcon className="w-[27px] fill-none stroke-white stroke-[2.3] group-hover:stroke-black" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openDeleteTypeModal(type)
                                                }
                                                className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            >
                                                <TrashIcon className="w-[30px] fill-none stroke-white stroke-[2] group-hover:stroke-black" />
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
                    <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <div className="text-2xl font-bold">
                            Список розмірів:
                        </div>
                        <button
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                            onClick={openAddSizeModal}
                        >
                            <div>Додати розмір</div>
                            <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                        </button>
                    </div>
                    {(sizes ?? []).length > 0 ? (
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <div className="grid grid-cols-[1fr_1fr] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                                <div>Назва</div>
                                <div className="text-right">Дії</div>
                            </div>
                            <div className="border border-white/10 rounded-xl">
                                {sizes?.map((size) => (
                                    <div
                                        key={size.id}
                                        className="grid grid-cols-[1fr_1fr] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                                    >
                                        <div>{size.name}</div>
                                        <div className="flex gap-[10px] justify-end">
                                            <button
                                                onClick={() =>
                                                    openEditSizeModal(size)
                                                }
                                                className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            >
                                                <EditIcon className="w-[27px] fill-none stroke-white stroke-[2.3] group-hover:stroke-black" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openDeleteSizeModal(size)
                                                }
                                                className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            >
                                                <TrashIcon className="w-[30px] fill-none stroke-white stroke-[2] group-hover:stroke-black" />
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
            <AddColorModal
                isOpen={activeModal === "addColor"}
                onClose={closeModal}
            />
            {selectedColor && (
                <DeleteColorModal
                    isOpen={activeModal === "deleteColor"}
                    onClose={closeModal}
                    color={selectedColor}
                />
            )}
            {selectedColor && (
                <EditColorModal
                    isOpen={activeModal === "editColor"}
                    onClose={closeModal}
                    color={selectedColor}
                />
            )}

            <AddTypeModal
                isOpen={activeModal === "addType"}
                onClose={closeModal}
            />
            {selectedType && (
                <DeleteTypeModal
                    isOpen={activeModal === "deleteType"}
                    onClose={closeModal}
                    type={selectedType}
                />
            )}
            {selectedType && (
                <EditTypeModal
                    isOpen={activeModal === "editType"}
                    onClose={closeModal}
                    type={selectedType}
                />
            )}

            <AddSizeModal
                isOpen={activeModal === "addSize"}
                onClose={closeModal}
            />
            {selectedSize && (
                <DeleteSizeModal
                    isOpen={activeModal === "deleteSize"}
                    onClose={closeModal}
                    size={selectedSize}
                />
            )}

            {selectedSize && (
                <EditSizeModal
                    isOpen={activeModal === "editSize"}
                    onClose={closeModal}
                    size={selectedSize}
                />
            )}
        </div>
    );
}

export default AdminAttributes;
