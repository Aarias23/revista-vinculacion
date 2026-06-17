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
      <a href="{{ '/mfct/' | relative_url }}" class="btn-glass">Informe MFCT</a>
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
      <h3>Pasantes</h3>
      <p>Directorio por área técnica, empresa anfitriona y estado documental.</p>
      <a href="{{ '/pasantes/' | relative_url }}" class="btn-link">Ver más</a>
    </div>
    <div class="card">
      <i class="fa-solid fa-chart-column"></i>
      <h3>Informe MFCT</h3>
      <p>Indicadores para seguimiento, evidencias y rendición de informes.</p>
      <a href="{{ '/mfct/' | relative_url }}" class="btn-link">Ver más</a>
    </div>
  </div>
</section>

<!-- BLOQUE DESTACADO -->
<section class="featured">
  <h2><i class="fa-solid fa-star"></i> Bloque destacado</h2>

{% if site.data.recent %}

  <div class="featured-carousel" id="featuredCarousel" role="region" aria-label="Actividades destacadas">
    {% for item in site.data.recent %}
    <figure class="carousel-item{% if forloop.first %} active{% endif %}"
            data-link="{{ item.link | relative_url }}"
            data-caption="{{ item.caption }}">
      {% assign webp_image = item.image
        | replace: ".jpeg", ".webp"
        | replace: ".jpg", ".webp"
        | replace: ".png", ".webp"
      %}
      {% assign image_meta = site.data.image_dimensions[item.image] %}
      <picture>
        <source srcset="{{ webp_image | relative_url }}" type="image/webp">
        <img src="{{ item.image | relative_url }}"
             alt="{{ item.alt }}"
             {% unless forloop.first %}loading="lazy"{% endunless %}
             {% if image_meta %}
             width="{{ image_meta.width }}"
             height="{{ image_meta.height }}"
             {% endif %}>
      </picture>
    </figure>
    {% endfor %}

    <!-- controles -->
    <button type="button" class="carousel-btn prev" aria-label="Actividad destacada anterior">‹</button>
    <button type="button" class="carousel-btn next" aria-label="Actividad destacada siguiente">›</button>

  </div>

  <!-- ✅ Caption y botón fuera de la imagen -->
  <div class="carousel-info">
    <div id="carouselCaption" class="featured-carousel-caption" aria-live="polite"></div>
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
      <h3>Empresas colaboradoras</h3>
      <p>Listado de centros de trabajo y estudiantes impactados.</p>
      <a href="{{ '/empresas/' | relative_url }}" class="btn-secondary">Ver detalle</a>
    </article>
    <article class="activity-card">
      <i class="fa-solid fa-chart-column"></i>
      <h3>Informe MFCT</h3>
      <p>Resumen estadístico de estudiantes, áreas y documentación.</p>
      <a href="{{ '/mfct/' | relative_url }}" class="btn-secondary">Ver detalle</a>
    </article>
  </div>
</section>

<script src="{{ '/assets/js/carousel.js' | relative_url }}"></script>
