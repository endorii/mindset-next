function ErrorWithMessage({ message }: { message: string }) {
    return (
        <div className="rounded-xl bg-red-500/10 shadow-lg backdrop-blur-[100px] border border-red-500/30 p-[20px] w-full flex items-center justify-center text-center text-red-400">
            {message}
        </div>
    );
}

export default ErrorWithMessage;
