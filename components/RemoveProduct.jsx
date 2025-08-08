// RemoveProduct.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const RemoveProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
      const res = await axios.get(`${BASE_URL}/products`);
    setProducts(res.data.products);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Remove Product</h3>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveProduct;
