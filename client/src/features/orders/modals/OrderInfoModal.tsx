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
        <ModalWrapper
            onClose={onClose}
            modalTitle={"Інформація про замовлення"}
        >
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Контактна інформація</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField
                                label="Ініціали замовника (ПІБ)"
                                value={fullName}
                            />
                            <InfoField
                                label="Номер телефону"
                                value={phoneNumber}
                            />
                            <InfoField
                                label="Електронна пошта"
                                value={email || "Не вказано"}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Адреса доставки</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Область" value={area} />
                            <InfoField label="Місто" value={city} />
                            <InfoField
                                label="Відділення/поштомат"
                                value={postDepartment}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-lg">Інформація про замовлення</div>
                        <div className="flex flex-col gap-[15px]">
                            <InfoField label="Статус" value={status} />
                            <InfoField label="Сума замовлення" value={total} />
                            <InfoField
                                label="Додаткова інформація"
                                value={additionalInfo || "Не вказано"}
                            />
                            <InfoField
                                label="Дата стоврення"
                                value={
                                    formatDate(createdAt || "") || "Не вказано"
                                }
                            />
                            <InfoField
                                label="Дата редагування"
                                value={
                                    formatDate(updatedAt || "") || "Не вказано"
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="text-lg">Список товарів</div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px]">
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[15px] p-[20px] rounded-t-lg font-semibold text-sm">
                            <div>Колекція</div>
                            <div>Категорія</div>
                            <div>Назва товару</div>
                            <div>Кількість</div>
                            <div>Колір</div>
                            <div>Розмір</div>
                            <div>Тип</div>
                            <div>Price, $</div>
                        </div>

                        <div className="border border-white/10 rounded-xl">
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
