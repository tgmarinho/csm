const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animatedElements = document.querySelectorAll("[data-animate]");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});

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
  document.querySelectorAll(".service-card, .blog-card, .session-steps div, .contact-form, details").forEach((element) => {
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
