import { useQuery } from "@tanstack/react-query";
import { fetchRecentActionsFromUser } from "../api/recent-actions.api";

export function useRecentActions(userId: string | undefined) {
    return useQuery({
        queryKey: ["recent-actions"],
        queryFn: () => fetchRecentActionsFromUser(userId),
        enabled: !!userId,
    });
}
