"use client";

import {
    AddColorModal,
    DeleteColorModal,
    EditColorModal,
} from "@/features/admin";
import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { IColor } from "@/features/admin/attributes/product-colors/types/product-color.types";
import { EditIcon, PaletteIcon, TrashIcon } from "@/shared/icons";
import { ButtonWithIcon, DeleteButtonWithIcon } from "@/shared/ui/buttons";
import { useState } from "react";
import { TitleWithAddElementButton } from "../../components/TitleWithAddElementButton";

export function ColorSection() {
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | null
    >(null);
    const [selected, setSelected] = useState<IColor | null>(null);

    const { data: colors } = useColors();

    const closeModal = () => {
        setModalType(null);
        setSelected(null);
    };

    return (
        <>
            <TitleWithAddElementButton
                title={"Colors list"}
                onClick={() => setModalType("add")}
                buttonText={"Add color"}
            />

            <hr className="w-full border-t border-white/5" />

            {colors && (colors ?? []).length > 0 ? (
                <div className="bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-4 
                    md:grid-cols-3 
                    xs:grid-cols-2 
                    gap-[15px] p-[20px] font-semibold text-sm"
                    >
                        <div className="xs:hidden">Color</div>
                        <div>Name</div>
                        <div className="md:hidden">Code</div>
                        <div className="text-right">Actions</div>
                    </div>
                    <div className="border border-white/5  ">
                        {colors.map((color) => (
                            <div
                                key={color.id}
                                className="grid 
                                grid-cols-4 
                                md:grid-cols-3 
                                xs:grid-cols-2 
                                gap-[15px] p-[20px] border-b border-white/5 items-center text-sm"
                            >
                                <div className="border border-white/5 w-[52px] h-[52px] xs:hidden">
                                    <div
                                        className="w-[50px] h-[50px]"
                                        style={{
                                            backgroundColor: color.hexCode,
                                        }}
                                    />
                                </div>
                                <div className="truncate">{color.name}</div>
                                <div className="md:hidden">{color.hexCode}</div>
                                <div className="flex justify-end gap-[10px]">
                                    <ButtonWithIcon
                                        onClick={() => {
                                            setSelected(color);
                                            setModalType("edit");
                                        }}
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() => {
                                            setSelected(color);
                                            setModalType("delete");
                                        }}
                                    >
                                        <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
                                    </DeleteButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative flex min-h-[200px] items-center justify-center bg-white/5 shadow-lg border border-white/5 p-[20px]">
                    <div className="font-bold text-3xl z-1">
                        The color list is empty.
                    </div>
                    <PaletteIcon className="absolute fill-black top-[-60px] right-20 w-[400px] opacity-20 pointer-events-none" />
                </div>
            )}

            <AddColorModal isOpen={modalType === "add"} onClose={closeModal} />
            {selected && (
                <>
                    <EditColorModal
                        isOpen={modalType === "edit"}
                        onClose={closeModal}
                        color={selected}
                    />
                    <DeleteColorModal
                        isOpen={modalType === "delete"}
                        onClose={closeModal}
                        color={selected}
                    />
                </>
            )}
        </>
    );
}
