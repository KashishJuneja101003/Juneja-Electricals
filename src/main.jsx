import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.addEventListener("load", () => {
  let preLoad = document.getElementById("pre-loader-container");

  setTimeout(() => {
    preLoad.style.display = "none";                      // Hide preloader
    document.getElementById("pre-loader-container").style.display = "none"; // Optional: Hide temp body div
    document.getElementById("root").style.display = "block"; // Show main content
    document.getElementById("footer").style.display = "block"; // Show main content
  }, 3000);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
