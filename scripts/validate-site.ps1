$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$siteDir = Join-Path $root "_site"
$errors = [System.Collections.Generic.List[string]]::new()
$separator = [IO.Path]::DirectorySeparatorChar

function Add-ValidationError {
  param([string]$Message)

  $errors.Add($Message)
}

function Get-SourceFiles {
  Get-ChildItem $root -Recurse -File |
    Where-Object {
      -not $_.FullName.StartsWith("$siteDir$separator") -and
      -not $_.FullName.StartsWith("$root$separator.git$separator") -and
      -not $_.FullName.StartsWith("$root$separator" + ".tools$separator") -and
      -not $_.FullName.StartsWith("$root$separator" + "docs$separator") -and
      -not $_.FullName.StartsWith("$root$separator" + "vendor$separator") -and
      $_.Extension -in ".md", ".html", ".yml"
    }
}

$sourceFiles = @(Get-SourceFiles)

# Permalinks must be unique.
$permalinks = foreach ($file in $sourceFiles) {
  $content = Get-Content -Raw -Encoding UTF8 $file.FullName
  $match = [regex]::Match($content, "(?m)^permalink:\s*(\S+)\s*$")

  if ($match.Success) {
    [pscustomobject]@{
      File = $file.FullName.Substring($root.Length + 1)
      Url = $match.Groups[1].Value
    }
  }
}

foreach ($group in $permalinks | Group-Object Url | Where-Object Count -gt 1) {
  $files = ($group.Group.File -join ", ")
  Add-ValidationError "Permalink duplicado '$($group.Name)': $files"
}

# Referenced source assets must exist.
foreach ($file in $sourceFiles) {
  $content = Get-Content -Raw -Encoding UTF8 $file.FullName
  $matches = [regex]::Matches(
    $content,
    "(?:src|image)\s*[:=]\s*[`"']([^`"']+)[`"']"
  )

  foreach ($match in $matches) {
    $url = $match.Groups[1].Value

    if ($url -match "^/?assets/") {
      $relativePath = $url.TrimStart([char]"/").Replace([char]"/", $separator)
      $target = Join-Path $root $relativePath

      if (-not (Test-Path $target)) {
        $relativeFile = $file.FullName.Substring($root.Length + 1)
        Add-ValidationError "Asset inexistente '$url' referenciado desde '$relativeFile'"
      }
    }
  }
}

# Generated internal links must resolve after the Jekyll build.
if (-not (Test-Path $siteDir)) {
  Add-ValidationError "No existe '_site/'. Ejecuta 'bundle exec jekyll build' primero."
}
else {
  $config = Get-Content -Raw -Encoding UTF8 (Join-Path $root "_config.yml")
  $baseUrlMatch = [regex]::Match($config, "(?m)^baseurl:\s*[`"']?([^`"'\r\n]+)")
  $baseUrl = if ($baseUrlMatch.Success) { $baseUrlMatch.Groups[1].Value.TrimEnd("/") } else { "" }

  foreach ($file in Get-ChildItem $siteDir -Recurse -File -Include *.html, *.xml) {
    $content = Get-Content -Raw -Encoding UTF8 $file.FullName
    $matches = [regex]::Matches($content, "(?:href|src|srcset|data-link)=`"([^`"]+)`"")

    foreach ($match in $matches) {
      $url = $match.Groups[1].Value
      $pathOnly = ($url -split "[?#]", 2)[0]

      if ($pathOnly.StartsWith("$baseUrl/")) {
        $relativePath = $pathOnly.Substring($baseUrl.Length).TrimStart([char]"/").Replace([char]"/", $separator)
        $target = Join-Path $siteDir $relativePath

        if ($pathOnly.EndsWith("/")) {
          $target = Join-Path $target "index.html"
        }

        if (-not (Test-Path $target)) {
          $relativeFile = $file.FullName.Substring($siteDir.Length)
          Add-ValidationError "Enlace generado roto '$url' encontrado en '$relativeFile'"
        }
      }
    }
  }

  foreach ($file in Get-ChildItem $siteDir -Recurse -File -Filter *.html) {
    $content = Get-Content -Raw -Encoding UTF8 $file.FullName
    $relativeFile = $file.FullName.Substring($siteDir.Length)

    if ($content -notmatch '<meta name="viewport"') {
      Add-ValidationError "Falta viewport en '$relativeFile'"
    }

    if ($content -notmatch "<main\b") {
      Add-ValidationError "Falta landmark main en '$relativeFile'"
    }

    if ($content -notmatch '<meta name="description"') {
      Add-ValidationError "Falta description SEO en '$relativeFile'"
    }

    if ($content -notmatch 'rel="canonical"') {
      Add-ValidationError "Falta canonical SEO en '$relativeFile'"
    }

    $imagesWithoutDimensions = @(
      [regex]::Matches($content, '<img\b(?![^>]*id="lightbox-img")[^>]*>') |
        Where-Object {
          $_.Value -notmatch "\bwidth=" -or $_.Value -notmatch "\bheight="
        }
    )

    if ($imagesWithoutDimensions.Count -gt 0) {
      Add-ValidationError "Hay $($imagesWithoutDimensions.Count) imagenes sin dimensiones en '$relativeFile'"
    }
  }

  if (-not (Test-Path (Join-Path $siteDir "sitemap.xml"))) {
    Add-ValidationError "No se genero sitemap.xml"
  }
}

# Generated files must stay out of Git.
$trackedSiteFiles = @(git -C $root ls-files --cached _site)
if ($trackedSiteFiles.Count -gt 0) {
  Add-ValidationError "_site/ contiene $($trackedSiteFiles.Count) archivos rastreados por Git"
}

node --check (Join-Path $root "assets/js/carousel.js")
if ($LASTEXITCODE -ne 0) {
  Add-ValidationError "assets/js/carousel.js contiene errores de sintaxis"
}

node --check (Join-Path $root "assets/js/lightbox.js")
if ($LASTEXITCODE -ne 0) {
  Add-ValidationError "assets/js/lightbox.js contiene errores de sintaxis"
}

node --check (Join-Path $root "assets/js/site-actions.js")
if ($LASTEXITCODE -ne 0) {
  Add-ValidationError "assets/js/site-actions.js contiene errores de sintaxis"
}

if ($errors.Count -gt 0) {
  Write-Host "Validacion fallida:" -ForegroundColor Red
  $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

Write-Host "Validacion completada: rutas, assets, Git y JavaScript sin errores." -ForegroundColor Green
