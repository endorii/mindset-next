"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { InputField } from "@/shared/ui/inputs/InputField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { IUser } from "../../user-info/types/user.types";
import { useCreateUserAddress } from "../hooks/useUserAddress";

interface AddUserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: IUser["id"];
}

type FormValues = {
    recipient: string;
    country: string;
    region: string;
    city: string;
    postalCode: string;
    street: string;
    building: string;
    apartment: string;
};

export function AddUserAddressModal({
    isOpen,
    onClose,
    userId,
}: AddUserAddressModalProps) {
    const createUserAddressMutation = useCreateUserAddress();
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await createUserAddressMutation.mutateAsync({
                userId,
                ...data,
            });
            handleClose();
        } catch (error: any) {
            console.error("Error adding shipping address:", error);
            setModalMessage(error?.message || "An error occurred.");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper
            onClose={handleClose}
            modalTitle={"Add personal delivery address (optional)"}
        >
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label={"Recipient (Full Name)*"}
                            placeholder={"John Doe Smith"}
                            type="text"
                            {...register("recipient", {
                                required: "Enter recipient name",
                            })}
                            errorMessage={errors.recipient?.message}
                        />
                        <InputField
                            label={"Country*"}
                            placeholder={"Ukraine"}
                            type="text"
                            {...register("country", {
                                required: "Enter country",
                            })}
                            errorMessage={errors.country?.message}
                        />
                        <InputField
                            label={"Region*"}
                            placeholder={"Kyivska"}
                            type="text"
                            {...register("region", {
                                required: "Enter region",
                            })}
                            errorMessage={errors.region?.message}
                        />
                        <InputField
                            label={"City*"}
                            placeholder={"Kyiv"}
                            type="text"
                            {...register("city", {
                                required: "Enter city",
                            })}
                            errorMessage={errors.city?.message}
                        />
                        <InputField
                            label={"Address (street)*"}
                            placeholder={"Shevchenko street"}
                            type="text"
                            {...register("street", {
                                required: "Enter street",
                            })}
                            errorMessage={errors.street?.message}
                        />
                        <InputField
                            label={"Building*"}
                            placeholder={"45"}
                            type="text"
                            {...register("building", {
                                required: "Enter building",
                            })}
                            errorMessage={errors.building?.message}
                        />
                        <InputField
                            label={"Number of appartment/house*"}
                            placeholder={"12"}
                            type="text"
                            {...register("apartment", {
                                required: "Enter apartment/house number",
                            })}
                            errorMessage={errors.apartment?.message}
                        />
                        <InputField
                            label={"Postal code*"}
                            placeholder={"01001"}
                            type="text"
                            {...register("postalCode", {
                                required: "Enter postal code",
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: "Must be exactly 5 digits",
                                },
                            })}
                            errorMessage={errors.postalCode?.message}
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
                        disabled={createUserAddressMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={createUserAddressMutation.isPending}
                    >
                        {createUserAddressMutation.isPending
                            ? "Processing..."
                            : "Add address"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
