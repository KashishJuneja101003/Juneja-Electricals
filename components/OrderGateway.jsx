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
    // Clear previous Drop-in if any
    if (dropinContainerRef.current) {
      dropinContainerRef.current.innerHTML = "";
    }

    // Create order on server
    const res = await axios.post(
      `${BASE_URL}/create-order`,
      { amount: grandTotal },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const sessionId = res.data.payment_session_id;

    // Load Cashfree SDK if not loaded already
    await load({ mode: "PROD" });
    console.log("✅ Cashfree SDK loaded");

    // Initialize Drop-in
    window.Cashfree.initializeDropin({
      paymentSessionId: sessionId,
      redirect: false,
      container: "#cashfree-dropin-container",
      style: {
        // Optional: customize the look
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      },
      onSuccess: (data) => {
        console.log("✅ Payment Success", data);
        alert("Payment Successful!");
        navigate("/"); // or thank-you page
      },
      onFailure: (data) => {
        console.error("❌ Payment Failed", data);
        alert("Payment failed. Please try again.");
      },
      onPending: (data) => {
        console.warn("⏳ Payment Pending", data);
        alert("Payment is pending. Please wait.");
      },
    });
  } catch (error) {
    console.error("❌ Payment initiation failed:", error);
    alert("Something went wrong during payment. Please try again.");
  }
};
