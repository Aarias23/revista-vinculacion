---
layout: default
title: "Visita Técnica – Parque Industrial Itabo 2026"
permalink: /galeria/visita-itabo-2026/
---

<h2>Visita Técnica – Parque Industrial Itabo 2026</h2>

<p>El Instituto Politécnico Salesiano Padre Bartolomé Vegh realizó una visita técnica al Parque Industrial Itabo, 
donde los estudiantes participaron en actividades de vinculación con dos empresas del sector productivo: 
<strong>Eaton</strong> y <strong>Jabil</strong>. 
Esta experiencia permitió conocer procesos industriales, recibir charlas técnicas y fortalecer la integración entre la formación académica y el entorno laboral.</p>

<div class="gallery">
  {% for item in site.data.gallery %}
    <figure data-event="Visita Técnica – Parque Industrial Itabo 2026">
      <img src="{{ item.src }}" alt="{{ item.alt }}" loading="lazy">
      <figcaption>{{ item.caption }}</figcaption>
    </figure>
  {% endfor %}
</div>

<!-- Botón hacia el informe detallado -->
<a href="/visitas/itabojabil-eaton-2026/" class="btn-primary">
  Leer informe completo de la visita
</a>

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
