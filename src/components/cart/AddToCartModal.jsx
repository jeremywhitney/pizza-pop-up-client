import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useModal } from "../../contexts/ModalContext";
import { useCartStore } from "../../hooks/useCartStore";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

const ToppingSelector = ({ toppings, selectedToppings, onToppingChange }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium mb-2">Additional Toppings ($3 each)</h3>
      <div className="grid grid-cols-2 gap-2">
        {toppings.map((topping) => (
          <label
            key={topping.id}
            className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedToppings.some((t) => t.id === topping.id)}
              onChange={() => onToppingChange(topping)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span>{topping.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const AddToCartModal = ({
  product,
  toppings = [],
  initialQuantity = 1,
  initialToppings = [],
  isEditing = false,
}) => {
  const { hideModal } = useModal();
  const { addItem, updateItem } = useCartStore();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedToppings, setSelectedToppings] = useState(initialToppings);

  const basePrice = product.price;
  const toppingsPrice = selectedToppings.length * 3;
  const totalPrice = (basePrice + toppingsPrice) * quantity;

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleToppingToggle = (topping) => {
    setSelectedToppings((current) =>
      current.some((t) => t.id === topping.id)
        ? current.filter((t) => t.id !== topping.id)
        : [...current, topping]
    );
  };

  const handleAddToCart = async () => {
    // Create the complete product object with all necessary data
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_path: product.image_path,
      quantity: quantity,
      toppings: selectedToppings,
    };

    if (isEditing) {
      updateItem(product.id, cartItem);
    } else {
      addItem(cartItem);
    }

    hideModal();
  };

  return (
    <Modal title={isEditing ? "Edit Cart Item" : "Add to Cart"}>
      <div className="space-y-6">
        {/* Product Info */}
        <div className="flex gap-4">
          <div className="w-1/3">
            {product.image_path ? (
              <img
                src={product.image_path}
                alt={product.name}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="text-lg font-medium mt-2">${basePrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <h3 className="font-medium mb-2">Quantity</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              <Minus
                size={20}
                className={quantity <= 1 ? "text-gray-300" : "text-gray-600"}
              />
            </button>
            <span className="text-xl font-medium w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Toppings Selector (only for pizzas) */}
        {product.category?.name === "Pizza" && toppings.length > 0 && (
          <ToppingSelector
            toppings={toppings}
            selectedToppings={selectedToppings}
            onToppingChange={handleToppingToggle}
          />
        )}

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full text-lg py-3">
          {isEditing ? "Update Cart" : "Add to Cart"} - ${totalPrice.toFixed(2)}
        </Button>
      </div>
    </Modal>
  );
};

export default AddToCartModal;
