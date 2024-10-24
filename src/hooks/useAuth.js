import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useAuth = () => {
  return useQuery({
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
          user: response.data.profile,
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
};
