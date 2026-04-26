---
layout: default
title: "Revista Digital"
---

<!-- Hero principal -->
<section class="hero modern-hero">

  <!-- Fondo -->
  <div class="hero-bg"></div>

  <!-- Contenido -->
  <div class="hero-content">

    <h1>
      Instituto Politécnico Salesiano<br>
      Padre Bartolomé Vegh
    </h1>

    <p>Revista Digital · Unidad de Vinculación Sectorial</p>

    <div class="hero-actions">
      <a href="{{ '/galeria/' | relative_url }}" class="btn-primary">
        Explorar Galería
      </a>

      <a href="{{ '/instituciones/' | relative_url }}" class="btn-glass">
        Instituciones
      </a>
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
      <a href="/galeria/visitas-tecnicas" class="btn-link">Ver más</a>
    </div>
    <div class="card">
      <i class="fa-solid fa-briefcase"></i>
      <h3>Pasantías</h3>
      <p>Integración de nuestros jóvenes en espacios laborales reales.</p>
      <a href="/galeria/pasantias" class="btn-link">Ver más</a>
    </div>
    <div class="card">
      <i class="fa-solid fa-university"></i>
      <h3>Visitas Institucionales</h3>
      <p>Universidades y organismos presentan sus proyectos y oportunidades.</p>
      <a href="/instituciones/" class="btn-link">Ver más</a>
    </div>
  </div>
</section>

<!-- Bloque destacado -->
<section class="featured">
  <h2><i class="fa-solid fa-star"></i> Bloque destacado</h2>
  <div class="featured-carousel">
    {% for item in site.data.recent %}
    <figure{% if forloop.first %} class="active"{% endif %}>
      <img src="{{ item.image }}" alt="{{ item.alt }}">
      <figcaption>
        <strong>{{ item.title }}</strong>
        <span>{{ item.caption }}</span>
      </figcaption>
      <div class="carousel-action">
        <a href="{{ item.link }}" class="btn-secondary">Ver galería completa</a>
      </div>
    </figure>
    {% endfor %}
  </div>
</section>

<!-- Índice de actividades -->
<section class="activities">
  <h2><i class="fa-solid fa-list"></i> Índice de Actividades</h2>
  <div class="activity-index">
    <article class="activity-card">
      <i class="fa-solid fa-industry"></i>
      <h3>Eaton Design Center</h3>
      <p>Visita técnica de estudiantes IPSPBV.</p>
      <a href="/galeria/visita-2026-02-design" class="btn-secondary">Ver detalle</a>
    </article>

    <article class="activity-card">
      <i class="fa-solid fa-industry"></i>
      <h3>Parque Industrial Itabo</h3>
      <p>Recibimiento por Rafael Piantini.</p>
      <a href="/galeria/visita-itabo-2026" class="btn-secondary">Ver detalle</a>
    </article>

    <article class="activity-card">
      <i class="fa-solid fa-briefcase"></i>
      <h3>Pasantía 2025–2026</h3>
      <p>Integración de jóvenes en espacios laborales reales.</p>
      <a href="/galeria/pasantia-2025-2026" class="btn-secondary">Ver detalle</a>
    </article>

    <article class="activity-card">
      <i class="fa-solid fa-university"></i>
      <h3>UCSD 2026</h3>
      <p>Presentación de oferta académica y becas.</p>
      <a href="/instituciones/ucsd-2026" class="btn-secondary">Ver detalle</a>
    </article>

  </div>
</section>

<!-- Footer institucional -->
<footer>
  <p>© 2026 Instituto Politécnico Salesiano Padre Bartolomé Vegh · Unidad de Vinculación Sectorial</p>
  <p>Santo Domingo, República Dominicana</p>
</footer>

<!-- Enlace al script del carrusel -->
<script src="/assets/js/carousel.js"></script>
