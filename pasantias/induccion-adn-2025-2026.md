---
layout: default
title: "Inducción de pasantes - Alcaldía del Distrito Nacional"
permalink: /pasantias/induccion-adn-2025-2026/
date: 2025-09-05
list_title: "Inducción ADN"
display_date: "5 de septiembre de 2025"
excerpt: "Estudiantes participaron en una inducción previa a su ingreso como pasantes en la Alcaldía del Distrito Nacional."
print_report: true
---

## Inducción de pasantes en la Alcaldía del Distrito Nacional

**Fecha:** 5 de septiembre de 2025  
**Lugar:** Alcaldía del Distrito Nacional.

### Propósito de la inducción

La actividad tuvo como propósito preparar a los estudiantes previo a su ingreso como pasantes en la **Alcaldía del Distrito Nacional**, ofreciéndoles una orientación general sobre la institución, el proceso de pasantía y las normas que deben cumplir durante su participación.

### Desarrollo de la actividad

Durante el encuentro, los estudiantes tuvieron la oportunidad de conocer más acerca de la labor institucional de la Alcaldía del Distrito Nacional, así como los procedimientos, responsabilidades y expectativas vinculadas a su experiencia formativa en el entorno laboral.

Los estudiantes del **Instituto Politécnico Salesiano Padre Bartolomé Vegh** estuvieron acompañados por **Alexis Arias**, coordinador de la Oficina de Vinculación Sectorial, quien dio seguimiento al proceso de articulación y acompañamiento institucional.

En la jornada también participaron estudiantes de otros centros educativos, lo que permitió desarrollar un espacio de orientación compartido, enfocado en la preparación, el compromiso y la conducta esperada durante la etapa de pasantía.

### Importancia formativa

Este tipo de inducción fortalece la transición de los estudiantes hacia escenarios reales de trabajo, ayudándoles a comprender la cultura institucional, las normas de convivencia, la responsabilidad profesional y el valor de representar adecuadamente a su centro educativo.

### Agradecimiento institucional

El Instituto Politécnico Salesiano Padre Bartolomé Vegh agradece a la **Alcaldía del Distrito Nacional** por abrir sus puertas y facilitar un espacio de orientación que contribuye a la formación integral de nuestros estudiantes.

---

## Galería fotográfica

<div class="gallery">
  {% for item in site.data.gallery_induccion_adn_2025_2026 %}
    {% assign image_file = site.static_files | where: "path", item.src | first %}
    {% if image_file %}
      {% include figure.html src=item.src alt=item.alt caption=item.caption event=item.event %}
    {% else %}
      <figure class="gallery-item gallery-placeholder" data-event="{{ item.event | escape }}">
        <div class="gallery-placeholder-media" aria-hidden="true">
          <i class="fa-solid fa-image"></i>
        </div>
        <figcaption>{{ item.caption }}</figcaption>
        <span class="gallery-download is-disabled">Evidencia pendiente</span>
      </figure>
    {% endif %}
  {% endfor %}
</div>
