import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    brand: "",
    quantity: "",
    description: "",
    features: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    if (product) {
      setUpdatedProduct({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        imageUrl: product.imageUrl || "",
        brand: product.brand || "",
        quantity: product.quantity || "",
        description: product.description || "",
        features: product.features || "",
      });
    }
  };

  const updateProduct = async () => {
    if (!selectedProduct) {
      alert("Please select a product to update.");
      return;
    }
    try {
      await axios.put(
        `${BASE_URL}/products/id/${selectedProduct._id}`,
        updatedProduct,
        { withCredentials: true }
      );
      await fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const options = products.map((p) => ({
    value: p._id,
    label: (
      <div className="w-fit" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={p.imageUrl}
          alt={p.name}
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
        <span>
          {p.name} — ₹{p.price}
        </span>
      </div>
    ),
    product: p,
  }));

  return (
    <div className="flex justify-center text-green-800">
      <div className="flex justify-center items-center p-2 flex-col  border-2 border-sky-300 rounded-2xl w-fit gap-2 bg-sky-200">
        <h3 className="text-3xl font-semibold text-center">Update Product</h3>
        <hr className="text-sky-300 w-full" />

        <div className="p-4">
          {/* Product dropdown with images */}
          <Select
            options={options}
            onChange={(option) => handleSelectProduct(option.product)}
            placeholder="Select a product"
            className="w-fit"
          />

          {selectedProduct && (
            <div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <input
                  className="border p-2"
                  placeholder="Name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2"
                  placeholder="Category"
                  value={updatedProduct.category}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      category: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2"
                  placeholder="Price"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2"
                  placeholder="Quantity"
                  type="number"
                  value={updatedProduct.quantity}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      quantity: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2"
                  placeholder="Features"
                  value={updatedProduct.features}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      features: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2"
                  placeholder="Image URL"
                  value={updatedProduct.imageUrl}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      imageUrl: e.target.value,
                    })
                  }
                />

                <textarea
                  className="border p-2 resize-none"
                  placeholder="Description"
                  rows={4}
                  value={updatedProduct.description}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  }
                />

                <img src={updatedProduct.imageUrl} className="w-40" alt="" />

                <input
                  className="border p-2"
                  placeholder="Brand"
                  value={updatedProduct.brand}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      brand: e.target.value,
                    })
                  }
                />
              </div>

              <button
                className="p-1.5 mt-3 w-50 cursor-pointer active:scale-90 bg-emerald-600 text-white rounded-2xl"
                onClick={updateProduct}
              >
                Update Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
