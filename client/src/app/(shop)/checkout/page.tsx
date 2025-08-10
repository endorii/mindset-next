"use client";

import { useCartItemsFromUser } from "@/features/shop/cart/hooks/useCart";
import {
    PreOrderInfo,
    CheckoutResultTable,
    PayMethod,
} from "@/features/checkout/components";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import { INovaPostDataObj, IOrder } from "@/features/orders/types/orders.types";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import { NovaPoshtaSelect } from "@/shared/ui/selectors/NovaPoshtaSelect";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    area: string;
    city: string;
    postDepartment: string;
}

function Checkout() {
    const { data: user, isPending } = useCurrentUser();

    const { data } = useCartItemsFromUser();

    const cart = data || [];

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

    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            area: "",
            city: "",
            postDepartment: "",
        },
    });

    const createOrderMutation = useCreateOrder();

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.shippingAddress?.recipient,
                phoneNumber: user.phone,
                email: user.email,
            });

            setModalMessage("");
        }
    }, [user]);

    useEffect(() => {
        const loadAreas = async () => {
            try {
                const data = await fetchAreas();
                // clearErrors("area");
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
                    // clearErrors("city");
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
                    // clearErrors("postDepartment");
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

    const onSubmit = async (data: FormData) => {
        const userId = user?.id;

        if (!userId) return;

        const orderData: IOrder = {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            area: selectedArea?.Description || "",
            city: selectedCity?.Description || "",
            postDepartment: selectedWarehouse?.Description || "",
            additionalInfo: "",
            status: "pending",
            userId: user?.id,
            total:
                cart.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                ) || 0,
            items:
                cart.map((item) => ({
                    productId: item.productId,
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                    color: item.color,
                    size: item.size,
                    type: item.type,
                })) || [],
        };

        try {
            await createOrderMutation.mutateAsync(orderData);

            toast.success("Замовлення створено, перенаправлення...");
            // setTimeout(() => {
            //     redirect("/orders");
            // }, 1000);
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
        }
    };

    if (isPending) return <p>Завантаження ...</p>;
    if (!user) return <p>Не авторизовано</p>;

    return (
        <div className="flex flex-col gap-[50px] mt-[30px] text-white">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">
                    Оформлення замовлення
                </div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Placing an order
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between px-[30px] gap-[15px]">
                    <div className="flex flex-col gap-[15px] w-1/2 rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] h-fit">
                        <div className="flex gap-[15px] w-full">
                            <div className="flex flex-col gap-[15px] w-1/2">
                                <div className="text-3xl font-thin">
                                    Реквізити для відправки
                                </div>
                                <hr className="border-t border-white/10" />
                                <div className="flex flex-col gap-[13px] w-full">
                                    <InputField
                                        label="Ініціали (ПІБ)*"
                                        placeholder="Петренко Петро Петрович"
                                        register={{
                                            ...register("fullName", {
                                                required: "Введіть ініціали",
                                                pattern: {
                                                    value: /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ][а-яіїєґ']+$/,
                                                    message:
                                                        "Введіть ПІБ у форматі: Прізвище Ім’я По батькові",
                                                },
                                            }),
                                        }}
                                        errorMessage={errors.fullName?.message}
                                    />

                                    <InputField
                                        label="Номер телефону*"
                                        placeholder="+380*********"
                                        register={{
                                            ...register("phoneNumber", {
                                                required:
                                                    "Введіть номер телефону",
                                                pattern: {
                                                    value: /^(?:\+380\d{9}|380\d{9}|0\d{9}|\(\d{3}\)-\d{2}-\d{2}-\d{3})$/,
                                                    message:
                                                        "Невірний формат телефону",
                                                },
                                            }),
                                        }}
                                        errorMessage={
                                            errors.phoneNumber?.message
                                        }
                                    />

                                    <InputField
                                        label="Електронна пошта"
                                        placeholder="petro@gmail.com"
                                        register={{
                                            ...register("email", {
                                                required: "Введіть email",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message:
                                                        "Невірний формат email",
                                                },
                                            }),
                                        }}
                                        errorMessage={errors.email?.message}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[15px] w-1/2">
                                <div className="text-3xl font-thin">
                                    Адреса доставки
                                </div>
                                <hr className="border-t border-white/10" />
                                <div className="flex gap-[15px]">
                                    <div className="flex flex-col gap-[13px] w-full">
                                        <NovaPoshtaSelect
                                            label="Область"
                                            options={areas}
                                            onChange={(e) => {
                                                const area =
                                                    areas.find(
                                                        (a) =>
                                                            a.Ref ===
                                                            e.target.value
                                                    ) || null;
                                                setSelectedArea(area);
                                            }}
                                            register={register("area", {
                                                required: "Оберіть область",
                                            })}
                                            errorMessage={errors.area?.message}
                                        />

                                        <NovaPoshtaSelect
                                            label="Місто"
                                            options={cities}
                                            onChange={(e) => {
                                                const city =
                                                    cities.find(
                                                        (c) =>
                                                            c.Ref ===
                                                            e.target.value
                                                    ) || null;
                                                setSelectedCity(city);
                                            }}
                                            register={register("city", {
                                                required: "Оберіть місто",
                                            })}
                                            errorMessage={errors.city?.message}
                                            disabled={!selectedArea}
                                        />

                                        <NovaPoshtaSelect
                                            label="Відділення"
                                            options={warehouses}
                                            onChange={(e) => {
                                                const wh =
                                                    warehouses.find(
                                                        (w) =>
                                                            w.Ref ===
                                                            e.target.value
                                                    ) || null;
                                                setSelectedWarehouse(wh);
                                            }}
                                            register={register(
                                                "postDepartment",
                                                {
                                                    required:
                                                        "Оберіть відділення або поштомат",
                                                }
                                            )}
                                            errorMessage={
                                                errors.postDepartment?.message
                                            }
                                            disabled={!selectedCity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PreOrderInfo />
                    </div>

                    <div className="flex flex-col gap-[15px] w-1/2 rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] text-white">
                        <CheckoutResultTable cart={cart} />
                        <PayMethod />
                        <MonoButton type="submit" disabled={cart.length === 0}>
                            Підтвердити замовлення
                        </MonoButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
