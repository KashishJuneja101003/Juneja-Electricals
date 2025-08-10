import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../components/context/CartContext.jsx";
import { AuthProvider } from "../components/context/AuthContext.jsx";

window.addEventListener("load", () => {
  let preLoad = document.getElementById("pre-loader-container");

  setTimeout(() => {
    preLoad.style.display = "none"; // Hide preloader
    document.getElementById("pre-loader-container").style.display = "none"; // Optional: Hide temp body div
    document.getElementById("root").style.display = "block"; // Show main content
    document.getElementById("footer").style.display = "block"; // Show main content
  }, 2700);

  // Cashfree payment gateway
  // if (window.Cashfree) {
  //   console.log("✅ Cashfree SDK is ready");
  // } else {
  //   console.log("❌ Cashfree SDK not found");
  // }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
