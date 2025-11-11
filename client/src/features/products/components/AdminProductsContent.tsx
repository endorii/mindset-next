import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import { TitleWithAddElementButton } from "@/features/admin/attributes/components/TitleWithAddElementButton";
import { useGetCategoryByPath } from "@/features/categories/hooks/useCategories";
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
import { useState } from "react";
import { useProductsByCategoryId } from "../hooks/useProducts";
import {
    AddProductModal,
    DeleteProductModal,
    EditProductModal,
    ProductInfoModal,
} from "../modals";
import { IProduct } from "../types/products.types";

export function AdminProductsContent({
    collectionPath,
    categoryPath,
}: {
    collectionPath: string;
    categoryPath: string;
}) {
    const filters = [
        "спочатку нові",
        "останнi оновленi",
        "по алфавіту",
        "кількість переглядів",
    ];

    const router = useRouter();

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    );

    const { data: category } = useGetCategoryByPath(
        collectionPath,
        categoryPath
    );

    const { data: products } = useProductsByCategoryId(category?.id);

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
                    onClick={() =>
                        router.push(`/admin/collections/${collectionPath}`)
                    }
                >
                    <BackIcon className="w-[23px] stroke-white stroke-[50] fill-white group-hover:stroke-black" />
                    <div>Назад до категорій</div>
                </MonoButton>
            </div>

            <TitleWithAddElementButton
                title={`Список товарів [${collectionPath}/${categoryPath}]`}
                onClick={() => setActiveModal("add")}
                buttonText={"Додати товар"}
            />

            <FilterSection
                title={"Фільтрувати"}
                filters={filters}
                onFilterClick={function (filter: string): void {
                    throw new Error("Function not implemented.");
                }}
                selectedItem={""}
            />

            {products && products.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] 
                    xl:grid-cols-[120px_1fr_1fr_1fr_1fr] 
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
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col gap-[25px] p-[20px] border-b border-white/10 last:border-b-0 text-sm"
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
                                        src={`http://localhost:5000/${product.banner}`}
                                        className="max-h-[120px] w-full object-cover rounded"
                                        alt="banner"
                                    />
                                    <div>{product.name}</div>
                                    <div className="sm:hidden">
                                        {product.status}
                                    </div>
                                    <div className="xl:hidden">
                                        {formatDate(product.createdAt)} /{" "}
                                        {formatDate(product.updatedAt)}
                                    </div>
                                    <Link
                                        href={`/${collectionPath}/${categoryPath}/${product.path}`}
                                        className="text-blue-500 hover:text-white hover:underline xs:hidden text-center"
                                    >
                                        Товар
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
                <div className="relative flex min-h-[200px] items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        Список товарів порожній
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
