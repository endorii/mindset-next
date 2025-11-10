"use client";

import {
    CheckoutResultTable,
    PreOrderInfo,
} from "@/features/checkout/components";
import { PaymentMethodType } from "@/features/checkout/types/checkout.types";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import { INovaPostDataObj, IOrder } from "@/features/orders/types/orders.types";
import { useCartItemsFromUser } from "@/features/shop/cart/hooks/useCart";
import { ICartItem } from "@/features/shop/cart/types/cart.types";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import { MonoButton } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import InputField from "@/shared/ui/inputs/InputField";
import { NovaPoshtaSelect } from "@/shared/ui/selectors/NovaPoshtaSelect";
import { CheckoutSkeleton } from "@/shared/ui/skeletons";
import ShopTitle from "@/shared/ui/titles/ShopTitle";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    area: string;
    city: string;
    postDepartment: string;
    PaymentMethod: PaymentMethodType;
}

function Checkout() {
    const { data: user, isPending: isUserPending } = useCurrentUser();
    const {
        data: userCart,
        isPending: isUserCartPending,
        isError: isUserCartError,
    } = useCartItemsFromUser();

    const [localCart, setLocalCart] = useState<ICartItem[]>([]);
    const cartToShow = user ? userCart ?? [] : localCart;

    useEffect(() => {
        if (!user && !isUserPending) {
            // Завантажуємо локальну корзину з localStorage
            const storedCart = localStorage.getItem("cart");
            const parsedCart: ICartItem[] = storedCart
                ? JSON.parse(storedCart)
                : [];
            setLocalCart(parsedCart);
        }
    }, [user, isUserPending]);

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
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            area: "",
            city: "",
            postDepartment: "",
            PaymentMethod: null,
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
        if (!cartToShow) return;
        const userId = user?.id;

        const orderData: IOrder = {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            area: selectedArea?.Description || "",
            city: selectedCity?.Description || "",
            postDepartment: selectedWarehouse?.Description || "",
            additionalInfo: "",
            status: "pending",
            paymentMethod: data.PaymentMethod,
            userId,
            total:
                cartToShow.reduce(
                    (acc, item) => acc + item.product?.price * item.quantity,
                    0
                ) || 0,
            items:
                cartToShow.map((item) => ({
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

            await // setTimeout(() => {
            //     redirect("/orders");
            // }, 1000);
            reset();
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
        }
    };

    if (isUserPending || isUserCartPending) return <CheckoutSkeleton />;

    if (isUserCartError)
        return (
            <ErrorWithMessage message="Помилка під час завантаження кошика, спробуйте пізніше" />
        );

    return (
        <div className="flex flex-col gap-[50px] text-white">
            <ShopTitle
                title={"Оформлення замовлення"}
                subtitle={"Placing an order"}
            />
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
                        <CheckoutResultTable cart={cartToShow} />
                        <div>
                            <div className="text-sm font-semibold mb-2">
                                Вибір оплати:
                            </div>
                            <Controller
                                name="PaymentMethod"
                                control={control}
                                rules={{ required: "Оберіть метод оплати" }}
                                render={({ field }) => (
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            className={`px-6 py-3 rounded-xl transition ${
                                                field.value === "mono"
                                                    ? "bg-green-600 text-white"
                                                    : "bg-green-500/30 text-white hover:bg-green-600"
                                            }`}
                                            onClick={() =>
                                                field.onChange("mono")
                                            }
                                        >
                                            MonoPay
                                        </button>

                                        <button
                                            type="button"
                                            className={`px-6 py-3 rounded-xl transition ${
                                                field.value === "liqpay"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-blue-500/30 text-white hover:bg-blue-600"
                                            }`}
                                            onClick={() =>
                                                field.onChange("liqpay")
                                            }
                                        >
                                            LiqPay
                                        </button>
                                    </div>
                                )}
                            />
                            {errors.PaymentMethod && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.PaymentMethod.message}
                                </span>
                            )}
                        </div>
                        <MonoButton
                            type="submit"
                            disabled={cartToShow.length === 0}
                        >
                            Підтвердити замовлення
                        </MonoButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
