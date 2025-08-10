import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Fans from "../components/Products/Fans";
import Footer from "../components/Footer";
import Irons from "../components/Products/Irons";
import Switches from "../components/Products/Switches";
import Lights from "../components/Products/Lights";
import Pipes from "../components/Products/Pipes";
import Wires from "../components/Products/Wires";
import Register from "../components/Register";
import Login from "../components/Login";
import OrderGateway from "../components/OrderGateway";
import HomePage from "../components/HomePage";
import PaymentSuccess from "../components/PaymentSuccess";
import OrderSuccess from "../components/OrderSuccess";
import AdminDashboard from "../components/AdminDashboard";
import AdminRoute from "../components/AdminRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Install button, show only when prompt is available */}
      {showInstallButton && (
        <div className="bg-emerald-600 text-white text-center py-2 cursor-pointer hover:bg-emerald-700 transition-all">
          <button className="cursor-pointer" onClick={handleInstallClick}>
            Install Juneja Electricals App
          </button>
        </div>
      )}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Products/Fans" element={<Fans />} />
          <Route path="/Products/Irons" element={<Irons />} />
          <Route path="/Products/Switches" element={<Switches />} />
          <Route path="/Products/Lights" element={<Lights />} />
          <Route path="/Products/Pipes" element={<Pipes />} />
          <Route path="/Products/Wires" element={<Wires />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/OrderGateway" element={<OrderGateway />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                {" "}
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
