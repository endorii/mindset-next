import { MonoLink } from "@/shared/ui/buttons";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col gap-[30px] text-white items-center text-center justify-center h-screen pb-[200px] md:pb-[100px]">
            <ShopTitle title="Page not found" />
            <MonoLink href="/">Return to shopping</MonoLink>
            <Image
                src={"/lamp.png"}
                alt="lamp"
                width={400}
                height={400}
                className="absolute w-[300px] xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[150px] xs:w-[100px] rotate-20 z-[-1] right-[10%] top-[30%] animate-wobble"
            />
        </div>
    );
}
