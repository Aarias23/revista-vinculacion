# Revista Digital de Vinculación Sectorial

Revista digital para documentar visitas técnicas, pasantías y actividades
institucionales del Instituto Politécnico Salesiano Padre Bartolomé Vegh.

## Requisitos

- Ruby 3.1
- Bundler 2.3 o compatible
- Node.js para validar la sintaxis JavaScript

## Instalación

```powershell
bundle install
```

## Build local

```powershell
bundle exec jekyll build
```

El sitio generado se guarda en `_site/`. Esa carpeta es local y no debe agregarse
al control de versiones.

## Servidor de desarrollo

```powershell
bundle exec jekyll serve
```

En Windows, `wdm` permite detectar cambios sin recurrir al sondeo continuo del
sistema de archivos.

## Validación

Después de generar el sitio:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-site.ps1
```

La validación comprueba permalinks, referencias de assets, enlaces internos
generados, exclusión de `_site/` y sintaxis JavaScript.

## Publicar una visita técnica

Guarda la nueva página dentro de `visitas/` y usa estos metadatos para que la
tarjeta y la opción de imprimir el informe se generen automáticamente:

```yaml
---
layout: default
title: "Visita Técnica – Nombre completo"
permalink: /visitas/nombre-de-la-visita/
date: 2026-06-02
list_title: "Nombre breve para la tarjeta"
display_date: "2 de junio de 2026"
excerpt: "Resumen breve de una línea para presentar la actividad."
print_report: true
---
```

## Optimización de imágenes

El proyecto conserva las imágenes originales como fallback y genera derivados
WebP para navegadores modernos:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\optimize-images.ps1
```

El script usa `magick.exe` desde el `PATH` o desde
`.tools\imagemagick-portable\magick.exe`. La distribución portátil oficial se
puede obtener desde:

<https://imagemagick.org/archive/binaries/>

## Auditoría y plan de mejora

La línea base y el plan por fases están documentados en
[`docs/AUDITORIA_PROFESIONAL.md`](docs/AUDITORIA_PROFESIONAL.md).
