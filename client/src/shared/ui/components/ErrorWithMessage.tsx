import { DeleteButton } from "../buttons";

export function ErrorWithMessage({
    message,
    onRetry,
}: {
    message: string;
    onRetry?: () => void;
}) {
    return (
        <div className="gap-[20px] flex-wrap bg-red-500/10 shadow-lg backdrop-blur-[100px] border border-red-500/30 p-[20px] w-full flex items-center justify-center text-center text-red-400">
            <div>{message}</div>
            {onRetry && (
                <DeleteButton onClick={onRetry}>Спробувати ще раз</DeleteButton>
            )}
        </div>
    );
}
