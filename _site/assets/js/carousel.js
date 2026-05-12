document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("featuredCarousel");
  if (!carousel) return;

  const items = Array.from(carousel.querySelectorAll(".carousel-item"));
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

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
    dot.className = "dot";
    dot.addEventListener("click", () => goTo(i));
    dotsContainer?.appendChild(dot);
    return dot;
  });

  // -----------------------------
  // CORE
  // -----------------------------
  function update() {
    items.forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });

    preloadNext();
    resetProgress();
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

    resetProgress();
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
    update();
    restart();
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    update();
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
      update();
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
