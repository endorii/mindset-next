import Link from "next/link";

export function Breadcrumbs({
    collectionPath,
    categoryPath,
    productPath,
    className,
}: {
    collectionPath: string;
    categoryPath?: string;
    productPath?: string;
    className?: string;
}) {
    return (
        <div
            className={`flex gap-[7px] text-white/50 font-light text-sm ${className}`}
        >
            <Link
                href={`/${collectionPath}`}
                className="hover:underline hover:text-white"
            >
                {collectionPath}
            </Link>

            {categoryPath && (
                <>
                    <span>/</span>
                    <Link
                        href={`/${collectionPath}/${categoryPath}`}
                        className="hover:underline hover:text-white"
                    >
                        {categoryPath}
                    </Link>
                </>
            )}

            {productPath && categoryPath && (
                <>
                    <span>/</span>
                    <Link
                        href={`/${collectionPath}/${categoryPath}/${productPath}`}
                        className="hover:underline hover:text-white"
                    >
                        {productPath}
                    </Link>
                </>
            )}
        </div>
    );
}
