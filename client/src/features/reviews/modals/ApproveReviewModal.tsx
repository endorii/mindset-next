"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { toast } from "sonner";
import { IReview } from "../types/reviews.types";
import { useApproveReview } from "../hooks/useReviews";

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

        try {
            await approveReviewMutation.mutateAsync(review.id);
            toast.success("Відгук успішно опубліковано!");
        } catch (e) {
            toast.error("Помилка при публікації відгуку");
        }
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
