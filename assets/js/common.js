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
