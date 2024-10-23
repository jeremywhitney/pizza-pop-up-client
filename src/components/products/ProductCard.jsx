import Button from "../shared/Button";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <span className="font-medium text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <Button onClick={() => onAddToCart(product)} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;