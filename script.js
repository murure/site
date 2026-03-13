// --- Language selector ---
async function setLanguage(lang) {
  try {
    const res = await fetch('./locales/' + lang + '.json');
    const t = await res.json();
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });

    // Sync the select element
    const sel = document.querySelector('nav select');
    if (sel) sel.value = lang;
  } catch (e) {
    console.error('Error loading translations:', e);
  }
}

const lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
setLanguage(lang);

// --- Carousel auto-scroll ---
const track = document.getElementById('carousel-track');
if (track) {
  let scrollAmount = 0;
  const step = 340;

  setInterval(() => {
    const maxScroll = track.scrollWidth / 2;
    scrollAmount += step;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
      track.scrollTo({ left: 0 });
    } else {
      track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 3000);
}

// --- Scroll reveal ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// --- Header scroll shadow ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile hamburger menu ---
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
