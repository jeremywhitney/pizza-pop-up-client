import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const usePayments = () => {
  const queryClient = useQueryClient();

  const deletePayment = useMutation({
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
    },
  });

  const createPayment = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/payments", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        user: {
          ...old.user,
          payments: [...old.user.payments, data],
        },
      }));
    },
  });

  const updatePayment = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(`/payments/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        user: {
          ...old.user,
          payments: old.user.payments.map((p) => (p.id === data.id ? data : p)),
        },
      }));
    },
  });

  return {
    deletePayment,
    createPayment,
    updatePayment,
  };
};
