import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { createMonoInvoice } from "../api/checkout.api";

export function useCreateMonoInvoice() {
    return useMutation({
        mutationFn: ({ orderId, amount }: { orderId: string; amount: number }) =>
            createMonoInvoice(orderId, amount),
        onSuccess: (data) => {
            toast.success(data.message || "Invoice created");
            if (data.pageUrl) {
                redirect(data.pageUrl);
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}
