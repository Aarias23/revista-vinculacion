---
layout: default
title: "Empresas"
permalink: /empresas/
---

{% assign pasantes_data = site.data.pasantes_2025_2026 %}
{% assign total_pasantes = 0 %}
{% assign empresas_vistas = "" %}
{% assign total_empresas = 0 %}
{% for area_group in pasantes_data.areas %}
  {% for pasante in area_group[1] %}
    {% if pasante.empresa != "Por registrar" %}
      {% assign total_pasantes = total_pasantes | plus: 1 %}
      {% capture empresa_token %}|{{ pasante.empresa }}|{% endcapture %}
      {% unless empresas_vistas contains empresa_token %}
        {% assign empresas_vistas = empresas_vistas | append: empresa_token %}
        {% assign total_empresas = total_empresas | plus: 1 %}
      {% endunless %}
    {% endif %}
  {% endfor %}
{% endfor %}

<section class="pasantes-hero empresas-hero" aria-labelledby="empresas-title">
  <div>
    <p class="section-kicker">Año escolar {{ pasantes_data.periodo }}</p>
    <h1 id="empresas-title">Empresas</h1>
    <p>
      Reconocimiento a las empresas e instituciones que apoyaron la formación
      práctica de nuestros estudiantes durante el año escolar {{ pasantes_data.periodo }}.
    </p>
  </div>
  <dl class="pasantes-summary" aria-label="Resumen de empresas colaboradoras">
    <div>
      <dt>{{ total_empresas }}</dt>
      <dd>empresas</dd>
    </div>
    <div>
      <dt>{{ total_pasantes }}</dt>
      <dd>estudiantes impactados</dd>
    </div>
    <div>
      <dt>{{ pasantes_data.areas.size }}</dt>
      <dd>áreas técnicas</dd>
    </div>
  </dl>
</section>

<section class="empresas-aporte" aria-labelledby="empresas-aporte-title">
  <p class="section-kicker">Aporte</p>
  <h2 id="empresas-aporte-title">Formación en centro de trabajo {{ pasantes_data.periodo }}</h2>
  <p>
    Cada empresa listada recibió uno o más estudiantes, fortaleciendo su experiencia
    técnica en un entorno laboral real.
  </p>
</section>

<section class="pasantes-section empresas-section" aria-labelledby="empresas-list-title">
  <div class="pasantes-section-header">
    <div>
      <p class="section-kicker">Directorio</p>
      <h2 id="empresas-list-title">Empresas colaboradoras</h2>
    </div>
    <span>{{ total_empresas }} registros</span>
  </div>

  <div class="empresas-directory">
    {% assign empresas_renderizadas = "" %}
    {% for area_group in pasantes_data.areas %}
      {% for pasante_base in area_group[1] %}
        {% if pasante_base.empresa != "Por registrar" %}
          {% capture empresa_token %}|{{ pasante_base.empresa }}|{% endcapture %}
          {% unless empresas_renderizadas contains empresa_token %}
            {% assign empresas_renderizadas = empresas_renderizadas | append: empresa_token %}
            {% assign estudiantes_empresa = 0 %}
            {% for grupo_estudiantes in pasantes_data.areas %}
              {% for estudiante in grupo_estudiantes[1] %}
                {% if estudiante.empresa == pasante_base.empresa %}
                  {% assign estudiantes_empresa = estudiantes_empresa | plus: 1 %}
                {% endif %}
              {% endfor %}
            {% endfor %}

            <article class="empresa-row">
              <div class="empresa-row-header">
                <span class="empresa-mark" aria-hidden="true">{{ pasante_base.empresa | slice: 0 }}</span>
                <h3>{{ pasante_base.empresa }}</h3>
                <p>
                  {{ estudiantes_empresa }}
                  {% if estudiantes_empresa == 1 %}estudiante impactado{% else %}estudiantes impactados{% endif %}
                </p>
              </div>

              <ul class="empresa-students">
                {% for grupo_estudiantes in pasantes_data.areas %}
                  {% for estudiante in grupo_estudiantes[1] %}
                    {% if estudiante.empresa == pasante_base.empresa %}
                      <li>
                        <span>{{ estudiante.nombre }}</span>
                        <small>{{ estudiante.area }}</small>
                      </li>
                    {% endif %}
                  {% endfor %}
                {% endfor %}
              </ul>
            </article>
          {% endunless %}
        {% endif %}
      {% endfor %}
    {% endfor %}
  </div>
</section>
