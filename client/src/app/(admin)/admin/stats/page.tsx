import { Title } from "@/features/admin/attributes/components/Title";
import { StatsWrapper } from "@/features/admin/stats/components/StatsWrapper";

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title={"Statictics"} />
            <hr className="w-full border-t border-white/10" />
            <StatsWrapper />
        </div>
    );
}
