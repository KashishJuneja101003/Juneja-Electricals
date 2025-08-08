// AddProduct.jsx
import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    brand: "",
  });

  const handleAddProduct = async () => {
    try {
      await axios.post(`${BASE_URL}/products`, newProduct, {
        withCredentials: true,
      });
      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    }
  };

  return (
    <div>
      <h3>Add New Product</h3>
      <input placeholder="Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
      <input placeholder="Image URL" onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
      <input placeholder="Brand" onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
