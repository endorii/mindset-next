"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteReview } from "../hooks/useReviews";
import { IReview } from "../types/reviews.types";

interface DeleteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

export function DeleteReviewModal({
    isOpen,
    onClose,
    review,
}: DeleteReviewModalProps) {
    if (!isOpen) return null;

    const deleteReviewMutation = useDeleteReview();

    const handleDelete = async () => {
        if (!review.id) return;
        await deleteReviewMutation.mutateAsync(review.id);
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting review"}>
            <div className="text-neutral-200 text-[16px] leading-[1.6] font-light">
                Do you really want to Delete product review{" "}
                <span className="font-semibold underline">
                    {review.orderItem?.product?.name}
                </span>{" "}
                by{" "}
                <span className="font-semibold underline">
                    {review.senderEmail}
                </span>
                ?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined onClick={onClose}>
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={() => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Delete
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
