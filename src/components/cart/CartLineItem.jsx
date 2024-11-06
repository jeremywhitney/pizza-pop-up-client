import { useModal } from "../../contexts/ModalContext";
import { useCartStore } from "../../hooks/useCartStore";
import Button from "../shared/Button";
import { Trash2 } from "lucide-react";

const CartLineItem = ({ item }) => {
  const { removeItem } = useCartStore();
  const { showModal } = useModal();

  const toppingsPrice = item.toppings.reduce(
    (sum, t) => sum + parseFloat(t.price || 0),
    0
  );
  const unitPrice = parseFloat(item.price || 0) + toppingsPrice;
  const itemTotal = (unitPrice * parseInt(item.quantity || 0, 10)).toFixed(2);

  const handleEdit = () => {
    showModal({
      component: "AddToCartModal",
      props: {
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          image_path: item.image_path,
          category: { name: item.toppings?.length > 0 ? "Pizza" : "" },
        },
        initialQuantity: parseInt(item.quantity, 10),
        initialToppings: item.toppings || [],
        isEditing: true,
      },
    });
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-1 flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
          {item.image_path ? (
            <img
              src={item.image_path}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-600">
            ${parseFloat(item.price || 0).toFixed(2)}
            {toppingsPrice > 0 && ` + $${toppingsPrice.toFixed(2)} toppings`}
          </p>
          <div className="text-sm text-gray-500 mt-1">
            <p>Quantity: {parseInt(item.quantity || 0, 10)}</p>
            {item.toppings?.length > 0 && (
              <p className="mt-1">
                Toppings: {item.toppings.map((t) => t.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="font-semibold">${itemTotal}</span>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => removeItem(item.id, item.toppings)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartLineItem;
