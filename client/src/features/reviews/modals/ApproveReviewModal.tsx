"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
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
        onClose();
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Publication confirmation"}>
            <div className="text-neutral-200 text-[16px] leading-[1.6] font-light">
                Do you really confirm the publication of the product review{" "}
                <span className="font-semibold text-white">
                    {review.orderItem?.product?.name}
                </span>
                ?
            </div>

            <FormButtonsWrapper>
                <MonoButtonUnderlined
                    onClick={onClose}
                    disabled={approveReviewMutation.isPending}
                >
                    Cancel
                </MonoButtonUnderlined>
                <MonoButton
                    onClick={handleApprove}
                    disabled={approveReviewMutation.isPending}
                >
                    {approveReviewMutation.isPending
                        ? "Publishing..."
                        : "Publish"}
                </MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
