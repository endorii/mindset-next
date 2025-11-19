"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils/formatDate";
import { createPortal } from "react-dom";
import { IOrder } from "../types/orders.types";

export interface OrderInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: IOrder;
}

export function OrderInfoModal({
    isOpen,
    onClose,
    order,
}: OrderInfoModalProps) {
    const {
        fullName,
        phoneNumber,
        email,
        total,
        city,
        area,
        postDepartment,
        status,
        createdAt,
        updatedAt,
        items,
        additionalInfo,
    } = order;

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !onClose) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Order information"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Contact information</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Full name" value={fullName} />
                            <InfoField
                                label="Phone number"
                                value={phoneNumber}
                            />
                            <InfoField
                                label="E-mail"
                                value={email || "Not specified"}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Delivery address</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Region" value={area} />
                            <InfoField label="City" value={city} />
                            <InfoField
                                label="Branch/post office"
                                value={postDepartment}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Order information</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Status" value={status} />
                            <InfoField label="Sum of order" value={total} />
                            <InfoField
                                label="Additional information"
                                value={additionalInfo || "Not specified"}
                            />
                            <InfoField
                                label="Creation date"
                                value={
                                    formatDate(createdAt || "") ||
                                    "Not specified"
                                }
                            />
                            <InfoField
                                label="Edit date"
                                value={
                                    formatDate(updatedAt || "") ||
                                    "Not specified"
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="text-lg">List of products</div>
                    <div className="  bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px]">
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[15px] p-[20px] rounded-t-lg font-semibold text-sm">
                            <div>Collection</div>
                            <div>Category</div>
                            <div>Product name</div>
                            <div>Quantity</div>
                            <div>Color</div>
                            <div>Size</div>
                            <div>Type</div>
                            <div>Price, $</div>
                        </div>

                        <div className="border border-white/10  ">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[15px] p-[20px] border-b border-white/10 last:border-b-0 items-center"
                                    >
                                        <div>
                                            {item.product?.category?.collection
                                                ?.name || "-"}
                                        </div>
                                        <div>
                                            {item.product?.category?.name ||
                                                "-"}
                                        </div>
                                        <div>{item.product?.name || "-"}</div>
                                        <div>{item.quantity || "-"}</div>
                                        <div>{item.color || "-"}</div>
                                        <div>{item.size || "-"}</div>
                                        <div>{item.type || "-"}</div>
                                        <div>
                                            {item.product?.price?.toLocaleString() ||
                                                "-"}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-[20px] text-sm text-white/60">
                                    Products not found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <FormButtonsWrapper>
                    <MonoButton onClick={onClose}>Close</MonoButton>
                </FormButtonsWrapper>
            </FormFillingWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
