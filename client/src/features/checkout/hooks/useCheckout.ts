import { useMutation } from "@tanstack/react-query";
import { createMonoInvoice } from "../api/checkout.api";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function useCreateMonoInvoice() {
    return useMutation({
        mutationFn: ({ orderId, amount }: { orderId: string; amount: number }) =>
            createMonoInvoice(orderId, amount),
        onSuccess: (data) => {
            toast.success(data.message || "Інвойс створено");
            if (data.pageUrl) {
                redirect(data.pageUrl);
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}
