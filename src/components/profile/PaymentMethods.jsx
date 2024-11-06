import { useAuth } from "../../hooks/useAuth.js";
import { usePayments } from "../../hooks/usePayments.js";
import { useModal } from "../../contexts/ModalContext.jsx";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../shared/Button";

export const PaymentMethods = () => {
  const { data: auth } = useAuth();
  const { deletePayment } = usePayments();
  const { showModal } = useModal();
  const payments = auth?.user?.payments || [];

  const formatCardNumber = (number) => `•••• ${number.slice(-4)}`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAddPayment = () => {
    showModal({
      component: "PaymentModal",
      props: {},
    });
  };

  const handleEditPayment = (payment) => {
    showModal({
      component: "PaymentModal",
      props: {
        paymentToEdit: payment,
      },
    });
  };

  const handleDeleteClick = (payment) => {
    showModal({
      component: "DeletePaymentModal",
      props: {
        payment,
        onConfirm: deletePayment.mutate,
      },
    });
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Button size="sm" onClick={handleAddPayment}>
          Add Payment
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Merchant</th>
              <th className="text-left py-3 px-4">Account Number</th>
              <th className="text-left py-3 px-4">Expiration Date</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="py-3 px-4">{payment.merchant_name}</td>
                <td className="py-3 px-4">
                  {formatCardNumber(payment.account_number)}
                </td>
                <td className="py-3 px-4">
                  {formatDate(payment.expiration_date)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEditPayment(payment)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDeleteClick(payment)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
