"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import AddCollectionModal from "@/features/collections/modals/AddCollectionModal";
import CollectionInfoModal from "@/features/collections/modals/CollectionInfoModal";
import DeleteCollectionModal from "@/features/collections/modals/DeleteCollectionModal";
import EditCollectionModal from "@/features/collections/modals/EditCollectionModal";
import { ICollection } from "@/features/collections/types/collections.types";
import {
    CategoriesIcon,
    EditIcon,
    InfoIcon,
    PlusIcon,
    TrashIcon,
} from "@/shared/icons";
import { ModalType } from "@/shared/types/types";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import ChooseButton from "@/shared/ui/buttons/ChooseButton";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import LinkWithIcon from "@/shared/ui/buttons/LinkWithIcon";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import React, { useState } from "react";

function AdminCollections() {
    const filters = [
        "спочатку нові",
        "oстанні оновлені",
        "по алфавіту",
        "кількість категорій",
        "кількість товарів",
    ];

    const { data, isError, error, isLoading } = useCollections();

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedCollection, setSelectedCollection] =
        useState<ICollection | null>(null);

    const openModal = (
        type: ModalType,
        collection: ICollection | null = null
    ) => {
        setSelectedCollection(collection);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedCollection(null);
        setActiveModal(null);
    };

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">Список колекцій:</div>
                <MonoButton onClick={() => openModal("add")}>
                    <div>Додати колекцію</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </MonoButton>
            </div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-semibold">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => (
                        <li key={i}>
                            <ChooseButton
                                onClick={function (): void {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            >
                                {name}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>
            {(data ?? []).length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px]  p-4 rounded-t-lg font-semibold text-sm">
                        <div>Банер</div>
                        <div>Назва</div>
                        <div>Статус</div>
                        <div>Переглядів</div>
                        <div>Додано/оновлено</div>
                        <div className="text-right">Дії</div>
                    </div>

                    <div className="border border-white/10 rounded-xl">
                        {data?.map((collection) => (
                            <div
                                key={collection.id}
                                className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4  border-b border-white/10 last:border-b-0 items-center"
                            >
                                <img
                                    src={`http://localhost:5000/${collection.banner}`}
                                    className="max-h-[120px] w-full object-cover rounded"
                                    alt="banner"
                                />
                                <div>{collection.name}</div>
                                <div>
                                    {collection.status === "ACTIVE"
                                        ? "Опубліковано"
                                        : collection.status === "INACTIVE"
                                        ? "Не опубліковано"
                                        : "Невідомий статус"}
                                </div>
                                <div>{collection.views}</div>
                                <div>
                                    {formatDate(collection.createdAt)} /{" "}
                                    {formatDate(collection.updatedAt)}
                                </div>
                                <div className="flex gap-[10px] justify-end">
                                    <LinkWithIcon
                                        href={`collections/${collection.path}`}
                                        counter={collection.categories?.length}
                                    >
                                        <CategoriesIcon className="w-[30px] fill-white group-hover:fill-black" />
                                    </LinkWithIcon>
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("info", collection)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("edit", collection)
                                        }
                                    >
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() =>
                                            openModal("delete", collection)
                                        }
                                    >
                                        <TrashIcon className="w-[30px] stroke-white stroke-[1.7]  fill-none" />
                                    </DeleteButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Колекції відсутні</div>
            )}
            <>
                <AddCollectionModal
                    isOpen={activeModal === "add"}
                    onClose={closeModal}
                />
                {selectedCollection && (
                    <>
                        <CollectionInfoModal
                            isOpen={activeModal === "info"}
                            onClose={closeModal}
                            collection={selectedCollection}
                        />
                        <EditCollectionModal
                            isOpen={activeModal === "edit"}
                            onClose={closeModal}
                            collection={selectedCollection}
                        />
                        <DeleteCollectionModal
                            isOpen={activeModal === "delete"}
                            onClose={closeModal}
                            collection={selectedCollection}
                        />
                    </>
                )}
            </>
        </div>
    );
}

export default AdminCollections;
