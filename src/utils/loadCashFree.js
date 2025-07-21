export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree && typeof window.Cashfree === "object") {
      console.log("✅ Cashfree SDK already loaded.");
      return resolve(window.Cashfree);
    }

    const script = document.createElement("script");
    script.id = "cashfree-sdk";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Script tag loaded, waiting for Cashfree object...");

      const maxAttempts = 10;
      let attempts = 0;

      const checkSDK = () => {
        if (window.Cashfree && typeof window.Cashfree === "object") {
          console.log("✅ Cashfree SDK is now available.");
          resolve(window.Cashfree);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkSDK, 200);
        } else {
          console.error("❌ Cashfree object still undefined after script load.");
          reject(new Error("Cashfree SDK not initialized in time."));
        }
      };

      checkSDK();
    };

    script.onerror = () => {
      console.error("❌ Failed to load Cashfree SDK.");
      reject(new Error("SDK load error"));
    };

    document.body.appendChild(script);
  });
};
