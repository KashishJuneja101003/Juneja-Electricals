const shareButton = document.getElementById("share-btn");

shareButton.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Juneja Electricals",
        text: "Explore Juneja Electricals for all your electrical needs!",
        url: window.location.href, // Shares the current page URL
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
});
