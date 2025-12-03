"use client";

import { useEscapeKeyClose, useShopSearch } from "@/shared/hooks";
import { InputField } from "@/shared/ui/inputs/InputField";
import { ModalWrapper } from "@/shared/ui/wrappers";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SearchIcon } from "../icons";

interface ShopSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResultItemProps {
    id: string;
    name: string;
    path: string;
    banner?: string;
    fullPath?: string;
}

function SearchResultItem({
    name,
    path,
    banner,
    fullPath,
}: SearchResultItemProps) {
    return (
        <div className="flex items-center gap-3 bg-white/1 p-2 cursor-pointer hover:bg-white/5 transition">
            {banner && (
                <Image
                    src={banner}
                    width={100}
                    height={100}
                    alt={name}
                    className="h-[100px] w-[100px] object-cover"
                />
            )}
            <div>
                <div className="text-white font-medium font-perandory tracking-wider text-xl">
                    {name}
                </div>
                <div className="text-neutral-400 text-sm font-light">
                    /{fullPath || path}
                </div>
            </div>
        </div>
    );
}

function SearchSection({
    title,
    items,
    renderPath,
}: {
    title: string;
    items: any[];
    renderPath: (item: any) => string;
}) {
    if (!items?.length) return null;

    return (
        <div>
            <h3 className="text-white text-2xl font-perandory tracking-wider">
                {title}
            </h3>
            <hr className="border-t border-white/5 w-full" />
            <div className="flex flex-col gap-2 mt-2">
                {items.map((item) => (
                    <SearchResultItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        path={item.path}
                        banner={item.banner}
                        fullPath={renderPath(item)}
                    />
                ))}
            </div>
        </div>
    );
}

export function ShopSearchModal({ isOpen, onClose }: ShopSearchModalProps) {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { data, isPending, isError } = useShopSearch(debouncedSearch);

    const handleClose = useCallback(() => {
        onClose();
        setSearchValue("");
        setDebouncedSearch("");
    }, [onClose]);

    useEffect(() => {
        const trimmedValue = searchValue.trim();
        if (!trimmedValue) {
            setDebouncedSearch("");
            return;
        }

        const delay = setTimeout(() => {
            setDebouncedSearch(trimmedValue);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchValue]);

    useEscapeKeyClose({ isOpen, onClose: handleClose });

    const hasNoResults = useMemo(() => {
        return (
            data &&
            !isPending &&
            !isError &&
            debouncedSearch &&
            !data.collections?.length &&
            !data.categories?.length &&
            !data.products?.length
        );
    }, [data, isPending, isError, debouncedSearch]);

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={handleClose} modalTitle="Search panel">
            <button
                onClick={handleClose}
                aria-label="Close search modal"
                className="absolute top-[15px] right-[15px]"
            >
                <CloseIcon className="w-[26px] fill-white stroke-2 stroke-white" />
            </button>

            <div className="flex flex-col gap-[10px] relative">
                <div className="relative">
                    <InputField
                        placeholder="Searching for..."
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pr-[40px]"
                        autoFocus
                    />
                    <SearchIcon className="absolute w-[25px] fill-none stroke-2 stroke-white top-[50%] translate-y-[-50%] right-[10px] pointer-events-none" />
                </div>

                <div className="mt-4 flex flex-col gap-4 overflow-y-auto pr-2">
                    {isPending && debouncedSearch && (
                        <div className="text-gray-300 text-sm">Loading...</div>
                    )}

                    {isError && (
                        <div className="text-red-400 text-sm">
                            Something went wrong. Please try again.
                        </div>
                    )}

                    {hasNoResults && (
                        <p className="text-gray-300 text-sm">
                            No results found for "{debouncedSearch}"
                        </p>
                    )}

                    <SearchSection
                        title="Collections"
                        items={data?.collections || []}
                        renderPath={(col) => col.path}
                    />

                    <SearchSection
                        title="Categories"
                        items={data?.categories || []}
                        renderPath={(cat) =>
                            `${cat?.collection?.path}/${cat.path}`
                        }
                    />

                    <SearchSection
                        title="Products"
                        items={data?.products || []}
                        renderPath={(prod) =>
                            `${prod.category?.collection?.path}/${prod.category?.path}/${prod.path}`
                        }
                    />
                </div>
            </div>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
