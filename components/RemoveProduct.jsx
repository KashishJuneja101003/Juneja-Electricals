import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

export default function RemoveProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Fans", "Lights", "Switches", "Pipes", "Irons", "Wires"];

  // Fetch products from backend
  const fetchProducts = () => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
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

  // Delete product
  const deleteProduct = async () => {
    if (!selectedProduct) return alert("Please select a product to delete.");
    if (
      !window.confirm(
        `Are you sure you want to delete "${selectedProduct.name}"?`
      )
    )
      return;

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/products/${selectedProduct._id}`, {
        withCredentials: true,
      });
      alert("Product deleted successfully.");
      setSelectedProduct(null);
      fetchProducts(); // Refresh list after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center text-green-800">
      <div className="flex justify-center items-center p-2 flex-col  border-2 border-sky-300 rounded-2xl w-fit gap-2 bg-sky-200">
        <h3 className="text-3xl font-semibold text-center">Remove Product</h3>
        <hr className="text-sky-300 w-full" />

        <div className="flex flex-col w-fit text-xl gap-3 p-2">
          {/* Category Dropdown */}
          <div className="flex w-fit">
            <label className="font-medium"><pre>Select Category:  </pre></label>
            <select
              className="border rounded bg-white cursor-pointer transition-all duration-300 ease-in-out"
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
          </div>

          {/* Product Dropdown */}
          {filteredProducts.length > 0 && (
            <div className="mt-4 transition-all duration-300 ease-in-out">
              <label className="block mb-2 font-medium">Select Product</label>
              <select
                className="border px-3 py-2 rounded w-full transition-all duration-300 ease-in-out"
                value={selectedProduct?._id || ""}
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

              {/* Delete Button */}
              <button
                onClick={deleteProduct}
                disabled={loading}
                className={`mt-4 px-4 py-2 cursor-pointer active:scale-90 rounded text-white ${
                  loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                } transition-all duration-200`}
              >
                {loading ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
