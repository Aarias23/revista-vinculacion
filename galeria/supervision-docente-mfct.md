---
layout: default
title: "Supervisión Docente del MFCT"
permalink: /galeria/supervision-docente-mfct/
---

<h1>Supervisión Docente del MFCT</h1>

<p>
Como parte del acompañamiento al Módulo de Formación en Centros de Trabajo, los
docentes tutores realizan visitas periódicas a las empresas donde los estudiantes
desarrollan sus procesos formativos. Este seguimiento permite observar el
desempeño técnico de los pasantes, verificar su adaptación al entorno laboral,
fortalecer la comunicación con las empresas receptoras y asegurar que la
experiencia responda a los objetivos formativos de cada área técnica.
</p>

<section class="supervision-overview" aria-label="Distribución de docentes tutores por área técnica">
  {% assign areas = site.data.supervision_docente_mfct %}
  {% for area_pair in areas %}
    {% assign area = area_pair[1] %}
    <article class="supervision-area-card">
      <h2>{{ area.area }}</h2>
      <p class="supervision-school-year">Año escolar 2025-2026</p>
      <p><strong>Docente tutora:</strong> {{ area.docente }}</p>
    </article>
  {% endfor %}
</section>

{% assign areas = site.data.supervision_docente_mfct %}
{% for area_pair in areas %}
  {% assign area = area_pair[1] %}
  <section class="supervision-section">
    <h2>{{ area.area }}</h2>
    <p class="supervision-school-year">Año escolar 2025-2026</p>
    <p class="supervision-teacher">Docente tutora: {{ area.docente }}</p>

    {% if area.fotos and area.fotos.size > 0 %}
      <div class="gallery">
        {% for item in area.fotos %}
          {% include figure.html
            src=item.src
            alt=item.alt
            caption=item.caption
            event=area.area
          %}
        {% endfor %}
      </div>
    {% else %}
      <p class="supervision-empty">
        Galería pendiente de documentación fotográfica.
      </p>
    {% endif %}
  </section>
{% endfor %}
