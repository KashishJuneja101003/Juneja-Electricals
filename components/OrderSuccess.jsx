import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const OrderSuccess = () => {
  const { cart, clearCart} = useCart();

  useEffect(() => {
    const updateInventoryAndClear = async () => {
      try {
        await axios.post(`${BASE_URL}/products/update-stock`, {
          items: cart,
        });

        clearCart(); // ✅ only after stock update
      } catch (error) {
        console.error("Error updating product stock:", error);
      }
    };

    updateInventoryAndClear();
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-2">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700">
        Thank you for shopping with{" "}
        <span className="font-semibold">Juneja Electricals</span>.
      </p>
      <p className="text-gray-600 mt-1">
        We’ve sent a confirmation email with your order details.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
