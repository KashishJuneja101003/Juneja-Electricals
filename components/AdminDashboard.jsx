import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";
import UpdateProduct from "./UpdateProduct";
import ProductList from "./ProductList";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const AdminDashboard = () => {
  const [view, setView] = useState("view"); // current view: 'view', 'add', 'update', 'remove'
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data.products || res.data); // Adjust based on backend
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }} className="flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold mb-10">Admin Dashboard</h1>

      {/* Nav Buttons */}
      <div className="mb-10 w-fit grid sm:grid-cols-2 md:grid-cols-4 gap-2 " >
        <button className="bg-amber-300 p-2 w-40 rounded-2xl active:scale-90 cursor-pointer active:text-slate-600" onClick={() => setView("add")}>➕ Add Product</button>
        <button className="bg-amber-300 p-2 w-40 rounded-2xl active:scale-90 cursor-pointer active:text-slate-600" onClick={() => setView("remove")}>❌ Remove Product</button>
        <button className="bg-amber-300 p-2 w-40 rounded-2xl active:scale-90 cursor-pointer active:text-slate-600" onClick={() => setView("update")}>🔄 Update Product</button>
        <button className="bg-amber-300 p-2 w-40 rounded-2xl active:scale-90 cursor-pointer active:text-slate-600" onClick={() => setView("view")}>👁️ View Products</button>
      </div>

      {/* Conditional Views */}
      {view === "add" && <AddProduct fetchProducts={fetchProducts} />}
      {view === "remove" && (
        <RemoveProduct products={products} fetchProducts={fetchProducts} />
      )}
      {view === "update" && (
        <UpdateProduct products={products} fetchProducts={fetchProducts} />
      )}
      {view === "view" && <ProductList products={products} />}
    </div>
  );
};

export default AdminDashboard;
