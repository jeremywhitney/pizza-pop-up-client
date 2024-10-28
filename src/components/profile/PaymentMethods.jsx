import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth.js";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../shared/Button";
import api from "../../lib/axios";

export const PaymentMethods = () => {
  const { data: auth } = useAuth();
  const payments = auth?.user?.payments || [];
  const queryClient = useQueryClient();
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const deletePaymentMutation = useMutation({
    mutationFn: async (paymentId) => {
      await api.delete(`/payments/${paymentId}`);
      return paymentId;
    },
    onSuccess: (paymentId) => {
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        user: {
          ...old.user,
          payments: old.user.payments.filter((p) => p.id !== paymentId),
        },
      }));
      setPaymentToDelete(null);
    },
  });

  const formatCardNumber = (number) => `•••• ${number.slice(-4)}`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Button size="sm" onClick={() => {}}>
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
                    <Button size="sm" variant="secondary" onClick={() => {}}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPaymentToDelete(payment)}
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

      <Dialog.Root
        open={!!paymentToDelete}
        onOpenChange={() => setPaymentToDelete(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full">
            <Dialog.Title className="text-xl font-bold mb-4">
              Delete Payment Method
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Are you sure you want to delete this payment method? This action
              cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setPaymentToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => deletePaymentMutation.mutate(paymentToDelete.id)}
              >
                Delete
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
