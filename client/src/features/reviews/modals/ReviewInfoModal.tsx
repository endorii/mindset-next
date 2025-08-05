"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InfoModalBanner } from "@/shared/ui/components";
import InfoField from "@/shared/ui/inputs/InfoField";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import Link from "next/link";
import { createPortal } from "react-dom";
import { IReview } from "../types/reviews.types";
import { formatDate } from "@/shared/utils/formatDate";

export interface ReviewInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: IReview;
}

export default function ReviewInfoModal({
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
        <ModalWrapper onClose={onClose} modalTitle={"Інформація про відгук"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">
                            Інформація про відправника
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="ID користувача" value={userId} />
                            <InfoField
                                label="Ім'я та прізвище відправника"
                                value={senderName}
                            />
                            <InfoField
                                label="Електронна адреса"
                                value={senderEmail ? senderEmail : "-"}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Інформація про відгук</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Оцінка" value={rating} />
                            <InfoField
                                label="Статус"
                                value={
                                    isApproved
                                        ? "Опубліковано"
                                        : "Не опубліковано"
                                }
                            />
                            <InfoField label="Лайків" value={isHelpful} />
                            <InfoField label="Дизлайків" value={isNotHelpful} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Допоміжна інформація</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField
                                label="Відповідь адміністратора"
                                value={adminReply ? adminReply : "Не вказано"}
                            />
                            <InfoField
                                label="Дата відповіді адміністратора"
                                value={formatDate(adminReplyAt) || "Не вказано"}
                            />
                            <InfoField
                                label="Дата стоврення"
                                value={formatDate(createdAt) || "Не вказано"}
                            />
                            <InfoField
                                label="Дата редагування"
                                value={formatDate(updatedAt) || "Не вказано"}
                            />
                        </div>
                    </div>
                </div>
                <InfoField label="Текст відгуку" value={content} />
                {/* <InfoField label="Прикладені фото" value={userId} /> */}
                <div className="flex flex-col gap-[10px]">
                    <div className="text-lg">Інформація про товар</div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px]">
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr+1fr] gap-[15px] p-4 rounded-t-lg font-semibold text-sm">
                            <div>Банер</div>
                            <div>Назва</div>
                            <div>Колір</div>
                            <div>Розмір</div>
                            <div>Тип</div>
                            <div>Кількість</div>
                            <div>Сума замовлення</div>
                            <div>Посилання на товар</div>
                        </div>

                        <div className="border border-white/10 rounded-xl">
                            {orderItem ? (
                                <div
                                    key={orderItem.id}
                                    className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[15px] p-4 border-b border-white/10 last:border-b-0 items-center"
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
                                        {Number(orderItem.product?.price) *
                                            Number(orderItem.quantity)}
                                        ,00 грн.
                                    </div>
                                    <Link
                                        className="underline text-center text-blue-500 hover:text-white"
                                        href={`/${orderItem.product?.category?.collection?.path}/${orderItem.product?.category?.path}/${orderItem.product?.path}`}
                                    >
                                        Товар
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-4 text-sm text-white/60">
                                    Товарів не знайдено
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <FormButtonsWrapper>
                    <MonoButton onClick={onClose}>Закрити</MonoButton>
                </FormButtonsWrapper>
            </FormFillingWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
