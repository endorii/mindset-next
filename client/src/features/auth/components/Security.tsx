import { LoginComponentsWrapper } from "@/shared/ui/wrappers";

function Security() {
    return (
        <LoginComponentsWrapper title="Захист Вашої інформації">
            <div className="flex flex-col gap-[15px]">
                <div className="flex flex-col gap-[15px]">
                    <p className="text-white/80 text-sm">
                        Ми серйозно ставимось до безпеки ваших персональних
                        даних і не передаємо їх третім особам. Ваше право на
                        конфіденційність для нас — понад усе.
                    </p>

                    <p className="text-white/60 text-sm">
                        Наша система використовує сучасні методи захисту
                        інформації, включно з багаторівневою аутентифікацією,
                        шифруванням та регулярним аудитом безпеки.
                    </p>

                    <ul className="flex flex-col gap-[7px] text-sm list-disc list-inside text-white/50">
                        <li>Ваші дані зберігаються безпечно</li>
                        <li>Ми використовуємо захищене з'єднання (SSL)</li>
                        <li>Інформація не передається третім особам</li>
                        <li>Конфіденційність — наш пріоритет</li>
                        <li>Регулярне оновлення політики безпеки</li>
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-green-300">
                        <span className="bg-green-800/30 px-2 py-1 rounded-md">
                            SSL Secure
                        </span>
                        <span className="bg-green-800/30 px-2 py-1 rounded-md">
                            GDPR Ready
                        </span>
                    </div>

                    <p className="text-xs text-white/40 mt-1">
                        🔒 Понад 100 користувачів вже довірили нам свої дані.
                    </p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <p className="text-sm text-white/60">
                        Якщо у вас виникли питання щодо того, як ми зберігаємо
                        чи обробляємо ваші дані — зв’яжіться з нашою службою
                        підтримки, і ми з радістю відповімо.
                    </p>

                    <div className="flex flex-col gap-[5px]">
                        <a
                            href="/privacy-policy"
                            className="text-xs underline text-blue-400 hover:text-blue-300 w-fit"
                        >
                            Детальніше про політику конфіденційності
                        </a>
                        <p className="text-xs text-white/30">
                            Останнє оновлення: червень 2025
                        </p>
                    </div>
                </div>
            </div>
        </LoginComponentsWrapper>
    );
}

export default Security;
