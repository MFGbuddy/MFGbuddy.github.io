/* =========================
   MFGbuddy Common JS
   File: /assets/js/common.js
   ========================= */

(function () {
  // Set current year (if element exists)
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle (if elements exist)
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    menu.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  }

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close menu on link click (mobile)
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Close menu when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    const clickedInside = menu.contains(e.target) || btn.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
  });
})();

// Lazy-load Google Form iframe only when visible (improves FCP/LCP)
(function () {
  const iframe = document.querySelector(".gform-iframe[data-src]");
  if (!iframe) return;

  const load = () => {
    if (iframe.dataset.loaded) return;
    iframe.src = iframe.dataset.src;
    iframe.dataset.loaded = "1";
  };

  // If IntersectionObserver is supported, load when near viewport
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          load();
          obs.disconnect();
        }
      },
      { root: null, rootMargin: "300px 0px", threshold: 0.01 } // preload slightly before visible
    );
    obs.observe(iframe);
  } else {
    // Fallback: load after a short delay
    window.addEventListener("load", () => setTimeout(load, 1200), { once: true });
  }
})();
