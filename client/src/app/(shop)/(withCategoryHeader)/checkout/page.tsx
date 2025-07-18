"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { ICartItem } from "@/features/cart/types/cart.types";
import PreOrderInfo from "@/features/checkout/components/PreOrderInfo";
import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import InputField from "@/shared/ui/inputs/InputField";
import H3 from "@/shared/ui/text/H3";
import { useEffect, useState } from "react";

interface INovaPostDataObj {
    Description: string;
    Ref: string;
}

function Checkout() {
    const { data: user, isLoading } = useCurrentUser();

    const [userInitials, setUserInitials] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [areas, setAreas] = useState<INovaPostDataObj[]>([]);
    const [cities, setCities] = useState<INovaPostDataObj[]>([]);
    const [warehouses, setWarehouses] = useState<INovaPostDataObj[]>([]);

    const [selectedArea, setSelectedArea] = useState<INovaPostDataObj | null>(
        null
    );
    const [selectedCity, setSelectedCity] = useState<INovaPostDataObj | null>(
        null
    );
    const [selectedWarehouse, setSelectedWarehouse] =
        useState<INovaPostDataObj | null>(null);

    useEffect(() => {
        const loadAreas = async () => {
            try {
                const data = await fetchAreas();
                setAreas(data);
            } catch (error) {
                console.error("Помилка завантаження областей:", error);
            }
        };
        loadAreas();
    }, []);

    useEffect(() => {
        if (selectedArea) {
            const loadCities = async () => {
                try {
                    const data = await fetchCities(selectedArea.Ref);
                    setCities(data);
                } catch (error) {
                    console.error("Помилка завантаження міст:", error);
                    setCities([]);
                }
            };
            loadCities();

            setSelectedCity(null);
            setSelectedWarehouse(null);
            setWarehouses([]);
        }
    }, [selectedArea]);

    useEffect(() => {
        if (selectedCity) {
            const loadWarehouses = async () => {
                try {
                    const data = await fetchWarehouses(selectedCity.Ref);
                    setWarehouses(data);
                } catch (error) {
                    console.error("Помилка завантаження відділень:", error);
                    setWarehouses([]);
                }
            };
            loadWarehouses();

            setSelectedWarehouse(null);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (user) {
            setUserInitials(user.shippingAddress.recipient || "");
            setUserPhone(user.phone || "");
            setUserEmail(user.email || "");
        }
    }, [user]);

    if (isLoading) return <p>Завантаження ...</p>;
    if (!user) return <p>Не авторизовано</p>;

    return (
        <div className="relative text-white">
            <H3>Оформлення</H3>
            <div className="flex justify-between pt-[120px] gap-[15px]">
                <div className="flex flex-col gap-[30px] w-[60%] rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="flex gap-[15px]">
                        <div className="flex flex-col gap-[30px] w-2/3">
                            <div className="flex flex-col gap-[15px]">
                                <div className="text-3xl font-thin">
                                    Реквізити для відправки
                                </div>
                                <hr className="border-t border-white/10" />
                                <div className="flex flex-col gap-[13px] w-full">
                                    <InputField
                                        label="Ініціали (ПІБ)*"
                                        required
                                        value={userInitials}
                                        placeholder="Петренко Петро Петрович"
                                        onChangeValue={(e) =>
                                            setUserInitials(e.target.value)
                                        }
                                    />
                                    <InputField
                                        label="Номер телефону*"
                                        required
                                        value={userPhone}
                                        placeholder="(09*)-**-**-***"
                                        onChangeValue={(e) =>
                                            setUserPhone(e.target.value)
                                        }
                                    />
                                    <InputField
                                        label="Електронна пошта"
                                        value={userEmail}
                                        placeholder="petro@gmail.com"
                                        onChangeValue={(e) =>
                                            setUserEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[15px]">
                                <div className="text-3xl font-thin">
                                    Адреса доставки
                                </div>
                                <hr className="border-t border-white/10" />
                                <div className="flex gap-[15px]">
                                    <div className="flex flex-col gap-[13px] w-full">
                                        <div className="flex flex-col gap-[7px]">
                                            <label className="text-sm font-semibold">
                                                Область
                                            </label>
                                            <select
                                                className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                                                value={selectedArea?.Ref || ""}
                                                onChange={(e) => {
                                                    const area =
                                                        areas.find(
                                                            (a) =>
                                                                a.Ref ===
                                                                e.target.value
                                                        ) || null;
                                                    setSelectedArea(area);
                                                }}
                                            >
                                                <option value="" disabled>
                                                    Оберіть область
                                                </option>
                                                {areas.map((area) => (
                                                    <option
                                                        key={area.Ref}
                                                        value={area.Ref}
                                                    >
                                                        {area.Description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-[7px]">
                                            <label className="text-sm font-semibold">
                                                Місто
                                            </label>
                                            <select
                                                className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                                                value={selectedCity?.Ref || ""}
                                                onChange={(e) => {
                                                    const city =
                                                        cities.find(
                                                            (c) =>
                                                                c.Ref ===
                                                                e.target.value
                                                        ) || null;
                                                    setSelectedCity(city);
                                                }}
                                                disabled={!selectedArea}
                                            >
                                                <option value="" disabled>
                                                    Оберіть місто
                                                </option>
                                                {cities.map((city) => (
                                                    <option
                                                        key={city.Ref}
                                                        value={city.Ref}
                                                    >
                                                        {city.Description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-[7px]">
                                            <label className="text-sm font-semibold">
                                                Відділення / Поштомати
                                            </label>
                                            <select
                                                className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                                                value={
                                                    selectedWarehouse?.Ref || ""
                                                }
                                                onChange={(e) => {
                                                    const wh =
                                                        warehouses.find(
                                                            (w) =>
                                                                w.Ref ===
                                                                e.target.value
                                                        ) || null;
                                                    setSelectedWarehouse(wh);
                                                }}
                                                disabled={!selectedCity}
                                            >
                                                <option value="" disabled>
                                                    Оберіть відділення
                                                </option>
                                                {warehouses.map((wh) => (
                                                    <option
                                                        key={wh.Ref}
                                                        value={wh.Ref}
                                                    >
                                                        {wh.Description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PreOrderInfo />
                    </div>
                </div>

                <div className="flex flex-col gap-[20px] w-[40%] rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[20px] text-white">
                    <div className="text-3xl font-thin">
                        Інформація про замволення
                    </div>

                    {user.cart.length > 0 ? (
                        <div className="flex flex-col gap-[15px] mt-[5px]">
                            <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] font-semibold border-b border-white/10 pb-2 text-sm">
                                <div>Назва</div>
                                <div className="text-right">Колір</div>
                                <div className="text-right">Розмір</div>
                                <div className="text-right">Тип</div>
                                <div className="text-right">Ціна</div>
                                <div className="text-right">Кількість</div>
                                <div className="text-right">Сума</div>
                            </div>

                            {user.cart.map((item: ICartItem) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] py-2"
                                >
                                    <div>{item.product.name}</div>
                                    <div className="text-right">
                                        {item.color}
                                    </div>
                                    <div className="text-right">
                                        {item.size}
                                    </div>
                                    <div className="text-right">
                                        {item.type}
                                    </div>
                                    <div className="text-right">
                                        {item.product.price} ₴
                                    </div>
                                    <div className="text-right">
                                        {item.quantity}
                                    </div>
                                    <div className="text-right ">
                                        {item.product.price * item.quantity} ₴
                                    </div>
                                </div>
                            ))}

                            <div className="border-t border-white/10 pt-4 flex flex-col gap-[15px]">
                                <div className="flex justify-between">
                                    <span>Сума товарів:</span>
                                    <span className=" font-semibold">
                                        {user.cart.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.product.price *
                                                    item.quantity,
                                            0
                                        )}{" "}
                                        ₴
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Доставка:</span>
                                    <span className="text-gray-300 text-sm">
                                        За тарифами перевізника
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-base pt-2 border-t border-white/10">
                                    <span>Усього до сплати:</span>
                                    <span className="text-xl">
                                        {user.cart.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.product.price *
                                                    item.quantity,
                                            0
                                        )}{" "}
                                        ₴
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-300">
                            Кошик порожній
                        </div>
                    )}

                    <div>
                        <div className="text-sm font-semibold mt-4">
                            Вибір оплати:
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button className="px-14 py-12 bg-green-500/30 text-white rounded-xl hover:bg-green-600 transition">
                                LiqPay
                            </button>
                            <button className="px-14 py-12 bg-blue-500/30 text-white rounded-xl hover:bg-blue-600 transition">
                                Fonty
                            </button>
                        </div>
                    </div>

                    <button className="mt-6 w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">
                        Підтвердити замовлення
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
