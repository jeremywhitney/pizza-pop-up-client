import { format } from "date-fns";
import { Eye, Clock } from "lucide-react";

const OrderCard = ({ order, onViewDetails, onUpdateStatus }) => {
  const formatTime = (dateString) => {
    return format(new Date(dateString), "MM/d/yy h:mm a");
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Order #{order.id}</h3>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {order.customer.first_name} {order.customer.last_name}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4" />
            {formatTime(order.created_date)}
          </div>
        </div>
        <button
          onClick={() => onViewDetails(order)}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">View Details</span>
        </button>
      </div>

      {/* Preview of items */}
      <div className="mt-3 text-sm text-gray-500">
        {order.products.slice(0, 2).map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        {order.products.length > 2 && (
          <div className="text-blue-600 text-sm mt-1">
            +{order.products.length - 2} more items...
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-medium">${order.total_price}</span>
        <div className="flex gap-2">
          {order.status === "PENDING" ? (
            <button
              onClick={() => onUpdateStatus(order.id, "IN_PROCESS")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Start Order
            </button>
          ) : order.status === "IN_PROCESS" ? (
            <button
              onClick={() => onUpdateStatus(order.id, "COMPLETED")}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
            >
              Complete Order
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
