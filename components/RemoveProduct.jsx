import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

export default function RemoveProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["Fans", "Lights", "Switches", "Pipes", "Irons", "Wires"];

  // Fetch products from backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  return (
    <div className="p-6">
      {/* Category Dropdown */}
      <label className="block mb-2 font-medium">Select Category</label>
      <select
        className="border px-3 py-2 rounded w-full transition-all duration-300 ease-in-out"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedProduct(null);
        }}
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Product Dropdown */}
      {filteredProducts.length > 0 && (
        <div className="mt-4 transition-all duration-300 ease-in-out">
          <label className="block mb-2 font-medium">Select Product</label>
          <select
            className="border px-3 py-2 rounded w-full transition-all duration-300 ease-in-out"
            onChange={(e) =>
              setSelectedProduct(
                filteredProducts.find((p) => p._id === e.target.value)
              )
            }
          >
            <option value="">-- Select Product --</option>
            {filteredProducts.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selected Product Details */}
      {selectedProduct && (
        <div className="mt-6 border p-4 rounded shadow-md transition-all duration-300 ease-in-out">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-32 h-32 object-contain mb-4"
          />
          <p>
            <strong>ID:</strong> {selectedProduct._id}
          </p>
          <p>
            <strong>Name:</strong> {selectedProduct.name}
          </p>
          <p>
            <strong>Price:</strong> ₹{selectedProduct.price}
          </p>
          <p>
            <strong>Brand:</strong> {selectedProduct.brand}
          </p>
        </div>
      )}
    </div>
  );
}
