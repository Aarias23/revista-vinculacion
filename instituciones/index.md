---
layout: default
title: "Instituciones Visitantes"
permalink: /instituciones/
---

# Visitas Institucionales

<div class="intro-text">
  <p>
    El Instituto Politécnico Salesiano Padre Bartolomé Vegh recibe periódicamente la visita de universidades, empresas y organismos, fortaleciendo la vinculación académica y profesional.
  </p>
  <p>
    Cada actividad es coordinada por la <strong>Oficina de Vinculación Sectorial</strong>, en articulación con la <strong>Coordinación Técnica</strong>, y se documenta con rigor institucional para preservar su valor educativo.
  </p>
</div>

---

## Registro de visitas institucionales recibidas

{% assign instituciones = site.pages
   | where_exp:"page","page.permalink contains '/instituciones/' and page.permalink != '/instituciones/'"
   | sort: 'date' | reverse %}

<div class="institution-list">
  {% for institucion in instituciones %}
    <article class="institution-item">
      <h2>
        <i class="fa-solid fa-building"></i>
        <a href="{{ institucion.url }}">
          {{ institucion.title }}
        </a>
      </h2>
      {% if institucion.date %}
        <p class="date">📅 {{ institucion.date | date: "%d de %B de %Y" }}</p>
      {% endif %}
      {% if institucion.excerpt %}
        <p class="excerpt">{{ institucion.excerpt }}</p>
      {% else %}
        <p class="excerpt">
          Esta visita fortaleció la vinculación académica y profesional de nuestro Instituto.
        </p>
      {% endif %}
      <a href="{{ institucion.url }}" class="btn-secondary">Ver detalle →</a>
    </article>
  {% endfor %}
</div>
