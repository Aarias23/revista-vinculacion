---
layout: default
title: "Instituciones Visitantes"
permalink: /instituciones/
---

# Visitas Institucionales

El Instituto Politécnico Salesiano Padre Bartolomé Vegh recibe periódicamente la visita de universidades, empresas y organismos, fortaleciendo la vinculación académica y profesional.

Cada actividad es coordinada por la Oficina de Vinculación Sectorial, en articulación con la Coordinación Técnica.

---

## 📋 Registro de visitas institucionales recibidas

{% assign instituciones = site.pages
  | where_exp: "page", "page.permalink contains '/instituciones/'"
  | sort: "date"
  | reverse %}

<div class="institution-list">
  {% for institucion in instituciones %}
    {% if institucion.permalink != '/instituciones/' %}
      <article class="institution-item">
        <h2>
          <i class="fa-solid fa-building"></i>
          {{ institucion.title }}
        </h2>
        {% if institucion.date %}
          <p class="date">📅 {{ institucion.date | date: "%d de %B de %Y" }}</p>
        {% endif %}
        <p class="excerpt">
          {% if institucion.excerpt %}
            {{ institucion.excerpt }}
          {% else %}
            Esta visita fortaleció la vinculación académica y profesional de nuestro Instituto.
          {% endif %}
        </p>
        <a href="{{ institucion.url | relative_url }}" class="btn-secondary">Ver detalle →</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
