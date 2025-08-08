// ViewProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data.products);
    };
    fetch();
  }, []);

  return (
    <div>
      <h3>View All Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> - ₹{p.price} ({p.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProducts;
