"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InfoField from "@/shared/ui/inputs/InfoField";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { IReview } from "../types/reviews.types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEditReview } from "../hooks/useReviews";
import { toast } from "sonner";
import BasicTextarea from "@/shared/ui/textareas/BasicTextarea";

export interface ReviewReplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

type FormValues = {
    adminReply: string;
};

export default function ReviewReplyModal({
    isOpen,
    onClose,
    review,
}: ReviewReplyModalProps) {
    const { content, rating, senderName, senderEmail } = review;

    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            adminReply: "",
        },
    });

    useEffect(() => {
        if (isOpen && review) {
            reset({
                adminReply: review.adminReply || "",
            });
        }
    }, [isOpen, review, reset]);

    const editReviewMutation = useEditReview();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        if (!review.id) return;

        try {
            await editReviewMutation.mutateAsync({
                reviewId: review.id,
                data: {
                    adminReply: data.adminReply,
                    adminReplyAt: new Date().toISOString(),
                },
            });

            handleClose();
            toast.success("Відповідь адміністратора упішно додано!");
        } catch (err: any) {
            setModalMessage(
                err?.message || "Помилка при створенні відповіді адміністратора"
            );
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !onClose) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Відповідь на відгук"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[20px]">
                        <div className="text-lg">Інформація про відгук</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <InfoField
                                label="Ім'я та прізвище відправника"
                                value={senderName}
                            />
                            <InfoField
                                label="Електронна адреса"
                                value={senderEmail ? senderEmail : "-"}
                            />
                            <InfoField label="Оцінка" value={rating} />
                        </div>
                    </div>
                    <InfoField label="Текст відгуку" value={content} />
                    {/* <InfoField label="Прикладені зображення" value={images} /> */}
                    <div className="flex flex-col gap-[20px]">
                        <div className="text-lg">
                            Написати відовідь на відгук
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            <BasicTextarea
                                label="Відповідь адміністратора"
                                register={register("adminReply", {
                                    required: "Введіть текст відгуку",
                                    minLength: {
                                        value: 3,
                                        message: "Мінімум 3 символи",
                                    },
                                })}
                                errorMessage={errors.adminReply?.message}
                            />
                        </div>
                    </div>
                    {modalMessage && (
                        <p className="text-red-500 text-sm">{modalMessage}</p>
                    )}
                    <FormButtonsWrapper>
                        <MonoButton onClick={onClose}>Закрити</MonoButton>
                        <MonoButton type="submit">Надіслати</MonoButton>
                    </FormButtonsWrapper>
                </FormFillingWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
