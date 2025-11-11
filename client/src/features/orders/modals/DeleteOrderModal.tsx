"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton, MonoButton } from "@/shared/ui/buttons";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteOrder } from "../hooks/useOrders";
import { IOrder } from "../types/orders.types";

interface DeleteOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: IOrder;
}

export function DeleteOrderModal({
    isOpen,
    onClose,
    order,
}: DeleteOrderModalProps) {
    const deleteOrderMutation = useDeleteOrder();

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (!order.id) return;
        await deleteOrderMutation.mutateAsync(order.id);
        onClose();
    };

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення замовлення"}>
            <div className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                Ви дійсно хочете видалити замовлення?
            </div>
            <FormButtonsWrapper>
                <MonoButton type="button" onClick={onClose}>
                    Скасувати
                </MonoButton>
                <DeleteButton onClick={handleDelete}>Видалити</DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
