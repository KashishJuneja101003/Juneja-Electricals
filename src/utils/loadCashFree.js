// src/utils/loadCashFree.js
export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree && typeof window.Cashfree.checkout === "function") {
      return resolve(); // already loaded
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/ui/2.0.0/dropin.min.js";
    script.onload = () => resolve();
    script.onerror = () => reject("Cashfree SDK failed to load");
    document.body.appendChild(script);
  });
};
