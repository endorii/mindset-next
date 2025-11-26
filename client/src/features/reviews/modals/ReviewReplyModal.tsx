"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { Label } from "@/shared/ui/components";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useEditReview } from "../hooks/useReviews";
import { IReview } from "../types/reviews.types";

export interface ReviewReplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

type FormValues = {
    adminReply: string;
};

export function ReviewReplyModal({
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
        } catch (err: any) {
            setModalMessage(err?.message || "Error creating admin response");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !onClose) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Reply to review"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[10px]">
                        <div className="text-lg">Review information</div>
                        <div className="grid grid-cols-3 gap-[15px]">
                            <InfoField
                                label="Sender's first and last name"
                                value={senderName}
                            />
                            <InfoField
                                label="E-mail"
                                value={senderEmail ? senderEmail : "-"}
                            />
                            <InfoField label="Rating" value={rating} />
                        </div>
                    </div>
                    <InfoField label="Review text" value={content} />
                    {review.images && (
                        <div className="flex flex-col gap-[3px]">
                            <Label>Additional images</Label>
                            <div className="flex flex-wrap gap-[15px] mt-4 max-w-[700px]">
                                {review.images.length > 0 ? (
                                    review.images.map((image, i) => (
                                        <Image
                                            key={i}
                                            src={image}
                                            alt={`Images ${i + 1}`}
                                            width={150}
                                            height={150}
                                            className="w-[200px] object-contain"
                                        />
                                    ))
                                ) : (
                                    <div className="text-white opacity-50">
                                        No images
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-[10px]">
                        <div className="text-lg">
                            Write a response to a review
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <BasicTextarea
                                label="Administrator response"
                                register={register("adminReply", {
                                    required: "Enter the review text",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters",
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
                        <MonoButtonUnderlined onClick={onClose}>
                            Close
                        </MonoButtonUnderlined>
                        <MonoButton type="submit">Send</MonoButton>
                    </FormButtonsWrapper>
                </FormFillingWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
