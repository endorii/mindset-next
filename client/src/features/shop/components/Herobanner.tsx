import { ICollection } from "@/features/collections/types/collections.types";
import { MonoLink } from "@/shared/ui/buttons";

export function HeroBanner({ collection }: { collection: ICollection }) {
    return (
        <div className="relative h-[70vh] sm:h-[60vh] w-full flex items-center justify-center bg-cover bg-center p-[20px] group">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 p-[40px] sm:p-0 transition-all duration-500 group-hover:blur-sm"
            >
                <source src="/video2.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" />

            <div className="flex z-10 text-center text-white flex-col gap-[50px]">
                <div>
                    <h3 className="text-8xl xl:text-7xl lg:text-6xl md:text-5xl font-perandory tracking-wider uppercase">
                        New Season Arrival
                    </h3>
                    <div className="font-thin text-white/70 md:text-sm">
                        Where timeless design meets everyday luxury
                    </div>
                </div>

                <div className="flex justify-center">
                    <MonoLink href={collection.path}>Shop now</MonoLink>
                </div>
            </div>
        </div>
    );
}
