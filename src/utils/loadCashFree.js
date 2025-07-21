export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      if (window.Cashfree) resolve(window.Cashfree);
      else reject("❌ Cashfree SDK failed to initialize");
    };
    script.onerror = () => reject("❌ Failed to load Cashfree SDK");
    document.body.appendChild(script);
  });
};
