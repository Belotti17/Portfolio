// ========== LOADER PREMIUM ==========
document.addEventListener('DOMContentLoaded', () => {
  // Récupère les éléments nécessaires à l'affichage du chargement.
  const loader = document.getElementById('loader');
  const percentage = document.querySelector('.loader-percentage');
  let progress = 0;
  
  // Simule la progression jusqu'à la disparition du loader.
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
    // Met à jour le pourcentage affiché si l'élément existe.
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
// Éléments qui déclenchent l'agrandissement du curseur personnalisé.
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .article-card, .expertise-card, .filter-btn');

// Active le curseur avancé uniquement sur les appareils avec une souris précise.
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isDesktop) {
  // Coordonnées actuelles et coordonnées interpolées des éléments du curseur.
  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;
  let glowX = 0, glowY = 0;
  
  // Suit directement la position du point central.
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  // Anime le cercle avec un léger retard pour créer un effet fluide.
  function animateCircle() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';
    
    requestAnimationFrame(animateCircle);
  }
  
  // Anime la lueur avec un retard plus important.
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.05;
    glowY += (mouseY - glowY) * 0.05;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
  }
  
  animateCircle();
  animateGlow();
  
  // Agrandit le curseur au survol des éléments interactifs.
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
  // Désactive les éléments du curseur sur les écrans tactiles.
  cursorDot.style.display = 'none';
  cursorCircle.style.display = 'none';
  cursorGlow.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ========== HERO PARTICLES ==========
function createParticles() {
  // Génère les particules décoratives dans la section hero.
  const container = document.getElementById('heroParticles');
  if (!container) return;
  
  // Donne à chaque particule une position et une animation aléatoires.
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
  // Ajoute ou retire les lettres du mot actuellement affiché.
  const currentWord = wordsHero[wordIndexHero];
  
  if (!isDeletingHero) {
    dynamicTextHero.textContent = currentWord.substring(0, letterIndexHero + 1);
    letterIndexHero++;
    
    // Attend quelques secondes lorsque le mot est entièrement visible.
    if (letterIndexHero === currentWord.length) {
      isDeletingHero = true;
      setTimeout(typeEffectHero, 2000);
      return;
    }
  } else {
    dynamicTextHero.textContent = currentWord.substring(0, letterIndexHero - 1);
    letterIndexHero--;
    
    // Passe au mot suivant lorsque le mot précédent est entièrement effacé.
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
  // Duplique le contenu pour assurer une boucle visuelle continue.
  if (marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
  }
});

// ========== THEME MANAGEMENT ==========
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  // Applique le thème choisi et le mémorise dans le navigateur.
  if (theme === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

function loadTheme() {
  // Priorité au thème mémorisé, puis aux préférences du système.
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else setTheme(prefersDark.matches ? "dark" : "light");
}

// Inverse le thème lorsque l'utilisateur clique sur le bouton dédié.
themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});
loadTheme();

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById("header");
// Ajoute ou retire l'état compact du header selon le défilement.
window.addEventListener("scroll", () => {
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// ========== FULLSCREEN MENU OPTIMISÉ ==========
const hamburger = document.getElementById("hamburgerBtn");
const fullMenu = document.getElementById("fullscreenMenu");
const menuLinks = document.querySelectorAll(".menu-link");
let lastFocusedElement;

function openMenu() {
  // Ouvre le panneau et mémorise l'élément qui devra récupérer le focus.
  lastFocusedElement = document.activeElement;
  fullMenu.classList.add("active");
  hamburger.classList.add("is-open");
  document.body.classList.add("menu-open");
  document.body.style.overflow = "hidden";
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Fermer le menu");
  menuLinks[0]?.focus();
}

function closeMenu() {
  // Ferme le panneau, restaure la page et rend le focus à son origine.
  fullMenu.classList.remove("active");
  hamburger.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  document.body.style.overflow = "";
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Ouvrir le menu");
  lastFocusedElement?.focus();
}

// Le même bouton ouvre le menu puis le referme lorsqu'il affiche le X.
hamburger?.addEventListener("click", () => {
  if (fullMenu.classList.contains("active")) closeMenu();
  else openMenu();
});
// Ferme le menu lorsqu'on clique sur la zone sombre extérieure.
fullMenu?.addEventListener("click", (e) => {
  if (e.target === fullMenu) closeMenu();
});

// Gère les liens internes et externes du menu.
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

// Ferme le menu avec Echap et maintient le focus à l'intérieur avec Tab.
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
  // Ramène doucement l'utilisateur au début de la page.
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ========== SMOOTH SCROLL ==========
// Ajoute un défilement fluide aux liens d'ancrage hors du menu.
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
  // Anime chaque compteur jusqu'à sa valeur finale une seule fois.
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
  // Lance les compteurs lorsque la zone des statistiques devient visible.
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
  // Active progressivement les éléments qui entrent dans la fenêtre.
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.1 },
);
// Prépare chaque élément à son animation d'apparition.
revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ========== PROJECT FILTERS ==========
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
// Filtre les projets selon la catégorie sélectionnée.
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
  // Valide puis envoie le formulaire via EmailJS.
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Vérifie que les trois champs obligatoires sont remplis.
    if (!name || !email || !message) {
      feedbackDiv.textContent = "Tous les champs sont requis.";
      return;
    }

    // Affiche un message clair si le service externe est indisponible.
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

    // Envoie les données au service EmailJS puis restaure le bouton.
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
// Ajoute un effet ripple au clic sur les boutons principaux.
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
// Incline les cartes de projets selon la position de la souris.
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
  // Ajoute un déplacement parallaxe léger à l'image du hero.
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
// Réserve un point d'extension pour les futurs effets liés au scroll.
window.addEventListener('scroll', () => {
  // Add scroll-based effects here if needed
}, { passive: true });

// Limite la fréquence de traitement lors du redimensionnement.
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize events here
  }, 250);
});
