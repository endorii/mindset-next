"use client";

import { IOrderItem } from "@/features/orders/types/orders.types";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { StarRating } from "../components";
import { useCreateReview } from "../hooks/useReviews";

interface AddReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedOrderItem: IOrderItem | null;
}

type FormValues = {
    content: string;
    rating: string;
    senderName: string;
    senderEmail: string;
};

export function AddReviewModal({
    isOpen,
    onClose,
    selectedOrderItem,
}: AddReviewModalProps) {
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            content: "",
            rating: "",
            senderName: "",
            senderEmail: "",
        },
    });

    const createReviewMutation = useCreateReview();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        if (!selectedOrderItem?.id || !selectedOrderItem.product?.id) return;

        try {
            await createReviewMutation.mutateAsync({
                content: data.content,
                rating: data.rating,
                senderEmail: data.senderEmail,
                senderName: data.senderName,
                orderItemId: selectedOrderItem.id,
                productId: selectedOrderItem.product?.id,
            });
            handleClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error creating review");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Leave a review"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <StarRating
                        control={control}
                        errorMessage={errors.rating?.message || ""}
                    />

                    <BasicTextarea
                        className="min-w-[600px]"
                        label={"Review*"}
                        register={register("content", {
                            required: "Enter your review text",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters",
                            },
                        })}
                        errorMessage={errors.content?.message}
                    />

                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label={"Your name and surname*"}
                            type={"text"}
                            placeholder={""}
                            {...register("senderName", {
                                required: "The field is required.",
                                pattern: {
                                    value: /^[А-ЯІЇЄҐа-яіїєґA-Za-z]+\s+[А-ЯІЇЄҐа-яіїєґA-Za-z]+$/,
                                    message:
                                        "Enter both first and last name separated by a space",
                                },
                            })}
                            errorMessage={errors.senderName?.message}
                        />
                        <InputField
                            label={"E-mail*"}
                            type="email"
                            placeholder=""
                            {...register("senderEmail", {
                                required: "Enter e-mail",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email format",
                                },
                            })}
                            errorMessage={errors.senderEmail?.message}
                        />
                    </div>
                </FormFillingWrapper>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButtonUnderlined
                        type="button"
                        onClick={handleClose}
                        disabled={createReviewMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={createReviewMutation.isPending}
                    >
                        {createReviewMutation.isPending ? "Loading..." : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
