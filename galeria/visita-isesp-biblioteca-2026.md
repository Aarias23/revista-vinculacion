---
layout: default
title: "Visita Técnica – ISESP Biblioteca Abigail Mejía 2026"
permalink: /galeria/visita-isesp-biblioteca-2026/
---

<h2>Visita Técnica – ISESP Biblioteca Abigail Mejía 2026</h2>

<p>
El Instituto Politécnico Salesiano Padre Bartolomé Vegh realizó una visita técnica a la 
Biblioteca Abigail Mejía, del Instituto Superior de Estudios Educativos Pedro Poveda. 
Durante la jornada, nuestros estudiantes y docentes participaron en actividades de orientación, 
charlas y encuentros institucionales que fortalecieron la integración académica y cultural 
entre ambas instituciones.
</p>

<div class="gallery">
  {% for item in site.data.gallery_isesp_biblioteca %}
    {% include figure.html 
       src=item.src 
       alt=item.alt 
       caption=item.caption 
       event="Visita Técnica – ISESP Biblioteca Abigail Mejía (23 de abril de 2026)" %}
  {% endfor %}
</div>

<a href="{{ '/visitas/isesp-biblioteca-abigail-mejia-2026/' | relative_url }}" class="btn-secondary">
  Ver informe
</a>
