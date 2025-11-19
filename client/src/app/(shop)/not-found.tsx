import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center text-white">
            <h2 className="text-7xl font-bold">Not found</h2>
            <hr className="border-b border-gray-200 w-[33%] m-[30px_auto] " />
            <p>The page at this address was not found.</p>
            <Link href="/" className="hover:underline ">
                [Home page]
            </Link>
        </div>
    );
}
