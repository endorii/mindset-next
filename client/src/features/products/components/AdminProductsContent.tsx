import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import { TitleWithAddElementButton } from "@/features/admin/attributes/components/TitleWithAddElementButton";
import { FiltersWrapper } from "@/shared/components/layout";
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
    MonoButton,
} from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
    useAdminCategory,
    useAdminCategoryProducts,
} from "@/features/categories/hooks/useCategories";
import {
    AddProductModal,
    DeleteProductModal,
    EditProductModal,
    ProductInfoModal,
} from "../modals";
import { IProduct } from "../types/products.types";

export function AdminProductsContent({
    collectionId,
    categoryId,
}: {
    collectionId: string;
    categoryId: string;
}) {
    const filters = ["Newest first", "Latest updated", "Alphabetically"];

    const router = useRouter();

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    );
    const [selectedFilter, setSelectedFilter] = useState("");

    const { data: category } = useAdminCategory(categoryId);

    if (!category.id) return;

    const { data: products } = useAdminCategoryProducts(category.id);

    const sortedProducts = useMemo(() => {
        if (!products) return [];

        const prods = [...products];

        switch (selectedFilter) {
            case "Newest first":
                return prods.sort(
                    (a, b) =>
                        new Date(b.createdAt || "").getTime() -
                        new Date(a.createdAt || "").getTime()
                );
            case "Latest updated":
                return prods.sort(
                    (a, b) =>
                        new Date(b.updatedAt || "").getTime() -
                        new Date(a.updatedAt || "").getTime()
                );
            case "Alphabetically":
                return prods.sort((a, b) =>
                    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
                );
            default:
                return prods;
        }
    }, [products, selectedFilter]);

    const resetFilters = () => {
        setSelectedFilter("");
    };

    const openModal = (type: ModalType, product: IProduct | null = null) => {
        setSelectedProduct(product);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setActiveModal(null);
    };
    return (
        <div className="flex flex-col gap-[20px]">
            <div>
                <MonoButton
                    onClick={() =>
                        router.push(`/admin/collections/${collectionId}`)
                    }
                >
                    <BackIcon className="w-[23px] stroke-white stroke-[50] fill-white group-hover:stroke-black" />
                    <div>Back to categories</div>
                </MonoButton>
            </div>

            <TitleWithAddElementButton
                title={`List of products [${category.collection?.name}/${category.name}]`}
                onClick={() => setActiveModal("add")}
                buttonText={"Add product"}
            />

            <hr className="w-full border-t border-white/5" />

            {products && products.length > 0 ? (
                <div className="flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px]">
                    <FiltersWrapper resetFilters={resetFilters}>
                        <FilterSection
                            title={"Sort by"}
                            filters={filters}
                            selectedItem={selectedFilter}
                            onFilterClick={(filter) =>
                                setSelectedFilter(filter)
                            }
                        />
                    </FiltersWrapper>
                    <div
                        className="grid 
                    grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] 
                    xl:grid-cols-[120px_1fr_1fr_1fr_1fr] 
                    lg:grid-cols-4 
                    sm:grid-cols-3 
                    xs:grid-cols-2 
                    gap-[15px] p-[20px] sm:p-[10px] font-semibold text-sm"
                    >
                        <div>Banner</div>
                        <div>Name</div>
                        <div className="sm:hidden">Visibility</div>
                        <div className="xl:hidden">Added/updated</div>
                        <div className="xs:hidden text-center">Link</div>
                        <div className="text-right lg:hidden">Actions</div>
                    </div>
                    <div className="border border-white/5  ">
                        {sortedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col gap-[25px] p-[20px] border-b border-white/5 last:border-b-0 text-sm"
                            >
                                <div
                                    className="grid 
                                grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] 
                    xl:grid-cols-[120px_1fr_1fr_1fr_1fr] 
                                lg:grid-cols-4 
                                sm:grid-cols-3 
                                xs:grid-cols-2
                                gap-[15px] items-center"
                                >
                                    <img
                                        src={product.banner}
                                        className="max-h-[120px] w-full object-cover"
                                        alt="banner"
                                    />
                                    <div>{product.name}</div>
                                    <div className="sm:hidden">
                                        {product.isVisible === false
                                            ? "Not visible"
                                            : "Visible"}
                                    </div>
                                    <div className="xl:hidden">
                                        {formatDate(product.createdAt)} /{" "}
                                        {formatDate(product.updatedAt)}
                                    </div>
                                    <Link
                                        href={`/${category.collection?.path}/${category.path}/${product.path}`}
                                        className="text-blue-500 hover:text-white hover:underline xs:hidden text-center"
                                    >
                                        Product
                                    </Link>
                                    <div className="flex gap-[10px] justify-end lg:justify-start lg:hidden">
                                        <ButtonWithIcon
                                            onClick={() =>
                                                openModal("info", product)
                                            }
                                        >
                                            <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                        </ButtonWithIcon>
                                        <ButtonWithIcon
                                            onClick={() =>
                                                openModal("edit", product)
                                            }
                                        >
                                            <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                        </ButtonWithIcon>
                                        <DeleteButtonWithIcon
                                            onClick={() =>
                                                openModal("delete", product)
                                            }
                                        >
                                            <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
                                        </DeleteButtonWithIcon>
                                    </div>
                                </div>
                                <div className="gap-[10px] hidden lg:flex w-full">
                                    <ButtonWithIcon
                                        className="w-full"
                                        onClick={() =>
                                            openModal("info", product)
                                        }
                                    >
                                        <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        className="w-full"
                                        onClick={() =>
                                            openModal("edit", product)
                                        }
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        className="w-full flex justify-center"
                                        onClick={() =>
                                            openModal("delete", product)
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
                <div className="relative flex min-h-[200px] items-center justify-center bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-4xl font-perandory tracking-wider z-1">
                        Products list is empty.
                    </div>
                    <ProductsIcon className="absolute top-[-150px] right-40 w-[600px] opacity-20 rotate-[340deg] pointer-events-none" />
                </div>
            )}

            {category && (
                <AddProductModal
                    isOpen={activeModal === "add"}
                    onClose={closeModal}
                    categoryId={category.id}
                />
            )}

            {selectedProduct && (
                <>
                    <ProductInfoModal
                        isOpen={activeModal === "info"}
                        onClose={closeModal}
                        product={selectedProduct}
                    />
                    <EditProductModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        product={selectedProduct}
                    />
                    <DeleteProductModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        product={selectedProduct}
                    />
                </>
            )}
        </div>
    );
}
