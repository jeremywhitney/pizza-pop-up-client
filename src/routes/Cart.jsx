import { useNavigate } from "react-router-dom";
import { useCartStore } from "../hooks/useCartStore";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../contexts/ModalContext";
import Button from "../components/shared/Button";
import CartLineItem from "../components/cart/CartLineItem";
// import CheckoutModal from "./CheckoutModal";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      <p className="text-gray-600 mb-6">
        Add some delicious items to your cart!
      </p>
      <Button onClick={() => navigate("/place_order")}>
        Continue Shopping
      </Button>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { data: auth } = useAuth();
  const { showModal } = useModal();

  const handleCheckout = () => {
    if (!auth?.isAuthenticated) {
      // Show login modal if user isn't authenticated
      showModal({
        component: "LoginModal",
        props: {
          onSuccess: () => {
            // After login, show checkout modal
            showModal({
              component: "CheckoutModal",
            });
          },
        },
      });
    } else {
      // User is authenticated, show checkout directly
      showModal({
        component: "CheckoutModal",
      });
    }
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button variant="secondary" onClick={() => navigate("/place_order")}>
          Continue Shopping
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <CartLineItem
            key={`${item.id}-${JSON.stringify(item.toppings)}`}
            item={item}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium">Total</span>
          <span className="text-2xl font-bold">${getTotal().toFixed(2)}</span>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
