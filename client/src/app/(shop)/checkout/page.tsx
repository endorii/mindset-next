"use client";

import {
    CheckoutResultTable,
    PreOrderInfo,
} from "@/features/checkout/components";
import { PaymentMethodType } from "@/features/checkout/types/checkout.types";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import { INovaPostDataObj } from "@/features/orders/types/orders.types";
import { useProductsByIds } from "@/features/products/hooks/useProducts";
import { useCartItemsFromUser } from "@/features/shop/cart/hooks/useCart";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import { CardIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs";
import { NovaPostSelect } from "@/shared/ui/selectors";
import { CheckoutSkeleton } from "@/shared/ui/skeletons";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import { useCartStore } from "@/store/useCartStore";
import { BadgeDollarSignIcon } from "lucide-react";
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
    const { cartItems } = useCartStore();

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

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.shippingAddress?.recipient || "",
                phoneNumber: user.phone || "",
                email: user.email || "",
            });
        }
    }, [user, reset]);

    useEffect(() => {
        const loadAreas = async () => {
            setNovaPoshtaLoading((prev) => ({ ...prev, areas: true }));
            setNovaPoshtaError(null);
            try {
                const data = await fetchAreas();
                setAreas(data);
            } catch (error) {
                console.error("Error loading areas:", error);
                setNovaPoshtaError("Failed to load areas");
                toast.error("Failed to load areas");
            } finally {
                setNovaPoshtaLoading((prev) => ({ ...prev, areas: false }));
            }
        };
        loadAreas();
    }, []);

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
                console.error("Error loading cities:", error);
                setNovaPoshtaError("Could not load cities");
                toast.error("Could not load cities");
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
                console.error("Error loading branches:", error);
                setNovaPoshtaError("Failed to load branch");
                toast.error("Failed to load branch");
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

    const onSubmit = async (data: FormData) => {
        if (!mergedCart.length) {
            toast.error("Cart is empty.");
            return;
        }

        if (!selectedArea || !selectedCity || !selectedWarehouse) {
            toast.error("Please select a complete delivery address");
            return;
        }

        const hasInvalidProducts = mergedCart.some(
            (item) => !item.product || !item.product.price
        );
        if (hasInvalidProducts) {
            toast.error("Some products are unavailable. Update cart");
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
                    toast.error("Failed to create order");
                    return;
                }

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
                    toast.error("Failed to create payment session");
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
            }
        } catch (err) {
            console.error(err);
            toast.error("Error when placing an order");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isUserCartPending || isProductsPending) return <CheckoutSkeleton />;

    if (isUserCartError)
        return (
            <ErrorWithMessage message="Error loading cart, please try again later" />
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
        <div className="flex flex-col gap-[10px] mt-[10px] text-white">
            <ShopTitle title={"Placeing an order"} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex md:flex-col justify-between px-[30px] sm:p-[10px] gap-[15px]">
                    <div className="flex flex-col gap-[10px] w-1/2 md:w-full bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] h-fit">
                        <div className="flex xs:flex-col gap-[15px] w-full">
                            <div className="flex flex-col gap-[10px] w-1/2 xs:w-full">
                                <div className="text-3xl font-perandory tracking-wider">
                                    Shipping details
                                </div>
                                <hr className="border-t border-white/5" />
                                <div className="flex flex-col gap-[15px] w-full">
                                    <InputField
                                        label="Full name*"
                                        placeholder="Petrenko Petro Petrovych"
                                        register={{
                                            ...register("fullName", {
                                                required: "Enter full name",
                                                pattern: {
                                                    value: /^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/,
                                                    message:
                                                        "Enter your full name in the format: Last Name First Name Patronymic (English letters only)",
                                                },
                                            }),
                                        }}
                                        errorMessage={errors.fullName?.message}
                                    />

                                    <InputField
                                        label="Phone number*"
                                        placeholder="+380XXXXXXXXX"
                                        register={{
                                            ...register("phoneNumber", {
                                                required: "Enter phone number",
                                                pattern: {
                                                    value: /^(?:\+380\d{9}|380\d{9}|0\d{9})$/,
                                                    message:
                                                        "Incorrect Ukrainian phone format",
                                                },
                                            }),
                                        }}
                                        errorMessage={
                                            errors.phoneNumber?.message
                                        }
                                    />

                                    <InputField
                                        label="E-mail*"
                                        placeholder="petro@gmail.com"
                                        register={{
                                            ...register("email", {
                                                required: "Enter e-mail",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message:
                                                        "Invalid e-mail format",
                                                },
                                            }),
                                        }}
                                        errorMessage={errors.email?.message}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px] w-1/2 xs:w-full">
                                <div className="text-3xl font-perandory tracking-wider">
                                    Delivery address
                                </div>
                                <hr className="border-t border-white/5" />
                                {novaPoshtaError && (
                                    <div className="text-red-500 text-sm bg-red-500/10 p-3">
                                        {novaPoshtaError}
                                    </div>
                                )}
                                <div className="flex gap-[15px]">
                                    <div className="flex flex-col gap-[15px] w-full">
                                        <NovaPostSelect
                                            label="Region*"
                                            options={areas}
                                            onChange={handleAreaChange}
                                            register={register("area", {
                                                required: "Choose region",
                                            })}
                                            errorMessage={errors.area?.message}
                                            disabled={novaPoshtaLoading.areas}
                                        />

                                        <NovaPostSelect
                                            label="City*"
                                            options={cities}
                                            onChange={handleCityChange}
                                            register={register("city", {
                                                required: "Choose city",
                                            })}
                                            errorMessage={errors.city?.message}
                                            disabled={
                                                !selectedArea ||
                                                novaPoshtaLoading.cities
                                            }
                                        />

                                        <NovaPostSelect
                                            label="Post office*"
                                            options={warehouses}
                                            onChange={handleWarehouseChange}
                                            register={register(
                                                "postDepartment",
                                                {
                                                    required:
                                                        "Choose Post office",
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

                    <div className="flex flex-col gap-[20px] w-1/2 md:w-full bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] text-white">
                        <CheckoutResultTable cart={mergedCart} />
                        <div>
                            <div className="text-xl font-semibold mb-2 font-perandory tracking-wider">
                                Payment option*
                            </div>
                            <Controller
                                name="paymentMethod"
                                control={control}
                                rules={{ required: "Choose a payment method" }}
                                render={({ field }) => (
                                    <div className="flex sm:flex-col gap-3">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center gap-2 px-6 py-3 font-medium border border-transparent transition-all ${
                                                errors.paymentMethod &&
                                                "border-red-500!"
                                            } ${
                                                field.value === "stripe"
                                                    ? "bg-yellow-700 text-white shadow-lg"
                                                    : "bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30 border border-yellow-500/30"
                                            }`}
                                            onClick={() =>
                                                field.onChange("stripe")
                                            }
                                        >
                                            <CardIcon className="w-[25px] fill-white" />
                                            <div>
                                                <div>Pay with card</div>
                                                <div className="text-[10px] font-light">
                                                    (Secure with Stripe)
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            className={`flex items-center justify-center gap-2 px-6 py-3 font-medium border border-transparent transition-all ${
                                                errors.paymentMethod &&
                                                "border-red-500!"
                                            } ${
                                                field.value === "cod"
                                                    ? "bg-yellow-700 text-white shadow-lg"
                                                    : "bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30 border border-yellow-500/30"
                                            }`}
                                            onClick={() =>
                                                field.onChange("cod")
                                            }
                                        >
                                            <BadgeDollarSignIcon className="w-[27px] stroke-white" />
                                            <span>Cash on delivery</span>
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
                                isUserCartPending ||
                                cartToShow.length === 0 ||
                                isSubmitting ||
                                Object.values(novaPoshtaLoading).some(
                                    (loading) => loading
                                )
                            }
                        >
                            {isSubmitting
                                ? "Order processing..."
                                : "Confirm order"}
                        </MonoButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
