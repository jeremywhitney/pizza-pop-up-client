import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
  });

  const toggleAvailability = useMutation({
    mutationFn: (product) =>
      api.patch(`/products/${product.id}`, {
        is_available: !product.is_available,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    ...productsQuery,
    toggleAvailability: toggleAvailability.mutate,
    isToggling: toggleAvailability.isPending,
  };
};
