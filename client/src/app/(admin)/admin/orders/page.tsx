import { Title } from "@/features/admin/attributes/components/Title";
import { AdminOrdersWrapper } from "@/features/orders/components/AdminOrdersWrapper";

function Orders() {
    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Список замовлень" />
            <AdminOrdersWrapper />
        </div>
    );
}

export default Orders;
