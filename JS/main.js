// ========== THEME MANAGEMENT ==========
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else setTheme(prefersDark.matches ? "dark" : "light");
}
themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});
loadTheme();

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// ========== FULLSCREEN MENU HAMBURGER AVEC EFFET REBOND + BOUTON FERMETURE ==========
const hamburger = document.getElementById("hamburgerBtn");
const fullMenu = document.getElementById("fullscreenMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuLinks = document.querySelectorAll(".menu-link");

function openMenu() {
  fullMenu.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  fullMenu.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger?.addEventListener("click", openMenu);
closeMenuBtn?.addEventListener("click", closeMenu);

menuLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href") === "#cv") {
      e.preventDefault();
      downloadCV();
      closeMenu();
      return;
    }
