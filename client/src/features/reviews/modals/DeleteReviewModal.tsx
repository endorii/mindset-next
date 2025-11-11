"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton, MonoButton } from "@/shared/ui/buttons";
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
        <ModalWrapper onClose={onClose} modalTitle={"Видалення відгуку"}>
            <div className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                Ви дійсно хочете видалити відгук до товару{" "}
                <span className="font-semibold text-white">
                    {review.product?.name}
                </span>
                ?
            </div>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <DeleteButton
                    onClick={() => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Видалити
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
