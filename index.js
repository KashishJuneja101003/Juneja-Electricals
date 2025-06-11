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

toggleCategory.addEventListener("click", () => {
  const iconCategory = document.getElementById("iconCategory");
  iconCategory.classList.toggle("rotate-180");
});

toggleBrands.addEventListener("click", () => {
  const iconBrands = document.getElementById("iconBrands");
  iconBrands.classList.toggle("rotate-180");
});

toggleContact.addEventListener("click", () => {
  const iconContact = document.getElementById("iconContact");
  iconContact.classList.toggle("rotate-180");
});

// Navbar Toggles
document.getElementById('toggleSearchNavbar').addEventListener("click", () => {
  document.getElementById("iconSearchNavbar").classList.toggle("rotate-180");
})
document.getElementById('toggleBrandsNavbar').addEventListener("click", () => {
  document.getElementById("iconBrandsNavbar").classList.toggle("rotate-180");
})
document.getElementById('toggleContactNavbar').addEventListener("click", () => {
  document.getElementById("iconContactNavbar").classList.toggle("rotate-180");
})