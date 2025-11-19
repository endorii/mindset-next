interface MonoPayInvoiceResponse {
    invoiceId: string;
    pageUrl: string;
    message?: string;
}

const API_BASE_URL = "http://localhost:5000/api";
export async function createMonoInvoice(
    orderId: string,
    amount: number
): Promise<MonoPayInvoiceResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/checkout/mono-pay/invoice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId, amount }),
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(data.message || `Error ${response.status}`);
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error: any) {
        throw error;
    }
}
