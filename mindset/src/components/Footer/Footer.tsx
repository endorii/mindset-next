import { collections } from "@/data/collections";
import Link from "next/link";
import TiktokIcon from "../Icons/TiktokIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import TelegramIcon from "../Icons/TelegramIcon";

const Footer = () => {
    return (
        <div className="bg-black p-[50px] flex justify-between text-white">
            <div className="flex flex-col gap-[25px] w-[350px] text-sm">
                <Link href="/" className="font-bold text-3xl tracking-tighter">
                    mindset
                </Link>
                <hr className="w-[50%]" />
                <div className="">
                    Створено для тих, кому є різниця у чому ходити. Для тих, у
                    кого його стиль - це його вайб.
                </div>
            </div>
            <div>
                <div className="text-center font-bold mb-[5px]">Колекції:</div>
                <ul className="flex gap-[10px]">
                    {collections.map((collection, i) => {
                        return (
                            <li key={i}>
                                <Link
                                    href={collection.path}
                                    className="flex items-center justify-center cursor-pointer lowercase transition-all duration-300"
                                >
                                    {collection.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ul className="flex gap-[20px]">
                    <li>
                        <button className="cursor-pointer p-[10px] border borer-white rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}>
                                <TiktokIcon className="w-[20px] fill-white group-hover:fill-black" />
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer p-[10px] border borer-white rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}></Link>
                            <InstagramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer p-[10px] border borer-white rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}></Link>
                            <TelegramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
