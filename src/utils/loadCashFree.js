export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree && typeof window.Cashfree.load === "function") {
      console.log("✅ Cashfree SDK already loaded.");
      return resolve();
    }

    const script = document.createElement("script");
    script.id = "cashfree-sdk";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      console.log("✅ Script tag loaded, checking for Cashfree object...");
      
      // Retry mechanism
      let retries = 10;
      const checkInterval = setInterval(() => {
        if (window.Cashfree && typeof window.Cashfree.load === "function") {
          clearInterval(checkInterval);
          console.log("✅ Cashfree SDK is ready.");
          resolve();
        } else {
          retries--;
          console.warn(`⏳ Waiting for Cashfree... (${10 - retries}/10)`);
          if (retries === 0) {
            clearInterval(checkInterval);
            reject(new Error("Cashfree SDK not initialized in time."));
          }
        }
      }, 200); // 200ms x 10 = 2s max wait
    };

    script.onerror = () => {
      console.error("❌ Failed to load Cashfree SDK.");
      reject(new Error("SDK load error"));
    };

    document.body.appendChild(script);
  });
};
