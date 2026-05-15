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
    const targetId = link.getAttribute("href");
    if (targetId && targetId !== "#") {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        closeMenu();
      }
    } else closeMenu();
  }),
);

// Fermer avec Echap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fullMenu.classList.contains("active")) {
    closeMenu();
  }
});

// ========== LOGO LIEN RETOUR EN HAUT ==========
const logoLink = document.getElementById("logoLink");
if (logoLink) {
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ========== SMOOTH SCROLL ==========
document
  .querySelectorAll('a[href^="#"]:not(.menu-link):not(.logo-link)')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash === "#") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

// ========== STATS COUNTER ANIMATION ==========
const statsNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;
  statsNumbers.forEach((stat) => {
    const final = parseInt(stat.getAttribute("data-count"));
    let current = 0;
    const increment = final / 40;
    const update = () => {
      current += increment;
      if (current < final) {
        stat.innerText = Math.ceil(current);
        requestAnimationFrame(update);
      } else stat.innerText = final;
    };
    update();
  });
}

const heroStats = document.querySelector(".hero-stats");
const observerStats = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) animateStats();
  },
  { threshold: 0.4 },
);
if (heroStats) observerStats.observe(heroStats);

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll(
  "section, .skill-card, .project-card, .article-card, .expertise-card",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.1 },
);
revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ========== PROJECT FILTERS ==========
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else card.style.display = "none";
    });
    document.querySelector(".projects-grid").style.display = "grid";
  });
});

// ========== EMAILJS CONFIGURATION ==========
(function () {
  emailjs.init("bixCf2vUglqOaFmhU"); // PUBLIC KEY
})();
const contactForm = document.getElementById("contactForm");
const feedbackDiv = document.getElementById("formFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      feedbackDiv.innerHTML = "Tous les champs sont requis.";
      return;
    }

    feedbackDiv.innerHTML = "Envoi en cours...";

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send("service_3wsdlm8", "template_km66lrj", templateParams)
      .then(() => {
        feedbackDiv.innerHTML = " Message envoyé avec succès !";
        contactForm.reset();

        setTimeout(() => {
          feedbackDiv.innerHTML = "";
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
        feedbackDiv.innerHTML = "Erreur lors de l’envoi.";
      });
  });
}

// ========== TÉLÉCHARGEMENT CV ==========
function downloadCV() {
  const link = document.createElement("a");
  link.href = "assets/CV_2026-05-11_Belotti_Wenze.pdf";
  link.download = "assets/CV_2026-05-11_Belotti_Wenze.pdf";
  link.click();
}

document.getElementById("downloadCVBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  downloadCV();
});
document.getElementById("cvLinkMenu")?.addEventListener("click", (e) => {
  e.preventDefault();
  downloadCV();
});

// ========== RIPPLE EFFECT ==========
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.style.position = "relative";
    this.style.overflow = "hidden";
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// ========== TILT EFFECT ==========
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
