import { useProducts } from "../hooks/useProducts";
import MenuSection from "../components/products/MenuSection";

const Home = () => {
  const { data: products, isLoading, error } = useProducts();

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

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-gray-600">Fresh, delicious pizza made to order</p>
      </div>

      {Object.entries(categorizedProducts).map(([category, items]) => (
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
