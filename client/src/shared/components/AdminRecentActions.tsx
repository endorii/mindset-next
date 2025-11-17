import { IRecentActions } from "@/features/admin/recent-actions/types/recent-actions.types";
import { formatDate } from "../utils/formatDate";

export function AdminRecentActions({
    actions,
}: {
    actions: IRecentActions[] | undefined;
}) {
    if (!actions || actions.length === 0) {
        return (
            <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] w-full min-h-[470px] flex items-center justify-center text-center text-white/60">
                Останні дії відсутні
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[15px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] w-full">
            <div className="flex gap-[15px] items-center justify-between">
                <div className="text-lg font-semibold w-[75%]">Останні дії</div>
                <div className="text-white/60 text-sm mt-[3px] sm:text-xs sm:max-w-[200px]">
                    (Останні дії очищуються автоматично, якщо період вище 30-ти
                    днів)
                </div>
            </div>

            {actions.length > 0 ? (
                <div className="flex flex-col gap-[7px] max-h-[470px] overflow-y-auto sm:text-sm">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className={`border-l-4 ${
                                action.action.startsWith("Додано")
                                    ? "border-green-500"
                                    : action.action.startsWith("Редаговано")
                                    ? "border-yellow-300"
                                    : action.action.startsWith("Видалено")
                                    ? "border-red-500"
                                    : "border-blue-500"
                            } pl-4 py-2 text-white/60`}
                        >
                            <div className="opacity-70 text-sm sm:text-xs">
                                {formatDate(action.createdAt)}
                            </div>
                            <div>{action.action}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm">Немає дій за цими фільтрами</p>
            )}
        </div>
    );
}
