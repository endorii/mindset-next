"use client";

import EditIcon from "@/components/Icons/EditIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import ProductsIcon from "@/components/Icons/ProductsIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
import { useCollection } from "@/lib/hooks/useCollections";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function AdminCollection() {
    const filters = [
        "спочатку нові",
        "oстанні оновлені",
        "по алфавіту",
        "кількість товарів",
    ];

    const router = useRouter();
    const pathname = usePathname();

    const collectionPath = pathname.split("/")[3] || "";

    const { data, isError, error, isLoading } = useCollection(collectionPath);

    console.log(data);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <div>
            <button
                className="mb-[30px] p-[10px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                onClick={() => {
                    router.push(`/admin/collections`);
                }}
            >
                Повернутися назад
            </button>
            <div className="text-2xl font-bold">Список категорій:</div>
            <div className="flex mt-[30px] items-center gap-[15px]">
                <div className="">фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => {
                        return (
                            <li key={i}>
                                <button className="bg-black text-white px-[15px] border py-[5px] border-transparent cursor-pointer hover:bg-white hover:text-black hover:border-black transition-all duration-200">
                                    {name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="mt-[50px]">
                <div className="grid grid-cols-[120px_0.7fr_80px_150px_1fr_200px] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                    <div>Банер</div>
                    <div>Назва</div>
                    <div>Товарів</div>
                    <div>Статус</div>
                    <div>Додано/оновлено</div>
                    <div className="text-right">Дії</div>
                </div>
                {/* Дані */}
                <div className="border border-gray-200 rounded-b-lg">
                    {data?.categories.map((category, i) => {
                        return (
                            <div
                                key={i}
                                className="grid grid-cols-[120px_0.7fr_80px_150px_1fr_200px] gap-[20px] p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 items-center"
                            >
                                <img
                                    src={category.banner}
                                    className="max-h-[120px] w-full object-cover rounded"
                                    alt="banner"
                                />
                                <div>{category.name}</div>
                                <div>{0}</div>
                                <div>Опубліковано</div>
                                <div>
                                    {formatDate(category.createdAt)} /{" "}
                                    {formatDate(category.updatedAt)}
                                </div>
                                <div className="flex gap-[20px] justify-end">
                                    <Link
                                        href={`${collectionPath}/${category.path}`}
                                    >
                                        <button className="relative group bg-white hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded">
                                            <div className="absolute top-[-5px] right-[-5px] bg-white w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold rounded-[50%] border-2 border-black text-black pt-[1px] ">
                                                {category.products?.length}
                                            </div>
                                            <ProductsIcon className="w-[30px] stroke-black group-hover:fill-white" />
                                        </button>
                                    </Link>
                                    <button className="group bg-white hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded">
                                        <InfoIcon className="w-[30px] stroke-black fill-none stroke-[2] group-hover:stroke-white" />
                                    </button>
                                    <button className="group bg-white hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded">
                                        <EditIcon className="w-[27px] fill-none stroke-black stroke-[2.3] group-hover:stroke-white" />
                                    </button>
                                    <button className="group bg-white hover:bg-black p-[5px] transition-all duration-200 cursor-pointer rounded">
                                        <TrashIcon className="w-[30px] fill-none stroke-black stroke-[2] group-hover:stroke-white" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AdminCollection;
