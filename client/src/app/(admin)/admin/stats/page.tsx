import { StatsWrapper } from "@/features/admin/stats/components/StatsWrapper";
import { Title } from "@/shared/components";

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title={"Statictics"} />
            <hr className="w-full border-t border-white/5" />
            <StatsWrapper />
        </div>
    );
}
