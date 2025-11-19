"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InfoModalBanner, TextareaInfoField } from "@/shared/ui/components";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils/formatDate";
import { createPortal } from "react-dom";
import { ICollection } from "../types/collections.types";

export interface CollectionInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

export function CollectionInfoModal({
    isOpen,
    onClose,
    collection,
}: CollectionInfoModalProps) {
    if (!isOpen || !collection) return null;

    const {
        name,
        path,
        status,
        description,
        views,
        createdAt,
        updatedAt,
        categories,
        banner,
    } = collection;

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={`Collection information ${name}`}
        >
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label={"Name"} value={name} />
                    <InfoField label={"Path"} value={path} />
                    <InfoField label={"Status"} value={status} />
                </div>
                <TextareaInfoField label={"Description"} value={description} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label={"Views"} value={views} />
                    <InfoField
                        label="Created"
                        value={formatDate(createdAt || "")}
                    />
                    <InfoField
                        label="Editet"
                        value={formatDate(updatedAt || "")}
                    />
                    <InfoField
                        label={"Number of categories"}
                        value={categories?.length}
                    />
                </div>
                <InfoModalBanner image={banner} />
            </FormFillingWrapper>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Close</MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
