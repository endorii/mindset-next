export type Period = "day" | "week" | "month" | "year";

export const PERIODS: Period[] = ["day", "week", "month", "year"];

export const PERIOD_LABELS: Record<Period, string> = {
    day: "Per day (by hour)",
    week: "Per week (by day)",
    month: "Per month (by day)",
    year: "Per year (by month)",
};
