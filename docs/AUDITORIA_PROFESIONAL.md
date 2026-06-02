# Auditoria profesional de la revista digital

Fecha de auditoria: 2026-06-01
Proyecto: `revista-vinculacion`
Tecnologia principal: Jekyll 3.10.0 para GitHub Pages

## 1. Resumen ejecutivo

La revista tiene una base editorial valiosa: separa contenido, datos e imagenes; usa
paginas Markdown; reutiliza un componente para figuras; y organiza las fotografias
por actividad. Es una buena base para evolucionar hacia un portal institucional
profesional.

La prioridad inmediata no debe ser un rediseno visual. Primero hay que recuperar
una publicacion confiable: corregir rutas rotas, restaurar un build reproducible,
eliminar artefactos generados del control de versiones y agregar validaciones
automaticas. Despues se puede modernizar la experiencia visual con menor riesgo.

## 2. Alcance y verificaciones ejecutadas

Se auditaron:

- Estructura del repositorio, historial reciente y estado de Git.
- Configuracion de Jekyll, dependencias y posibilidad de build local.
- Permalinks, rutas internas, referencias a imagenes y HTML generado existente.
- JavaScript del carrusel y del lightbox.
- CSS, responsive design, variables, duplicacion y contraste.
- Accesibilidad estructural y metadatos SEO.
- Peso, dimensiones, formatos, duplicados y uso de imagenes.
- Organizacion editorial, paginas incompletas y datos sin consumir.

Validaciones que pasaron:

- `node --check assets/js/carousel.js`
- `node --check assets/js/lightbox.js`
- Parseo YAML de los 9 archivos en `_data/`

Limitaciones:

- El build local no es reproducible actualmente. Bundler resuelve `jekyll 3.10.0`,
  pero falta el ejecutable `jekyll` y cargar la gema produce un error interno con
  `Jekyll::Filters::URLFilters`.
- El navegador integrado no estuvo disponible durante la auditoria. La evaluacion
  visual se baso en el codigo y en el HTML generado existente.
- `_site/` contiene artefactos generados y puede estar desactualizado respecto del
  fuente. Se uso como evidencia secundaria, no como unica fuente de verdad.

## 2.1. Estado de implementacion

Actualizacion: 2026-06-01

Completado:

- Fase 0 estabilizada: build verificado, rutas criticas corregidas, `_site/`
  retirado del indice de Git y validacion automatica incorporada.
- La seccion `/pasantias/` vuelve a generarse correctamente.
- La charla de educacion financiera tiene una pagina de galeria valida.
- ISESP Poveda genera sus tres figuras con assets existentes.
- ADN conserva su pagina sin referencias rotas mientras espera fotografias
  autorizadas.
- Carrusel y lightbox comparten un estado consistente y toleran galerias
  parciales.
- Fase 1 estructural aplicada: viewport, `<main>`, metadatos SEO, canonical,
  sitemap y controles accesibles.
- Fase 2 iniciada: tokens CSS completos, contraste institucional AA y soporte
  para movimiento reducido.
- Eliminados el bloque CSS historico duplicado del hero y una declaracion
  redundante del lightbox.
- Derivados WebP generados para 90 imagenes referenciadas: reduccion estimada de
  `59.65 MB` a `10.13 MB` para navegadores modernos (`83%`).
- Dimensiones intrinsecas generadas en `_data/image_dimensions.yml` para reducir
  saltos de layout.
- Retirados un HEIC mal etiquetado sin uso y un duplicado binario exacto.

Pendiente:

- Evaluar variantes responsivas adicionales y AVIF si el trafico lo justifica.
- Consolidar los duplicados CSS restantes con verificacion visual.
- Clasificar cinco activos fuente huerfanos que se preservaron para revision
  editorial.
- Completar decisiones editoriales sobre fotografias ADN, privacidad y contacto.

## 3. Metricas de linea base

| Metrica | Resultado |
| --- | ---: |
| Archivos rastreados por Git | 261 |
| Archivos generados de `_site/` rastreados por Git | 123 |
| Peso rastreado de `_site/` | 70.61 MB |
| Imagenes fuente | 97 |
| Peso de imagenes fuente | 70.44 MB |
| Imagenes mayores de 1 MB | 27 |
| Imagenes mayores de 2 MB | 15 |
| Imagenes mayores de 3000 px | 27 |
| Referencias de assets encontradas | 94 |
| Referencias de imagen rotas en fuente | 5 |
| Imagenes no referenciadas | 8 |
| Paginas HTML generadas existentes | 19 |
| Etiquetas `<img>` en HTML generado | 158 |
| Imagenes generadas sin `width` ni `height` | 158 |
| Paginas generadas con `viewport` | 0 |
| Paginas generadas con landmark `<main>` | 0 |
| Paginas generadas con metadatos SEO | 0 |
| Workflows de CI en `.github/workflows/` | 0 |

