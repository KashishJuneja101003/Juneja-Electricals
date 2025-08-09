import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";
const categories = ["Fans", "Lights", "Switches", "Wires", "Irons", "Pipes"];

const RemoveProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      console.log(
        "Fetched products response from RemoveProduct.jsx:",
        res.data
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products from RemoveProduct.jsx:", err);
    }
  };

  const deleteProduct = async () => {
    if (!category) return alert("Please select the category of product.");
    if (!selectedId) return alert("Please select a product to delete.");
    try {
      await axios.delete(`${BASE_URL}/products/${selectedId}`, {
        withCredentials: true,
      });
      setSelectedId("");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by chosen category
  const filteredProducts = products.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="flex justify-center text-green-800">
      <div className="flex justify-center items-center p-2 flex-col gap-2 border-2 border-sky-300 rounded-2xl w-fit bg-sky-200">
        <h3 className="text-3xl font-semibold text-center">Remove Product</h3>
        <hr className="text-sky-300 w-full" />

        <div className="flex flex-col text-xl gap-3 p-2">
          {/* Step 1: Choose category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-1 p-1 bg-white rounded-xl"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Step 2: Choose product from selected category */}
          <div className="bg-white rounded-xl p-1 border h-fit transition-all duration-300">
            {category ? (
              filteredProducts.length === 0 ? (
                <p className="text-gray-500">No products in this category</p>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    className={`flex items-center gap-4 p-2 border-b cursor-pointer hover:bg-sky-100 transition-colors duration-200 ${
                      selectedId === p._id ? "bg-sky-200" : ""
                    }`}
                    onClick={() => setSelectedId(p._id)}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p>ID: {p._id}</p>
                      <p>Brand: {p.brand}</p>
                      <p>₹{p.price}</p>
                    </div>
                  </div>
                ))
              )
            ) : (
              <p className="text-gray-500">
                Select a category to view products
              </p>
            )}
          </div>
        </div>

        <button
          className="p-1.5 mt-3 w-50 cursor-pointer active:scale-90 bg-emerald-600 text-white rounded-2xl"
          onClick={deleteProduct}
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default RemoveProduct;
