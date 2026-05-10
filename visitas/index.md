---
layout: default
title: "Visitas Técnicas"
permalink: /visitas/
---

# Visitas Técnicas

En esta sección se documentan las visitas técnicas realizadas por la Unidad de Vinculación Sectorial.  
Cada visita incluye descripción, institución anfitriona y fotografías.

---

## 📋 Listado de Visitas

<ul>
{% assign todas_visitas = site.pages | where_exp: "page", "page.permalink contains '/visitas/'" %}
{% assign visitas = todas_visitas | where_exp: "page", "page.url != '/visitas/'" | sort: "date" | reverse %}

{% for visita in visitas %}

  <li>
    <a href="{{ visita.url | relative_url }}">
      {{ visita.title }}
    </a>
  </li>
{% endfor %}
</ul>
