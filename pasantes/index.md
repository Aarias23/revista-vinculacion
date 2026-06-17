---
layout: default
title: "Pasantes"
permalink: /pasantes/
---

{% assign pasantes_data = site.data.pasantes_2025_2026 %}
{% assign total_pasantes = 0 %}
{% assign pendientes_empresa = 0 %}
{% for area_group in pasantes_data.areas %}
  {% assign total_pasantes = total_pasantes | plus: area_group[1].size %}
  {% for pasante in area_group[1] %}
    {% if pasante.empresa == "Por registrar" %}
      {% assign pendientes_empresa = pendientes_empresa | plus: 1 %}
    {% endif %}
  {% endfor %}
{% endfor %}

<section class="pasantes-hero" aria-labelledby="pasantes-title">
  <div>
    <p class="section-kicker">Año escolar {{ pasantes_data.periodo }}</p>
    <h1 id="pasantes-title">Pasantes</h1>
    <p>
      Directorio institucional de estudiantes en pasantía, organizado por área técnica
      con fotografía, empresa anfitriona y acceso a la certificación cuando esté disponible.
    </p>
  </div>
  <dl class="pasantes-summary" aria-label="Resumen de pasantes">
    <div>
      <dt>{{ total_pasantes }}</dt>
      <dd>estudiantes</dd>
    </div>
    <div>
      <dt>{{ pasantes_data.areas.size }}</dt>
      <dd><span>áreas</span><span>técnicas</span></dd>
    </div>
    <div>
      <dt>{{ pendientes_empresa }}</dt>
      <dd><span>empresas</span><span>pendientes</span></dd>
    </div>
  </dl>
</section>

<nav class="pasantes-area-nav" aria-label="Áreas técnicas de pasantes">
  {% for area_group in pasantes_data.areas %}
    {% assign area_key = area_group[0] %}
    {% assign area_items = area_group[1] %}
    {% assign area_label = area_items[0].area %}
    <a href="#{{ area_key }}">{{ area_label }}</a>
  {% endfor %}
</nav>

{% for area_group in pasantes_data.areas %}
  {% assign area_key = area_group[0] %}
  {% assign area_items = area_group[1] %}
  {% assign area_label = area_items[0].area %}
  <section class="pasantes-section" id="{{ area_key }}" aria-labelledby="{{ area_key }}-title">
    <div class="pasantes-section-header">
      <div>
        <p class="section-kicker">Área técnica</p>
        <h2 id="{{ area_key }}-title">{{ area_label }}</h2>
      </div>
      <span>{{ area_items.size }} estudiantes</span>
    </div>

    <div class="pasantes-grid">
      {% for pasante in area_items %}
        {% assign cert_file = site.static_files | where: "path", pasante.certificacion | first %}
        <article class="pasante-card">
          <picture>
            <source srcset="{{ pasante.foto_webp | relative_url }}" type="image/webp">
            <img
              src="{{ pasante.foto | relative_url }}"
              alt="Foto de {{ pasante.nombre }}"
              loading="lazy"
              width="244"
              height="258">
          </picture>
          <div class="pasante-card-body">
            <h3>{{ pasante.nombre }}</h3>
            <dl>
              <div>
                <dt>Área técnica</dt>
                <dd>{{ pasante.area }}</dd>
              </div>
              <div>
                <dt>Empresa</dt>
                <dd>{{ pasante.empresa }}</dd>
              </div>
              <div>
                <dt>Año escolar</dt>
                <dd>{{ pasante.ano_escolar }}</dd>
              </div>
              <div>
                <dt>Estado MFCT</dt>
                <dd>
                  {% if pasante.estado_mfct == "concluido_documentado" %}
                    <span class="pasante-status is-complete">Concluido documentado</span>
                  {% else %}
                    <span class="pasante-status is-pending">Por verificar</span>
                  {% endif %}
                </dd>
              </div>
            </dl>
            {% if cert_file %}
              <a class="pasante-cert-link" href="{{ pasante.certificacion | relative_url }}" target="_blank" rel="noopener">
                <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
                Ver certificación
              </a>
            {% else %}
              <span class="pasante-cert-link is-disabled">
                <i class="fa-solid fa-file-circle-clock" aria-hidden="true"></i>
                Certificación pendiente
              </span>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>
{% endfor %}
