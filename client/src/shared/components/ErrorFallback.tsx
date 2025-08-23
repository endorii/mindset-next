import { ErrorWithMessage } from "../ui/components";

interface ErrorFallbackProps {
    error?: Error;
    message?: string;
}

export default function ErrorFallback({ error, message }: ErrorFallbackProps) {
    return (
        <ErrorWithMessage
            message={message ?? error?.message ?? "Невідома помилка"}
        />
    );
}
