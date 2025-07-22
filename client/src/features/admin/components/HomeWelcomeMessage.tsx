import React from "react";

interface HomeWelcomeMessageProps {
    userName: string | undefined;
}

function HomeWelcomeMessage({ userName }: HomeWelcomeMessageProps) {
    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[30px] py-[20px] flex flex-col gap-[4px] min-w-[300px]">
            {userName ? (
                <>
                    <div className="text-3xl font-light">Вітаю, {userName}</div>
                    <div className="text-xl font-light">
                        З поверненням!
                    </div>{" "}
                </>
            ) : (
                <div className="text-3xl font-light">Не авторизовано</div>
            )}
        </div>
    );
}

export default HomeWelcomeMessage;
