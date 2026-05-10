---
layout: default
title: "Visita Técnica – Parque Industrial Itabo 2026"
permalink: /galeria/visita-itabo-2026/
---

<h2>Visita Técnica – Parque Industrial Itabo 2026</h2>

<p>
El Instituto Politécnico Salesiano Padre Bartolomé Vegh realizó una visita técnica al Parque Industrial Itabo, 
donde los estudiantes participaron en actividades de vinculación con dos empresas del sector productivo: 
<strong>Eaton</strong> y <strong>Jabil</strong>. 
Esta experiencia permitió conocer procesos industriales, recibir charlas técnicas y fortalecer la integración entre la formación académica y el entorno laboral.
</p>

<div class="gallery">
  {% for item in site.data.gallery_itabo_2026 %}
    {% include figure.html 
       src=item.src 
       alt=item.alt 
       caption=item.caption 
       event="Visita Técnica – Parque Industrial Itabo 2026" %}
  {% endfor %}
</div>
