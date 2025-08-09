"use client";

import { IOrderItem } from "@/features/orders/types/orders.types";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import BasicTextarea from "@/shared/ui/textareas/BasicTextarea";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

export default function AddReviewModal({
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
            toast.success("Відгук упішно додано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при створенні відгуку");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Залишити відгук"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <StarRating
                        control={control}
                        errorMessage={errors.rating?.message || ""}
                    />

                    <BasicTextarea
                        className="min-w-[600px]"
                        label={"Відгук*"}
                        register={register("content", {
                            required: "Введіть текст відгуку",
                            minLength: {
                                value: 3,
                                message: "Мінімум 3 символи",
                            },
                        })}
                        errorMessage={errors.content?.message}
                    />

                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label={"Ваше ім'я та прізвище*"}
                            type={"text"}
                            placeholder={""}
                            {...register("senderName", {
                                required: "Поле є обов’язковим",
                                pattern: {
                                    value: /^[А-ЯІЇЄҐа-яіїєґA-Za-z]+\s+[А-ЯІЇЄҐа-яіїєґA-Za-z]+$/,
                                    message:
                                        "Введіть і ім’я, і прізвище через пробіл",
                                },
                            })}
                            errorMessage={errors.senderName?.message}
                        />
                        <InputField
                            label={"Електронна пошта*"}
                            type="email"
                            placeholder=""
                            {...register("senderEmail", {
                                required: "Введіть електронну пошту",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message:
                                        "Невірний формат електронної пошти",
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
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={createReviewMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={createReviewMutation.isPending}
                    >
                        {createReviewMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