## 4. Hallazgos criticos: P0

### P0-01. El build local esta roto

**Evidencia:** `bundle exec jekyll build` no encuentra el ejecutable. Aunque
`bundle check` indica que las dependencias estan satisfechas, cargar Jekyll falla
con `uninitialized constant Jekyll::Filters::URLFilters`.

**Impacto:** no existe una forma confiable de regenerar, verificar y publicar el
sitio desde un entorno limpio.

**Accion:** reparar la instalacion Ruby/Bundler, documentar el comando de build y
agregar una verificacion automatica en CI.

### P0-02. Colision de permalink y seccion de pasantias inexistente

**Evidencia:** `pasantias/index.md:4` declara `permalink: /visitas/`, igual que
`visitas/index.md:4`. Ademas, `pasantias/index.md:3` conserva el titulo de visitas.

**Impacto:** `/pasantias/` no se genera. El enlace global del menu hacia esa ruta
queda roto en todas las paginas.

**Accion:** restaurar `title: "Pasantias"` y `permalink: /pasantias/`; revisar que
liste contenido de pasantias y no paginas de visitas.

### P0-03. El nuevo destacado apunta a una pagina inexistente

**Evidencia:** `_data/recent.yml:29` enlaza a
`/galeria/charla-educacion-financiera-2026/`, pero no existe fuente ni salida para
esa galeria.

**Impacto:** el carrusel principal conduce a un error 404 desde la portada.

**Accion:** crear la pagina editorial de la charla o retirar temporalmente el
destacado hasta completar la publicacion.

## 5. Hallazgos altos: P1

### P1-01. La galeria ISESP Poveda se publica vacia

**Evidencia:** `galeria/visita-isesp-poveda-2026.md:17` usa
`site.data.gallery_isesp`, pero el archivo disponible es
`_data/gallery_isesp_poveda.yml`. El HTML generado contiene cero figuras.

Ademas, las tres imagenes declaradas apuntan a
`assets/img/visitas/isesp-poveda-2026/`, carpeta que no existe. Hay archivos con
nombres relacionados dentro de `assets/img/visitas/isesp-biblioteca-2026/`, pero
debe confirmarse editorialmente si son las fotografias correctas.

**Accion:** confirmar el material correcto, unificar nombre de dataset y rutas,
y validar que la pagina genere tres figuras.

### P1-02. La pagina de pasantia ADN contiene dos imagenes rotas

**Evidencia:** `pasantias/pasantia-adn-2025-2026.md:34` y `:36` referencian
`assets/img/pasantias/adn1.jpg` y `adn2.jpg`, archivos ausentes.

**Accion:** agregar fotografias autorizadas o retirar la galeria incompleta.

### P1-03. El carrusel desincroniza imagen, texto y enlace

**Evidencia:** `assets/js/carousel.js` cambia el slide automaticamente y por
gestos tactiles. Sin embargo, `index.md:126-148` actualiza caption y enlace
solamente al hacer clic en los botones anterior y siguiente.

Tambien hay actualizaciones duplicadas al pulsar botones: `next()` y `prev()` ya
llaman `update()`, pero los listeners vuelven a llamar `update()`.

**Impacto:** despues del autoplay o swipe, el usuario puede ver una imagen con el
texto y el enlace de otra actividad.

**Accion:** centralizar el cambio de estado y emitir una unica actualizacion de
imagen, caption, enlace, progreso y controles.

### P1-04. El lightbox falla en galerias sin `data-event`

**Evidencia:** las figuras de `instituciones/ucsd-2026.md` y
`pasantias/pasantia-adn-2025-2026.md` no declaran `event`. Al llegar a la ultima
foto, `assets/js/lightbox.js:53` ejecuta `currentEvent.toLowerCase()` aunque
`currentEvent` puede ser `undefined`.

**Accion:** hacer que `event` sea opcional de forma segura o definirlo en todas
las galerias. Agregar pruebas manuales de apertura, navegacion, cierre y teclado.

