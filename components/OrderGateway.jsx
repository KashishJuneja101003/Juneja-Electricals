import { useCart } from "./context/CartContext";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const OrderGateway = () => {
  const navigate = useNavigate();
  const { cart, deleteItem } = useCart();
  const [quantityInfo, setQuantityInfo] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = 0.18 * total;
  const grandTotal = total + gst;

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Cashfree) {
        console.log("✅ Cashfree SDK loaded successfully:", window.Cashfree);
        clearInterval(interval);
      } else {
        console.log("⏳ Waiting for Cashfree SDK to load...");
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to proceed with payment.");
      navigate("/login");
      return;
    }

    if (!window.Cashfree) {
      alert("Cashfree SDK not loaded yet. Try again.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/create-order`,
        { amount: grandTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const sessionId = res.data.payment_session_id;
      const orderId = res.data.order_id;

      if (!sessionId || !orderId) {
        console.error("❌ Invalid session ID or order ID");
        alert("Payment setup failed.");
        return;
      }

      console.log("🔑 Received sessionId:", sessionId);
      console.log("🔑 Received order_id:", orderId);

      // ✅ Load SDK and initialize payment
      const cashfree = await load({ mode: "production" });
      console.log("Cashfree object loaded:", cashfree);

      await cashfree.checkout({
        payment_session_id: sessionId,
        redirectTarget: "#_blank",
      });
    } catch (error) {
      console.error("❌ Payment initiation failed:", error);
      alert("Something went wrong during payment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchQuantityStatus = async () => {
      const newData = {};
      await Promise.all(
        cart.map(async (item) => {
          try {
            const res = await axios.get(`${BASE_URL}/products/id/${item._id}`);
            newData[item._id] = res.data.quantity;
          } catch (error) {
            newData[item._id] = "error";
          }
        })
      );
      setQuantityInfo(newData);
    };

    if (cart.length > 0) fetchQuantityStatus();
  }, [cart]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-800 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => {
            const availableQuantity = quantityInfo[item._id];
            const isAvailable =
              typeof availableQuantity === "number" &&
              availableQuantity >= item.quantity;

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-200 rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{item.price} × {item.quantity}
                  </p>
                  {availableQuantity === "error" ? (
                    <p className="text-sm text-red-500">
                      ⚠️ Quantity check failed
                    </p>
                  ) : (
                    <p
                      className={`text-sm ${
                        isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isAvailable
                        ? `In Stock (${availableQuantity} available)`
                        : `Out of Stock (${availableQuantity ?? 0} available)`}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <i
                    className="fa fa-trash cursor-pointer text-red-600 hover:text-red-800"
                    aria-hidden="true"
                    onClick={() => deleteItem(index)}
                  ></i>
                </div>
              </div>
            );
          })}

          <div className="mt-4 text-md w-fit bg-gray-200 p-3 rounded-lg">
            <div className="font-bold">Order Details</div>
            <span className="font-semibold">Total: </span>₹{total}
            <br />
            <span className="font-semibold">GST:</span> ₹{gst.toFixed(2)}
            <br />
            <span className="font-semibold">Pay:</span>{" "}
            <span className="text-red-600 font-semibold">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>

          <button
            className="mt-4 bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>

          <div
            id="drop_in_container"
            className="mt-4 w-full min-h-[400px] bg-white shadow-lg rounded-lg"
          ></div>
        </div>
      )}
    </div>
  );
};

export default OrderGateway;
