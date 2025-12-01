import {
    InstagramIcon,
    LocationIcon,
    MailIcon,
    PhoneIcon,
    TelegramIcon,
    TiktokIcon,
} from "@/shared/icons";
import Link from "next/link";
import { FooterNavList } from "./FooterNavList";

export function FooterContacts() {
    return (
        <FooterNavList title="Contacts">
            <Link
                href="tel:0970000000"
                className="text-neutral-200 text-sm flex gap-[10px] items-center hover:text-white group"
            >
                <PhoneIcon className="group-hover:stroke-white w-[25px] stroke-white/80 flex-shrink-0" />
                <span className="group-hover:underline">
                    +38 (097) 00 00 000
                </span>
            </Link>

            <Link
                href="mailto:job.tenshi@gmail.com"
                className="text-neutral-200 text-sm flex gap-[10px] items-center hover:text-white group"
            >
                <MailIcon className="group-hover:stroke-white w-[25px] stroke-white/80 flex-shrink-0" />
                <span className="group-hover:underline">
                    job.tenshi@gmail.com
                </span>
            </Link>

            <Link
                target="_blank"
                href="https://maps.app.goo.gl/B2e3TfjzMYLEjstU6"
                className="text-neutral-200 text-sm flex gap-[10px] items-center hover:text-white group"
            >
                <LocationIcon className="group-hover:stroke-white w-[25px] stroke-white/80 flex-shrink-0" />
                <span className="group-hover:underline">Ukraine, Lutsk</span>
            </Link>

            <div className="flex gap-[15px] mt-[10px]">
                {[
                    {
                        icon: (
                            <TiktokIcon className="w-[20px] fill-white group-hover:fill-black" />
                        ),
                        href: "#",
                    },
                    {
                        icon: (
                            <InstagramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        ),
                        href: "#",
                    },
                    {
                        icon: (
                            <TelegramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        ),
                        href: "#",
                    },
                ].map((item, i) => (
                    <button
                        key={i}
                        className="cursor-pointer p-[10px] border border-white/5 hover:bg-white group transition-all duration-300"
                    >
                        <Link href={item.href}>{item.icon}</Link>
                    </button>
                ))}
            </div>
        </FooterNavList>
    );
}
