interface HomeWelcomeMessageProps {
    userName: string | undefined;
}

export function HomeWelcomeMessage({ userName }: HomeWelcomeMessageProps) {
    return (
        <div className="  bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[30px] py-[20px] flex flex-col gap-[4px] min-w-[300px]">
            {userName ? (
                <>
                    <div className="text-3xl font-light">
                        Congratulations, {userName}
                    </div>
                    <div className="text-xl font-light">Welcome back!</div>{" "}
                </>
            ) : (
                <div className="text-3xl font-light">Not authorized</div>
            )}
        </div>
    );
}
