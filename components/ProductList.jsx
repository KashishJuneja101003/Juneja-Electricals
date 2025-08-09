// ViewProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`);
        console.log(
          "Fetched products response from ProductList.jsx:",
          res.data
        );

        // Safely handle both array and object formats
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data.products && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching products from ViewProducts.jsx:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">View All Products</h3>
      {products.length > 0 ? (
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <li
              key={p._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div>
                <div>
                  <h4 className="font-semibold text-lg">{p.name}</h4>
                  <p className="text-green-600 font-bold">₹{p.price}</p>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </div>
                <div>
                  <img src={p.imageUrl} alt="" />
                  <p className="text-sm"><b><pre>In Stock: </pre></b>{p.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ViewProducts;
