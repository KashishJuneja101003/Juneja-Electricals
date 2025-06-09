const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle('hidden');
});

// Submenu toggles
document.getElementById("toggleCategory").addEventListener("click", () => {
  document.getElementById("menuCategory").classList.toggle("hidden");
});

document.getElementById("toggleBrands").addEventListener("click", () => {
  document.getElementById("menuBrands").classList.toggle("hidden");
});

document.getElementById("toggleContact").addEventListener("click", () => {
  document.getElementById("menuContact").classList.toggle("hidden");
});

const iconCategory = document.getElementsByClassName("iconCategory");
toggleCategory.addEventListener("click", () => {
  iconCategory.classList.toggle("rotate-180");
});
