"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCollection } from "@/features/collections/hooks/useCollections";
import AddCategoryModal from "@/features/categories/modals/AddCategoryModal";
import CategoryInfoModal from "@/features/categories/modals/CategoryInfoModal";
import DeleteCategoryModal from "@/features/categories/modals/DeleteCategoryModal";
import EditCategoryModal from "@/features/categories/modals/EditCategoryModal";
import { ICategory } from "@/features/categories/types/categories.types";
import {
    BackIcon,
    PlusIcon,
    ProductsIcon,
    InfoIcon,
    EditIcon,
    TrashIcon,
} from "@/shared/icons";
import { ModalType } from "@/shared/types/types";
import { formatDate } from "@/shared/utils/formatDate";
import ChooseButton from "@/shared/ui/buttons/ChooseButton";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import LinkWithIcon from "@/shared/ui/buttons/LinkWithIcon";
import Link from "next/link";

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

    const {
        data: collection,
        isError,
        error,
        isLoading,
    } = useCollection(collectionPath);

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

    const categories = collection?.categories ?? [];

    return (
        <div className="flex flex-col gap-[15px]">
            <div>
                <MonoButton onClick={() => router.push("/admin/collections")}>
                    <BackIcon className="w-[23px] stroke-white stroke-[50] group-hover:stroke-black" />
                    <div>Назад до колекцій</div>
                </MonoButton>
            </div>
            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">
                    Список категорій [ {collection?.name} ]:
                </div>
                <MonoButton onClick={() => openModal("add")}>
                    <div>Додати категорію</div>
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

            {categories && categories.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_0.4fr_230px] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                        <div>Банер</div>
                        <div>Назва</div>
                        <div>Статус</div>
                        <div>Переглядів</div>
                        <div>Додано/оновлено</div>
                        <div>Посилання</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {categories?.map((category) => (
                            <div
                                key={category.id}
                                className="grid grid-cols-[120px_0.7fr_150px_150px_1fr_0.4fr_230px] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                            >
                                <img
                                    src={`http://localhost:5000/${category.banner}`}
                                    className="max-h-[120px] w-full object-cover rounded"
                                    alt={`Банер категорії ${category.name}`}
                                />
                                <div>{category.name}</div>
                                <div>{category.status}</div>
                                <div>{category.views}</div>
                                <div>
                                    {formatDate(category.createdAt || "")} /{" "}
                                    {formatDate(category.updatedAt || "")}
                                </div>
                                <Link
                                    href={`/${collectionPath}/${category.path}`}
                                    className="text-blue-500 hover:text-white hover:underline"
                                >
                                    Категорія
                                </Link>
                                <div className="flex gap-[10px] justify-end">
                                    <LinkWithIcon
                                        href={`/admin/collections/${collectionPath}/${category.path}`}
                                        counter={category.products?.length || 0}
                                    >
                                        <ProductsIcon className="w-[30px] stroke-none fill-white group-hover:fill-black" />
                                    </LinkWithIcon>
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("info", category)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("edit", category)
                                        }
                                    >
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() =>
                                            openModal("delete", category)
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
                <div className="relative flex min-h-[200px] items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        Список категорій порожній
                    </div>
                    <ProductsIcon className="absolute top-[-150] right-40 w-[600px] opacity-20 rotate-[340deg] pointer-events-none" />
                </div>
            )}

            {collection && (
                <AddCategoryModal
                    isOpen={activeModal === "add"}
                    onClose={closeModal}
                    collectionId={collection.id}
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
