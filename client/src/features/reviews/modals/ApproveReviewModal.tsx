"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useApproveReview } from "../hooks/useReviews";
import { IReview } from "../types/reviews.types";

interface ApproveReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

export function ApproveReviewModal({
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
        <ModalWrapper onClose={onClose} modalTitle={"Publication confirmation"}>
            <div className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                Do you really confirm the publication of the product review?{" "}
                <span className="font-semibold text-white">
                    {review.product?.name}
                </span>
                ?
            </div>

            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Cancel</MonoButton>
                <MonoButton
                    onClick={() => {
                        onClose();
                        handleApprove();
                    }}
                >
                    Publish
                </MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
