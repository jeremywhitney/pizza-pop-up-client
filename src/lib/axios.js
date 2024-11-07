import axios from "axios";

// console.log('API URL:', process.env.VITE_API_URL);

// const api = axios.create({
//   baseURL: process.env.VITE_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
console.log('Before creating api:', {
  envUrl: import.meta.env.VITE_API_URL
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // changed from process.env
  headers: {
      "Content-Type": "application/json",
  },
});

console.log('After creating api:', {
  baseURL: api.defaults.baseURL
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
