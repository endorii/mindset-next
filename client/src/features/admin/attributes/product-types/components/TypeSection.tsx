"use client";

import { AddTypeModal, DeleteTypeModal, EditTypeModal } from "@/features/admin";
import { EditIcon, PaletteIcon, TrashIcon } from "@/shared/icons";
import { ButtonWithIcon, DeleteButtonWithIcon } from "@/shared/ui/buttons";
import { useState } from "react";
import { TitleWithAddElementButton } from "../../components/TitleWithAddElementButton";
import { useTypes } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";

export function TypeSection() {
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | null
    >(null);
    const [selected, setSelected] = useState<IType | null>(null);

    const { data: types } = useTypes();

    const closeModal = () => {
        setModalType(null);
        setSelected(null);
    };

    return (
        <>
            <TitleWithAddElementButton
                title={"List of types"}
                onClick={() => setModalType("add")}
                buttonText={"Add type"}
            />

            {types && (types ?? []).length > 0 ? (
                <div className="  bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-2 
                    gap-[15px] p-[20px] font-semibold text-sm"
                    >
                        <div>Name</div>
                        <div className="text-right">Actions</div>
                    </div>
                    <div className="border border-white/10  ">
                        {types.map((type) => (
                            <div
                                key={type.id}
                                className="grid 
                                grid-cols-2 
                                gap-[15px] p-[20px] border-b border-white/10 items-center text-sm"
                            >
                                <div>{type.name}</div>

                                <div className="flex justify-end gap-[10px]">
                                    <ButtonWithIcon
                                        onClick={() => {
                                            setSelected(type);
                                            setModalType("edit");
                                        }}
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() => {
                                            setSelected(type);
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
                        The type list is empty.
                    </div>
                    <PaletteIcon className="absolute fill-black top-[-60px] right-20 w-[400px] opacity-20 pointer-events-none" />
                </div>
            )}

            <AddTypeModal isOpen={modalType === "add"} onClose={closeModal} />
            {selected && modalType === "edit" && (
                <EditTypeModal isOpen onClose={closeModal} type={selected} />
            )}
            {selected && modalType === "delete" && (
                <DeleteTypeModal isOpen onClose={closeModal} type={selected} />
            )}
        </>
    );
}
