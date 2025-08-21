import { useQuery } from "@tanstack/react-query";
import { fetchRecentActionsFromUser } from "../api/recent-actions.api";

export function useRecentActions() {
    return useQuery({
        queryKey: ["recent-actions"],
        queryFn: () => fetchRecentActionsFromUser(),
    });
}
