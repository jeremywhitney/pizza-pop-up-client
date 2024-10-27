import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "../../hooks/useCartStore";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../contexts/ModalContext";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import api from "../../lib/axios";

const formatCardNumber = (number) => `•••• ${number.slice(-4)}`;

const CheckoutModal = () => {
  const navigate = useNavigate();
  const { hideModal } = useModal();
  const { items, getTotal, clearCart } = useCartStore();
  const { data: auth } = useAuth();
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [error, setError] = useState("");

  const createOrder = useMutation({
    mutationFn: async () => {
      const orderData = {
        products: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          toppings: item.toppings.map((t) => ({ id: t.id })),
        })),
        payment: selectedPaymentId,
        status: "PENDING",
      };

      const response = await api.post("/orders", orderData);
      return response.data;
    },
    onSuccess: () => {
      clearCart();
      hideModal();
      navigate("/");
    },
    onError: (err) => {
      console.error("Order creation error:", {
        error: err,
        status: err.response?.status,
        data: err.response?.data,
        config: err.config,
      });
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (!navigator.onLine) {
        setError(
          "Unable to create order. Please check your connection and try again."
        );
      } else {
        setError("There was a problem creating your order. Please try again.");
      }
    },
  });

  const handleCheckout = async () => {
    if (!selectedPaymentId) {
      setError("Please select a payment method");
      return;
    }
    setError(""); // Clear any previous errors
    createOrder.mutate();
  };

  // Make sure auth and user exist before checking payments
  if (!auth?.isAuthenticated || !auth?.user?.payments?.length) {
    return (
      <Modal title="Checkout">
        <div className="p-4 text-center">
          <p className="text-red-600 mb-4">No payment methods available.</p>
          <Button onClick={hideModal}>Close</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Checkout">
      <div className="space-y-6">
        {/* Order Summary */}
        <div>
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => {
              const itemTotal = (
                (parseFloat(item.price) +
                  item.toppings.reduce(
                    (sum, t) => sum + parseFloat(t.price),
                    0
                  )) *
                parseInt(item.quantity, 10)
              ).toFixed(2);

              return (
                <div
                  key={`${item.id}-${JSON.stringify(item.toppings)}`}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} x {item.quantity}
                    {item.toppings.length > 0 && (
                      <span className="text-gray-500">
                        {" "}
                        (+ {item.toppings.length} toppings)
                      </span>
                    )}
                  </span>
                  <span>${itemTotal}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Selection */}
        <div>
          <h3 className="font-medium mb-3">Payment Method</h3>
          <div className="space-y-2">
            {auth.user.payments.map((payment) => {
              return (
                <label
                  key={payment.id}
                  className={`flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                    error && !selectedPaymentId ? "border-red-500" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={payment.id}
                    checked={selectedPaymentId === payment.id}
                    onChange={(e) => {
                      setSelectedPaymentId(payment.id);
                    }}
                    className="mr-3"
                  />
                  <span>
                    {payment.merchant_name} ending in{" "}
                    {formatCardNumber(payment.account_number)}
                  </span>
                </label>
              );
            })}
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={hideModal}
            disabled={createOrder.isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleCheckout} disabled={createOrder.isLoading}>
            {createOrder.isLoading ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
