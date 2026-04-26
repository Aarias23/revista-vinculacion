---
layout: default
title: "Visitas Técnicas"
permalink: /visitas/
---

# Visitas Técnicas

En esta sección se documentan las visitas técnicas realizadas por la Unidad de Vinculación Sectorial.  
Cada visita incluye descripción, institución anfitriona y fotografías.

---

## Listado de Visitas

{% assign visitas = site.pages
   | where_exp:"page","page.permalink contains '/visitas/' and page.permalink != '/visitas/'"
   | sort: 'date' | reverse %}

<ul>
  {% for visita in visitas %}
    <li><a href="{{ visita.url }}">{{ visita.title }}</a></li>
  {% endfor %}
</ul>
