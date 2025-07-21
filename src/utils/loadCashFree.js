export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree && typeof window.Cashfree.load === "function") {
      console.log("✅ Cashfree SDK already loaded.");
      return resolve();
    }

    const existingScript = document.getElementById("cashfree-sdk");
    if (existingScript) {
      console.log("⚠️ SDK script already in DOM, waiting for it to load...");
      existingScript.addEventListener("load", resolve);
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = "cashfree-sdk";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Cashfree SDK loaded via script tag.");
      resolve();
    };
    script.onerror = () => {
      console.error("❌ Failed to load Cashfree SDK.");
      reject(new Error("SDK load error"));
    };

    document.body.appendChild(script);
  });
};
