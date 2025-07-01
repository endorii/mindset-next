"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCollection } from "@/lib/hooks/useCollections";
import { formatDate } from "@/lib/helpers/formatDate";
import ProductsIcon from "@/components/Icons/ProductsIcon";
import EditIcon from "@/components/Icons/EditIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
import AddCategoryModal from "@/components/Modals/category/AddCategoryModal";
import EditCategoryModal from "@/components/Modals/category/EditCategoryModal";
import DeleteCategoryModal from "@/components/Modals/category/DeleteCategoryModal";
import { ModalType } from "@/types/types";
import BackIcon from "@/components/Icons/BackIcon";
import CategoryInfoModal from "@/components/Modals/category/CategoryInfoModal";
import { ICategory } from "@/types/category/category.types";

const filters = [
    "спочатку нові",
    "останні оновлені",
    "по алфавіту",
    "кількість товарів",
];

function AdminCollection() {
    const router = useRouter();
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[3] || "";

    const { data, isError, error, isLoading } = useCollection(collectionPath);

    const categories = data?.categories ?? [];

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    );

    const openModal = (type: ModalType, category: ICategory | null = null) => {
        setSelectedCategory(category);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setActiveModal(null);
    };

    if (isLoading) return <div className="text-center">Завантаження...</div>;
    if (isError)
        return (
            <div className="text-center text-red-500">
                Помилка: {error?.message || "Невідома помилка"}
            </div>
        );

    return (
        <div className="flex flex-col gap-[15px]">
            <div>
                <button
                    className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    onClick={() => router.push("/admin/collections")}
                >
                    <BackIcon className="w-[23px] stroke-white stroke-[50] group-hover:stroke-black" />
                    <div>Назад до колекцій</div>
                </button>
            </div>
            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">Список колекцій:</div>
                <button
                    className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    onClick={() => openModal("add")}
                >
                    <div>Додати категорію</div>
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

            {categories.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                        <div>Банер</div>
                        <div>Назва</div>
                        <div>Статус</div>
                        <div>Переглядів</div>
                        <div>Додано/оновлено</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {categories?.map((category) => (
                            <div
                                key={category.id}
                                className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                            >
                                <img
                                    src={`http://localhost:5000/${category.banner}`}
                                    className="max-h-[120px] w-full object-cover rounded"
                                    alt={`Банер категорії ${category.name}`}
                                />
                                <div>{category.name}</div>
                                <div>
                                    {category.status === "ACTIVE"
                                        ? "Опубліковано"
                                        : category.status === "INACTIVE"
                                        ? "Не опубліковано"
                                        : "Невідомий статус"}
                                </div>
                                <div>{category.views}</div>
                                <div>
                                    {formatDate(category.createdAt)} /{" "}
                                    {formatDate(category.updatedAt)}
                                </div>
                                <div className="flex gap-[10px] justify-end">
                                    <Link
                                        href={`/admin/collections/${collectionPath}/${category.path}`}
                                    >
                                        <button className="relative group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer">
                                            <div className="absolute top-[-5px] right-[-5px] bg-none w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold rounded-[50%] border-2 border-white text-white pt-[1px] z-[10] bg-black">
                                                {category.products?.length || 0}
                                            </div>
                                            <ProductsIcon className="w-[30px] stroke-none fill-white group-hover:fill-black" />
                                        </button>
                                    </Link>
                                    <button
                                        className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                        onClick={() =>
                                            openModal("info", category)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("edit", category)
                                        }
                                        className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                    >
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("delete", category)
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
                <div>Категорії відсутні</div>
            )}

            {data && (
                <AddCategoryModal
                    isOpen={activeModal === "add"}
                    onClose={closeModal}
                    collectionId={data.id}
                    collectionPath={collectionPath}
                />
            )}
            {selectedCategory && (
                <>
                    <CategoryInfoModal
                        isOpen={activeModal === "info"}
                        onClose={closeModal}
                        collectionPath={collectionPath}
                        category={selectedCategory}
                    />
                    <EditCategoryModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        collectionPath={collectionPath}
                        category={selectedCategory}
                    />
                    <DeleteCategoryModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        collectionPath={collectionPath}
                        category={selectedCategory}
                    />
                </>
            )}
        </div>
    );
}

export default AdminCollection;
