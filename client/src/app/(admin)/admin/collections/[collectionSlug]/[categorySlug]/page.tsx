"use client";

import BackIcon from "@/components/Icons/BackIcon";
import EditIcon from "@/components/Icons/EditIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
import { useCategory } from "@/lib/hooks/useCategories";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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

    const { data, isError, error, isLoading } = useCategory(
        collectionPath,
        categoryPath
    );

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
                className="flex group gap-[7px] items-center mb-[30px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                onClick={() => {
                    router.push(`/admin/collections/${collectionPath}`);
                }}
            >
                <BackIcon className="w-[23px] stroke-white stroke-[50] fill-white group-hover:stroke-black" />
                <div>Назад до категорій</div>
            </button>
            <div className="text-2xl font-bold">
                Список товарів {data?.collection?.name}/{data?.name}:
            </div>
            <div className="flex mt-[30px] items-center gap-[15px]">
                <div className="">Фільтрувати:</div>
                <ul className="flex gap-[10px]">
                    {filters.map((name, i) => {
                        return (
                            <li key={i}>
                                <button className="bg-white text-black px-[15px] border py-[5px] border-black cursor-pointer hover:bg-black hover:text-white hover:border-transparent transition-all duration-200">
                                    {name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex justify-end">
                <button
                    className="flex group items-center gap-[10px] mt-[20px] mb-[10px] px-[15px] py-[8px] bg-black border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition-all duration-200 cursor-pointer"
                    // onClick={() => openModal("add")}
                >
                    <div>Додати товар</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </button>
            </div>
            <div className="mt-[10px]">
                <div className="grid grid-cols-[120px_0.7fr_80px_150px_1fr_200px] gap-[20px] bg-gray-100 p-4 rounded-t-lg font-semibold text-sm text-gray-700">
                    <div>Банер</div>
                    <div>Назва</div>
                    <div>Переглядів</div>
                    <div>Статус</div>
                    <div>Додано/оновлено</div>
                    <div className="text-right">Дії</div>
                </div>
                {/* Дані */}
                <div className="border border-gray-200 rounded-b-lg">
                    {data?.products.map((product, i) => {
                        return (
                            <div
                                key={i}
                                className="grid grid-cols-[120px_0.7fr_80px_150px_1fr_200px] gap-[20px] p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 items-center"
                            >
                                <img
                                    src={product.images[0]?.url}
                                    className="max-h-[120px] w-full object-cover rounded"
                                    alt="banner"
                                />
                                <div>{product.name}</div>
                                <div>{0}</div>
                                <div>Опубліковано</div>
                                <div>
                                    {formatDate(product.createdAt)} /{" "}
                                    {formatDate(product.updatedAt)}
                                </div>
                                <div className="flex gap-[20px] justify-end">
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

export default AdminCategory;
