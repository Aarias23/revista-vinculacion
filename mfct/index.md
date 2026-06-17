---
layout: default
title: "Informe MFCT"
permalink: /mfct/
---

{% assign pasantes_data = site.data.pasantes_2025_2026 %}
{% assign total_estudiantes = 0 %}
{% assign certificaciones_registradas = 0 %}
{% assign empresas_vistas = "" %}
{% assign total_empresas = 0 %}
{% for area_group in pasantes_data.areas %}
  {% assign total_estudiantes = total_estudiantes | plus: area_group[1].size %}
  {% for pasante in area_group[1] %}
    {% assign cert_file = site.static_files | where: "path", pasante.certificacion | first %}
    {% if cert_file %}
      {% assign certificaciones_registradas = certificaciones_registradas | plus: 1 %}
    {% endif %}
    {% if pasante.empresa != "Por registrar" %}
      {% capture empresa_token %}|{{ pasante.empresa }}|{% endcapture %}
      {% unless empresas_vistas contains empresa_token %}
        {% assign empresas_vistas = empresas_vistas | append: empresa_token %}
        {% assign total_empresas = total_empresas | plus: 1 %}
      {% endunless %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign pendientes_evidencia = total_estudiantes | minus: certificaciones_registradas %}
{% assign certificadas_pct = certificaciones_registradas | times: 100 | divided_by: total_estudiantes %}
{% assign pendientes_pct = pendientes_evidencia | times: 100 | divided_by: total_estudiantes %}

<section class="pasantes-hero mfct-hero" aria-labelledby="mfct-title">
  <div>
    <p class="section-kicker">Año escolar {{ pasantes_data.periodo }}</p>
    <h1 id="mfct-title">Informe MFCT</h1>
    <p>
      Panel de seguimiento para rendir informes sobre la Formación en Centros de
      Trabajo, con indicadores actualizados desde el registro de pasantes y sus
      certificaciones adjuntas.
    </p>
  </div>
  <dl class="pasantes-summary" aria-label="Resumen del informe MFCT">
    <div>
      <dt>{{ total_estudiantes }}</dt>
      <dd>estudiantes</dd>
    </div>
    <div>
      <dt>{{ certificaciones_registradas }}</dt>
      <dd>certificaciones</dd>
    </div>
    <div>
      <dt>{{ pendientes_evidencia }}</dt>
      <dd>pendientes</dd>
    </div>
  </dl>
</section>

<section class="mfct-note" aria-labelledby="mfct-criterio-title">
  <p class="section-kicker">Criterio del informe</p>
  <h2 id="mfct-criterio-title">Conclusión documentada</h2>
  <p>
    En este panel, un estudiante aparece como concluido documentado cuando tiene
    certificación adjunta. Si no aparece la certificación, queda como pendiente de
    evidencia hasta que se registre el documento o se agregue un estado más específico.
  </p>
</section>

<section class="pasantes-section mfct-section" aria-labelledby="mfct-indicadores-title">
  <div class="pasantes-section-header">
    <div>
      <p class="section-kicker">Indicadores</p>
      <h2 id="mfct-indicadores-title">Resumen estadístico</h2>
    </div>
    <span>{{ total_empresas }} empresas</span>
  </div>

  <div class="mfct-stat-grid">
    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Conclusión documentada</span>
      <strong>{{ certificaciones_registradas }}</strong>
      <progress class="mfct-progress" value="{{ certificaciones_registradas }}" max="{{ total_estudiantes }}">
        {{ certificadas_pct }}%
      </progress>
      <span>{{ certificadas_pct }}% del total registrado</span>
    </article>

    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Pendiente de evidencia</span>
      <strong>{{ pendientes_evidencia }}</strong>
      <progress class="mfct-progress is-warning" value="{{ pendientes_evidencia }}" max="{{ total_estudiantes }}">
        {{ pendientes_pct }}%
      </progress>
      <span>{{ pendientes_pct }}% requiere seguimiento documental</span>
    </article>

    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Centros de trabajo</span>
      <strong>{{ total_empresas }}</strong>
      <span>empresas e instituciones receptoras</span>
    </article>

    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Áreas técnicas</span>
      <strong>{{ pasantes_data.areas.size }}</strong>
      <span>programas participantes</span>
    </article>
  </div>
</section>

