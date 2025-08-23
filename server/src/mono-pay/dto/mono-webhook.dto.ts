export interface MonoWebhookDto {
    invoiceId: string;
    reference: string; // orderId
    status: "success" | "failure" | "expired" | "processing" | "hold";
    failureReason?: string;
    amount: number;
    ccy: number;
    createdDate: number;
    modifiedDate: number;
}
