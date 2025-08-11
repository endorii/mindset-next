export enum TodoPriority {
    low = "low",
    medium = "medium",
    high = "high",
}

export interface ITodoItem {
    id?: string;
    title: string;
    priority: TodoPriority;
    createdAt?: string;
    updatedAt?: string;
}
