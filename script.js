// Language selector
async function setLanguage(lang) {
  try {
    const res = await fetch('./locales/' + lang + '.json');
    const t = await res.json();
    localStorage.setItem("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t[key] || key;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = t[key] || key;
    });
  } catch (e) {
    console.error("Error loading translations:", e);
  }
}

const lang = localStorage.getItem("lang") || navigator.language.slice(0, 2);
setLanguage(lang);

// Carousel track
const track = document.getElementById("carousel-track");
let scrollAmount = 0;
const step = 310;
const maxScroll = track.scrollWidth / 2;

setInterval(() => {
  scrollAmount += step;
  if (scrollAmount >= maxScroll) {
    scrollAmount = 0;
    track.scrollTo({ left: 0 });
  } else {
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }
}, 3000);
