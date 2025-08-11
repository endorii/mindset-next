"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useApproveReview } from "../hooks/useReviews";
import { IReview } from "../types/reviews.types";

interface ApproveReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

export default function ApproveReviewModal({
    isOpen,
    onClose,
    review,
}: ApproveReviewModalProps) {
    if (!isOpen) return null;

    const approveReviewMutation = useApproveReview();

    const handleApprove = async () => {
        if (!review.id) return;
        await approveReviewMutation.mutateAsync(review.id);
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Підтвердження публікації"}>
            <div className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                Ви дійсно підтверджуєте піблікацію відгуку до товару{" "}
                <span className="font-semibold text-white">
                    {review.product?.name}
                </span>
                ?
            </div>

            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <MonoButton
                    onClick={() => {
                        onClose();
                        handleApprove();
                    }}
                >
                    Опублікувати
                </MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
