import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const PaymentSuccess = () => {
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

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="mt-4">
        We’re verifying your payment and generating your invoice...
      </p>
      <p className="mt-2">Kindly check your email-id for bill...</p>
    </div>
  );
};

export default PaymentSuccess;
