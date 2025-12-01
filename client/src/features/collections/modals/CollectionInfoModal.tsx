"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButtonUnderlined } from "@/shared/ui/buttons";
import {
    InfoField,
    InfoModalBanner,
    TextareaInfoField,
} from "@/shared/ui/components";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils";
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
        isVisible,
        description,
        createdAt,
        updatedAt,
        categories,
        banner,
    } = collection;

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={`${name} collection information`}
        >
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label={"Name"} value={name} />
                    <InfoField label={"Path"} value={path} />
                    <InfoField
                        label={"Status"}
                        value={isVisible === false ? "Not visible" : "Visible"}
                    />
                </div>
                <TextareaInfoField label={"Description"} value={description} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField
                        label="Created"
                        value={formatDate(createdAt || "")}
                    />
                    <InfoField
                        label="Edited"
                        value={formatDate(updatedAt || "")}
                    />
                    <InfoField
                        label={"Number of categories"}
                        value={categories?.length}
                    />
                </div>
                <InfoModalBanner image={banner || ""} />
            </FormFillingWrapper>
            <FormButtonsWrapper>
                <MonoButtonUnderlined onClick={onClose}>
                    Close
                </MonoButtonUnderlined>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
