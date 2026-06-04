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
      {% assign detail_url = institucion.detail_link | default: institucion.url %}
      <article class="institution-item">
        {% if institucion.image %}
          {% assign webp_image = institucion.image
            | replace: ".jpeg", ".webp"
            | replace: ".jpg", ".webp"
            | replace: ".png", ".webp"
          %}
          {% assign image_meta = site.data.image_dimensions[institucion.image] %}
          <a href="{{ detail_url | relative_url }}" class="institution-thumb" aria-label="Ver detalle de {{ institucion.title | escape }}">
            <picture>
              <source srcset="{{ webp_image | relative_url }}" type="image/webp">
              <img
                src="{{ institucion.image | relative_url }}"
                alt="{{ institucion.image_alt | default: institucion.title | escape }}"
                loading="lazy"
                {% if image_meta %}
                width="{{ image_meta.width }}"
                height="{{ image_meta.height }}"
                {% endif %}>
            </picture>
          </a>
        {% endif %}
        <h2>
          <i class="fa-solid fa-building"></i>
          {{ institucion.title }}
        </h2>
        {% if institucion.date %}
          {% assign mes_numero = institucion.date | date: "%-m" %}
          {% case mes_numero %}
            {% when "1" %}{% assign mes = "enero" %}
            {% when "2" %}{% assign mes = "febrero" %}
            {% when "3" %}{% assign mes = "marzo" %}
            {% when "4" %}{% assign mes = "abril" %}
            {% when "5" %}{% assign mes = "mayo" %}
            {% when "6" %}{% assign mes = "junio" %}
            {% when "7" %}{% assign mes = "julio" %}
            {% when "8" %}{% assign mes = "agosto" %}
            {% when "9" %}{% assign mes = "septiembre" %}
            {% when "10" %}{% assign mes = "octubre" %}
            {% when "11" %}{% assign mes = "noviembre" %}
            {% when "12" %}{% assign mes = "diciembre" %}
          {% endcase %}
          <p class="date">📅 {{ institucion.date | date: "%-d" }} de {{ mes }} de {{ institucion.date | date: "%Y" }}</p>
        {% endif %}
        <p class="excerpt">
          {% if institucion.excerpt %}
            {{ institucion.excerpt }}
          {% else %}
            Esta visita fortaleció la vinculación académica y profesional de nuestro Instituto.
          {% endif %}
        </p>
        <a href="{{ detail_url | relative_url }}" class="btn-secondary">Ver detalle →</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
