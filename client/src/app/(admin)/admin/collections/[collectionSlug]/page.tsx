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
import { ICategory, ModalType } from "@/types/types";
import BackIcon from "@/components/Icons/BackIcon";
import CategoryInfoModal from "@/components/Modals/category/CategoryInfoModal";

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
        <div className="">
            <button
                className="flex group gap-[7px] items-center mb-[30px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                onClick={() => router.push("/admin/collections")}
            >
                <BackIcon className="w-[23px] stroke-white stroke-[50] group-hover:stroke-black" />
                <div>Назад до колекцій</div>
            </button>
            <div className="text-2xl font-bold">
                Список категорій: {data?.name}
            </div>

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
                    <div>Додати категорію</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>

            {categories.length > 0 ? (
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
                        {categories?.map((category) => (
                            <div
                                key={category.id}
                                className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4 border-gray-200 border-b last:border-b-0 hover:bg-gray-50 items-center"
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
                                <div>{0}</div>
                                <div>
                                    {formatDate(category.createdAt)} /{" "}
                                    {formatDate(category.updatedAt)}
                                </div>
                                <div className="flex gap-[20px] justify-end">
                                    <Link
                                        href={`/admin/collections/${collectionPath}/${category.path}`}
                                    >
                                        <button className="relative group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded">
                                            <div className="absolute top-[-5px] right-[-5px] bg-white w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold rounded-[50%] border-2 border-black text-black pt-[1px]">
                                                {category.products?.length || 0}
                                            </div>
                                            <ProductsIcon className="w-[30px] stroke-black group-hover:fill-white" />
                                        </button>
                                    </Link>
                                    <button
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                        onClick={() =>
                                            openModal("info", category)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] stroke-black fill-none stroke-[2] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("edit", category)
                                        }
                                        className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                    >
                                        <EditIcon className="w-[27px] fill-none stroke-black stroke-[2.3] group-hover:stroke-white" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal("delete", category)
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
                        item={selectedCategory}
                    />
                    <EditCategoryModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        item={selectedCategory}
                    />
                    <DeleteCategoryModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        item={selectedCategory}
                    />
                </>
            )}
        </div>
    );
}

export default AdminCollection;
