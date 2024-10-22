import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/profile" className="hover:text-gray-600">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
