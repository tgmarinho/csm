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
