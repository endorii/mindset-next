export enum PaymentStatus {
    pending = "pending",
    processing = "processing",
    success = "success",
    failure = "failure",
    expired = "expired",
}

export type PaymentMethodType = "mono" | "liqpay";
