// ========== LOADER PREMIUM ==========
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const percentage = document.querySelector('.loader-percentage');
  let progress = 0;
  
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
      }, 500);
    }
    if (percentage) {
      percentage.textContent = Math.floor(progress) + '%';
    }
  }, 150);
  
  document.body.style.overflow = 'hidden';
});

// ========== CUSTOM CURSOR PREMIUM ==========
const cursorDot = document.getElementById('cursorDot');
const cursorCircle = document.getElementById('cursorCircle');
const cursorGlow = document.getElementById('cursorGlow');
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .article-card, .expertise-card, .filter-btn');

const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isDesktop) {
  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;
  let glowX = 0, glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animateCircle() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';
    
    requestAnimationFrame(animateCircle);
  }
  
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.05;
    glowY += (mouseY - glowY) * 0.05;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
  }
  
  animateCircle();
  animateGlow();
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorDot.classList.add('active');
      cursorCircle.classList.add('active');
      cursorGlow.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
      cursorCircle.classList.remove('active');
      cursorGlow.classList.remove('active');
    });
  });
} else {
  cursorDot.style.display = 'none';
  cursorCircle.style.display = 'none';
  cursorGlow.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ========== HERO PARTICLES ==========
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    particle.style.width = (Math.random() * 3 + 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

createParticles();

// ========== ANIMATED TEXT HERO ==========
const dynamicTextHero = document.getElementById('dynamicTextHero');
const wordsHero = ['DÉVELOPPE.', 'DESIGNE.', 'INNOVE.', 'CRÉE.', 'RÉSOUS.', 'EXCELLE.'];
let wordIndexHero = 0;
let letterIndexHero = 0;
let isDeletingHero = false;

function typeEffectHero() {
  const currentWord = wordsHero[wordIndexHero];
  
  if (!isDeletingHero) {
    dynamicTextHero.textContent = currentWord.substring(0, letterIndexHero + 1);
    letterIndexHero++;
    
    if (letterIndexHero === currentWord.length) {
      isDeletingHero = true;
      setTimeout(typeEffectHero, 2000);
      return;
    }
  } else {
    dynamicTextHero.textContent = currentWord.substring(0, letterIndexHero - 1);
    letterIndexHero--;
    
    if (letterIndexHero === 0) {
      isDeletingHero = false;
      wordIndexHero = (wordIndexHero + 1) % wordsHero.length;
    }
  }
  
  setTimeout(typeEffectHero, isDeletingHero ? 50 : 100);
}

if (dynamicTextHero) {
  setTimeout(typeEffectHero, 1500);
}

// ========== MARQUEE DUPLICATION ==========
const marqueeContents = document.querySelectorAll('.marquee-content-top, .marquee-content-bottom');
marqueeContents.forEach(marqueeContent => {
  if (marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
  }
});

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

// ========== FULLSCREEN MENU OPTIMISÉ ==========
const hamburger = document.getElementById("hamburgerBtn");
const fullMenu = document.getElementById("fullscreenMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuLinks = document.querySelectorAll(".menu-link");
let lastFocusedElement;

function openMenu() {
  lastFocusedElement = document.activeElement;
  fullMenu.classList.add("active");
  document.body.style.overflow = "hidden";
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Fermer le menu");
  closeMenuBtn.focus();
  
  // Animation du hamburger en X
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.opacity = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}

function closeMenu() {
  fullMenu.classList.remove("active");
  document.body.style.overflow = "";
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Ouvrir le menu");
  lastFocusedElement?.focus();
  
  // Reset du hamburger
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

hamburger?.addEventListener("click", openMenu);
closeMenuBtn?.addEventListener("click", closeMenu);
fullMenu?.addEventListener("click", (e) => {
  if (e.target === fullMenu) closeMenu();
});

menuLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (link.target === "_blank" || targetId?.startsWith("http")) {
      closeMenu();
      return;
    }
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

  if (e.key === "Tab" && fullMenu.classList.contains("active")) {
    const focusableElements = fullMenu.querySelectorAll(
      'a[href], button:not([disabled])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
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
        card.style.animation = "fadeInUp 0.5s ease";
      } else card.style.display = "none";
    });
    document.querySelector(".projects-grid").style.display = "grid";
  });
});

// ========== EMAILJS CONFIGURATION ==========
(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init("bixCf2vUglqOaFmhU");
  }
})();
const contactForm = document.getElementById("contactForm");
const feedbackDiv = document.getElementById("formFeedback");
const submitButton = contactForm?.querySelector('button[type="submit"]');

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      feedbackDiv.textContent = "Tous les champs sont requis.";
      return;
    }

    if (typeof emailjs === "undefined") {
      feedbackDiv.textContent = "Le formulaire est temporairement indisponible.";
      return;
    }

    feedbackDiv.textContent = "Envoi en cours...";
    submitButton.disabled = true;

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send("service_3wsdlm8", "template_km66lrj", templateParams)
      .then(() => {
        feedbackDiv.textContent = "Message envoyé avec succès !";
        contactForm.reset();

        setTimeout(() => {
          feedbackDiv.textContent = "";
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
        feedbackDiv.textContent = "Erreur lors de l'envoi.";
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}

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

// ========== MOUSE PARALLAX EFFECT ==========
const heroImage = document.querySelector('.hero-image');
if (isDesktop && heroImage) {
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const offsetX = (clientX / windowWidth - 0.5) * 15;
    const offsetY = (clientY / windowHeight - 0.5) * 15;
    
    heroImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
}

// ========== PERFORMANCE OPTIMIZATION ==========
window.addEventListener('scroll', () => {
  // Add scroll-based effects here if needed
}, { passive: true });

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize events here
  }, 250);
});
