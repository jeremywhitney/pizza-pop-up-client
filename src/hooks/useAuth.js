import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return { isAuthenticated: false, user: null };
      }

      try {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await api.get("/profile");
        return {
          isAuthenticated: true,
          user: response.data,
        };
      } catch (error) {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        return { isAuthenticated: false, user: null };
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  const updateProfile = useMutation({
    mutationFn: async ({ field, value }) => {
      const response = await api.patch("/profile/", {
        [field]: value,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        user: data,
      }));
    },
  });

  return {
    ...query,
    updateProfile,
  };
};
