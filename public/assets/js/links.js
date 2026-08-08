const linksMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = document.querySelectorAll("[data-reveal]");
const languageButtons = document.querySelectorAll("[data-language]");
const translatableItems = document.querySelectorAll("[data-pt][data-en]");
const pageTitle = document.querySelector("title");
const pageDescription = document.querySelector('meta[name="description"]');

const languageMeta = {
  pt: {
    title: "Links | Carla Suzana Marinho — Psicóloga",
    description: "Atendimento psicológico online em português e inglês para brasileiros no Brasil e no exterior, além de atendimento presencial em Dourados/MS."
  },
  en: {
    title: "Links | Carla Suzana Marinho — Psychologist",
    description: "Online psychological care in Portuguese and English for Brazilians in Brazil and abroad, plus in-person care in Dourados/MS."
  }
};

const getContactClickEvent = (href) => {
  const normalizedHref = href.toLowerCase();

  if (normalizedHref.startsWith("tel:")) {
    return { name: "click_phone", method: "phone" };
  }

  if (normalizedHref.startsWith("mailto:")) {
    return { name: "click_email", method: "email" };
  }

  let url;

  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  const hostname = url.hostname.replace(/^www\./, "");

  if (hostname === "wa.me" || hostname === "api.whatsapp.com") {
    return { name: "click_whatsapp", method: "whatsapp" };
  }

  if (hostname === "instagram.com") {
    return { name: "click_instagram", method: "instagram" };
  }

  return null;
};

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const link = target ? target.closest("a[href]") : null;

  if (!link || typeof window.gtag !== "function") return;

  const contactEvent = getContactClickEvent(link.getAttribute("href") || "");
  if (!contactEvent) return;

  window.gtag("event", contactEvent.name, {
    contact_method: contactEvent.method,
    link_type: "contact",
    transport_type: "beacon"
  });
});

const showRevealItems = () => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
};

const setLanguage = (language) => {
  const selectedLanguage = language === "en" ? "en" : "pt";

  translatableItems.forEach((item) => {
    item.textContent = item.dataset[selectedLanguage];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.documentElement.lang = selectedLanguage === "en" ? "en" : "pt-BR";
  pageTitle.textContent = languageMeta[selectedLanguage].title;
  pageDescription.setAttribute("content", languageMeta[selectedLanguage].description);
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const whatsappFab = document.querySelector(".wa-fab");
const bioFooter = document.querySelector(".bio-footer");

if (whatsappFab && bioFooter && "IntersectionObserver" in window) {
  const fabObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        whatsappFab.classList.toggle("is-hidden", entry.isIntersecting);
      });
    },
    { threshold: 0.01 }
  );

  fabObserver.observe(bioFooter);
}

if (linksMotionQuery.matches || !("IntersectionObserver" in window)) {
  showRevealItems();
} else {
  document.documentElement.classList.add("links-motion-ready");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
