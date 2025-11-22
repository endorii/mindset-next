import Image from "next/image";
import MastercardImage from "../../../../../public/images/mastercard.png";
import NovaPoshtaImage from "../../../../../public/images/nova-post.png";
import VisaImage from "../../../../../public/images/visa.png";

export function DeliveryAndPaymentMethod() {
    return (
        <div className="flex flex-col gap-[10px] w-full bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-perandory tracking-wider text-3xl">
                Delivery and payment
            </div>

            <div className="flex md:flex-wrap items-center gap-[15px] py-[10px]">
                <Image
                    src={NovaPoshtaImage}
                    width={160}
                    alt="visa"
                    className="max-w-[160px]"
                />
                <div className="flex md:flex-wrap gap-[15px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="font-perandory tracking-wider text-xl">
                            Delivery to Nova Post branch
                        </div>
                        <div className="text-sm text-neutral-400 max-w-md font-light">
                            Receive your orders at the nearest Nova Poshta
                            branch. Convenient pickup, fast processing, and
                            real-time parcel tracking.
                        </div>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm text-neutral-400 font-light">
                        <li>Delivery time: 1–3 business days</li>
                        <li>Real-time parcel tracking</li>
                        <li>Option to pay upon pickup</li>
                    </ul>
                </div>
            </div>

            <hr className="border-t border-white/5" />

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
                        <div className="font-perandory tracking-wider text-xl">
                            Online card payment
                        </div>
                        <div className="text-sm text-neutral-400 max-w-md font-light">
                            Fast and secure payment with Visa, MasterCard, and
                            other popular payment systems. Instant payment
                            confirmation.
                        </div>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm text-neutral-400 font-light">
                        <li>3D Secure support for safe payments</li>
                        <li>Payment via mobile devices and computers</li>
                        <li>Option to save card details for faster checkout</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
