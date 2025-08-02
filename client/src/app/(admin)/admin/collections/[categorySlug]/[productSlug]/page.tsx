"use client";

import { useCategory } from "@/features/categories/hooks/useCategories";
import {
    AddProductModal,
    ProductInfoModal,
    EditProductModal,
    DeleteProductModal,
} from "@/features/products/modals";
import { IProduct } from "@/features/products/types/products.types";
import {
    BackIcon,
    PlusIcon,
    InfoIcon,
    EditIcon,
    TrashIcon,
    ProductsIcon,
} from "@/shared/icons";
import { ModalType } from "@/shared/types/types";
import {
    MonoButton,
    ChooseButton,
    ButtonWithIcon,
    DeleteButtonWithIcon,
} from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

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

    const { data } = useCategory(collectionPath, categoryPath);

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
                <MonoButton
                    onClick={() => {
                        router.push(`/admin/collections/${collectionPath}`);
                    }}
                >
                    <BackIcon className="w-[23px] stroke-white stroke-[50] fill-white group-hover:stroke-black" />
                    <div>Назад до категорій</div>
                </MonoButton>
            </div>

            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">
                    Список товарів [ {data?.collection?.name} / {data?.name} ]:
                </div>
                <MonoButton onClick={() => openModal("add")}>
                    <div>Додати товар</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </MonoButton>
            </div>
            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-semibold">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => (
                        <li key={i}>
                            <ChooseButton onClick={function (): void {}}>
                                {name}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>

            {products.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_0.2fr_230px] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                        <div>Банер</div>
                        <div>Назва</div>
                        <div>Статус</div>
                        <div>Переглядів</div>
                        <div>Додано/оновлено</div>
                        <div>Посилання</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {products.map((product, i) => {
                            return (
                                <div
                                    key={i}
                                    className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_0.2fr_230px] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                                >
                                    <img
                                        src={`http://localhost:5000/${product.banner}`}
                                        className="max-h-[120px] w-full object-cover rounded"
                                        alt="banner"
                                    />
                                    <div>{product.name}</div>
                                    <div>{product.status}</div>
                                    <div>{product.views}</div>

                                    <div>
                                        {formatDate(product.createdAt)} /{" "}
                                        {formatDate(product.updatedAt)}
                                    </div>
                                    <Link
                                        href={`/${collectionPath}/${categoryPath}/${product.path}`}
                                        className="text-blue-500 hover:text-white hover:underline"
                                    >
                                        Товар
                                    </Link>
                                    <div className="flex gap-[10px] justify-end">
                                        <ButtonWithIcon
                                            onClick={() =>
                                                openModal("info", product)
                                            }
                                        >
                                            <InfoIcon className="w-[30px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                        </ButtonWithIcon>
                                        <ButtonWithIcon
                                            onClick={() =>
                                                openModal("edit", product)
                                            }
                                        >
                                            <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                        </ButtonWithIcon>
                                        <DeleteButtonWithIcon
                                            onClick={() =>
                                                openModal("delete", product)
                                            }
                                        >
                                            <TrashIcon className="w-[30px] stroke-white stroke-[1.7]  fill-none" />
                                        </DeleteButtonWithIcon>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="relative flex min-h-[200px] items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        Список товарів порожній
                    </div>
                    <ProductsIcon className="absolute top-[-150] right-40 w-[600px] opacity-20 rotate-[340deg] pointer-events-none" />
                </div>
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
