---
layout: default
title: "Visita Técnica – Empresa Eaton (4 de diciembre de 2025)"
permalink: /galeria/visita-eaton-haina-2025/
---

<h2>Visita Técnica – Empresa Eaton (4 de diciembre de 2025)</h2>

<p>
El Instituto Politécnico Salesiano Padre Bartolomé Vegh realizó una visita técnica a la empresa 
<strong>Eaton</strong> en el Parque Industrial de Haina, donde las estudiantes participaron en actividades de vinculación 
con el sector productivo. Esta experiencia permitió conocer procesos industriales, recibir charlas técnicas y fortalecer 
la integración entre la formación académica y el entorno laboral.
</p>

<div class="gallery">
  {% for item in site.data.gallery_eaton_2025 %}
    {% include figure.html 
       src=item.src 
       alt=item.alt 
       caption=item.caption 
       event="Visita Técnica – Eaton Haina (4 de diciembre de 2025)" %}
  {% endfor %}
</div>

<!-- Botón hacia el informe institucional -->
<a href="/revista-vinculacion/visitas/eaton-haina-2025/" class="btn-secondary">
  Ver informe completo
</a>
