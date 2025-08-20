import { AddSizeModal, EditSizeModal, DeleteSizeModal } from "@/features/admin";
import {
    ButtonWithIcon,
    DeleteButtonWithIcon,
    MonoButton,
} from "@/shared/ui/buttons";
import { PlusIcon, EditIcon, TrashIcon, PaletteIcon } from "@/shared/icons";
import { useState } from "react";
import { useSizes } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";
import TitleWithAddElementButton from "../../components/TitleWithAddElementButton";
import {
    SizesAndTypesSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";

export const SizeSection = () => {
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | null
    >(null);
    const [selected, setSelected] = useState<ISize | null>(null);

    const { data: sizes, isPending: isSizesPending } = useSizes();

    if (isSizesPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <TitleWithButtonSkeleton />
                <SizesAndTypesSkeleton />
            </div>
        );
    }

    const closeModal = () => {
        setModalType(null);
        setSelected(null);
    };

    return (
        <>
            <TitleWithAddElementButton
                title={"Список розмірів"}
                onClick={() => setModalType("add")}
                buttonText={"Додати розмір"}
            />

            {sizes && (sizes ?? []).length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-2 
                    gap-[15px] p-[20px] font-semibold text-sm"
                    >
                        <div>Назва</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {sizes.map((size) => (
                            <div
                                key={size.id}
                                className="grid 
                                grid-cols-2 
                                gap-[15px] p-[20px] border-b border-white/10 items-center text-sm"
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
                <div className="relative flex min-h-[200px] items-center justify-center rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px]">
                    <div className="font-bold text-3xl z-1">
                        Список розмірів порожній
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
};
