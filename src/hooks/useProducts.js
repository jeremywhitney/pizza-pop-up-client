import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useProducts = () => {
  const queryClient = useQueryClient();

  // const productsQuery = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => {
  //     const { data } = await api.get("/products");
  //     return data;
  //   },
  // });
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log('Making products request with baseURL:', api.defaults.baseURL);
      const { data } = await api.get("/products");
      return data;
    },
});

  const createProduct = useMutation({
    mutationFn: (data) => api.post("/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }) => {
      // If image_path is explicitly null, add a flag to remove the image
      if (data.get("image_path") === null) {
        data.set("remove_image", "true");
      }
      return api.patch(`/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
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
    createProduct,
    updateProduct,
    toggleAvailability: toggleAvailability.mutate,
    isToggling: toggleAvailability.isPending,
  };
};
