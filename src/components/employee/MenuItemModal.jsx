import { useState } from "react";
import { ImagePlus } from "lucide-react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { useModal } from "../../contexts/ModalContext";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

const MenuItemModal = ({ item = null }) => {
  const { hideModal } = useModal();
  const { createProduct, updateProduct } = useProducts();
  const { data: categories } = useCategories();
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(item?.image_path || null);

  const [formData, setFormData] = useState({
    name: item?.name || "",
    price: item?.price || "",
    description: item?.description || "",
    category: item?.category?.id || "",
    image_path: null,
    is_available: item?.is_available ?? true,
  });

  const isEditMode = !!item;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image_path: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter a product name");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setError("Please enter a valid price");
      return;
    }
    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    // Create FormData object for file upload
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    submitData.append("category", formData.category);
    submitData.append("is_available", formData.is_available);
    if (formData.image_path) {
      submitData.append("image_path", formData.image_path);
    }

    const mutation = isEditMode ? updateProduct : createProduct;
    const mutationData = isEditMode
      ? { id: item.id, data: submitData }
      : submitData;

    mutation.mutate(mutationData, {
      onSuccess: () => {
        hideModal();
      },
      onError: (err) => {
        console.error("Product operation error:", err);
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      },
    });
  };

  return (
    <Modal title={isEditMode ? "Edit Menu Item" : "Add Menu Item"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="px-4 py-2 w-full border rounded-lg"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="px-4 py-2 w-full border rounded-lg"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="px-4 py-2 w-full border rounded-lg"
          >
            <option value="">Select category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="px-4 py-2 w-full border rounded-lg"
            rows={3}
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="text-sm text-gray-600">
              Click to upload or drag and drop
              <br />
              PNG, JPG up to 10MB
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white pt-6 border-t">
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={hideModal} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isEditMode ? updateProduct.isPending : createProduct.isPending
              }
            >
              {(isEditMode ? updateProduct.isPending : createProduct.isPending)
                ? "Saving..."
                : isEditMode
                ? "Save Changes"
                : "Add Menu Item"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default MenuItemModal;
