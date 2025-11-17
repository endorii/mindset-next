import Link from "next/link";

export function PreOrderInfo() {
    return (
        <div className="mt-2 bg-white/5 border p-[15px] border-white/10 shadow-inner">
            <div className="text-white font-medium">
                Введені вами дані використовуються для автоматичного створення
                експрес-накладної у системі Нової Пошти.
            </div>

            <div className="text-white italic text-xs mt-[10px]">
                Будь ласка, перевірте адресу перед підтвердженням замовлення.
                Якщо ви змінюєте номер або місто — оновіть інформацію в акаунті
                або зверніться в{" "}
                <Link href="#" className="text-blue-400 underline">
                    технічну підтримку
                </Link>
                .
            </div>
        </div>
    );
}
