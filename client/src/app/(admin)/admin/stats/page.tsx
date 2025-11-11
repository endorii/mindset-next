import { Title } from "@/features/admin/attributes/components/Title";
import { StatsWrapper } from "@/features/admin/stats/components/StatsWrapper";

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-[15px]">
            <Title title={"Статистика магазину"} />
            <StatsWrapper />
        </div>
    );
}
