---
layout: default
title: "Galería Fotográfica"
permalink: /galeria/
---

<h1><i class="fa-solid fa-camera"></i> Galería Fotográfica</h1>

<div class="index-actividades">
  <h2>Índice de Actividades</h2>
  <ul>
    <li><a href="/galeria/visita-2026-02-design">Visita Técnica – Eaton Design Center (26 de febrero de 2026)</a></li>
    <li><a href="/galeria/visita-itabo-2026">Visita Técnica – Parque Industrial Itabo (19 de marzo de 2026)</a></li>
    <li><a href="/galeria/pasantia-2025-2026">Pasantía – Año Escolar 2025–2026</a></li>
  </ul>
</div>

---

En esta sección se presentan las imágenes más representativas de las visitas técnicas y pasantías realizadas por nuestros estudiantes.  
Cada fotografía constituye un testimonio visual de los aprendizajes alcanzados, las experiencias compartidas y los momentos significativos que fortalecen su formación académica y profesional.

---

## Visitas Técnicas

### Visita Técnica – Eaton Design Center (26 de febrero de 2026)

<div class="gallery">
  {% for item in site.data.gallery_design limit:2 %}
    {% include figure.html src=item.src alt=item.alt caption=item.caption event="Visita Técnica – Eaton Design Center (26 de febrero de 2026)" %}
  {% endfor %}
</div>
<a href="/galeria/visita-2026-02-design" class="btn-secondary">Ver galería completa</a>

---

### Visita Técnica – Parque Industrial Itabo (19 de marzo de 2026)

<div class="gallery">
  {% for item in site.data.gallery limit:2 %}
    {% include figure.html src=item.src alt=item.alt caption=item.caption event="Visita Técnica – Parque Industrial Itabo (19 de marzo de 2026)" %}
  {% endfor %}
</div>
<a href="/galeria/visita-itabo-2026" class="btn-secondary">Ver galería completa</a>

---

## Pasantías

### Pasantía – Año Escolar 2025–2026

<div class="gallery">
{% for item in site.data.gallery_pasantia_2025-2026.informatica limit:1 %}
  {% include figure.html src=item.src alt=item.alt caption=item.caption event="Pasantía – Año Escolar 2025–2026" %}
{% endfor %}
{% for item in site.data.gallery_pasantia_2025-2026.logistica limit:1 %}
  {% include figure.html src=item.src alt=item.alt caption=item.caption event="Pasantía – Año Escolar 2025–2026" %}
{% endfor %}

</div>
<a href="/galeria/pasantia-2025-2026" class="btn-secondary">Ver galería completa</a>
