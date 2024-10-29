import { PlusCircle } from "lucide-react";
import { useModal } from "../../contexts/ModalContext";
import { useProducts } from "../../hooks/useProducts";
import MenuItemCard from "./MenuItemCard";

const MenuManagementPanel = () => {
  const { showModal } = useModal();
  const { data: products, isLoading, toggleAvailability } = useProducts();

  const handleAddItem = () => {
    showModal({
      component: "MenuItemModal",
      props: { mode: "add" },
    });
  };

  const handleEditItem = (item) => {
    showModal({
      component: "MenuItemModal",
      props: { mode: "edit", item },
    });
  };

  if (isLoading) return <div>Loading menu items...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Menu Management</h2>
        <button
          onClick={handleAddItem}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {products.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onToggleAvailability={toggleAvailability}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuManagementPanel;
