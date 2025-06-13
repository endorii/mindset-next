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
        <div>
            <button
                className="flex group gap-[7px] items-center mb-[30px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                onClick={() => {
                    router.push(`/admin/collections/${collectionPath}`);
                }}
            >
                <BackIcon className="w-[23px] stroke-white stroke-[50] fill-white group-hover:stroke-black" />
                <div>Назад до категорій</div>
            </button>
            <div className="text-2xl font-bold">
                Список товарів {data?.collection?.name}/{data?.name}:
            </div>
            <div className="flex mt-[30px] items-center gap-[15px]">
                <div className="">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => {
                        return (
                            <li key={i}>
                                <button className="bg-white text-black px-[15px] border py-[5px] border-black cursor-pointer hover:bg-black hover:text-white hover:border-transparent transition-all duration-200">
                                    {name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex justify-end">
                <button
                    className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                    onClick={() => openModal("add")}
                >
                    <div>Додати товар</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>
            {products.length > 0 ? (
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
                        {products.map((product, i) => {
                            return (
                                <div
                                    key={i}
                                    className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_230px] gap-[20px] p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 items-center"
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
                                    <div className="flex gap-[20px] justify-end">
                                        <button
                                            className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                            onClick={() =>
                                                openModal("info", product)
                                            }
                                        >
                                            <InfoIcon className="w-[30px] stroke-black fill-none stroke-[2] group-hover:stroke-white" />
                                        </button>
                                        <button
                                            className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                            onClick={() =>
                                                openModal("edit", product)
                                            }
                                        >
                                            <EditIcon className="w-[27px] fill-none stroke-black stroke-[2.3] group-hover:stroke-white" />
                                        </button>
                                        <button
                                            className="group hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded"
                                            onClick={() =>
                                                openModal("delete", product)
                                            }
                                        >
                                            <TrashIcon className="w-[30px] fill-none stroke-black stroke-[2] group-hover:stroke-white" />
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
