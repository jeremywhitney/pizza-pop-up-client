import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreditCard, Calendar } from "lucide-react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { useModal } from "../../contexts/ModalContext";
import { usePayments } from "../../hooks/usePayments";

const PaymentModal = ({
  paymentToEdit = null,
  onSuccess,
  fromCheckout = false,
}) => {
  const { createPayment, updatePayment } = usePayments();
  const { showModal, hideModal } = useModal();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    merchant_name: paymentToEdit?.merchant_name || "",
    account_number: paymentToEdit?.account_number || "",
    expiration_date: paymentToEdit
      ? new Date(paymentToEdit.expiration_date)
      : new Date(),
  });

  const isEditMode = !!paymentToEdit;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!isEditMode) {
      if (!formData.merchant_name) {
        setError("Please select a card type");
        return;
      }
      if (!formData.account_number.trim()) {
        setError("Please enter a card number");
        return;
      }
    }

    const submitData = {
      ...formData,
      expiration_date: formData.expiration_date.toISOString().split("T")[0],
    };

    const mutation = isEditMode ? updatePayment : createPayment;
    const mutationData = isEditMode
      ? {
          id: paymentToEdit.id,
          data: { expiration_date: submitData.expiration_date },
        }
      : submitData;

    mutation.mutate(mutationData, {
      onSuccess: (data) => {
        if (fromCheckout) {
          showModal({ component: "CheckoutModal" });
        }
        hideModal();
        if (onSuccess) onSuccess();
      },
      onError: (err) => {
        console.error("Payment operation error:", err);
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      },
    });
  };

  return (
    <Modal title={isEditMode ? "Edit Payment Method" : "Add Payment Method"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isEditMode && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Type
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={formData.merchant_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      merchant_name: e.target.value,
                    }))
                  }
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select card type</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={formData.account_number}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    account_number: e.target.value,
                  }))
                }
                className="px-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter card number"
                maxLength={16}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiration Date
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              size={20}
            />
            <DatePicker
              selected={formData.expiration_date}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, expiration_date: date }))
              }
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={hideModal} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isEditMode ? updatePayment.isPending : createPayment.isPending
            }
          >
            {(isEditMode ? updatePayment.isPending : createPayment.isPending)
              ? "Saving..."
              : isEditMode
              ? "Save Changes"
              : "Add Payment Method"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
