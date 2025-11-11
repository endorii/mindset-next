"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import { TitleWithAddElementButton } from "@/features/admin/attributes/components/TitleWithAddElementButton";
import { useGetCollectionByPath } from "@/features/collections/hooks/useCollections";
import {
    BackIcon,
    EditIcon,
    InfoIcon,
    ProductsIcon,
    TrashIcon,
} from "@/shared/icons";
import { ModalType } from "@/shared/types/types";
import {
    ButtonWithIcon,
    DeleteButtonWithIcon,
    LinkWithIcon,
    MonoButton,
} from "@/shared/ui/buttons";

import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetCategoriesByCollectionId } from "../hooks/useCategories";
import {
    AddCategoryModal,
    CategoryInfoModal,
    DeleteCategoryModal,
    EditCategoryModal,
} from "../modals";
import { ICategory } from "../types/categories.types";

export function AdminCategoriesContent({
    collectionPath,
}: {
    collectionPath: string;
}) {
    const filters = [
        "спочатку нові",
        "останні оновлені",
        "по алфавіту",
        "кількість товарів",
    ];
    const router = useRouter();

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    );

    const { data: collection } = useGetCollectionByPath(collectionPath);
    const { data: categories } = useGetCategoriesByCollectionId(collection?.id);

    const openModal = (type: ModalType, category: ICategory | null = null) => {
        setSelectedCategory(category);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setActiveModal(null);
    };

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
            {categories && categories.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.6fr_1fr] 
                    xl:grid-cols-[120px_0.5fr_0.5fr_0.4fr_1fr] 
                    lg:grid-cols-4
                    sm:grid-cols-3 
                    xs:grid-cols-2 
                    gap-[15px] p-[20px] sm:p-[10px] rounded-t-lg font-semibold text-sm"
                    >
                        <div>Банер</div>
                        <div>Назва</div>
                        <div className="sm:hidden">Статус</div>
                        <div className="xl:hidden">Додано/оновлено</div>
                        <div className="xs:hidden text-center">Посилання</div>
                        <div className="text-right lg:hidden">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col gap-[25px] p-[20px] border-b border-white/10 last:border-b-0 text-sm"
                            >
                                <div
                                    className="grid 
                                grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.6fr_1fr] 
                                xl:grid-cols-[120px_0.5fr_0.5fr_0.4fr_1fr] 
                                lg:grid-cols-4
                                sm:grid-cols-3 
                                xs:grid-cols-2 
                                gap-[15px] items-center"
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
                                        className="text-blue-500 hover:text-white hover:underline xs:hidden text-center"
                                    >
                                        Категорія
                                    </Link>
                                    <div className="flex gap-[10px] justify-end sm:justify-start lg:hidden">
                                        <LinkWithIcon
                                            href={`/admin/collections/${collectionPath}/${category.path}`}
                                            counter={
                                                category.products?.length || 0
                                            }
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
                                <div className="gap-[10px] hidden lg:flex w-full">
                                    <LinkWithIcon
                                        className="w-full flex justify-center"
                                        href={`/admin/collections/${collectionPath}/${category.path}`}
                                        counter={category.products?.length || 0}
                                    >
                                        <ProductsIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-none fill-white group-hover:fill-black" />
                                    </LinkWithIcon>
                                    <ButtonWithIcon
                                        className="w-full "
                                        onClick={() =>
                                            openModal("info", category)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        className="w-full "
                                        onClick={() =>
                                            openModal("edit", category)
                                        }
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        className="w-full flex justify-center"
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
                />
            )}
            {selectedCategory && (
                <>
                    <CategoryInfoModal
                        isOpen={activeModal === "info"}
                        onClose={closeModal}
                        category={selectedCategory}
                    />
                    <EditCategoryModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        category={selectedCategory}
                    />
                    <DeleteCategoryModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        category={selectedCategory}
                    />
                </>
            )}
        </div>
    );
}
