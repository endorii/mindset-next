import Link from "next/link";

export function FooterBrand() {
    return (
        <div className="flex flex-col text-sm min-w-[300px] md:min-w-[250px]">
            <Link
                href="/"
                className="font-bold text-6xl font-perandory tracking-wider"
            >
                mindset
            </Link>
            <div className="text-xl font-ballet tracking-wide font-light text-neutral-200">
                More than clothes.
            </div>
        </div>
    );
}
