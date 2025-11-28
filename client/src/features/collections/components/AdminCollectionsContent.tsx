"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import { TitleWithAddElementButton } from "@/features/admin/attributes/components/TitleWithAddElementButton";
import {
    CategoriesIcon,
    EditIcon,
    InfoIcon,
    ProductsIcon,
    TrashIcon,
} from "@/shared/icons";
import {
    ButtonWithIcon,
    DeleteButtonWithIcon,
    LinkWithIcon,
} from "@/shared/ui/buttons";

import { FiltersWrapper } from "@/shared/components/layout";
import { ModalType } from "@/shared/types/types";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useAdminCollections } from "../hooks/useCollections";
import {
    AddCollectionModal,
    CollectionInfoModal,
    DeleteCollectionModal,
    EditCollectionModal,
} from "../modals";
import { ICollection } from "../types/collections.types";

export function AdminCollectionsContent() {
    const filters = [
        "Newest first",
        "Latest updated",
        "Alphabetically",
        "Number of categories (more)",
        "Number of categories (less)",
    ];

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedCollection, setSelectedCollection] =
        useState<ICollection | null>(null);
    const [selectedFilter, setSelectedFilter] = useState("");

    const { data: collections } = useAdminCollections();

    const sortedCollections = useMemo(() => {
        if (!collections) return [];

        const colls = [...collections];

        switch (selectedFilter) {
            case "Newest first":
                return colls.sort(
                    (a, b) =>
                        new Date(b.createdAt || "").getTime() -
                        new Date(a.createdAt || "").getTime()
                );
            case "Latest updated":
                return colls.sort(
                    (a, b) =>
                        new Date(b.updatedAt || "").getTime() -
                        new Date(a.updatedAt || "").getTime()
                );
            case "Alphabetically":
                return colls.sort((a, b) =>
                    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
                );
            case "Number of categories (more)":
                return colls.sort(
                    (a, b) =>
                        (b.categories?.length || 0) -
                        (a.categories?.length || 0)
                );
            case "Number of categories (less)":
                return colls.sort(
                    (a, b) =>
                        (a.categories?.length || 0) -
                        (b.categories?.length || 0)
                );
            default:
                return colls;
        }
    }, [collections, selectedFilter]);

    const resetFilters = () => {
        setSelectedFilter("");
    };

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
        <div className="flex flex-col gap-[20px]">
            <TitleWithAddElementButton
                title={"List of collections"}
                onClick={() => setActiveModal("add")}
                buttonText={"Add collection"}
            />
            <hr className="w-full border-t border-white/5" />
            {collections && collections.length > 0 ? (
                <div className="flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] text-sm">
                    <FiltersWrapper resetFilters={resetFilters}>
                        <FilterSection
                            title="Sort by"
                            filters={filters}
                            selectedItem={selectedFilter}
                            onFilterClick={(filter) =>
                                setSelectedFilter(filter)
                            }
                        />
                    </FiltersWrapper>
                    <div
                        className="grid 
                    grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.5fr_1fr] 
                    xl:grid-cols-[120px_0.5fr_0.5fr_0.5fr_1fr] 
                    lg:grid-cols-4
                    sm:grid-cols-3
                    xs:grid-cols-2
                    gap-[15px] p-[20px] sm:p-[10px] font-semibold "
                    >
                        <div className="hidden xs:block">Collections</div>
                        <div className="xs:hidden">Banner</div>
                        <div className="xs:hidden">Name</div>
                        <div className="sm:hidden">Visibility</div>
                        <div className="xl:hidden">Added/updated</div>
                        <div className="xs:hidden text-center">Link</div>
                        <div className="text-right lg:hidden">Actions</div>
                    </div>

                    <div className="border border-white/5  ">
                        {sortedCollections &&
                            sortedCollections.map((collection) => (
                                <div
                                    key={collection.id}
                                    className="flex flex-col gap-[25px] p-[20px] border-b border-white/5 last:border-b-0 text-sm"
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
                                            src={collection?.banner || ""}
                                            className="max-h-[120px] w-full object-cover"
                                            alt="banner"
                                        />
                                        <div>{collection.name}</div>
                                        <div className="sm:hidden">
                                            {collection.isVisible === false
                                                ? "Not visible"
                                                : "Visible"}
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
                                            Collection
                                        </Link>
                                        <div className="flex gap-[10px] justify-end lg:hidden">
                                            <LinkWithIcon
                                                href={`collections/${collection.id}`}
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
                                            href={`collections/${collection.id}`}
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
                <div className="relative flex min-h-[200px] items-center justify-center bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-4xl font-perandory tracking-wider z-1">
                        Collections list is empty
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
