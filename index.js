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