### P1-05. El carrusel destacado puede colapsar en pantallas moviles

**Evidencia:** `assets/css/style.css:763-766` cambia `.featured-carousel` a
`height: auto`, pero sus figuras permanecen posicionadas de forma absoluta.

**Impacto:** el contenedor puede perder altura y ocultar la imagen en movil.

**Accion:** usar `aspect-ratio`, definir altura responsiva o cambiar el
posicionamiento del slide activo.

### P1-06. `_site/` sigue versionado aunque esta ignorado

**Evidencia:** `.gitignore:1` incluye `_site/`, pero Git aun rastrea 123 archivos
generados que pesan 70.61 MB. El cambio local actual en `_site/feed.xml` contiene
URLs de `localhost:4000`.

**Impacto:** commits ruidosos, duplicacion de imagenes, historial pesado y riesgo
de publicar artefactos locales o desactualizados.

**Accion:** retirar `_site/` del indice de Git y regenerarlo solo durante build o
deploy.

## 6. Hallazgos medios: P2

### Accesibilidad y semantica

- `_layouts/default.html` no incluye `<meta name="viewport">`.
- El contenido principal usa un `<div>` en `_layouts/default.html:37` en lugar de
  `<main>`.
- El encabezado global usa `<h1>` en `_layouts/default.html:26`; muchas paginas
  agregan otro `<h1>`, por lo que la jerarquia semantica no es consistente.
- El lightbox usa un `<span>` y enlaces sin `href` como controles en
  `_layouts/default.html:48-53`. Deben ser botones accesibles con etiquetas
  `aria-label`.
- Las imagenes de galeria se abren solo mediante clic sobre `<img>`; falta acceso
  equivalente por teclado.
- La imagen global del lightbox no tiene `alt`.
- Ninguna de las 158 imagenes generadas declara dimensiones, lo que favorece
  desplazamientos de layout durante la carga.

### SEO y descubrimiento

- El plugin `jekyll-seo-tag` esta configurado, pero `_layouts/default.html` no
  invoca `{% seo %}`.
- No se generan description, canonical ni metadatos sociales.
- No hay sitemap configurado.
- El archivo anual sigue mostrando un ejemplo provisional en
  `archivo/index.md:12`.

### Rendimiento de imagenes

- Las imagenes fuente pesan 70.44 MB.
- Hay 27 imagenes mayores de 3000 px y 15 mayores de 2 MB.
- No existen variantes WebP/AVIF, miniaturas ni `srcset`.
- El primer slide destacado se carga con `loading="lazy"`, lo cual puede retrasar
  el contenido visual principal.
- Existe un HEIC con extension `.jpg`:
  `assets/img/pasantias/logistica/jaronli-maciel-camilo.jpg`.
- Hay un duplicado binario exacto:
  `eaton1-2025.jpeg` y `eaton4_foto_grupal.jpeg`.

### CSS y responsive design

- `assets/css/style.css` tiene 1211 lineas y varias capas acumuladas.
- Se usan cuatro variables sin definir: `--color-primary-dark`,
  `--color-overlay-dark`, `--color-overlay-light` y `--color-glass`.
- Existen tres definiciones de `@keyframes fadeUp` y bloques repetidos para hero,
  botones y lightbox.
- La navegacion no tiene una estrategia movil clara.
- El blanco sobre `#4da6ff` tiene contraste aproximado `2.56:1`, insuficiente para
  texto normal WCAG AA.
- Se redefine `--bs-primary`, pero Bootstrap usa utilidades como `.bg-primary`
  con variables RGB y `!important`; la intencion visual no se aplica de forma
  consistente.

### Datos y arquitectura editorial

- `_data/visitas_tecnicas.yml` no se consume.
- `_data/gallery_isesp_poveda.yml` no se consume por el error de nombre.
- Hay 8 imagenes no referenciadas que deben clasificarse: conservar, integrar o
  eliminar.
- Dos enlaces de retorno usan `/revista-vinculacion/` codificado manualmente en
  lugar de `relative_url`:
  `galeria/visita-eaton-haina-2025.md:27` y
  `galeria/visita-isesp-biblioteca-2026.md:27`.
- `_includes/header.html` y `_includes/footer.html` existen, pero el layout
  duplica su contenido en lugar de reutilizarlos.
