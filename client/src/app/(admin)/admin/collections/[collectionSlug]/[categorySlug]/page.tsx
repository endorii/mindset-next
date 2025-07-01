"use client";

import BackIcon from "@/components/Icons/BackIcon";
import EditIcon from "@/components/Icons/EditIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
import AddProductModal from "@/components/Modals/product/AddProductModal";
import DeleteProductModal from "@/components/Modals/product/DeleteProductModal";
import EditProductModal from "@/components/Modals/product/EditProductModal";
import ProductInfoModal from "@/components/Modals/product/ProductInfoModal";
import { formatDate } from "@/lib/helpers/formatDate";
import { useCategory } from "@/lib/hooks/useCategories";
import { IProduct } from "@/types/product/product.types";
import { ModalType } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

function AdminCategory() {
    const filters = [
        "спочатку нові",
        "oстанні оновлені",
        "по алфавіту",
        "кількість переглядів",
    ];

    const router = useRouter();
    const pathname = usePathname();

    const collectionPath = pathname.split("/")[3] || "";
    const categoryPath = pathname.split("/")[4] || "";

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    );

    const { data, isError, error, isLoading } = useCategory(
        collectionPath,
        categoryPath
    );

    const products = data?.products ?? [];

    const openModal = (type: ModalType, product: IProduct | null = null) => {
        setSelectedProduct(product);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setActiveModal(null);
    };

    return (
        <div className="flex flex-col gap-[15px]">
            <div>
                <button
                    className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    onClick={() => {
                        router.push(`/admin/collections/${collectionPath}`);
                    }}
                >
                    <BackIcon className="w-[23px] stroke-white stroke-[50] fill-white group-hover:stroke-black" />
                    <div>Назад до категорій</div>
                </button>
            </div>

            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">
                    Список товарів {data?.collection?.name}/{data?.name}:
                </div>
                <button
                    className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    onClick={() => openModal("add")}
                >
                    <div>Додати товар</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>
            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-semibold">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => {
                        return (
                            <li key={i}>
                                <button className="border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-4 py-2">
                                    {name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {products.length > 0 ? (
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
                        {products.map((product, i) => {
                            return (
                                <div
                                    key={i}
                                    className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                                >
                                    <img
                                        src={`http://localhost:5000/${product.banner}`}
                                        className="max-h-[120px] w-full object-cover rounded"
                                        alt="banner"
                                    />
                                    <div>{product.name}</div>
                                    <div>
                                        {product.status === "ACTIVE"
                                            ? "Опубліковано"
                                            : product.status === "INACTIVE"
                                            ? "Не опубліковано"
                                            : "Невідомий статус"}
                                    </div>
                                    <div>{product.views}</div>

                                    <div>
                                        {formatDate(product.createdAt)} /{" "}
                                        {formatDate(product.updatedAt)}
                                    </div>
                                    <div className="flex gap-[10px] justify-end">
                                        <button
                                            className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                            onClick={() =>
                                                openModal("info", product)
                                            }
                                        >
                                            <InfoIcon className="w-[30px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModal("edit", product)
                                            }
                                            className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                        >
                                            <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModal("delete", product)
                                            }
                                            className="group border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer"
                                        >
                                            <TrashIcon className="w-[30px] stroke-white stroke-[1.7]  group-hover:stroke-black fill-none" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div>Товари відсутні</div>
            )}
            {data && (
                <AddProductModal
                    isOpen={activeModal === "add"}
                    onClose={closeModal}
                    collectionPath={collectionPath}
                    categoryId={data.id}
                    categoryPath={categoryPath}
                />
            )}
            {selectedProduct && (
                <>
                    <ProductInfoModal
                        isOpen={activeModal === "info"}
                        onClose={closeModal}
                        collectionPath={collectionPath}
                        categoryPath={categoryPath}
                        product={selectedProduct}
                    />
                    <EditProductModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        product={selectedProduct}
                        collectionPath={collectionPath}
                        categoryPath={categoryPath}
                    />
                    <DeleteProductModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        collectionPath={collectionPath}
                        categoryPath={categoryPath}
                        product={selectedProduct}
                    />
                </>
            )}
        </div>
    );
}

export default AdminCategory;
