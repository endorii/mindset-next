import { Period } from "../types/types";

export const STATUSES = [
    { value: "false", label: "Not visible" },
    { value: "true", label: "Visible" },
];

export const AVAILABILITIES = [
    { value: "false", label: "Not available" },
    { value: "true", label: "Available" },
];

export const PRIORITIES = ["low", "medium", "high"];

export const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const PERIODS: Period[] = ["day", "week", "month", "year"];

export const PERIOD_LABELS: Record<Period, string> = {
    day: "Per day (by hour)",
    week: "Per week (by day)",
    month: "Per month (by day)",
    year: "Per year (by month)",
};
