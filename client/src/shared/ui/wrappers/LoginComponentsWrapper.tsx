interface ILoginComponentsWrapperProps {
    title: string;
    children: React.ReactNode;
}

function LoginComponentsWrapper({
    title,
    children,
}: ILoginComponentsWrapperProps) {
    return (
        <div
            className="flex flex-col gap-[15px] w-1/3 h-fit rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]
        md:w-full"
        >
            <h3 className="text-3xl  font-bold text-white">{title}</h3>
            <hr className="border-t border-white/10" />
            {children}
        </div>
    );
}

export default LoginComponentsWrapper;
