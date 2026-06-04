document.addEventListener("DOMContentLoaded", () => {
  const printReportBtn = document.querySelector("[data-print-report]");
  const stickyHeader = document.querySelector("[data-sticky-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const primaryMenu = document.querySelector("[data-primary-menu]");

  printReportBtn?.addEventListener("click", () => {
    window.print();
  });

  function setMenu(open) {
    if (!stickyHeader || !menuToggle || !primaryMenu) return;

    stickyHeader.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Cerrar menú de navegación" : "Abrir menú de navegación",
    );
  }

  function updateHeaderState() {
    stickyHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  primaryMenu?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!stickyHeader?.contains(event.target)) {
      setMenu(false);
    }
  });

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();
});
