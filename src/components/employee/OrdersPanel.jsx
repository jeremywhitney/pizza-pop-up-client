import { useModal } from "../../contexts/ModalContext";
import { useOrders } from "../../hooks/useOrders";
import OrderCard from "./OrderCard";

const OrdersPanel = () => {
  const { showModal } = useModal();
  const { orders, isLoading, updateOrderStatus } = useOrders();

  const handleViewDetails = (order) => {
    showModal({
      component: "OrderDetailsModal",
      props: { order },
    });
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus({ orderId, newStatus });
  };

  if (isLoading) return <div>Loading orders...</div>;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING" || order.status === "IN_PROCESS"
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
          {pendingOrders.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersPanel;
