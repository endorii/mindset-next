"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { IUserShippingAdress } from "../../user-info/types/user.types";
import { useEditUserAddress } from "../hooks/useUserAddress";

interface EditUserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: IUserShippingAdress | undefined;
}

interface FormInputs {
    recipient: string;
    country: string;
    region: string;
    city: string;
    postalCode: string;
    street: string;
    building: string;
    apartment: string;
}

export function EditUserAddressModal({
    isOpen,
    onClose,
    address,
}: EditUserAddressModalProps) {
    const editUserAddress = useEditUserAddress();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            recipient: "",
            country: "",
            region: "",
            city: "",
            postalCode: "",
            street: "",
            building: "",
            apartment: "",
        },
    });

    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        if (address) {
            reset({
                recipient: address.recipient || "",
                country: address.country || "",
                region: address.region || "",
                city: address.city || "",
                postalCode: address.postalCode || "",
                street: address.street || "",
                building: address.building || "",
                apartment: address.apartment || "",
            });
            setModalMessage("");
        }
    }, [address, reset]);

    const onSubmit = async (data: FormInputs) => {
        try {
            await editUserAddress.mutateAsync(data);
            onClose();
        } catch (err: any) {
            setModalMessage(
                err?.message || "Помилка редагування адреси доставки"
            );
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !address) return null;

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={"Edit personal delivery address"}
        >
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Recepient (Full name)*"
                            type="text"
                            {...register("recipient", {
                                required: "Enter recipient full name",
                            })}
                            errorMessage={errors.recipient?.message}
                        />
                        <InputField
                            label="County*"
                            type="text"
                            {...register("country", {
                                required: "Enter country",
                            })}
                            errorMessage={errors.country?.message}
                        />
                        <InputField
                            label="Region*"
                            type="text"
                            {...register("region", {
                                required: "Enter region",
                            })}
                            errorMessage={errors.region?.message}
                        />
                        <InputField
                            label="City*"
                            type="text"
                            {...register("city", {
                                required: "Enter city",
                            })}
                            errorMessage={errors.city?.message}
                        />
                        <InputField
                            label="Street*"
                            type="text"
                            {...register("street", {
                                required: "Enter street",
                            })}
                            errorMessage={errors.street?.message}
                        />
                        <InputField
                            label="Builing*"
                            type="text"
                            {...register("building", {
                                required: "Enter building",
                            })}
                            errorMessage={errors.building?.message}
                        />
                        <InputField
                            label="Appartment/house number*"
                            type="text"
                            {...register("apartment", {
                                required: "Enter apartment/house number",
                            })}
                            errorMessage={errors.apartment?.message}
                        />
                        <InputField
                            label="Postal code*"
                            type="text"
                            {...register("postalCode", {
                                required: "Enter postal code",
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: "Має бути рівно 5 цифр",
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
                    <MonoButton onClick={onClose}>Cancel</MonoButton>
                    <MonoButton type="submit">Confirm</MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
