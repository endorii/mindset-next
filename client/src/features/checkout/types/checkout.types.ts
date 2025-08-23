export type PaymentMethodType = "mono" | "liqpay" | null;

export enum PaymentStatus {
    pending = "pending",
    processing = "processing",
    success = "success",
    failure = "failure",
    expired = "expired",
}
