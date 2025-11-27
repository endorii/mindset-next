"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
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
        <ModalWrapper onClose={onClose} modalTitle={"Deletting order"}>
            <div className="text-neutral-200 text-[16px] leading-[1.6] font-light">
                Do you really want to Delete the order?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined
                    type="button"
                    onClick={onClose}
                    disabled={deleteOrderMutation.isPending}
                >
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={handleDelete}
                    disabled={deleteOrderMutation.isPending}
                >
                    {deleteOrderMutation.isPending ? "Deletting..." : "Delete"}
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