- La galeria agregada de visitas tecnicas no expone de forma consistente todas
  las actividades disponibles.

## 7. Hallazgos de gobierno editorial: P2

El portal publica fotografias, nombres de estudiantes y lugares de pasantia. No
se encontro una pagina visible de privacidad, contacto, politica editorial ni
tratamiento de imagenes.

Esto no demuestra ausencia de autorizaciones internas, pero debe verificarse
antes de ampliar la difusion publica:

- Confirmar autorizacion de uso de imagen y nombres.
- Definir criterio para publicar nombres completos de estudiantes.
- Agregar contacto institucional y mecanismo para solicitar correcciones.
- Establecer responsable editorial y flujo de aprobacion antes de publicar.

## 8. Hallazgos bajos: P3

- `_config.yml` mezcla opciones de desarrollo (`watch`, `force_polling`) con la
  configuracion base. Conviene moverlas a `_config.dev.yml`.
- `include: assets` probablemente es innecesario porque Jekyll ya copia carpetas
  que no comienzan con guion bajo.
- El README solo contiene una descripcion breve; faltan instalacion, build,
  estructura editorial y proceso de publicacion.
- No hay workflow de CI para detectar rutas rotas, errores de build o regresiones
  basicas.

## 9. Plan profesional de mejora

### Fase 0. Estabilizacion y publicacion confiable

Objetivo: recuperar una linea base verificable sin rediseno.

1. Reparar Ruby/Bundler/Jekyll y documentar el build.
2. Corregir `/pasantias/`, el destacado de educacion financiera y las imagenes
   ADN.
3. Reparar la galeria ISESP Poveda con confirmacion editorial del material.
4. Corregir carrusel, lightbox y comportamiento movil.
5. Retirar `_site/` del indice de Git.
6. Agregar validacion automatica de build, rutas internas y referencias de assets.

Criterio de salida:

- Build limpio desde checkout.
- Cero rutas internas rotas.
- Cero referencias de imagen rotas.
- Navegacion, carrusel y lightbox funcionales en escritorio y movil.

### Fase 1. Accesibilidad, SEO y estructura

Objetivo: mejorar calidad institucional y descubrimiento.

1. Incorporar `viewport`, `{% seo %}`, `<main>`, jerarquia de headings y sitemap.
2. Convertir controles interactivos a botones accesibles.
3. Agregar foco visible, etiquetas ARIA y navegacion completa por teclado.
4. Sustituir enlaces codificados manualmente por `relative_url`.
5. Consolidar layout, header y footer.

Criterio de salida:

- Navegacion utilizable solo con teclado.
- Metadatos SEO y canonical presentes.
- Auditoria automatizada sin errores criticos de accesibilidad.

### Fase 2. Rendimiento y sistema visual

Objetivo: modernizar con una base ligera y coherente.

1. Optimizar imagenes y generar variantes WebP con tamanos responsivos.
2. Declarar dimensiones, `srcset` y estrategia de lazy loading.
3. Limpiar duplicados, HEIC mal etiquetado y activos huerfanos.
4. Refactorizar CSS por componentes y definir tokens de color consistentes.
5. Disenar navegacion movil y revisar contraste WCAG AA.

Criterio de salida:

- Peso inicial de portada controlado.
- Sin layout shift relevante por imagenes.
- Paleta y componentes consistentes en movil y escritorio.

### Fase 3. Flujo editorial y crecimiento

Objetivo: facilitar nuevas publicaciones sin deuda acumulativa.

1. Unificar modelo de actividades, galerias y destacados.
2. Crear plantilla de nueva actividad con checklist editorial.
3. Completar archivo anual, contacto y lineamientos de privacidad.
4. Agregar CI en GitHub Pages con build y validaciones.
5. Documentar publicacion y mantenimiento en README.

Criterio de salida:

- Una nueva actividad puede publicarse siguiendo una plantilla documentada.
- CI detecta rutas, assets y build defectuosos antes de integrar cambios.

## 10. Orden recomendado del primer ciclo

El primer ciclo de implementacion debe mantenerse pequeno y verificable:

1. Reparar entorno de build.
2. Retirar `_site/` del indice.
3. Corregir rutas P0 y activos rotos confirmados.
4. Corregir carrusel y lightbox.
5. Incorporar un script de auditoria automatica.
6. Ejecutar build y prueba manual responsive.

No conviene iniciar el rediseno visual antes de completar este ciclo.
