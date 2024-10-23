// import { useState } from "react";
// import { useProducts } from "../hooks/useProducts";
// import ProductGrid from "../components/products/ProductGrid";

// const Order = () => {
//   const { data: products, isLoading, error } = useProducts();
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   if (isLoading) {
//     return <div className="p-8 text-center">Loading products...</div>;
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center text-red-600">Error loading products</div>
//     );
//   }

//   const categories = ["all", ...new Set(products.map((p) => p.category.name))];

//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((p) => p.category.name === selectedCategory);

//   const handleAddToCart = (product) => {
//     // TODO: Implement add to cart functionality
//     console.log("Adding to cart:", product);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-6">Order Online</h1>

//         {/* Category Filter */}
//         <div className="flex gap-2 overflow-x-auto pb-4">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap ${
//                 selectedCategory === category
//                   ? "bg-red-600 text-white"
//                   : "bg-gray-100 hover:bg-gray-200"
//               }`}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
//     </div>
//   );
// };

// export default Order;

// Order.jsx
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";

const Order = () => {
  const { data: products, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (isLoading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">Error loading products</div>
    );
  }

  // Separate toppings from other products
  const toppings = products.filter((p) => p.category.name === "Toppings");
  const mainProducts = products.filter((p) => p.category.name !== "Toppings");

  // Get unique categories excluding 'Toppings'
  const categories = [
    "all",
    ...new Set(mainProducts.map((p) => p.category.name)),
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? mainProducts
      : mainProducts.filter((p) => p.category.name === selectedCategory);

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product);
  };

  // Function to scroll to category section
  const scrollToCategory = (category) => {
    if (category === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(category.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8 sticky top-0 bg-white z-10 pb-4">
        <h1 className="text-3xl font-bold mb-6">Order Online</h1>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                scrollToCategory(category);
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        toppings={toppings}
      />
    </div>
  );
};

export default Order;
