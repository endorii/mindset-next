"use client";

import { AddSizeModal, DeleteSizeModal, EditSizeModal } from "@/features/admin";
import { TitleWithAddElementButton } from "@/shared/components";
import { EditIcon, PaletteIcon, TrashIcon } from "@/shared/icons";
import { ButtonWithIcon, DeleteButtonWithIcon } from "@/shared/ui/buttons";
import { useState } from "react";
import { useSizes } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";

export function SizeSection() {
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | null
    >(null);
    const [selected, setSelected] = useState<ISize | null>(null);

    const { data: sizes } = useSizes();

    const closeModal = () => {
        setModalType(null);
        setSelected(null);
    };

    return (
        <>
            <TitleWithAddElementButton
                title={"Size list"}
                onClick={() => setModalType("add")}
                buttonText={"Add size"}
            />
            <hr className="w-full border-t border-white/5" />

            {sizes && (sizes ?? []).length > 0 ? (
                <div className="  bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-2 
                    gap-[15px] p-[20px] font-semibold text-sm"
                    >
                        <div>Name</div>
                        <div className="text-right">Actions</div>
                    </div>
                    <div className="border border-white/5  ">
                        {sizes.map((size) => (
                            <div
                                key={size.id}
                                className="grid 
                                grid-cols-2 
                                gap-[15px] p-[20px] border-b border-white/5 items-center text-sm"
                            >
                                <div>{size.name}</div>

                                <div className="flex justify-end gap-[10px]">
                                    <ButtonWithIcon
                                        onClick={() => {
                                            setSelected(size);
                                            setModalType("edit");
                                        }}
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() => {
                                            setSelected(size);
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
                    <div className="font-bold text-4xl font-perandory tracking-wider z-1">
                        Sizes list is empty.
                    </div>
                    <PaletteIcon className="absolute fill-black top-[-60px] right-20 w-[400px] opacity-20 pointer-events-none" />
                </div>
            )}

            <AddSizeModal isOpen={modalType === "add"} onClose={closeModal} />
            {selected && modalType === "edit" && (
                <EditSizeModal isOpen onClose={closeModal} size={selected} />
            )}
            {selected && modalType === "delete" && (
                <DeleteSizeModal isOpen onClose={closeModal} size={selected} />
            )}
        </>
    );
}
