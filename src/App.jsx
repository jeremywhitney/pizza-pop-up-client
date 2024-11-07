import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "./contexts/ModalContext";
import { setupInterceptors } from "./lib/axios";
import Layout from "./components/layout/Layout";
import Home from "./routes/Home";
import Order from "./routes/Order";
import Cart from "./routes/Cart";
import Profile from "./routes/Profile";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Dashboard from "./routes/Dashboard";

const queryClient = new QueryClient();
setupInterceptors(queryClient);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ModalProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/place_order" element={<Order />} />
              <Route path="/cart" element={<Cart />} />

              {/* Employee Routes */}
              <Route
                path="/employee_dashboard"
                element={
                  <ProtectedRoute requireStaff>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Shared Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </ModalProvider>
      </Router>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
