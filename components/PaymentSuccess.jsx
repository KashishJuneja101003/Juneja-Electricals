import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${BASE_URL}/verify-payment`,
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Payment verified:", res.data);
        // maybe show success message or invoice here
      } catch (err) {
        console.error("❌ Payment verification failed:", err.response?.data);
        // show error message
      }
    };

    if (orderId) verifyPayment();
  }, [orderId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="mt-4">
        We’re verifying your payment and generating your invoice...
      </p>
      <p className="mt-2">Kindly check your email-id for bill...</p>
      <div className="mt-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-dotted border-[#27548a]"></div>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Redirecting you to homepage...
      </p>  
    </div>
  );
};

export default PaymentSuccess;
