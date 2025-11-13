export type PaymentMethodType = "stripe" | "cod" | null;

export enum PaymentStatus {
    pending = "pending",
    processing = "processing",
    success = "success",
    failure = "failure",
    expired = "expired",
}
