---
layout: default
title: "Informe MFCT"
permalink: /mfct/
---

{% assign pasantes_data = site.data.pasantes_2025_2026 %}
{% assign total_estudiantes = 0 %}
{% assign concluidos_documentados = 0 %}
{% assign por_verificar = 0 %}
{% assign empresas_vistas = "" %}
{% assign total_empresas = 0 %}
{% for area_group in pasantes_data.areas %}
  {% assign total_estudiantes = total_estudiantes | plus: area_group[1].size %}
  {% for pasante in area_group[1] %}
    {% if pasante.estado_mfct == "concluido_documentado" %}
      {% assign concluidos_documentados = concluidos_documentados | plus: 1 %}
    {% else %}
      {% assign por_verificar = por_verificar | plus: 1 %}
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
{% assign documentados_pct = concluidos_documentados | times: 100 | divided_by: total_estudiantes %}
{% assign verificar_pct = por_verificar | times: 100 | divided_by: total_estudiantes %}

<section class="pasantes-hero mfct-hero" aria-labelledby="mfct-title">
  <div>
    <p class="section-kicker">Año escolar {{ pasantes_data.periodo }}</p>
    <h1 id="mfct-title">Informe MFCT</h1>
    <p>
      Panel de seguimiento para rendir informes sobre la Formación en Centros de
      Trabajo, alimentado desde el registro de pasantes, empresas receptoras y
      estado documental del proceso.
    </p>
  </div>
  <dl class="pasantes-summary" aria-label="Resumen del informe MFCT">
    <div>
      <dt>{{ total_estudiantes }}</dt>
      <dd>estudiantes</dd>
    </div>
    <div>
      <dt>{{ concluidos_documentados }}</dt>
      <dd>documentados</dd>
    </div>
    <div>
      <dt>{{ por_verificar }}</dt>
      <dd>por verificar</dd>
    </div>
  </dl>
</section>

<section class="mfct-note" aria-labelledby="mfct-criterio-title">
  <p class="section-kicker">Criterio del informe</p>
  <h2 id="mfct-criterio-title">Lectura profesional del estado MFCT</h2>
  <p>
    El informe separa los estudiantes con conclusión documentada de los casos por
    verificar. Un estudiante aparece como concluido documentado cuando el registro
    tiene evidencia cargada; si no hay evidencia o el cierre no está confirmado en
    la fuente de datos, permanece por verificar para seguimiento institucional.
  </p>
  <a class="mfct-note-link" href="{{ '/mfct/criterios/' | relative_url }}">
    Ver criterios de lectura
  </a>
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
      <strong>{{ concluidos_documentados }}</strong>
      <progress class="mfct-progress" value="{{ concluidos_documentados }}" max="{{ total_estudiantes }}">
        {{ documentados_pct }}%
      </progress>
      <span>{{ documentados_pct }}% del total registrado tiene evidencia cargada</span>
    </article>

    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Por verificar</span>
      <strong>{{ por_verificar }}</strong>
      <progress class="mfct-progress is-warning" value="{{ por_verificar }}" max="{{ total_estudiantes }}">
        {{ verificar_pct }}%
      </progress>
      <span>{{ verificar_pct }}% requiere confirmación o evidencia documental</span>
    </article>

    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Centros de trabajo</span>
      <strong>{{ total_empresas }}</strong>
      <span>empresas e instituciones receptoras registradas</span>
    </article>

    <article class="mfct-stat-card">
      <span class="mfct-stat-label">Áreas técnicas</span>
      <strong>{{ pasantes_data.areas.size }}</strong>
      <span>programas participantes en el periodo</span>
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
      {% assign area_documentados = 0 %}
      {% for pasante in area_items %}
        {% if pasante.estado_mfct == "concluido_documentado" %}
          {% assign area_documentados = area_documentados | plus: 1 %}
        {% endif %}
      {% endfor %}
      {% assign area_verificar = area_items.size | minus: area_documentados %}
      {% assign area_pct = area_items.size | times: 100 | divided_by: total_estudiantes %}
      {% assign area_documentados_pct = area_documentados | times: 100 | divided_by: area_items.size %}

      <article class="mfct-chart-row">
        <div>
          <h3>{{ area_label }}</h3>
          <p>{{ area_items.size }} estudiantes · {{ area_documentados }} documentados · {{ area_verificar }} por verificar</p>
        </div>
        <progress class="mfct-progress" value="{{ area_items.size }}" max="{{ total_estudiantes }}">
          {{ area_pct }}%
        </progress>
        <span>{{ area_pct }}% del total · {{ area_documentados_pct }}% documentado</span>
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
    <span>cierre documental</span>
  </div>

  <div class="mfct-table-wrap">
    <table class="mfct-table">
      <thead>
        <tr>
          <th scope="col">Área técnica</th>
          <th scope="col">Estudiantes</th>
          <th scope="col">Documentados</th>
          <th scope="col">Por verificar</th>
          <th scope="col">Avance documental</th>
        </tr>
      </thead>
      <tbody>
        {% for area_group in pasantes_data.areas %}
          {% assign area_items = area_group[1] %}
          {% assign area_label = area_items[0].area %}
          {% assign area_documentados = 0 %}
          {% for pasante in area_items %}
            {% if pasante.estado_mfct == "concluido_documentado" %}
              {% assign area_documentados = area_documentados | plus: 1 %}
            {% endif %}
          {% endfor %}
          {% assign area_verificar = area_items.size | minus: area_documentados %}
          {% assign area_documentados_pct = area_documentados | times: 100 | divided_by: area_items.size %}
          <tr>
            <th scope="row">{{ area_label }}</th>
            <td>{{ area_items.size }}</td>
            <td>{{ area_documentados }}</td>
            <td>{{ area_verificar }}</td>
            <td>{{ area_documentados_pct }}%</td>
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
      <h2 id="mfct-pendientes-title">Casos por verificar</h2>
    </div>
    <span>{{ por_verificar }} estudiantes</span>
  </div>

  <div class="mfct-pending-list">
    {% for area_group in pasantes_data.areas %}
      {% assign area_items = area_group[1] %}
      {% assign area_label = area_items[0].area %}
      <details class="mfct-pending-group">
        <summary>{{ area_label }}</summary>
        <ul>
          {% for pasante in area_items %}
            {% unless pasante.estado_mfct == "concluido_documentado" %}
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
