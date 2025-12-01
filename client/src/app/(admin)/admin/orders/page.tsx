import { AdminOrdersWrapper } from "@/features/orders/components/AdminOrdersWrapper";
import { Title } from "@/shared/components";

function Orders() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title="Orders list" />
            <hr className="w-full border-t border-white/5" />
            <AdminOrdersWrapper />
        </div>
    );
}

export default Orders;
