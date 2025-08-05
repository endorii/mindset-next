import { AddTypeModal, EditTypeModal, DeleteTypeModal } from "@/features/admin";
import {
    ButtonWithIcon,
    DeleteButtonWithIcon,
    MonoButton,
} from "@/shared/ui/buttons";
import { PlusIcon, EditIcon, TrashIcon, PaletteIcon } from "@/shared/icons";
import { useState } from "react";
import { useTypes } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";
import TitleWithAddElementButton from "../../components/TitleWithAddElementButton";

export const TypeSection = () => {
    const { data: types } = useTypes();
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | null
    >(null);
    const [selected, setSelected] = useState<IType | null>(null);

    const closeModal = () => {
        setModalType(null);
        setSelected(null);
    };

    return (
        <>
            <TitleWithAddElementButton
                title={"Список типів"}
                onClick={() => setModalType("add")}
                buttonText={"Додати тип"}
            />

            {types && (types ?? []).length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div className="grid grid-cols-2 gap-[15px] p-4 font-semibold text-sm">
                        <div>Назва</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {types.map((type) => (
                            <div
                                key={type.id}
                                className="grid grid-cols-2 gap-[15px] p-[20px] border-b border-white/10 items-center xs:text-sm"
                            >
                                <div>{type.name}</div>

                                <div className="flex justify-end gap-2">
                                    <ButtonWithIcon
                                        onClick={() => {
                                            setSelected(type);
                                            setModalType("edit");
                                        }}
                                    >
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() => {
                                            setSelected(type);
                                            setModalType("delete");
                                        }}
                                    >
                                        <TrashIcon className="w-[30px] stroke-white stroke-[1.7] fill-none" />
                                    </DeleteButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative flex min-h-[200px] items-center justify-center rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px]">
                    <div className="font-bold text-3xl z-1">
                        Список типів порожній
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
};
