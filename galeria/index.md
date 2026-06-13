---
layout: default
title: "Galería Fotográfica"
permalink: /galeria/
---

<h1><i class="fa-solid fa-camera"></i> Galería Fotográfica</h1>

<!-- ÍNDICE -->

<div class="index-actividades">
  <h2>Índice de Actividades</h2>
  <ul>
    <li>
      <a href="{{ '/galeria/visitas-tecnicas/' | relative_url }}">
        Visitas Técnicas
      </a>
    </li>
    <li>
      <a href="{{ '/galeria/pasantia-2025-2026/' | relative_url }}">
        Pasantía – Año Escolar 2025–2026
      </a>
    </li>
    <li>
      <a href="{{ '/galeria/supervision-docente-mfct/' | relative_url }}">
        Supervisión Docente del MFCT
      </a>
    </li>
  </ul>
</div>

<p class="intro-text">
En esta sección se presentan las imágenes más representativas de las visitas técnicas y pasantías realizadas por nuestros estudiantes.  
Cada fotografía constituye un testimonio visual de los aprendizajes alcanzados, las experiencias compartidas y los momentos significativos que fortalecen su formación académica y profesional.
</p>

## Visitas Técnicas

<div class="gallery preview">
  {% for item in site.data.gallery_eaton_2026 limit:2 %}
    {% include figure.html 
      src=item.src 
      alt=item.alt 
      caption=item.caption 
      event="preview-visitas"
    %}
  {% endfor %}

{% for item in site.data.gallery_itabo_2026 limit:2 %}
{% include figure.html
      src=item.src
      alt=item.alt
      caption=item.caption
      event="preview-visitas"
    %}
{% endfor %}

</div>

<a href="{{ '/galeria/visitas-tecnicas/' | relative_url }}" class="btn-secondary">
  Ver galería completa
</a>

---

## Pasantías

### Pasantía – Año Escolar 2025–2026

<div class="gallery preview">
  {% assign pasantia = site.data.pasantia_2025_2026 %}

{% for item in pasantia.informatica limit:1 %}
{% include figure.html
      src=item.src
      alt=item.alt
      caption=item.caption
      event="preview-pasantias"
    %}
{% endfor %}

{% for item in pasantia.logistica limit:3 %}
{% include figure.html
      src=item.src
      alt=item.alt
      caption=item.caption
      event="preview-pasantias"
    %}
{% endfor %}

</div>

<a href="{{ '/galeria/pasantia-2025-2026/' | relative_url }}" class="btn-secondary">
  Ver galería completa
</a>

---

## Supervisión Docente del MFCT

<p>
Documentación del acompañamiento realizado por las docentes tutoras a los
estudiantes durante sus procesos formativos en las empresas receptoras.
</p>

<div class="gallery preview">
  {% assign supervision = site.data.supervision_docente_mfct %}

  {% assign informatica_preview = supervision.informatica.fotos[0] %}
  {% include figure.html
    src=informatica_preview.src
    alt=informatica_preview.alt
    caption=informatica_preview.caption
    event="preview-supervision"
  %}

  {% assign instalaciones_preview = supervision.instalaciones_electricas.fotos[0] %}
  {% include figure.html
    src=instalaciones_preview.src
    alt=instalaciones_preview.alt
    caption=instalaciones_preview.caption
    event="preview-supervision"
  %}

  {% assign logistica_preview = supervision.logistica_transporte.fotos[0] %}
  {% include figure.html
    src=logistica_preview.src
    alt=logistica_preview.alt
    caption=logistica_preview.caption
    event="preview-supervision"
  %}

  {% assign logistica_preview_extra = supervision.logistica_transporte.fotos[1] %}
  {% include figure.html
    src=logistica_preview_extra.src
    alt=logistica_preview_extra.alt
    caption=logistica_preview_extra.caption
    event="preview-supervision"
  %}
</div>

<a href="{{ '/galeria/supervision-docente-mfct/' | relative_url }}" class="btn-secondary">
  Ver sección
</a>
