// Lightbox script con navegación y corrección de reapertura
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  let currentIndex = 0;

  // Abrir lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", function () {
      currentIndex = index;
      showImage(currentIndex);
      lightbox.classList.remove("hide");
      lightbox.classList.add("show");
    });
  });

  // Mostrar imagen según índice
  function showImage(index) {
    lightboxImg.src = images[index].src;
    caption.innerHTML = images[index].alt;
  }

  // Cerrar con fade out (sin bloquear reapertura)
  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
    setTimeout(() => {
      lightbox.classList.remove("hide");
      // Eliminamos el display:none para que pueda reabrirse
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
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Navegación con teclado
  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("show")) {
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });
});
