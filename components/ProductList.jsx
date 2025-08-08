// ViewProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`);
        console.log("Fetched products response from ProductList.jsx:", res.data);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products from ProductList.jsx:", err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <h3>View All Products</h3>
      <ul>
        {Array.isArray(products) &&
          products.map((p) => (
            <li key={p._id}>
              <strong>{p.name}</strong> - ₹{p.price} ({p.category})
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewProducts;
