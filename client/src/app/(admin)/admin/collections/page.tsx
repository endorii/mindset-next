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
import { ICollection, ModalType } from "@/types/types";
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
        <div>
            <div className="text-2xl font-bold">Список колекцій:</div>

            <div className="flex mt-[30px] mb-[10px] items-center gap-[15px]">
                <div className="font-semibold">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => (
                        <li key={i}>
                            <button className="bg-white text-black px-[15px] border py-[5px] border-black cursor-pointer hover:bg-black hover:text-white hover:border-transparent transition-all duration-200">
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-end">
                <button
                    className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                    onClick={() => openModal("add")}
                >
                    <div>Додати колекцію</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>
            {(data ?? []).length > 0 ? (
                <div className="mt-[10px]">
                    <div className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                        <div>Банер</div>
                        <div>Назва</div>
                        <div>Статус</div>
                        <div>Переглядів</div>
                        <div>Додано/оновлено</div>
                        <div className="text-right">Дії</div>
                    </div>

                    <div className="border border-gray-200 rounded-b-lg">
                        {data?.map((collection) => (
                            <div
                                key={collection.id}
                                className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
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
                                <div>{0}</div>
                                <div>
                                    {formatDate(collection.createdAt)} /{" "}
                                    {formatDate(collection.updatedAt)}
                                </div>
                                <div className="flex gap-[20px] justify-end">
                                    <Link
                                        href={`collections/${collection.path}`}
                                    >
                                        <button className="relative group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded">
                                            <div className="absolute top-[-5px] right-[-5px] bg-white w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold rounded-[50%] border-2 border-black text-black pt-[1px]">
                                                {collection.categories?.length}
                                            </div>
                                            <CategoriesIcon className="w-[30px] group-hover:fill-white" />
                                        </button>
                                    </Link>
                                    <button
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                        onClick={() =>
                                            openModal("info", collection)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] stroke-black fill-none stroke-[2] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("edit", collection)
                                        }
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <EditIcon className="w-[27px] fill-none stroke-black stroke-[2.3] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("delete", collection)
                                        }
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <TrashIcon className="w-[30px] fill-none stroke-black stroke-[2] group-hover:stroke-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Колекції відсутні</div>
            )}

            <AddCollectionModal
                isOpen={activeModal === "add"}
                onClose={closeModal}
            />
            {selectedCollection && (
                <>
                    <CollectionInfoModal
                        isOpen={activeModal === "info"}
                        onClose={closeModal}
                        item={selectedCollection}
                    />
                    <EditCollectionModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        item={selectedCollection}
                    />
                    <DeleteCollectionModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        item={selectedCollection}
                    />
                </>
            )}
        </div>
    );
}

export default AdminCollections;
