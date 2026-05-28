---
layout: default
title: "Revista Digital"
---

<!-- Hero principal -->
<section class="hero modern-hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <h1>
      Instituto Politécnico Salesiano<br>
      Padre Bartolomé Vegh
    </h1>
    <p>Revista Digital · Unidad de Vinculación Sectorial</p>
    <div class="hero-actions">
      <a href="{{ '/galeria/' | relative_url }}" class="btn-primary">Explorar Galería</a>
      <a href="{{ '/instituciones/' | relative_url }}" class="btn-glass">Instituciones</a>
    </div>
  </div>
</section>

<!-- Bienvenida -->
<section class="intro">
  <h2>Bienvenidos</h2>
  <p>Este espacio documenta y celebra las experiencias formativas que enriquecen la vida académica de nuestros estudiantes.</p>
  <div class="cards">
    <div class="card">
      <i class="fa-solid fa-industry"></i>
      <h3>Visitas Técnicas</h3>
      <p>Experiencias en empresas e instituciones del sector productivo.</p>
      <a href="{{ '/galeria/' | relative_url }}" class="btn-link">Ver más</a>
    </div>
    <div class="card">
      <i class="fa-solid fa-briefcase"></i>
      <h3>Pasantías</h3>
      <p>Integración de nuestros jóvenes en espacios laborales reales.</p>
      <a href="{{ '/galeria/pasantia-2025-2026/' | relative_url }}" class="btn-link">Ver más</a>
    </div>
    <div class="card">
      <i class="fa-solid fa-university"></i>
      <h3>Visitas Institucionales</h3>
      <p>Universidades y organismos presentan sus proyectos y oportunidades.</p>
      <a href="{{ '/instituciones/' | relative_url }}" class="btn-link">Ver más</a>
    </div>
  </div>
</section>

<!-- BLOQUE DESTACADO -->
<section class="featured">
  <h2><i class="fa-solid fa-star"></i> Bloque destacado</h2>

{% if site.data.recent %}

  <div class="featured-carousel" id="featuredCarousel">
    {% for item in site.data.recent %}
    <figure class="carousel-item{% if forloop.first %} active{% endif %}"
            data-link="{{ item.link | relative_url }}"
            data-title="{{ item.alt }}"
            data-caption="{{ item.caption }}">
      <img src="{{ item.image | relative_url }}"
           alt="{{ item.alt }}"
           loading="lazy">
    </figure>
    {% endfor %}

    <!-- controles -->
    <button class="carousel-btn prev">‹</button>
    <button class="carousel-btn next">›</button>

  </div>

  <!-- ✅ Caption y botón fuera de la imagen -->
  <div class="carousel-info">
    <div id="carouselCaption" class="carousel-caption"></div>
    <div class="carousel-actions">
      <a href="#" id="carouselLinkBtn" class="btn-secondary carousel-btn-link">
        Ver galería completa
      </a>
    </div>
  </div>
{% else %}
  <p>No hay elementos destacados disponibles por el momento.</p>
{% endif %}
</section>

<!-- Índice de actividades -->
<section class="activities">
  <h2><i class="fa-solid fa-list"></i> Índice de Actividades</h2>
  <div class="activity-index">
    <article class="activity-card">
      <i class="fa-solid fa-industry"></i>
      <h3>Eaton Design Center</h3>
      <p>Visita técnica de estudiantes IPSPBV.</p>
      <a href="{{ '/galeria/visita-2026-02-design/' | relative_url }}" class="btn-secondary">Ver detalle</a>
    </article>
    <article class="activity-card">
      <i class="fa-solid fa-industry"></i>
      <h3>Parque Industrial Itabo</h3>
      <p>Recibimiento por Rafael Piantini.</p>
      <a href="{{ '/galeria/visita-itabo-2026/' | relative_url }}" class="btn-secondary">Ver detalle</a>
    </article>
    <article class="activity-card">
      <i class="fa-solid fa-briefcase"></i>
      <h3>Pasantía 2025–2026</h3>
      <p>Integración de jóvenes en espacios laborales reales.</p>
      <a href="{{ '/galeria/pasantia-2025-2026/' | relative_url }}" class="btn-secondary">Ver detalle</a>
    </article>
    <article class="activity-card">
      <i class="fa-solid fa-university"></i>
      <h3>UCSD 2026</h3>
      <p>Presentación de oferta académica y becas.</p>
      <a href="{{ '/instituciones/ucsd-2026/' | relative_url }}" class="btn-secondary">Ver detalle</a>
    </article>
  </div>
</section>

<script src="{{ '/assets/js/carousel.js' | relative_url }}"></script>

<!-- Script para actualizar caption y botón -->
<script>
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.getElementById("featuredCarousel");
  const actionBtn = document.getElementById("carouselLinkBtn");
  const captionBox = document.getElementById("carouselCaption");

  function updateInfo() {
    const activeSlide = carousel.querySelector(".carousel-item.active");
    if (activeSlide) {
      const link = activeSlide.getAttribute("data-link");
      const title = activeSlide.getAttribute("data-title") || "";
      const caption = activeSlide.getAttribute("data-caption") || "";

      // ✅ Actualiza el botón con el link correcto
      actionBtn.setAttribute("href", link);

      // ✅ Muestra el caption debajo de la imagen
      captionBox.innerHTML = title
        ? `<strong>${title}</strong><br><span>${caption}</span>`
        : `<span>${caption}</span>`;
    }
  }

  // Inicializar al cargar
  updateInfo();

  // Actualizar al cambiar de slide
  document.querySelector(".carousel-btn.prev").addEventListener("click", updateInfo);
  document.querySelector(".carousel-btn.next").addEventListener("click", updateInfo);
});
</script>
