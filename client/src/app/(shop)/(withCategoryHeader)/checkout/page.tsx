"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { postOrder } from "@/features/checkout/api/checkout.api";
import CheckoutInputDetails from "@/features/checkout/components/CheckoutInputDetails";
import CheckoutResultTable from "@/features/checkout/components/CheckoutResultTable";
import ChooseCheckoutDeliveryAddress from "@/features/checkout/components/ChooseCheckoutDeliveryAddress";
import PayMethod from "@/features/checkout/components/PayMethod";
import PreOrderInfo from "@/features/checkout/components/PreOrderInfo";
import {
    INovaPostDataObj,
    IOrder,
} from "@/features/checkout/types/checkout.types";
import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import MonoLink from "@/shared/ui/buttons/MonoLink";
import H3 from "@/shared/ui/text/H3";
import { data } from "motion/react-client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

    const onSubmit = async () => {
        const userId = user?.id;

        if (!userId) return;

        const orderData: IOrder = {
            id: "",
            fullName: userInitials,
            phoneNumber: userPhone,
            area: selectedArea?.Description || "",
            city: selectedCity?.Description || "",
            postDepartment: selectedWarehouse?.Description || "",
            additionalInfo: "",
            status: "pending",
            userId: user?.id,
            total:
                user?.cart.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                ) || 0,
            items:
                user?.cart.map((item) => ({
                    id: "",
                    orderId: "",
                    productId: item.productId,
                    name: item.product.name,
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                    color: item.color,
                    size: item.size,
                    type: item.type,
                })) || [],
        };

        try {
            await postOrder(orderData);
            console.log(user.id, orderData);

            toast.success("Замовлення створено, перенаправлення...");
            // setTimeout(() => {
            //     redirect("/orders");
            // }, 1000);
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
        }
    };

    if (isLoading) return <p>Завантаження ...</p>;
    if (!user) return <p>Не авторизовано</p>;

    return (
        <div className="relative text-white">
            <H3>Оформлення</H3>
            <div className="flex justify-between pt-[120px] gap-[15px]">
                <div className="flex flex-col gap-[15px] w-1/2 rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] h-fit">
                    <div className="flex gap-[15px]">
                        <CheckoutInputDetails
                            userInitials={userInitials}
                            setUserInitials={setUserInitials}
                            userPhone={userPhone}
                            setUserPhone={setUserPhone}
                            userEmail={userEmail}
                            setUserEmail={setUserEmail}
                        />
                        <ChooseCheckoutDeliveryAddress
                            areas={areas}
                            selectedArea={selectedArea}
                            setSelectedArea={setSelectedArea}
                            cities={cities}
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                            warehouses={warehouses}
                            selectedWarehouse={selectedWarehouse}
                            setSelectedWarehouse={setSelectedWarehouse}
                        />
                    </div>
                    <PreOrderInfo />
                </div>

                <div className="flex flex-col gap-[15px] w-1/2 rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[30px] text-white">
                    <CheckoutResultTable cart={user.cart} />
                    <PayMethod />
                    <MonoButton
                        onClick={() => {
                            onSubmit();
                        }}
                        disabled={
                            !userInitials ||
                            !userPhone ||
                            !selectedArea ||
                            !selectedCity ||
                            !selectedWarehouse
                        }
                    >
                        Підтвердити замовлення
                    </MonoButton>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
