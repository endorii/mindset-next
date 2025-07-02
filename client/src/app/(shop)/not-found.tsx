import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center text-white">
            <h2 className="text-7xl font-bold">Не знайдено</h2>
            <hr className="border-b border-gray-200 w-[33%] m-[30px_auto] " />
            <p>Сторінку за даною адресою не знайдено</p>
            <Link href="/" className="hover:underline ">
                [Домашня сторінка]
            </Link>
        </div>
    );
}
