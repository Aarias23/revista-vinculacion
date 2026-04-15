// Lightbox script
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  // Abrir lightbox al hacer clic en una imagen
  images.forEach((img) => {
    img.addEventListener("click", function () {
      lightbox.style.display = "block";
      lightboxImg.src = this.src;
      caption.innerHTML = this.alt;
    });
  });

  // Cerrar lightbox al hacer clic en la X
  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // Cerrar lightbox al hacer clic fuera de la imagen
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});
