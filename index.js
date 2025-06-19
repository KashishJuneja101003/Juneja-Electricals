const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.add("hidden");
  }
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
document.getElementById("toggleSearchNavbar").addEventListener("click", () => {
  document.getElementById("iconSearchNavbar").classList.toggle("rotate-180");
});
document.getElementById("toggleBrandsNavbar").addEventListener("click", () => {
  document.getElementById("iconBrandsNavbar").classList.toggle("rotate-180");
});
document.getElementById("toggleContactNavbar").addEventListener("click", () => {
  document.getElementById("iconContactNavbar").classList.toggle("rotate-180");
});

// Pre-loader
window.addEventListener("load", () => {
  let preLoad = document.getElementById("pre-loader");
  setTimeout(() => {
    preLoad.style.display = "block";
    preLoad.style.display = "none";
    document.getElementById("body").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000);
});

// Navbar Underline Effect
document.getElementById("toggleSearchNavbar").addEventListener("mouseover", () => {
  document.getElementById("navSearchUnderline").classList.add("addUnderlineEffect");
  document.getElementById("navSearchUnderline").classList.remove("removeUnderlineEffect");

});
document.getElementById("toggleSearchNavbar").addEventListener("mouseout", () => {
  document.getElementById("navSearchUnderline").classList.add("removeUnderlineEffect");
  document.getElementById("navSearchUnderline").classList.remove("addUnderlineEffect");
});
document.getElementById("toggleBrandsNavbar").addEventListener("mouseover", () => {
  document.getElementById("navBrandsUnderline").classList.add("addUnderlineEffect");
  document.getElementById("navBrandsUnderline").classList.remove("removeUnderlineEffect");

});
document.getElementById("toggleBrandsNavbar").addEventListener("mouseout", () => {
  document.getElementById("navBrandsUnderline").classList.add("removeUnderlineEffect");
  document.getElementById("navBrandsUnderline").classList.remove("addUnderlineEffect");
});
document.getElementById("toggleContactNavbar").addEventListener("mouseover", () => {
  document.getElementById("navContactUnderline").classList.add("addUnderlineEffect");
  document.getElementById("navContactUnderline").classList.remove("removeUnderlineEffect");

});
document.getElementById("toggleContactNavbar").addEventListener("mouseout", () => {
  document.getElementById("navContactUnderline").classList.add("removeUnderlineEffect");
  document.getElementById("navContactUnderline").classList.remove("addUnderlineEffect");
});