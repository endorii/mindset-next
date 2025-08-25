import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchRecentActionsFromUser } from "../api/recent-actions.api";

export function useRecentActions() {
    return useSuspenseQuery({
        queryKey: ["recent-actions"],
        queryFn: () => fetchRecentActionsFromUser(),
    });
}
