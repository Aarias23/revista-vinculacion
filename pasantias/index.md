---
layout: default
title: "Pasantías"
permalink: /pasantias/
---

# Pasantías

En esta sección se documentan las pasantías realizadas por nuestros estudiantes.
Cada registro presenta la institución anfitriona, el propósito formativo y las experiencias desarrolladas.

---

## Listado de Pasantías

{% assign pasantias = site.pages
  | where: "layout", "default"
  | where_exp: "page", "page.permalink contains '/pasantias/'"
  | where_exp: "page", "page.permalink != '/pasantias/'"
  | sort: "date"
  | reverse %}

<ul>
{% for pasantia in pasantias %}
  <li>
    <a href="{{ pasantia.url | relative_url }}">
      {{ pasantia.title }}
    </a>
  </li>
{% endfor %}
</ul>
