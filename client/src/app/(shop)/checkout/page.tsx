"use client";

import {
    CheckoutResultTable,
    PreOrderInfo,
} from "@/features/checkout/components";
import { PaymentMethodType } from "@/features/checkout/types/checkout.types";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import { INovaPostDataObj } from "@/features/orders/types/orders.types";
import { useProductsByIds } from "@/features/products/hooks/useProducts";
import {
    useCartItemsFromUser,
    useDeleteCartItemFromUser,
} from "@/features/shop/cart/hooks/useCart";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import { MonoButton } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";
import { NovaPoshtaSelect } from "@/shared/ui/selectors/NovaPoshtaSelect";
import { CheckoutSkeleton } from "@/shared/ui/skeletons";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    area: string;
    city: string;
    postDepartment: string;
    paymentMethod: PaymentMethodType;
}

interface NovaPoshtaLoadingState {
    areas: boolean;
    cities: boolean;
    warehouses: boolean;
}

function Checkout() {
    const router = useRouter();
    const { cartItems, removeFromCart, clearCart } = useCartStore();

    const deleteCartItemMutation = useDeleteCartItemFromUser();

    const { data: user } = useCurrentUser();

    const {
        data: userCartItems,
        isPending: isUserCartPending,
        isError: isUserCartError,
    } = useCartItemsFromUser();

    const cartToShow = user ? userCartItems ?? [] : cartItems;

    const { data: products, isPending: isProductsPending } = useProductsByIds(
        cartToShow.map((item) => item.productId)
    );

    const mergedCart = cartToShow.map((item) => {
        const product = products?.find((p) => p.id === item.productId);
        return { ...item, product };
    });

    // Стани для Нової Пошти
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

    // Стани завантаження
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [novaPoshtaLoading, setNovaPoshtaLoading] =
        useState<NovaPoshtaLoadingState>({
            areas: false,
            cities: false,
            warehouses: false,
        });
    const [novaPoshtaError, setNovaPoshtaError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            area: "",
            city: "",
            postDepartment: "",
            paymentMethod: "stripe",
        },
    });

    const createOrderMutation = useCreateOrder();

    // Завантаження даних користувача
    useEffect(() => {
        if (user) {
            reset({
                fullName: user.shippingAddress?.recipient || "",
                phoneNumber: user.phone || "",
                email: user.email || "",
            });
        }
    }, [user, reset]);

    // Завантаження областей при монтуванні
    useEffect(() => {
        const loadAreas = async () => {
            setNovaPoshtaLoading((prev) => ({ ...prev, areas: true }));
            setNovaPoshtaError(null);
            try {
                const data = await fetchAreas();
                setAreas(data);
            } catch (error) {
                console.error("Помилка завантаження областей:", error);
                setNovaPoshtaError("Не вдалося завантажити області");
                toast.error("Не вдалося завантажити області");
            } finally {
                setNovaPoshtaLoading((prev) => ({ ...prev, areas: false }));
            }
        };
        loadAreas();
    }, []);

    // Завантаження міст при виборі області
    useEffect(() => {
        if (!selectedArea) {
            setCities([]);
            setSelectedCity(null);
            setSelectedWarehouse(null);
            setWarehouses([]);
            return;
        }

        const loadCities = async () => {
            setNovaPoshtaLoading((prev) => ({ ...prev, cities: true }));
            setNovaPoshtaError(null);
            try {
                const data = await fetchCities(selectedArea.Ref);
                setCities(data);
            } catch (error) {
                console.error("Помилка завантаження міст:", error);
                setNovaPoshtaError("Не вдалося завантажити міста");
                toast.error("Не вдалося завантажити міста");
                setCities([]);
            } finally {
                setNovaPoshtaLoading((prev) => ({ ...prev, cities: false }));
            }
        };

        loadCities();
        setSelectedCity(null);
        setSelectedWarehouse(null);
        setWarehouses([]);
        setValue("city", "");
        setValue("postDepartment", "");
    }, [selectedArea, setValue]);

    // Завантаження відділень при виборі міста
    useEffect(() => {
        if (!selectedCity) {
            setWarehouses([]);
            setSelectedWarehouse(null);
            return;
        }

        const loadWarehouses = async () => {
            setNovaPoshtaLoading((prev) => ({ ...prev, warehouses: true }));
            setNovaPoshtaError(null);
            try {
                const data = await fetchWarehouses(selectedCity.Ref);
                setWarehouses(data);
            } catch (error) {
                console.error("Помилка завантаження відділень:", error);
                setNovaPoshtaError("Не вдалося завантажити відділення");
                toast.error("Не вдалося завантажити відділення");
                setWarehouses([]);
            } finally {
                setNovaPoshtaLoading((prev) => ({
                    ...prev,
                    warehouses: false,
                }));
            }
        };

        loadWarehouses();
        setSelectedWarehouse(null);
        setValue("postDepartment", "");
    }, [selectedCity, setValue]);

    // Обробники вибору
    const handleAreaChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const area = areas.find((a) => a.Ref === e.target.value) || null;
            setSelectedArea(area);
            setValue("area", e.target.value);
        },
        [areas, setValue]
    );

    const handleCityChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const city = cities.find((c) => c.Ref === e.target.value) || null;
            setSelectedCity(city);
            setValue("city", e.target.value);
        },
        [cities, setValue]
    );

    const handleWarehouseChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const warehouse =
                warehouses.find((w) => w.Ref === e.target.value) || null;
            setSelectedWarehouse(warehouse);
            setValue("postDepartment", e.target.value);
        },
        [warehouses, setValue]
    );

    // Очищення кошика
    const clearUserCart = async () => {
        if (user && userCartItems) {
            const deletePromises = userCartItems.map((item) =>
                deleteCartItemMutation.mutateAsync(item.id)
            );
            await Promise.all(deletePromises);
        } else {
            clearCart();
        }
    };

    // Відправка форми
    const onSubmit = async (data: FormData) => {
        if (!mergedCart.length) {
            toast.error("Кошик порожній");
            return;
        }

        if (!selectedArea || !selectedCity || !selectedWarehouse) {
            toast.error("Будь ласка, оберіть адресу доставки повністю");
            return;
        }

        const hasInvalidProducts = mergedCart.some(
            (item) => !item.product || !item.product.price
        );
        if (hasInvalidProducts) {
            toast.error("Деякі товари недоступні. Оновіть кошик");
            return;
        }

        setIsSubmitting(true);

        try {
            if (data.paymentMethod === "stripe") {
                const destructedCart = mergedCart.map(
                    ({ product, ...item }) => item
                );

                const order = await createOrderMutation.mutateAsync({
                    userId: user?.id,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    area: selectedArea.Description,
                    city: selectedCity.Description,
                    postDepartment: selectedWarehouse.Description,
                    paymentMethod: data.paymentMethod,
                    items: destructedCart,
                });

                if (!order.data) {
                    toast.error("Не вдалося створити замовлення");
                    return;
                }

                // await clearUserCart();

                console.log(order.data.id);

                const res = await fetch(
                    `${
                        process.env.NEXT_PUBLIC_API_URL ||
                        "http://localhost:5000/api"
                    }/stripe/checkout`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ orderId: order.data.id }),
                    }
                );

                const { url } = await res.json();
                if (url) {
                    window.location.href = url;
                } else {
                    toast.error("Не вдалося створити платіжну сесію");
                }
            } else if (data.paymentMethod === "cod") {
                const destructedCart = mergedCart.map(
                    ({ product, ...item }) => item
                );
                await createOrderMutation.mutateAsync({
                    userId: user?.id,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    area: selectedArea.Description,
                    city: selectedCity.Description,
                    postDepartment: selectedWarehouse.Description,
                    paymentMethod: data.paymentMethod,
                    items: destructedCart,
                });

                // await clearUserCart();

                toast.success(
                    "Замовлення успішно оформлено. Очікуйте... Наші менеджери зв'яжуться з вами для підтвердження"
                );
            }
        } catch (err) {
            console.error(err);
            toast.error("Помилка при оформленні замовлення");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Стани завантаження
    if (isUserCartPending || isProductsPending) return <CheckoutSkeleton />;

    if (isUserCartError)
        return (
            <ErrorWithMessage message="Помилка під час завантаження кошика, спробуйте пізніше" />
        );

    if (!cartToShow.length) {
        return (
            <div className="flex flex-col gap-[30px] text-white items-center justify-center min-h-[90vh] pb-[100px]">
                <ShopTitle title={"Your cart is empty"} />
                <MonoButton onClick={() => router.push("/")}>
                    Start shopping
                </MonoButton>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[30px] mt-[30px] text-white">
            <ShopTitle title={"Placeing an order"} />
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
                                                        "Введіть ПІБ у форматі: Прізвище Ім'я По батькові",
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
                                        label="Електронна пошта*"
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
                                {novaPoshtaError && (
                                    <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                                        {novaPoshtaError}
                                    </div>
                                )}
                                <div className="flex gap-[15px]">
                                    <div className="flex flex-col gap-[13px] w-full">
                                        <NovaPoshtaSelect
                                            label="Область*"
                                            options={areas}
                                            onChange={handleAreaChange}
                                            register={register("area", {
                                                required: "Оберіть область",
                                            })}
                                            errorMessage={errors.area?.message}
                                            disabled={novaPoshtaLoading.areas}
                                        />

                                        <NovaPoshtaSelect
                                            label="Місто*"
                                            options={cities}
                                            onChange={handleCityChange}
                                            register={register("city", {
                                                required: "Оберіть місто",
                                            })}
                                            errorMessage={errors.city?.message}
                                            disabled={
                                                !selectedArea ||
                                                novaPoshtaLoading.cities
                                            }
                                        />

                                        <NovaPoshtaSelect
                                            label="Відділення*"
                                            options={warehouses}
                                            onChange={handleWarehouseChange}
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
                                            disabled={
                                                !selectedCity ||
                                                novaPoshtaLoading.warehouses
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PreOrderInfo />
                    </div>

                    <div className="flex flex-col gap-[15px] w-1/2 rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] text-white">
                        <CheckoutResultTable cart={mergedCart} />
                        <div>
                            <div className="text-sm font-semibold mb-2">
                                Вибір оплати:*
                            </div>
                            <Controller
                                name="paymentMethod"
                                control={control}
                                rules={{ required: "Оберіть метод оплати" }}
                                render={({ field }) => (
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            className={`px-6 py-3 rounded-xl transition ${
                                                field.value === "stripe"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-purple-500/30 text-white hover:bg-purple-600"
                                            }`}
                                            onClick={() =>
                                                field.onChange("stripe")
                                            }
                                        >
                                            Stripe
                                        </button>

                                        <button
                                            type="button"
                                            className={`px-6 py-3 rounded-xl transition ${
                                                field.value === "cod"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-purple-500/30 text-white hover:bg-purple-600"
                                            }`}
                                            onClick={() =>
                                                field.onChange("cod")
                                            }
                                        >
                                            Накладений платіж
                                        </button>
                                    </div>
                                )}
                            />
                            {errors.paymentMethod && (
                                <span className="text-red-500 text-sm mt-1 block">
                                    {errors.paymentMethod.message}
                                </span>
                            )}
                        </div>

                        <MonoButton
                            type="submit"
                            disabled={
                                cartToShow.length === 0 ||
                                isSubmitting ||
                                Object.values(novaPoshtaLoading).some(
                                    (loading) => loading
                                )
                            }
                        >
                            {isSubmitting
                                ? "Обробка замовлення..."
                                : "Підтвердити замовлення"}
                        </MonoButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
