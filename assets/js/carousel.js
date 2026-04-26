// Carrusel automático para el bloque destacado
document.addEventListener("DOMContentLoaded", function () {
  const featured = document.querySelectorAll(".featured-carousel figure");
  let index = 0;

  function showFeatured(i) {
    featured.forEach((fig, idx) => {
      fig.classList.remove("active");
      if (idx === i) fig.classList.add("active");
    });
  }

  setInterval(() => {
    index = (index + 1) % featured.length;
    showFeatured(index);
  }, 5000); // cambia cada 8 segundos

  showFeatured(index);
});
