// UpdateProduct.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    brand: "",
    quantity: "",
    description: "",
    features: "",
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      console.log("Fetched products:", res.data);

      // Backend sends array directly
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // When selecting a product, fill the form
  const handleSelectProduct = (id) => {
    setSelectedId(id);
    const product = products.find((p) => p._id === id);
    if (product) {
      setUpdatedProduct({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        imageUrl: product.imageUrl || "",
        brand: product.brand || "",
        quantity: product.quantity || "",
        description: product.description || "",
        features: product.features || "",
      });
    }
  };

  // Send update request
  const updateProduct = async () => {
    if (!selectedId) {
      alert("Please select a product to update.");
      return;
    }
    try {
      await axios.put(`${BASE_URL}/products/${selectedId}`, updatedProduct, {
        withCredentials: true,
      });
      await fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Update Product</h3>

      {/* Product Dropdown */}
      <select
        className="border p-2 mb-4 w-full"
        onChange={(e) => handleSelectProduct(e.target.value)}
        value={selectedId}
      >
        <option value="">Select a product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} — ₹{p.price}
          </option>
        ))}
      </select>

      {/* Update Form */}
      <div className="flex flex-col gap-2">
        <input
          className="border p-2"
          placeholder="Name"
          value={updatedProduct.name}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, name: e.target.value })
          }
        />
        <input
          className="border p-2"
          placeholder="Category"
          value={updatedProduct.category}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, category: e.target.value })
          }
        />
        <input
          className="border p-2"
          placeholder="Price"
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e.target.value })
          }
        />
        <input
          className="border p-2"
          placeholder="Features"
          value={updatedProduct.features}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, features: e.target.value })
          }
        />
        <input
          className="border p-2"
          placeholder="Quantity"
          value={updatedProduct.quantity}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, quantity: e.target.value })
          }
        />
        <input
          className="border p-2"
          placeholder="Image URL"
          value={updatedProduct.imageUrl}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })
          }
        />
        <input
          className="border p-2"
          placeholder="Description"
          value={updatedProduct.description}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              description: e.target.value,
            })
          }
        />
        <input
          className="border p-2"
          placeholder="Brand"
          value={updatedProduct.brand}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, brand: e.target.value })
          }
        />
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={updateProduct}
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
