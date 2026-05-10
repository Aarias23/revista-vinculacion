---
layout: default
title: "Visita Técnica – Eaton Design Center (26 de febrero de 2026)"
permalink: /galeria/visita-2026-02-design/
---

<h1>Visita Técnica – Eaton Design Center</h1>

<p>
El 26 de febrero de 2026 nuestros estudiantes participaron en una visita técnica al Eaton Design Center. 
Esta experiencia permitió conocer de cerca las instalaciones, recibir charlas técnicas y compartir con profesionales del sector.
</p>

<div class="gallery">
  {% for item in site.data.gallery_eaton_2026 %}
    {% include figure.html 
      src=item.src 
      alt=item.alt 
      caption=item.caption 
      event="Visita Técnica – Eaton Design Center"
    %}
  {% endfor %}
</div>
