const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animatedElements = document.querySelectorAll("[data-animate]");

const navToggle = document.querySelector(".nav-toggle");
const siteHeader = document.querySelector(".site-header");

const normalizePath = (path) => path.replace(/\/index\.html$/, "/");

const getAnchorTarget = (hash) => {
  if (!hash || hash === "#") return null;

  let id = hash.slice(1);

  try {
    id = decodeURIComponent(id);
  } catch {
    return null;
  }

  if (!id) return null;

  return document.getElementById(id);
};

const getAnchorOffset = () => {
  if (!siteHeader) return 24;

  const bounds = siteHeader.getBoundingClientRect();
  return Math.ceil(Math.max(bounds.top, 0) + bounds.height + 18);
};

const focusAnchorTarget = (target) => {
  const hadTabIndex = target.hasAttribute("tabindex");

  if (!hadTabIndex) {
    target.setAttribute("tabindex", "-1");
  }

  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }

  if (!hadTabIndex) {
    target.addEventListener("blur", () => {
      target.removeAttribute("tabindex");
    }, { once: true });
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

const scrollToAnchor = (target, hash, options = {}) => {
  const { updateHash = true, focus = true, immediate = false } = options;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - getAnchorOffset();

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: prefersReducedMotion || immediate ? "auto" : "smooth"
  });

  if (updateHash && hash) {
    window.history.pushState(null, "", hash);
  }

  if (focus) {
    window.setTimeout(() => {
      focusAnchorTarget(target);
    }, prefersReducedMotion || immediate ? 0 : 360);
  }
};

if (navToggle && siteHeader) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    navToggle.textContent = isOpen ? "Fechar" : "Menu";
  });

  siteHeader.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menu");
      navToggle.textContent = "Menu";
    });
  });
}

document.querySelectorAll('a[href*="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    let url;

    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    const isSamePage =
      url.origin === window.location.origin &&
      normalizePath(url.pathname) === normalizePath(window.location.pathname) &&
      url.search === window.location.search;

    if (!isSamePage) return;

    const target = getAnchorTarget(url.hash);
    if (!target) return;

    event.preventDefault();
    scrollToAnchor(target, url.hash);
  });
});

if (window.location.hash) {
  const alignInitialHash = () => {
    const target = getAnchorTarget(window.location.hash);
    if (target) {
      scrollToAnchor(target, window.location.hash, { updateHash: false, immediate: true });
    }
  };

  window.requestAnimationFrame(alignInitialHash);
  window.addEventListener("load", () => {
    alignInitialHash();
    window.setTimeout(alignInitialHash, 450);
  }, { once: true });
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px 18% 0px", threshold: 0.01 }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  window.setTimeout(() => {
    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
      observer.unobserve(element);
    });
  }, 1800);
} else {
  animatedElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const initWhatsappFloat = () => {
  if (document.querySelector(".whatsapp-float")) return;

  const isEnglish = (document.documentElement.lang || "").toLowerCase().startsWith("en");
  const label = isEnglish ? "Chat on WhatsApp" : "Falar no WhatsApp";
  const ariaLabel = isEnglish ? "Chat with Carla on WhatsApp" : "Conversar com a Carla no WhatsApp";
  const greeting = isEnglish
    ? "Hi, Carla! I'd like to schedule a session."
    : "Olá, Carla! Gostaria de agendar uma conversa.";
  const href = `https://wa.me/5567996882030?text=${encodeURIComponent(greeting)}`;

  const link = document.createElement("a");
  link.className = "whatsapp-float is-hidden";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", ariaLabel);
  link.innerHTML =
    `<span class="whatsapp-float__label">${label}</span>` +
    '<span class="whatsapp-float__button" aria-hidden="true">' +
    '<svg viewBox="0 0 32 32" width="39" height="39" fill="currentColor">' +
    '<path d="M16.02 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.42L3.2 28.8l6.55-1.72a12.75 12.75 0 0 0 6.27 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05a12.71 12.71 0 0 0-9.06-3.63Zm5.83 15.36c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.68.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/>' +
    "</svg></span>";

  document.body.appendChild(link);

  // Reveal on next frame so the entrance transition plays.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => link.classList.remove("is-hidden"));
  });

  // Hide the floating button once the footer is on screen: the footer already
  // carries a WhatsApp CTA and the button would otherwise overlap it.
  const footer = document.querySelector(".site-footer");

  if (footer && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          link.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { threshold: 0.01 }
    );

    footerObserver.observe(footer);
  }
};

initWhatsappFloat();

if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".service-card, .focus-card, .blog-card, .session-steps div, .contact-whatsapp, details").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      element.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
      element.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--rx", "0deg");
      element.style.setProperty("--ry", "0deg");
    });
  });
}
