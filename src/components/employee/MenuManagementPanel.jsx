import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useModal } from "../../contexts/ModalContext";
import { useProducts } from "../../hooks/useProducts";
import MenuItemCard from "./MenuItemCard";

const MenuManagementPanel = () => {
  const { showModal } = useModal();
  const { data: products, isLoading, toggleAvailability } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUnavailable, setShowUnavailable] = useState(true);

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

  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((item) => item.category.name)),
  ];

  // Filter products based on category and availability
  const filteredProducts = products.filter((item) => {
    const categoryMatch =
      selectedCategory === "all" || item.category.name === selectedCategory;
    const availabilityMatch = showUnavailable || item.is_available;
    return categoryMatch && availabilityMatch;
  });

  // Group products by category if showing all categories
  const groupedProducts =
    selectedCategory === "all"
      ? filteredProducts.reduce((acc, item) => {
          const category = item.category.name;
          if (!acc[category]) acc[category] = [];
          acc[category].push(item);
          return acc;
        }, {})
      : { [selectedCategory]: filteredProducts };

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

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showUnavailable}
              onChange={(e) => setShowUnavailable(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Show unavailable items</span>
          </label>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-8">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onToggleAvailability={toggleAvailability}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagementPanel;
