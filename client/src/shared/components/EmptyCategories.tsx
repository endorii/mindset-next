import { CastleFlagIcon } from "../icons";

interface EmptyCategoriesProps {
    title: string;
    subtitle: string;
}

export function EmptyCategories({ title, subtitle }: EmptyCategoriesProps) {
    return (
        <div className="relative flex flex-col items-center px-[20px] py-[200px] text-center text-white">
            <CastleFlagIcon className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[300px] fill-white/10" />
            <h2 className="text-8xl font-perandory tracking-wide font-semibold xl:text-7xl md:text-6xl sm:text-5xl">
                {title}
            </h2>
            <p className="font-ballet text-5xl xl:text-4xl md:text-3xl sm:text-2xl text-neutral-300">
                {subtitle}
            </p>
        </div>
    );
}
