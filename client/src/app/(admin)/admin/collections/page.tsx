"use client";

import CategoriesIcon from "@/components/Icons/CategoriesIcon";
import EditIcon from "@/components/Icons/EditIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
import AddCollectionModal from "@/components/Modals/collection/AddCollectionModal";
import CollectionInfoModal from "@/components/Modals/collection/CollectionInfoModal";
import DeleteCollectionModal from "@/components/Modals/collection/DeleteCollectionModal";
import EditCollectionModal from "@/components/Modals/collection/EditCollectionModal";
import { formatDate } from "@/lib/helpers/formatDate";
import { useCollections } from "@/lib/hooks/useCollections";
import { ICollection } from "@/types/collection/collection.types";
import { ModalType } from "@/types/types";
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
                <button
                    className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    onClick={() => openModal("add")}
                >
                    <div>Додати колекцію</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-semibold">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => (
                        <li key={i}>
                            <button className="border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-4 py-2">
                                {name}
                            </button>
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
                                    <Link
                                        href={`collections/${collection.path}`}
                                    >
                                        <button className="relative group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer">
                                            <div className="absolute top-[-5px] right-[-5px] bg-none w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold rounded-[50%] border-2 border-white text-white pt-[1px] z-[10] bg-black">
                                                {collection.categories?.length}
                                            </div>
                                            <CategoriesIcon className="w-[30px] fill-white group-hover:fill-black" />
                                        </button>
                                    </Link>
                                    <button
                                        className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                        onClick={() =>
                                            openModal("info", collection)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("edit", collection)
                                        }
                                        className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                    >
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("delete", collection)
                                        }
                                        className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                    >
                                        <TrashIcon className="w-[30px] stroke-white stroke-[1.7]  group-hover:stroke-black fill-none" />
                                    </button>
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
