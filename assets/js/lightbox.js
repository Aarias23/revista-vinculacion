// Lightbox script con navegación, contador por visita/pasantía y mensaje de cierre animado
document.addEventListener("DOMContentLoaded", function () {
  const figures = document.querySelectorAll(".gallery figure");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const counter = document.getElementById("lightbox-counter");
  const downloadBtn = document.getElementById("lightbox-download");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  let currentIndex = 0;
  let currentEvent = "";
  let eventFigures = [];
  let lastTrigger = null;

  // Abrir lightbox
  figures.forEach((figure) => {
    const img = figure.querySelector("img");
    const trigger = figure.querySelector(".gallery-trigger");

    trigger?.addEventListener("click", function () {
      lastTrigger = trigger;
      currentEvent = figure.dataset.event || "Galería";
      eventFigures = Array.from(figures).filter(
        (f) => (f.dataset.event || "Galería") === currentEvent,
      );
      currentIndex = eventFigures.indexOf(figure);

      showImage(currentIndex);
      lightbox.classList.remove("hide");
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
      closeBtn.focus();
    });
  });

  // Mostrar imagen según índice
  function showImage(index) {
    const img = eventFigures[index].querySelector("img");
    const figcaption =
      eventFigures[index].querySelector("figcaption")?.innerText || img.alt || "";

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    downloadBtn.href = img.src;
    caption.textContent = figcaption;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === eventFigures.length - 1;

    // Contador con fotos restantes
    const restantes = eventFigures.length - (index + 1);
    counter.replaceChildren(
      document.createTextNode(
        `Imagen ${index + 1} de ${eventFigures.length} (${currentEvent})`,
      ),
    );

    if (restantes > 0) {
      const restantesText = document.createElement("span");
      restantesText.className = "restantes show";
      restantesText.textContent = `Quedan ${restantes} imágenes por recorrer`;
      counter.append(document.createElement("br"), restantesText);
    }

    // Mensaje institucional al llegar a la última imagen con animación
    if (index === eventFigures.length - 1) {
      let mensajeFinal = "";

      if (currentEvent.toLowerCase().includes("pasantía")) {
        mensajeFinal = `Fin de la pasantía – ${currentEvent}`;
      } else {
        mensajeFinal = `Fin de la visita – ${currentEvent}`;
      }

      const finMsg = document.createElement("span");
      finMsg.className = "fin-visita";
      finMsg.textContent = mensajeFinal;
      counter.append(document.createElement("br"), finMsg);
      setTimeout(() => {
        finMsg.classList.add("show");
      }, 50);
    }
  }

  // Cerrar con fade out
  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
    lightbox.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      lightbox.classList.remove("hide");
      currentEvent = "";
      eventFigures = [];
      counter.replaceChildren(); // limpiar contador al cerrar
      lastTrigger?.focus();
      lastTrigger = null;
    }, 400);
  }

  // Botón de cierre
  closeBtn.addEventListener("click", closeLightbox);

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navegación con flechas
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      showImage(currentIndex);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (currentIndex < eventFigures.length - 1) {
      currentIndex++;
      showImage(currentIndex);
    }
  });

  // Navegación con teclado
  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("show")) {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < eventFigures.length - 1
      ) {
        currentIndex++;
        showImage(currentIndex);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });
});
