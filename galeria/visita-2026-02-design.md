---
layout: default
title: "Visita Técnica – Eaton Design Center (26 de febrero de 2026)"
permalink: /galeria/visita-2026-02-design/
---

<h2>Visita Técnica – Eaton Design Center</h2>

<p>El 26 de febrero de 2026 nuestros estudiantes participaron en una visita técnica al Eaton Design Center. 
Esta experiencia permitió conocer de cerca las instalaciones, recibir charlas técnicas y compartir con profesionales del sector.</p>

<div class="gallery">
  {% for item in site.data.gallery_design %}
    <figure data-event="Visita Técnica – Eaton Design Center">
      <img src="{{ item.src }}" alt="{{ item.alt }}" loading="lazy">
      <figcaption>{{ item.caption }}</figcaption>
    </figure>
  {% endfor %}
</div>

<!-- Lightbox container -->
<div id="lightbox" class="lightbox">
  <span class="lightbox-close">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
  <div id="lightbox-caption" class="lightbox-caption"></div>
  <div id="lightbox-counter" class="lightbox-counter"></div>

  <!-- Flechas de navegación -->

<a class="lightbox-prev">&#10094;</a>
<a class="lightbox-next">&#10095;</a>

</div>
