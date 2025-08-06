"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import TitleWithAddElementButton from "@/features/admin/attributes/components/TitleWithAddElementButton";
import {
    AddCategoryModal,
    CategoryInfoModal,
    EditCategoryModal,
    DeleteCategoryModal,
} from "@/features/categories/modals";
import { ICategory } from "@/features/categories/types/categories.types";
import { useCollection } from "@/features/collections/hooks/useCollections";
import {
    BackIcon,
    ProductsIcon,
    InfoIcon,
    EditIcon,
    TrashIcon,
} from "@/shared/icons";
import { ModalType } from "@/shared/types/types";
import {
    MonoButton,
    LinkWithIcon,
    ButtonWithIcon,
    DeleteButtonWithIcon,
} from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const filters = [
    "спочатку нові",
    "останні оновлені",
    "по алфавіту",
    "кількість товарів",
];

function AdminCategoriesInCollection() {
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

            <TitleWithAddElementButton
                title={`Список категорій [${collectionPath}]`}
                onClick={() => setActiveModal("add")}
                buttonText={"Додати категорію"}
            />

            <FilterSection
                title={"Фільтрувати"}
                filters={filters}
                onFilterClick={function (filter: string): void {
                    throw new Error("Function not implemented.");
                }}
                selectedItem={""}
            />

            {categories.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div className="grid grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.6fr_1fr] xl:grid-cols-[120px_0.5fr_0.5fr_0.4fr_1fr] lg:grid-cols-[1fr_0.5fr_1fr_2fr] sm:grid-cols-[2fr_0.5fr] xs:grid-cols-1 gap-[15px] p-[20px] sm:p-[10px] rounded-t-lg font-semibold text-sm">
                        <div className="hidden xs:block">Категорії</div>
                        <div className="xs:hidden">Банер</div>
                        <div className="xs:hidden">Назва</div>
                        <div className="sm:hidden">Статус</div>
                        <div className="xl:hidden">Додано/оновлено</div>
                        <div className="lg:hidden text-center">Посилання</div>
                        <div className="text-right sm:hidden">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="grid grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.6fr_1fr] xl:grid-cols-[120px_0.5fr_0.5fr_0.4fr_1fr] lg:grid-cols-[1fr_0.5fr_1fr_2fr] sm:grid-cols-[2fr_0.5fr] xs:grid-cols-1 gap-[15px] p-[20px] sm:p-[10px] border-b border-white/10 last:border-b-0 items-center text-sm"
                            >
                                <img
                                    src={`http://localhost:5000/${category.banner}`}
                                    className="max-h-[120px] w-full object-cover rounded"
                                    alt={`Банер категорії ${category.name}`}
                                />
                                <div>{category.name}</div>
                                <div className="sm:hidden">
                                    {category.status}
                                </div>
                                <div className="xl:hidden">
                                    {formatDate(category.createdAt || "")} /{" "}
                                    {formatDate(category.updatedAt || "")}
                                </div>
                                <Link
                                    href={`/${collectionPath}/${category.path}`}
                                    className="text-blue-500 hover:text-white hover:underline lg:hidden text-center"
                                >
                                    Категорія
                                </Link>
                                <div className="flex gap-[10px] justify-end sm:justify-start">
                                    <LinkWithIcon
                                        href={`/admin/collections/${collectionPath}/${category.path}`}
                                        counter={category.products?.length || 0}
                                    >
                                        <ProductsIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-none fill-white group-hover:fill-black" />
                                    </LinkWithIcon>
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("info", category)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("edit", category)
                                        }
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() =>
                                            openModal("delete", category)
                                        }
                                    >
                                        <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
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

export default AdminCategoriesInCollection;
