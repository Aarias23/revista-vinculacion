// Lightbox script con navegación, contador por visita/pasantía y mensaje de cierre animado
document.addEventListener("DOMContentLoaded", function () {
  const figures = document.querySelectorAll(".gallery figure");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const counter = document.getElementById("lightbox-counter");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  let currentIndex = 0;
  let currentEvent = "";
  let eventFigures = [];

  // Abrir lightbox
  figures.forEach((figure) => {
    const img = figure.querySelector("img");
    img.addEventListener("click", function () {
      currentEvent = figure.dataset.event;
      eventFigures = Array.from(figures).filter(
        (f) => f.dataset.event === currentEvent,
      );
      currentIndex = eventFigures.indexOf(figure);

      showImage(currentIndex);
      lightbox.classList.remove("hide");
      lightbox.classList.add("show");
    });
  });

  // Mostrar imagen según índice
  function showImage(index) {
    const img = eventFigures[index].querySelector("img");
    const figcaption =
      eventFigures[index].querySelector("figcaption").innerText;

    lightboxImg.src = img.src;
    caption.innerHTML = figcaption;

    // Contador con fotos restantes
    const restantes = eventFigures.length - (index + 1);
    counter.innerHTML = `Imagen ${index + 1} de ${eventFigures.length} (${currentEvent})`;

    if (restantes > 0) {
      counter.innerHTML += `<br><span class="restantes">Quedan ${restantes} imágenes por recorrer</span>`;
    }

    // Mensaje institucional al llegar a la última imagen con animación
    if (index === eventFigures.length - 1) {
      let mensajeFinal = "";

      if (currentEvent.toLowerCase().includes("pasantía")) {
        mensajeFinal = `Fin de la pasantía – ${currentEvent}`;
      } else {
        mensajeFinal = `Fin de la visita – ${currentEvent}`;
      }

      counter.innerHTML += `<br><span class="fin-visita">${mensajeFinal}</span>`;
      const finMsg = counter.querySelector(".fin-visita");
      setTimeout(() => {
        finMsg.classList.add("show");
      }, 50);
    }
  }

  // Cerrar con fade out
  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
    setTimeout(() => {
      lightbox.classList.remove("hide");
      currentEvent = "";
      eventFigures = [];
      counter.innerHTML = ""; // limpiar contador al cerrar
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
