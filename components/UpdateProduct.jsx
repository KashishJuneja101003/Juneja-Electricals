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
    image: "",
    brand: "",
  });

  const fetchProducts = async () => {
      const res = await axios.get(`${BASE_URL}/products`);
    setProducts(res.data.products);
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        `${BASE_URL}/products/${selectedId}`,
        updatedProduct,
        { withCredentials: true }
      );
      fetchProducts();
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
    <div>
      <h3>Update Product</h3>
      <select onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
        <option value="">Select a product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input placeholder="Name" onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
      <input placeholder="Price" onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })} />
      <input placeholder="Image URL" onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
      <input placeholder="Brand" onChange={(e) => setUpdatedProduct({ ...updatedProduct, brand: e.target.value })} />
      <button onClick={updateProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProduct;
