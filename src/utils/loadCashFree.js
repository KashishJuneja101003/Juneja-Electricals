export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree && typeof window.Cashfree.checkout === "function") {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Cashfree SDK loaded");
      resolve();
    };
    script.onerror = (e) => {
      console.error("❌ SDK failed to load", e);
      reject("Cashfree SDK failed to load");
    };

    document.body.appendChild(script);
  });
};