<section class="pasantes-section mfct-section" aria-labelledby="mfct-areas-title">
  <div class="pasantes-section-header">
    <div>
      <p class="section-kicker">Distribución</p>
      <h2 id="mfct-areas-title">Estudiantes por área técnica</h2>
    </div>
    <span>{{ total_estudiantes }} estudiantes</span>
  </div>

  <div class="mfct-chart-list">
    {% for area_group in pasantes_data.areas %}
      {% assign area_items = area_group[1] %}
      {% assign area_label = area_items[0].area %}
      {% assign area_certificaciones = 0 %}
      {% for pasante in area_items %}
        {% assign cert_file = site.static_files | where: "path", pasante.certificacion | first %}
        {% if cert_file %}
          {% assign area_certificaciones = area_certificaciones | plus: 1 %}
        {% endif %}
      {% endfor %}
      {% assign area_pendientes = area_items.size | minus: area_certificaciones %}
      {% assign area_pct = area_items.size | times: 100 | divided_by: total_estudiantes %}
      {% assign area_cert_pct = area_certificaciones | times: 100 | divided_by: area_items.size %}

      <article class="mfct-chart-row">
        <div>
          <h3>{{ area_label }}</h3>
          <p>{{ area_items.size }} estudiantes · {{ area_certificaciones }} certificaciones · {{ area_pendientes }} pendientes</p>
        </div>
        <progress class="mfct-progress" value="{{ area_items.size }}" max="{{ total_estudiantes }}">
          {{ area_pct }}%
        </progress>
        <span>{{ area_pct }}% del total · {{ area_cert_pct }}% documentado</span>
      </article>
    {% endfor %}
  </div>
</section>

<section class="pasantes-section mfct-section" aria-labelledby="mfct-tabla-title">
  <div class="pasantes-section-header">
    <div>
      <p class="section-kicker">Seguimiento</p>
      <h2 id="mfct-tabla-title">Estado por área</h2>
    </div>
    <span>evidencia documental</span>
  </div>

  <div class="mfct-table-wrap">
    <table class="mfct-table">
      <thead>
        <tr>
          <th scope="col">Área técnica</th>
          <th scope="col">Estudiantes</th>
          <th scope="col">Certificaciones</th>
          <th scope="col">Pendientes</th>
          <th scope="col">Documentado</th>
        </tr>
      </thead>
      <tbody>
        {% for area_group in pasantes_data.areas %}
          {% assign area_items = area_group[1] %}
          {% assign area_label = area_items[0].area %}
          {% assign area_certificaciones = 0 %}
          {% for pasante in area_items %}
            {% assign cert_file = site.static_files | where: "path", pasante.certificacion | first %}
            {% if cert_file %}
              {% assign area_certificaciones = area_certificaciones | plus: 1 %}
            {% endif %}
          {% endfor %}
          {% assign area_pendientes = area_items.size | minus: area_certificaciones %}
          {% assign area_cert_pct = area_certificaciones | times: 100 | divided_by: area_items.size %}
          <tr>
            <th scope="row">{{ area_label }}</th>
            <td>{{ area_items.size }}</td>
            <td>{{ area_certificaciones }}</td>
            <td>{{ area_pendientes }}</td>
            <td>{{ area_cert_pct }}%</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</section>

<section class="pasantes-section mfct-section" aria-labelledby="mfct-pendientes-title">
  <div class="pasantes-section-header">
    <div>
      <p class="section-kicker">Control documental</p>
      <h2 id="mfct-pendientes-title">Certificaciones pendientes</h2>
    </div>
    <span>{{ pendientes_evidencia }} estudiantes</span>
  </div>

  <div class="mfct-pending-list">
    {% for area_group in pasantes_data.areas %}
      {% assign area_items = area_group[1] %}
      {% assign area_label = area_items[0].area %}
      <details class="mfct-pending-group">
        <summary>{{ area_label }}</summary>
        <ul>
          {% for pasante in area_items %}
            {% assign cert_file = site.static_files | where: "path", pasante.certificacion | first %}
            {% unless cert_file %}
              <li>
                <span>{{ pasante.nombre }}</span>
                <small>{{ pasante.empresa }}</small>
              </li>
            {% endunless %}
          {% endfor %}
        </ul>
      </details>
    {% endfor %}
  </div>
</section>
