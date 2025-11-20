"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { InfoModalBanner } from "@/shared/ui/components";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { createPortal } from "react-dom";
import { IReview } from "../types/reviews.types";

export interface ReviewInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

export function ReviewInfoModal({
    isOpen,
    onClose,
    review,
}: ReviewInfoModalProps) {
    const {
        content,
        rating,
        userId,
        senderName,
        senderEmail,
        orderItem,
        createdAt,
        updatedAt,
        isApproved,
        isHelpful,
        isNotHelpful,
        images,
        adminReply,
        adminReplyAt,
    } = review;

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !onClose) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Review information"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="text-2xl font-perandory tracking-wider">
                            Sender information
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="User ID" value={userId} />
                            <InfoField
                                label="Sender's first and last name"
                                value={senderName}
                            />
                            <InfoField
                                label="E-mail"
                                value={senderEmail ? senderEmail : "-"}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="text-2xl font-perandory tracking-wider">
                            Review information
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Rating" value={rating} />
                            <InfoField
                                label="Status"
                                value={
                                    isApproved ? "Published" : "Not published"
                                }
                            />
                            <InfoField label="Likes" value={isHelpful} />
                            <InfoField label="Dislikes" value={isNotHelpful} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="text-2xl font-perandory tracking-wider">
                            Supporting information
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField
                                label="Administrator response"
                                value={
                                    adminReply ? adminReply : "Not specified"
                                }
                            />
                            <InfoField
                                label="Administrator response date"
                                value={
                                    formatDate(adminReplyAt) || "Not specified"
                                }
                            />
                            <InfoField
                                label="Creation date"
                                value={formatDate(createdAt) || "Not specified"}
                            />
                            <InfoField
                                label="Edit date"
                                value={formatDate(updatedAt) || "Not specified"}
                            />
                        </div>
                    </div>
                </div>
                <InfoField label="Review text" value={content} />

                <div className="flex flex-col gap-[10px]">
                    <div className="text-2xl font-perandory tracking-wider">
                        Product information
                    </div>
                    <div className="  bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px]">
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr+1fr] gap-[15px] p-[20px] rounded-t-lg font-semibold text-sm">
                            <div>Banner</div>
                            <div>Name</div>
                            <div>Color</div>
                            <div>Size</div>
                            <div>Type</div>
                            <div>Quantity</div>
                            <div>Sum of order</div>
                            <div>Link</div>
                        </div>

                        <div className="border border-white/10  ">
                            {orderItem ? (
                                <div
                                    key={orderItem.id}
                                    className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[15px] p-[20px] border-b border-white/10 last:border-b-0 items-center"
                                >
                                    <InfoModalBanner
                                        w={100}
                                        image={orderItem.product?.banner || ""}
                                    />

                                    <div>{orderItem.product?.name}</div>
                                    <div>{orderItem.color}</div>
                                    <div>{orderItem.size}</div>
                                    <div>{orderItem.type}</div>
                                    <div>{orderItem.quantity}</div>

                                    <div>
                                        $
                                        {Number(orderItem.product?.price) *
                                            Number(orderItem.quantity)}
                                    </div>
                                    <Link
                                        className="underline text-center text-blue-500 hover:text-white"
                                        href={`/${orderItem.product?.category?.collection?.path}/${orderItem.product?.category?.path}/${orderItem.product?.path}`}
                                    >
                                        Product
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-[20px] text-sm text-neutral-200">
                                    Products not found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <FormButtonsWrapper>
                    <MonoButtonUnderlined onClick={onClose}>
                        Close
                    </MonoButtonUnderlined>
                </FormButtonsWrapper>
            </FormFillingWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
