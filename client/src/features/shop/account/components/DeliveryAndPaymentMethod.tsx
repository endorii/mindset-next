import Image from "next/image";
import MastercardImage from "../../../../../public/images/mastercard.png";
import NovaPoshtaImage from "../../../../../public/images/nova-poshta.png";
import VisaImage from "../../../../../public/images/visa.png";

export function DeliveryAndPaymentMethod() {
    return (
        <div className="flex flex-col gap-[10px] w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-bold text-xl mb-4">Доставка та оплата</div>

            <div className="flex md:flex-wrap items-center gap-[15px]">
                <Image
                    src={NovaPoshtaImage}
                    width={160}
                    alt="visa"
                    className="max-w-[160px]"
                />
                <div className="flex md:flex-wrap gap-[15px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="font-semibold text-lg">
                            Доставка у відділення "Нова Пошта"
                        </div>
                        <div className="text-sm text-white/60  max-w-md">
                            Отримуйте свої замовлення у найближчому відділенні
                            "Нова Пошта". Зручне самовивезення, швидка обробка
                            та відстеження посилки.
                        </div>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm text-white/60">
                        <li>Термін доставки: 1-3 робочі дні</li>
                        <li>Відстеження посилки у реальному часі</li>
                        <li>Можливість оплатити при отриманні</li>
                    </ul>
                </div>
            </div>

            <hr className="border-t border-white/10" />

            <div className="flex md:flex-wrap items-center gap-[15px]">
                <div className="flex items-center gap-[10px]">
                    <Image
                        src={VisaImage}
                        width={75}
                        alt="visa"
                        className="max-w-[75px]"
                    />
                    <Image
                        src={MastercardImage}
                        width={75}
                        alt="mastercard"
                        className="max-w-[75px]"
                    />
                </div>
                <div className="flex md:flex-wrap gap-[15px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="font-semibold text-lg">
                            Оплата карткою онлайн
                        </div>
                        <div className="text-sm text-white/60 max-w-md">
                            Швидка і безпечна оплата банківськими картками Visa,
                            MasterCard та іншими популярними платіжними
                            системами. Підтвердження платежу відразу.
                        </div>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm text-white/60">
                        <li>Підтримка 3D Secure для безпеки платежів</li>
                        <li>Оплата з мобільних пристроїв та комп’ютерів</li>
                        <li>Можливість збереження даних для швидших покупок</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
