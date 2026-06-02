---
layout: default
title: "Visitas Técnicas"
permalink: /visitas/
---

# Visitas Técnicas

Experiencias formativas que conectan a nuestros estudiantes con instituciones educativas y empresas del sector productivo.

## Visitas recientes

<div class="visit-list">
{% assign todas_visitas = site.pages | where_exp: "page", "page.permalink contains '/visitas/'" %}
{% assign visitas = todas_visitas | where_exp: "page", "page.url != '/visitas/'" | sort: "date" | reverse %}

{% for visita in visitas %}
  <article class="visit-card">
    <div class="visit-card-icon" aria-hidden="true">
      <i class="fa-solid fa-building"></i>
    </div>
    <div class="visit-card-content">
      <p class="visit-card-date">{{ visita.display_date }}</p>
      <h3>{{ visita.list_title | default: visita.title }}</h3>
      <p class="visit-card-excerpt">{{ visita.excerpt }}</p>
      <a href="{{ visita.url | relative_url }}" class="visit-card-link">
        Ver visita
      </a>
    </div>
  </article>
{% endfor %}
</div>
