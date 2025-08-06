function DeliveryAndPaymentMethod() {
    return (
        <div className="flex flex-col gap-[10px] w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-bold text-xl mb-4">Доставка та оплата</div>

            <div className="flex md:flex-wrap gap-[15px] items-start">
                <img
                    // src={NewPostLogo}
                    alt="Нова Пошта"
                    className="max-w-[50px] flex-shrink-0"
                />
                <div className="flex md:flex-wrap gap-[15px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="font-semibold text-lg">
                            Доставка у відділення "Нова Пошта"
                        </div>
                        <div className="text-sm text-gray-300  max-w-md">
                            Отримуйте свої замовлення у найближчому відділенні
                            "Нова Пошта". Зручне самовивезення, швидка обробка
                            та відстеження посилки.
                        </div>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
                        <li>Термін доставки: 1-3 робочі дні</li>
                        <li>Відстеження посилки у реальному часі</li>
                        <li>Можливість оплатити при отриманні</li>
                    </ul>
                </div>
            </div>

            <hr className="border-t border-white/10" />

            {/* Оплата */}
            <div className="flex md:flex-wrap gap-[15px] items-start">
                <img
                    // src={CardLogo}
                    alt="Оплата карткою"
                    className="max-w-[50px] flex-shrink-0"
                />
                <div className="flex md:flex-wrap gap-[15px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="font-semibold text-lg">
                            Оплата карткою онлайн
                        </div>
                        <div className="text-sm text-gray-300 max-w-md">
                            Швидка і безпечна оплата банківськими картками Visa,
                            MasterCard та іншими популярними платіжними
                            системами. Підтвердження платежу відразу.
                        </div>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
                        <li>Підтримка 3D Secure для безпеки платежів</li>
                        <li>Оплата з мобільних пристроїв та комп’ютерів</li>
                        <li>Можливість збереження даних для швидших покупок</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DeliveryAndPaymentMethod;
