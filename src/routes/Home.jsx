import { useProducts } from "../hooks/useProducts";
import MenuSection from "../components/products/MenuSection";

const Home = () => {
  const { data: products, isLoading, error } = useProducts();

  // Define desired category order
  const categoryOrder = ["Pizza", "Toppings", "Plates", "Sides", "Beverages"];

  if (isLoading) {
    return <div className="p-8 text-center">Loading menu...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">Error loading menu</div>
    );
  }

  const categorizedProducts = products.reduce((acc, product) => {
    if (!acc[product.category.name]) {
      acc[product.category.name] = [];
    }
    acc[product.category.name].push(product);
    return acc;
  }, {});

  // Sort categories based on defined order
  const sortedCategories = Object.entries(categorizedProducts).sort(
    ([a], [b]) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);

      // Handle categories not in the order array
      if (indexA === -1) return 1; // Move unknown categories to the end
      if (indexB === -1) return -1;

      return indexA - indexB;
    }
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Menu</h1>
        <p className="text-gray-600">Fresh, hand-crafted 12" pizzas made to order.<br/>All ingredients except flours, cheese, meats and olive oil are grown in our garden.</p>
      </div>

      {sortedCategories.map(([category, items]) => (
        <MenuSection key={category} title={category} items={items} />
      ))}

      <div className="text-center mt-12">
        <a
          href="/place_order"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Order Online
        </a>
      </div>
    </div>
  );
};

export default Home;
