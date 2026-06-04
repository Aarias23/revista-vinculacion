document.addEventListener("DOMContentLoaded", () => {
  const printReportBtn = document.querySelector("[data-print-report]");
  const stickyHeader = document.querySelector("[data-sticky-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const primaryMenu = document.querySelector("[data-primary-menu]");
  const mobileMenuQuery = window.matchMedia("(max-width: 991px)");

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

    if (mobileMenuQuery.matches) {
      primaryMenu.toggleAttribute("inert", !open);
      primaryMenu.setAttribute("aria-hidden", String(!open));
    }
    else {
      primaryMenu.removeAttribute("inert");
      primaryMenu.removeAttribute("aria-hidden");
    }
  }

  function updateHeaderState() {
    stickyHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function syncResponsiveMenu() {
    const isOpen = stickyHeader?.classList.contains("menu-open") ?? false;
    setMenu(mobileMenuQuery.matches ? isOpen : false);
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

  mobileMenuQuery.addEventListener("change", syncResponsiveMenu);
  window.addEventListener("scroll", updateHeaderState, { passive: true });
  syncResponsiveMenu();
  updateHeaderState();
});
