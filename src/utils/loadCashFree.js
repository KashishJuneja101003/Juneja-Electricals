export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) return resolve(); // Already loaded

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/ui/1.0.26/dropinClient.prod.js";
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject("Cashfree SDK failed to load");

    document.body.appendChild(script);
  });
};
