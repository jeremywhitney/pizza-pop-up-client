import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set up interceptors that takes queryClient as a parameter
export const setupInterceptors = (queryClient) => {
  // Request interceptor to attach the token if it exists
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.data);

      // Handle auth errors
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];

        // Now we can safely use the queryClient passed in
        queryClient.invalidateQueries(["auth"]);

        // Optionally, you could also reset other queries if needed
        // queryClient.resetQueries(['cart', 'orders', 'profile']);
      }

      return Promise.reject(error);
    }
  );
};

export default api;
