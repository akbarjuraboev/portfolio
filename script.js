document.addEventListener("DOMContentLoaded", () => {
  // Loader
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 300);
    });
  }

  // Header scroll state
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mainNav.classList.remove("open"));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form (static demo — no backend wired up)
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      note.textContent = "Спасибо — ваше сообщение получено. Мы ответим в течение 2 рабочих дней.";
      form.reset();
    });
  }

  // Custom ring cursor
  const cursor = document.getElementById("cursorRing");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (cursor && canHover) {
    document.body.classList.add("has-custom-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.classList.add("is-visible");
    });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));

    const hoverTargets = "a, button, .thumb, .project, .team-member";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.remove("is-active");
    });

    function tick() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(tick);
    }
    tick();
  }
});
