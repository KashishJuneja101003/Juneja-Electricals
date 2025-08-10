import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    brand: "",
    features: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    const { name, price, category, imageUrl, brand } = newProduct;
    if (!name) {
      alert("Please add name");
      return;
    }
    if (!category) {
      alert("Please add category");
      return;
    }
    if (!price) {
      alert("Please add price");
      return;
    }
    if (!imageUrl) {
      alert("Please add imageUrl");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/products`, newProduct, {
        withCredentials: true,
      });
      alert("Product added successfully!");

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        category: "",
        imageUrl: "",
        brand: "",
        features: "",
        quantity: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="flex justify-center text-green-800">
      <div className="flex justify-center items-center p-2 flex-col  border-2 border-sky-300 rounded-2xl w-[90%] sm:w-fit gap-2 bg-sky-200">
        <h3 className="text-xl sm:text-3xl font-semibold text-center">Add New Product</h3>
        <hr className="text-sky-300 w-full" />


        <div className="flex flex-col text-md sm:text-xl gap-3 p-2">
          {/* Name */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold " htmlFor="name">
              <pre>Name           :</pre>
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl "
              name="name"
              placeholder="Item Name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
          </div>


          {/* Category */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="category">
              <pre>Category     :</pre>
            </label>
            <select
              name="category"
              className="p-1.5 bg-white outline-1 rounded-xl"
              value={newProduct.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Fans">Fans</option>
              <option value="Lights">Lights</option>
              <option value="Switches">Switches</option>
              <option value="Wires">Wires</option>
              <option value="Irons">Irons</option>
              <option value="Pipes">Pipes</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="price">
              <pre>Price            :</pre>{" "}
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl"
              name="price"
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Features */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="features">
              <pre>Features      :</pre>
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl"
              name="features"
              placeholder="Features"
              value={newProduct.features}
              onChange={handleChange}
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="quantity">
              <pre>Quantity     :</pre>
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl"
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="image">
              <pre>Image          :</pre>
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl"
              name="imageUrl"
              type="url"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="description">
              <pre>Description :</pre>
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleChange}
            />
          </div>

          {/* Brands */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="font-semibold" htmlFor="brand">
              <pre>Brand          :</pre>
            </label>
            <input
              className="p-1 outline-1 bg-white rounded-xl"
              name="brand"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="p-1.5 mt-3 w-50 cursor-pointer active:scale-90 bg-emerald-600 text-white rounded-2xl"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
