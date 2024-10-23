import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart, toppings }) => {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (product.category.name === "Toppings") return acc;

    if (!acc[product.category.name]) {
      acc[product.category.name] = [];
    }
    acc[product.category.name].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <section
          key={category}
          className="scroll-mt-8"
          id={category.toLowerCase()}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            {category === "Pizza" && toppings && toppings.length > 0 && (
              <p className="text-gray-600 text-sm">
                Additional Toppings: {toppings.map((t) => t.name).join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductGrid;
