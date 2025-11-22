import { IRecentActions } from "@/features/admin/recent-actions/types/recent-actions.types";
import { formatDate } from "../utils/formatDate";

export function AdminRecentActions({
    actions,
}: {
    actions: IRecentActions[] | undefined;
}) {
    if (!actions || actions.length === 0) {
        return (
            <div className="bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] w-full min-h-[470px] flex items-center justify-center text-center text-neutral-200">
                No recent actions
            </div>
        );
    }

    return (
        <>
            <div className="flex gap-[15px] items-center">
                <div className="text-3xl font-perandory tracking-wider">
                    Recent actions
                </div>
                <div className="text-neutral-400 text-sm">
                    (Recent activities are cleared automatically if the period
                    is more than 30 days)
                </div>
            </div>

            {actions.length > 0 ? (
                <div className="flex flex-col gap-[3px] max-h-[470px] overflow-y-auto sm:text-sm">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className={`border-l-4 ${
                                action.action.startsWith("Added")
                                    ? "border-green-500"
                                    : action.action.startsWith("Edited")
                                    ? "border-yellow-300"
                                    : action.action.startsWith("Deleted")
                                    ? "border-red-500"
                                    : "border-blue-500"
                            } pl-4 py-2 text-neutral-200`}
                        >
                            <div className="opacity-70 text-sm sm:text-xs">
                                {formatDate(action.createdAt)}
                            </div>
                            <div>{action.action}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm">No actions for these filters</p>
            )}
        </>
    );
}
