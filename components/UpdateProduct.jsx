import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
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

  const updateProduct = async () => {
    if (!selectedProduct) {
      alert("Please select a product to update.");
      return;
    }
    try {
      await axios.put(
        `${BASE_URL}/products/${selectedProduct._id}`,
        updatedProduct,
        { withCredentials: true }
      );
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

  const options = products.map((p) => ({
    value: p._id,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={p.imageUrl}
          alt={p.name}
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
        <span>
          {p.name} — ₹{p.price}
        </span>
      </div>
    ),
    product: p,
  }));

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Update Product</h3>

      {/* Product dropdown with images */}
      <Select
        options={options}
        onChange={(option) => handleSelectProduct(option.product)}
        placeholder="Select a product"
      />

      {selectedProduct && (
        <div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <input
              className="border p-2"
              placeholder="Name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
            />

            <img src={updateProduct.imageUrl} className="w-40" alt="" />

            <input
              className="border p-2"
              placeholder="Category"
              value={updatedProduct.category}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  category: e.target.value,
                })
              }
            />

            <input
              className="border p-2"
              placeholder="Image URL"
              value={updatedProduct.imageUrl}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  imageUrl: e.target.value,
                })
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
              placeholder="Quantity"
              type="number"
              value={updatedProduct.quantity}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  quantity: e.target.value,
                })
              }
            />

            <input
              className="border p-2"
              placeholder="Features"
              value={updatedProduct.features}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  features: e.target.value,
                })
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
      )}
    </div>
  );
};

export default UpdateProduct;
