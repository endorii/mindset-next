import { IColor } from "@/features/admin/attributes/product-colors/types/product-color.types";
import {
    EditColorModal,
    DeleteColorModal,
    AddColorModal,
} from "@/features/admin";
import {
    ButtonWithIcon,
    DeleteButtonWithIcon,
    MonoButton,
} from "@/shared/ui/buttons";
import { EditIcon, TrashIcon, PaletteIcon } from "@/shared/icons";
import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { useState } from "react";
import TitleWithAddElementButton from "../../components/TitleWithAddElementButton";
import {
    FilterSectionSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
import ColorsSkeleton from "@/shared/ui/skeletons/ColorsSkeleton";

export const ColorSection = () => {
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | null
    >(null);
    const [selected, setSelected] = useState<IColor | null>(null);

    const { data: colors, isPending: isColorsPending } = useColors();

    if (isColorsPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <TitleWithButtonSkeleton />
                <ColorsSkeleton />
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
                title={"Список кольорів"}
                onClick={() => setModalType("add")}
                buttonText={"Додати колір"}
            />

            {colors && (colors ?? []).length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-4 
                    md:grid-cols-3 
                    xs:grid-cols-2 
                    gap-[15px] p-[20px] font-semibold text-sm"
                    >
                        <div className="xs:hidden">Колір</div>
                        <div>Назва</div>
                        <div className="md:hidden">Код</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {colors.map((color) => (
                            <div
                                key={color.id}
                                className="grid 
                                grid-cols-4 
                                md:grid-cols-3 
                                xs:grid-cols-2 
                                gap-[15px] p-[20px] border-b border-white/10 items-center text-sm"
                            >
                                <div className="border border-white/10 rounded w-[52px] h-[52px] xs:hidden">
                                    <div
                                        className="w-[50px] h-[50px] rounded"
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
                <div className="relative flex min-h-[200px] items-center justify-center rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px]">
                    <div className="font-bold text-3xl z-1">
                        Список кольорів порожній
                    </div>
                    <PaletteIcon className="absolute fill-black top-[-60px] right-20 w-[400px] opacity-20 pointer-events-none" />
                </div>
            )}

            <AddColorModal isOpen={modalType === "add"} onClose={closeModal} />
            {selected && (
                <>
                    <EditColorModal
                        isOpen
                        onClose={closeModal}
                        color={selected}
                    />
                    <DeleteColorModal
                        isOpen
                        onClose={closeModal}
                        color={selected}
                    />
                </>
            )}
        </>
    );
};
