const MenuItemCard = ({ item, onEdit, onToggleAvailability }) => {
  return (
    <div
      className={`border rounded-lg p-4 ${
        !item.is_available ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-lg text-gray-900 mt-1">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleAvailability(item)}
            className={`px-3 py-1 rounded text-sm ${
              item.is_available
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {item.is_available ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => onEdit(item)}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
