import { format } from "date-fns";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

const formatCardNumber = (number) => `•••• ${number.slice(-4)}`;

const OrderDetailsModal = ({ order, showTitle = true }) => {
  const { hideModal } = useModal();
  const navigate = useNavigate();

  const handleClose = () => {
    hideModal();
    // Only navigate if this was shown after order creation
    if (!showTitle) {
      navigate("/");
    }
  };

  const renderOrderItem = (item) => {
    const itemTotal = (
      (parseFloat(item.price) +
        item.toppings.reduce((sum, t) => sum + parseFloat(t.price), 0)) *
      parseInt(item.quantity, 10)
    ).toFixed(2);

    return (
      <div key={`${item.id}-${JSON.stringify(item.toppings)}`} className="mb-4">
        <div className="flex justify-between">
          <span className="font-medium">
            {item.name} x {item.quantity}
          </span>
          <span>${itemTotal}</span>
        </div>
        {item.toppings.length > 0 && (
          <div className="ml-4 text-sm text-gray-600">
            {item.toppings.map((topping) => (
              <div key={topping.id} className="flex justify-between">
                <span>+ {topping.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal title={showTitle ? `Order #${order.id}` : "Order Confirmed!"}>
      <div className="space-y-6">
        {!showTitle && (
          <div className="text-center mb-6">
            <div className="text-green-600 text-lg mb-2">
              Thank you for your order!
            </div>
            <div className="text-gray-600">
              Order #{order.id} has been placed successfully.
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Order Date:</span>
            <div>
              {format(new Date(order.created_date), "MMM d, yyyy h:mm a")}
            </div>
          </div>
          <div>
            <span className="font-medium">Status:</span>
            <div
              className={`inline-block px-2 py-1 rounded-full text-sm font-medium
                ${
                  order.status.toLowerCase().includes("completed")
                    ? "bg-green-100 text-green-800"
                    : ""
                }
                ${
                  order.status.toLowerCase().includes("pending")
                    ? "bg-yellow-100 text-yellow-800"
                    : ""
                }
                ${
                  order.status.toLowerCase().includes("in_process") ||
                  order.status.toLowerCase().includes("in process")
                    ? "bg-blue-100 text-blue-800"
                    : ""
                }
              `}
            >
              {order.status}
            </div>
          </div>
          <div>
            <span className="font-medium">Payment Method:</span>
            <div>
              {order.payment ? (
                <>
                  {order.payment.merchant_name}{" "}
                  {formatCardNumber(order.payment.account_number)}
                </>
              ) : (
                "Deleted payment method"
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="space-y-3">{order.products.map(renderOrderItem)}</div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleClose}>
            {showTitle ? "Close" : "Return to Home"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
