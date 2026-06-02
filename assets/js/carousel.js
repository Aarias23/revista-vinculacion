document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("featuredCarousel");
  if (!carousel) return;

  const items = Array.from(carousel.querySelectorAll(".carousel-item"));
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const actionBtn = document.getElementById("carouselLinkBtn");
  const captionBox = document.getElementById("carouselCaption");

  if (!items.length) return;

  let index = 0;
  let interval = null;
  let isPaused = false;

  // -----------------------------
  // PROGRESS BAR
  // -----------------------------
  const progressBar = document.createElement("div");
  progressBar.className = "carousel-progress";
  carousel.appendChild(progressBar);

  function resetProgress() {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressBar.style.transition = "width 5s linear";
        progressBar.style.width = "100%";
      });
    });
  }

  // -----------------------------
  // DOTS
  // -----------------------------
  const dots = items.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Mostrar actividad destacada ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsContainer?.appendChild(dot);
    return dot;
  });

  // -----------------------------
  // CORE
  // -----------------------------
  function updateInfo() {
    const activeSlide = items[index];

    if (!activeSlide || !actionBtn || !captionBox) return;

    const link = activeSlide.dataset.link || "#";
    const title = activeSlide.dataset.title || "";
    const caption = activeSlide.dataset.caption || "";

    actionBtn.setAttribute("href", link);
    captionBox.replaceChildren();

    if (title) {
      const strong = document.createElement("strong");
      strong.textContent = title;
      captionBox.append(strong);
    }

    if (caption) {
      const span = document.createElement("span");
      span.textContent = caption;
      captionBox.append(span);
    }
  }

  function update() {
    items.forEach((el, i) => {
      el.classList.toggle("active", i === index);
      el.setAttribute("aria-hidden", i === index ? "false" : "true");
    });

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-current", i === index ? "true" : "false");
    });

    preloadNext();
    resetProgress();
    updateInfo();
  }

  function goTo(i) {
    index = i;
    update();
    restart();
  }

  function next() {
    index = (index + 1) % items.length;
    update();
  }

  function prev() {
    index = (index - 1 + items.length) % items.length;
    update();
  }

  // -----------------------------
  // AUTO PLAY CONTROL
  // -----------------------------
  function clearTimer() {
    if (interval) clearInterval(interval);
  }

  function start() {
    clearTimer();

    interval = setInterval(() => {
      if (!isPaused && !document.hidden) {
        next();
      }
    }, 5000);
  }

  function restart() {
    start();
  }

  // -----------------------------
  // PRELOAD NEXT IMAGE (UX BOOST)
  // -----------------------------
  function preloadNext() {
    const nextIndex = (index + 1) % items.length;
    const img = items[nextIndex]?.querySelector("img");

    if (img && img.dataset.loaded !== "true") {
      const preload = new Image();
      preload.src = img.src;
      img.dataset.loaded = "true";
    }
  }

  // -----------------------------
  // CONTROLS
  // -----------------------------
  nextBtn?.addEventListener("click", () => {
    next();
    restart();
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    restart();
  });

  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // -----------------------------
  // MOBILE SWIPE
  // -----------------------------
  let startX = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  carousel.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      restart();
    }
  });

  // -----------------------------
  // TAB VISIBILITY CONTROL
  // -----------------------------
  document.addEventListener("visibilitychange", () => {
    isPaused = document.hidden;
  });

  window.addEventListener("beforeunload", clearTimer);

  // INIT
  update();
  start();
});
