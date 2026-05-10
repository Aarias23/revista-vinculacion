---
layout: default
title: "Visita Técnica – ISESP Poveda 2026"
permalink: /galeria/visita-isesp-poveda-2026/
---

<h2>Visita Técnica – ISESP Poveda 2026</h2>

<p>
El Instituto Superior de Estudios Educativos Pedro Poveda realizó una actividad académica en la que 
directivos, conferencistas y estudiantes participaron en charlas y paneles de discusión. 
La jornada permitió fortalecer la vinculación institucional, promover el intercambio de ideas 
y enriquecer la formación de los asistentes.
</p>

<div class="gallery">
  {% for item in site.data.gallery_isesp %}
    {% include figure.html 
       src=item.src 
       alt=item.alt 
       caption=item.caption 
       event="Visita Técnica – ISESP Poveda 2026" %}
  {% endfor %}
</div>
