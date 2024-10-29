import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../hooks/useAuth";
import api from "../../lib/axios";
import Button from "../shared/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const queryClient = useQueryClient();
  const { data: auth } = useAuth();

  const handleLogin = () => {
    showModal({
      component: "LoginModal",
      props: {},
    });
  };

  const handleRegister = () => {
    showModal({
      component: "RegisterModal",
      props: {},
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    queryClient.setQueryData(["auth"], { isAuthenticated: false, user: null });
    navigate("/");
  };

  // If employee is logged in, show employee nav
  if (auth?.isAuthenticated && auth.user.profile.is_staff) {
    return (
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/employee_dashboard" className="text-xl font-bold">
                Steady Habits Pizza - Staff
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-gray-600">
                Profile
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Steady Habits Pizza
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/place_order" className="hover:text-gray-600">
              Order
            </Link>
            <Link to="/cart" className="hover:text-gray-600">
              Cart
            </Link>
            {auth?.isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-gray-600">
                  Profile
                </Link>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm" onClick={handleLogin}>
                  Login
                </Button>
                <Button size="sm" onClick={handleRegister}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
