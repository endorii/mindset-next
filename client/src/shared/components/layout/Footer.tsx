"use client";

import { useGetCollections } from "@/features/collections/hooks/useCollections";
import {
    InstagramIcon,
    LocationIcon,
    MailIcon,
    PhoneIcon,
    TelegramIcon,
    TiktokIcon,
} from "@/shared/icons";
import { ErrorWithMessage } from "@/shared/ui/components";
import Link from "next/link";
import { FooterNavList } from "../FooterNavList";
import { FooterNavListItem } from "../FooterNavListItem";

export function Footer() {
    const {
        data: collections,
        isPending: isCollectionsPending,
        isError: isCollectionsError,
    } = useGetCollections();

    // const pathname = usePathname();
    // const collectionPath = pathname.split("/").filter(Boolean)[0] || null;

    // const [currentCollection, setCurrentCollection] =
    //     useState<ICollection | null>(null);

    // useEffect(() => {
    //     if (collectionPath) {
    //         const foundCollection =
    //             collections?.find((c) => c.path === collectionPath) || null;
    //         setCurrentCollection(foundCollection);
    //     }
    // }, [collectionPath]);

    return (
        <footer className="bg-transparent flex flex-col text-white mt-[50px] xs:mt-[10px]">
            <div className="relative flex sm:flex-col gap-[15px] sm:gap-[30px] p-[50px] sm:p-[20px] ">
                <div className="flex flex-col text-sm min-w-[300px] md:min-w-[250px]">
                    <Link
                        href="/"
                        className="font-bold text-6xl font-perandory tracking-wider"
                    >
                        mindset
                    </Link>
                    <div className="text-xl font-ballet tracking-wide font-light text-white/70">
                        More than clothes.
                    </div>
                </div>
                <div className="w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-1 gap-[150px] 2xl:gap-[100px] xl:gap-[70px] lg:gap-[50px] md:gap-[30px]">
                    {collections && collections.length > 0 ? (
                        <FooterNavList title="Collections">
                            {collections.map((collection) => (
                                <FooterNavListItem
                                    href={collection.path}
                                    key={collection.id}
                                >
                                    {collection.name}
                                </FooterNavListItem>
                            ))}
                        </FooterNavList>
                    ) : isCollectionsPending ? (
                        <ErrorWithMessage message="Виникла помилка під час завантаження колекцій" />
                    ) : isCollectionsError ? (
                        <ErrorWithMessage message="Виникла помилка під час завантаження колекцій" />
                    ) : null}
                    <FooterNavList title="Navigation">
                        <FooterNavListItem href="/">Home</FooterNavListItem>
                        <FooterNavListItem href="/cart">Cart</FooterNavListItem>
                        <FooterNavListItem href="/favorites">
                            Favorites
                        </FooterNavListItem>
                        <FooterNavListItem href="/account">
                            Account/login
                        </FooterNavListItem>
                    </FooterNavList>
                    <FooterNavList title="Information">
                        <FooterNavListItem href="/policy">
                            Our policy
                        </FooterNavListItem>
                        <FooterNavListItem href="/return">
                            Refund
                        </FooterNavListItem>
                        <FooterNavListItem href="/faq">FAQ</FooterNavListItem>
                    </FooterNavList>
                    <FooterNavList title="Contacts">
                        <Link
                            href="tel:0970000000"
                            className="text-white/80 text-sm flex gap-[10px] items-center hover:text-white group"
                        >
                            <PhoneIcon className="group-hover:stroke-white fill-none w-[25px] stroke-2 stroke-white/80" />
                            <div className="group-hover:underline">
                                +38 (097) 00 00 000
                            </div>
                        </Link>
                        <Link
                            href="mailto:job.tenshi@gmail.com"
                            className="text-white/80 text-sm flex gap-[10px] items-center hover:text-white group"
                        >
                            <MailIcon className="group-hover:stroke-white fill-none w-[25px] stroke-2 stroke-white/80" />
                            <div className="group-hover:underline">
                                job.tenshi@gmail.com
                            </div>
                        </Link>
                        <Link
                            target="_blank"
                            href="https://maps.app.goo.gl/B2e3TfjzMYLEjstU6"
                            className="text-white/80 text-sm flex gap-[10px] items-center hover:text-white group"
                        >
                            <LocationIcon className="group-hover:stroke-white fill-none w-[25px] stroke-2 stroke-white/80" />
                            <div className="group-hover:underline">
                                Ukraine, Lutsk
                            </div>
                        </Link>
                        <div className="flex gap-[15px] mt-[10px]">
                            <div>
                                <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                                    <Link href={"#"}>
                                        <TiktokIcon className="w-[20px] fill-white group-hover:fill-black" />
                                    </Link>
                                </button>
                            </div>
                            <div>
                                <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                                    <Link href={"#"}></Link>
                                    <InstagramIcon className="w-[20px] fill-white group-hover:fill-black" />
                                </button>
                            </div>
                            <div>
                                <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                                    <Link href={"#"}></Link>
                                    <TelegramIcon className="w-[20px] fill-white group-hover:fill-black" />
                                </button>
                            </div>
                        </div>
                    </FooterNavList>
                </div>
            </div>
            <div className="relative border-t border-white/10 text-xs text-white/50 font-semibold">
                <div className="absolute w-full flex justify-center items-center p-[10px]">
                    Mindset © 2025
                </div>
            </div>
        </footer>
    );
}
