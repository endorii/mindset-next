import { Title } from "@/features/admin/attributes/components/Title";
import { AdminOrdersWrapper } from "@/features/orders/components/AdminOrdersWrapper";

function Orders() {
    return (
        <div className="flex flex-col gap-[10px]">
            <Title title="Orders list" />
            <AdminOrdersWrapper />
        </div>
    );
}

export default Orders;
