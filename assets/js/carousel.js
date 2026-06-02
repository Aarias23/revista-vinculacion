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

  const autoplayDelay = 5000;
  let index = 0;
  let timer = null;

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
        if (document.hidden) return;

        progressBar.style.transition = `width ${autoplayDelay}ms linear`;
        progressBar.style.width = "100%";
      });
    });
  }

  function pauseProgress() {
    const currentWidth = getComputedStyle(progressBar).width;
    progressBar.style.transition = "none";
    progressBar.style.width = currentWidth;
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
    const caption = activeSlide.dataset.caption || "";

    actionBtn.setAttribute("href", link);
    captionBox.replaceChildren();

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
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function pause() {
    clearTimer();
    pauseProgress();
  }

  function restart() {
    clearTimer();

    if (document.hidden) return;

    resetProgress();

    timer = setTimeout(() => {
      next();
      restart();
    }, autoplayDelay);
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
    if (document.hidden) {
      pause();
    } else {
      restart();
    }
  });

  window.addEventListener("beforeunload", clearTimer);

  // INIT
  update();
  restart();
});
