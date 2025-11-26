"use client";

import { IOrderItem } from "@/features/orders/types/orders.types";
import { useEscapeKeyClose, useUploadImages } from "@/shared/hooks";
import { TrashIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { Label } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
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
    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const uploadImagesMutation = useUploadImages();

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

    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImages((prev) => [...prev, ...files]);
        setImagesPreview((prev) => [
            ...prev,
            ...files.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: FormValues) => {
        if (!selectedOrderItem?.id || !selectedOrderItem.product?.id) return;

        try {
            const review = await createReviewMutation.mutateAsync({
                content: data.content,
                rating: data.rating,
                senderEmail: data.senderEmail,
                senderName: data.senderName,
                orderItemId: selectedOrderItem.id,
                productId: selectedOrderItem.product?.id,
            });

            if (!review.data?.id) {
                throw new Error("Failed to get review ID");
            }

            images.length
                ? await uploadImagesMutation.mutateAsync({
                      type: "reviews",
                      entityId: review.data.id,
                      images,
                  })
                : { paths: [] };
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
                    <div className="flex flex-col gap-[3px] w-full">
                        <Label>Review images</Label>
                        <label
                            htmlFor="images"
                            className={`group border min-h-[200px] border-dashed border-white/5 flex items-center justify-center cursor-pointer hover:bg-white/3 overflow-hidden group-hover:text-white transition-all duration-300`}
                        >
                            <span className="text-3xl font-light text-neutral-500 group-hover:text-white transition-all duration-300">
                                +
                            </span>
                        </label>
                        <input
                            type="file"
                            id="images"
                            multiple
                            accept="image/*"
                            onChange={handleImagesChange}
                            className="hidden"
                        />

                        <div className="flex flex-wrap gap-[15px] mt-4 max-w-[700px]">
                            {imagesPreview.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative group max-h-[150px] group cursor-pointer"
                                    onClick={() => removeImage(i)}
                                >
                                    <Image
                                        src={src}
                                        alt={`img-${i}`}
                                        width={150}
                                        height={150}
                                        className="max-h-[150px] object-contain"
                                    />
                                    <div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 top-0 right-0 bg-black/50 backdrop-blur-lg w-full h-full transition-all duration-200">
                                        <TrashIcon className="w-[40px] fill-none  stroke-white stroke-[1.2] " />
                                    </div>
                                </div>
                            ))}
                        </div>
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
                        disabled={
                            createReviewMutation.isPending ||
                            uploadImagesMutation.isPending
                        }
                    >
                        {createReviewMutation.isPending ||
                        uploadImagesMutation.isPending
                            ? "Loading..."
                            : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
