import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data;
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return {
    ...categoriesQuery,
    updateCategory,
  };
};
