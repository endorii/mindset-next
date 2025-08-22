"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import TitleWithAddElementButton from "@/features/admin/attributes/components/TitleWithAddElementButton";
import { useGetCollections } from "@/features/collections/hooks/useCollections";

import {
    AddCollectionModal,
    CollectionInfoModal,
    EditCollectionModal,
    DeleteCollectionModal,
} from "@/features/collections/modals";
import { ICollection } from "@/features/collections/types/collections.types";
import {
    CategoriesIcon,
    InfoIcon,
    EditIcon,
    TrashIcon,
    ProductsIcon,
} from "@/shared/icons";
import { ModalType } from "@/shared/types/types";
import {
    LinkWithIcon,
    ButtonWithIcon,
    DeleteButtonWithIcon,
} from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    FilterSectionSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { useState } from "react";

function AdminCollections() {
    const filters = [
        "спочатку нові",
        "oстанні оновлені",
        "по алфавіту",
        "кількість категорій",
        "кількість товарів",
    ];

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedCollection, setSelectedCollection] =
        useState<ICollection | null>(null);

    const {
        data: collections,
        isPending: isCollectionsPending,
        isError: isCollectionsError,
        error: collectionError,
    } = useGetCollections();

    if (isCollectionsPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <TitleWithButtonSkeleton />
                <FilterSectionSkeleton />
                <AdminProductsSkeleton />
            </div>
        );
    }

    if (isCollectionsError) {
        return <ErrorWithMessage message={collectionError.message} />;
    }

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
            <TitleWithAddElementButton
                title={"Список колекцій"}
                onClick={() => setActiveModal("add")}
                buttonText={"Додати колекцію"}
            />
            <FilterSection
                title={"Фільтрувати"}
                filters={filters}
                onFilterClick={function (filter: string): void {
                    throw new Error("Function not implemented.");
                }}
                selectedItem={""}
            />
            {collections && collections.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0 text-sm">
                    <div
                        className="grid 
                    grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.5fr_1fr] 
                    xl:grid-cols-[120px_0.5fr_0.5fr_0.5fr_1fr] 
                    lg:grid-cols-4
                    sm:grid-cols-3
                    xs:grid-cols-2
                    gap-[15px] p-[20px] sm:p-[10px] rounded-t-lg font-semibold "
                    >
                        <div className="hidden xs:block">Колекції</div>
                        <div className="xs:hidden">Банер</div>
                        <div className="xs:hidden">Назва</div>
                        <div className="sm:hidden">Статус</div>
                        <div className="xl:hidden">Додано/оновлено</div>
                        <div className="xs:hidden text-center">Посилання</div>
                        <div className="text-right lg:hidden">Дії</div>
                    </div>

                    <div className="border border-white/10 rounded-xl">
                        {collections &&
                            collections.map((collection) => (
                                <div
                                    key={collection.id}
                                    className="flex flex-col gap-[25px] p-[20px] border-b border-white/10 last:border-b-0 text-sm"
                                >
                                    <div
                                        className="grid 
                                grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.5fr_1fr] 
                                xl:grid-cols-[120px_0.5fr_0.5fr_0.5fr_1fr] 
                                lg:grid-cols-4 
                                sm:grid-cols-3
                                xs:grid-cols-2
                                gap-[15px] items-center"
                                    >
                                        <img
                                            src={`http://localhost:5000/${collection.banner}`}
                                            className="max-h-[120px] w-full object-cover rounded"
                                            alt="banner"
                                        />
                                        <div>{collection.name}</div>
                                        <div className="sm:hidden">
                                            {collection.status}
                                        </div>
                                        <div className="xl:hidden">
                                            {formatDate(
                                                collection.createdAt || ""
                                            )}{" "}
                                            /{" "}
                                            {formatDate(
                                                collection.updatedAt || ""
                                            )}
                                        </div>
                                        <Link
                                            href={`/${collection.path}`}
                                            className="text-blue-500 hover:text-white hover:underline xs:hidden text-center"
                                        >
                                            Колекція
                                        </Link>
                                        <div className="flex gap-[10px] justify-end lg:hidden">
                                            <LinkWithIcon
                                                href={`collections/${collection.path}`}
                                                counter={
                                                    collection.categories
                                                        ?.length || 0
                                                }
                                            >
                                                <CategoriesIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-white group-hover:fill-black" />
                                            </LinkWithIcon>
                                            <ButtonWithIcon
                                                onClick={() =>
                                                    openModal(
                                                        "info",
                                                        collection
                                                    )
                                                }
                                            >
                                                <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                            </ButtonWithIcon>
                                            <ButtonWithIcon
                                                onClick={() =>
                                                    openModal(
                                                        "edit",
                                                        collection
                                                    )
                                                }
                                            >
                                                <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                            </ButtonWithIcon>
                                            <DeleteButtonWithIcon
                                                onClick={() =>
                                                    openModal(
                                                        "delete",
                                                        collection
                                                    )
                                                }
                                            >
                                                <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7]  fill-none" />
                                            </DeleteButtonWithIcon>
                                        </div>
                                    </div>
                                    <div className="gap-[10px] hidden lg:flex w-full">
                                        <LinkWithIcon
                                            className={
                                                "w-full flex justify-center"
                                            }
                                            href={`collections/${collection.path}`}
                                            counter={
                                                collection.categories?.length ||
                                                0
                                            }
                                        >
                                            <CategoriesIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-white group-hover:fill-black" />
                                        </LinkWithIcon>
                                        <ButtonWithIcon
                                            className={"w-full"}
                                            onClick={() =>
                                                openModal("info", collection)
                                            }
                                        >
                                            <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2  group-hover:stroke-black" />
                                        </ButtonWithIcon>
                                        <ButtonWithIcon
                                            className={"w-full"}
                                            onClick={() =>
                                                openModal("edit", collection)
                                            }
                                        >
                                            <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                        </ButtonWithIcon>
                                        <DeleteButtonWithIcon
                                            className={
                                                "w-full flex justify-center"
                                            }
                                            onClick={() =>
                                                openModal("delete", collection)
                                            }
                                        >
                                            <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7]  fill-none" />
                                        </DeleteButtonWithIcon>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div className="relative flex min-h-[200px] items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        Список колекцій порожній
                    </div>
                    <ProductsIcon className="absolute top-[-150] right-40 w-[600px] opacity-20 rotate-[340deg] pointer-events-none" />
                </div>
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
