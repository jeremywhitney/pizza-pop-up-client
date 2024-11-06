const MenuSection = ({ title, items }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <div className="text-lg font-medium">${item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
