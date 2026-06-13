from pathlib import Path
from PIL import Image
import re
import unicodedata


PERIODO = "2025-2026"
SOURCE = Path("assets/source/pasantes/2025-2026/extracted-preview")
IMG_BASE = Path("assets/img/pasantes/2025-2026")
CERT_BASE = "/assets/docs/certificaciones-pasantia/2025-2026"
DATA_FILE = Path("_data/pasantes_2025_2026.yml")

AREAS = {
    "informatica": {
        "label": "Informática",
        "files": [
            "informatica-informatica-fotos-1-image-1.jpg",
            "informatica-informatica-fotos-2-image-1.jpg",
        ],
        "names": [
            "Keiler Alexis Arias Alvarez",
            "Bryan Daniel Beltre Vargas",
            "Sarah Victoria Cabrera Reyes",
            "Enmanuel Canario Mora",
            "Juan Diego Cavallo Perez",
            "Juan Jose Destin",
            "Kate Lorens Estevez Perez",
            "Jhostim Alexander Galan Caraballo",
            "Yancen Garcia Galvan",
            "Sebastian Yadel Geronimo",
            "Emely Marie Gonzalez Encarnacion",
            "Franchesca Gonzalez Minaya",
            "Marcos Noel Lebron Feliz",
            "Sahid Martínez Medina",
            "Franciel Jose Montaño Aracena",
            "Luís José Montes De Oca",
            "Wellington Junior Ogando",
            "Daimellys Valeria Peña",
            "Emely Beatriz Peralta Baez",
            "Xaviel Pereyra Marte",
            "Hansel Arturo Pérez Ramírez",
            "Anthony Philoxene Omuscat",
            "Cesar David Pineda Veras",
            "Luis Miguel Portes Morillo",
            "Justin Pujols",
            "Emidriany Ramírez Santana",
            "Camila Altagracia Rosado Garcia",
            "Jeison Javier Uceta Baez",
            "Deivy Valdez De La Rosa",
            "Cristal Mariel Valenzuela Arias",
            "Genesis Daniela Vasquez Peña",
        ],
    },
    "electricidad": {
        "label": "Instalaciones Eléctricas",
        "files": [
            "electricidad-electricidad-fotos-1-image-1.jpg",
            "electricidad-electricidad-fotos-2-image-1.jpg",
        ],
        "names": [
            "Juan David Alcantara Sanchez",
            "Franconi Arias Fortuna",
            "Liz Marie Clase Sanchez",
            "Jariel Andres Encarnacion Chalas",
            "Perla Maciel Encarnacion Vicente",
            "Benjamin Fariña Cordero",
            "Elizabeth Carolina Garcia Castillo",
            "Angel Luis Garcia Garcia",
            "Justin Mariñez Ubri",
            "Jeansenny David Martinez Rojas",
            "Darlin Emilio Melo Ramirez",
            "Alex Jose Montero Suero",
            "Hilary Jeraimy Peña Mauro",
            "Yabriel Nicolas Peña Santana",
            "Raylin Joel Pujols Gonzalez",
            "Camila Rodriguez Ramirez",
            "Enmanuel Alexander Sanchez Canela",
            "Wiliams Moises Suarez Reyes",
            "Margaret Esther Taveras Abreu",
            "Jonas Andres Tejeda Calcaño",
            "Arlenys Eridania Tejeda Sanchez",
            "Maicol Miguel Ubri Cuevas",
        ],
    },
    "mercadeo": {
        "label": "Comercio y Mercadeo",
        "files": ["mercadeo-fotos-image-1.jpg"],
        "names": [
            "Felix Steven De Los Santos Nuñez",
            "Marie Angely Del Rosario Ventura",
            "Yuderka Genao",
            "Leonela Alanis Gomez Cedeño",
            "Leodeinys Anais Gomez Cedeño",
            "Mailyn Esther Heredia Montero",
            "Daismery Hiraldo Cuevas",
            "Sheyla Lismar James Mateo",
            "Mariely Lora Rodriguez",
            "Julianny Mañon Ramirez",
            "Arianna Michelle Marte Ramos",
            "Jose Enrique Novas",
            "Nicole Paulino Solis",
            "Lia Omaylin Payano",
            "Arielby Misael Perez Sosa",
            "Julianni Jasmin Reyes Almanzar",
            "Pedro Jose Terrero Garcia",
            "Cruz Mariel Zapata Brito",
        ],
    },
    "logistica": {
        "label": "Logística y Transporte",
        "files": [
            "logistica-logistica-fotos-1-image-1.jpg",
            "logistica-logistica-fotos-2-image-1.jpg",
        ],
        "names": [
            "Genesis Isabel Antonio Feliz",
            "Santianny Asencio",
            "Jaronli Maciel Camilo De La Nuez",
            "Ana Patricia Cuevas Ogando",
            "Yeury De Leon Encarnacion",
            "Francisco Alberto Del Rosario Perez",
            "Jose David Destin Evangelista",
            "Ruth Mariel Diaz Ramirez",
            "Jesus Miguel Feliz Garcia",
            "Nikaury Altagracia Franco Aquino",
            "Heimi Jamiris Franco Rodriguez",
            "Rusbelt Adrian Gavilan Feliz",
            "Kevin Miguel Guante Sosa",
            "Alexa Marie Guzman Estevez",
            "Dileynni Heredia Contreras",
            "Carlos Saul Jimenez Turbi",
            "Mia Esther Lucas",
            "Alisson Magarin Ynfante",
            "Charlenis Matos De Los Santos",
            "Reyna Luz Matos Montaño",
            "Jeimy Maria Montero Rosa",
            "Michel Moreta Reyes",
            "Hillary Julianne Perez Duran",
            "Karyme Ravelo Reyes",
            "Vangely Marie Reynoso",
            "Angel Silvestre Rodriguez De La Cruz",
            "Marianny Rosario Hernandez",
            "Melannie Anais Ruiz Peña",
            "Asael Tavarez Burgos",
            "Scarlet Tavarez Peña",
            "Braian Emmanuel Valdez Garcia",
            "Jose Angel Merced Veras Acosta",
        ],
    },
}

EMPRESAS = {
    "keiler-alexis-arias-alvarez": "Alcaldía del Distrito Nacional",
    "bryan-daniel-beltre-vargas": "Creation Studios",
    "sarah-victoria-cabrera-reyes": "Hospital General de las Fuerzas Armadas",
    "enmanuel-canario-mora": "Instituto Superior de Estudios Poveda",
    "juan-diego-cavallo-perez": "Junta Central Electoral",
    "juan-jose-destin": "Soler Computer",
    "kate-lorens-estevez-perez": "Junta Central Electoral",
    "jhostim-alexander-galan-caraballo": "Instituto Superior de Estudios Educativos Pedro Poveda",
    "yancen-garcia-galvan": "Junta Central Electoral",
    "sebastian-yadel-geronimo": "Junta Central Electoral",
    "emely-marie-gonzalez-encarnacion": "Listín Diario",
    "franchesca-gonzalez-minaya": "Junta Central Electoral",
    "marcos-noel-lebron-feliz": "Seguriasa",
    "sahid-martinez-medina": "Junta Central Electoral",
    "franciel-jose-montano-aracena": "Alcaldía del Distrito Nacional",
    "luis-jose-montes-de-oca": "Hogar Escuela Santo Domingo Savio",
    "wellington-junior-ogando": "Soler Computer",
    "daimellys-valeria-pena": "Casa de España",
    "emely-beatriz-peralta-baez": "Hogar Escuela Rosa Duarte",
    "xaviel-pereyra-marte": "Alcaldía del Distrito Nacional",
    "hansel-arturo-perez-ramirez": "Soler Computer",
    "anthony-philoxene-omuscat": "Instituto Superior de Estudios Educativos Pedro Poveda",
    "cesar-david-pineda-veras": "Universidad Pedro Henríquez Ureña",
    "luis-miguel-portes-morillo": "Soler Computer",
    "justin-pujols": "Banco Agrícola",
    "emidriany-ramirez-santana": "Santo Domingo Country Club",
    "camila-altagracia-rosado-garcia": "CDN",
    "jeison-javier-uceta-baez": "Hogar Escuela Rosa Duarte",
    "deivy-valdez-de-la-rosa": "Instituto Superior de Estudios Educativos Pedro Poveda",
    "cristal-mariel-valenzuela-arias": "Hospital General de las Fuerzas Armadas",
    "genesis-daniela-vasquez-pena": "Agencia de Aduanas Álvaro Gestiones",
    "juan-david-alcantara-sanchez": "Ferretería Fuente de Amor",
    "liz-marie-clase-sanchez": "ETED",
    "jariel-andres-encarnacion-chalas": "ETED",
    "perla-maciel-encarnacion-vicente": "Pappaterra Montolío",
    "benjamin-farina-cordero": "ETED",
    "elizabeth-carolina-garcia-castillo": "Haina International Terminals (HIT)",
    "angel-luis-garcia-garcia": "ETED",
    "justin-marinez-ubri": "Servicios Aduanales Franmar, SRL",
    "jeansenny-david-martinez-rojas": "Homewood Suites by Hilton",
    "darlin-emilio-melo-ramirez": "Envases Tropicales",
    "hilary-jeraimy-pena-mauro": "Ministerio de Agricultura",
    "yabriel-nicolas-pena-santana": "ETED",
    "raylin-joel-pujols-gonzalez": "ETED",
    "camila-rodriguez-ramirez": "Pappaterra Montolío",
    "enmanuel-alexander-sanchez-canela": "ISFODOSU",
    "wiliams-moises-suarez-reyes": "Instituto Politécnico Salesiano Padre Bartolomé Vegh",
    "margaret-esther-taveras-abreu": "ETED",
    "jonas-andres-tejeda-calcano": "Calzasturd",
    "arlenys-eridania-tejeda-sanchez": "Alcaldía del Distrito Nacional",
    "maicol-miguel-ubri-cuevas": "Alcaldía del Distrito Nacional",
    "felix-steven-de-los-santos-nunez": "Altacopa, S.A.",
    "marie-angely-del-rosario-ventura": "Service Travel",
    "yuderka-genao": "UFHEC",
    "leonela-alanis-gomez-cedeno": "Ferretería Pepe",
    "sheyla-lismar-james-mateo": "Distrito Educativo 15-03",
    "mariely-lora-rodriguez": "Distrito Educativo 15-03",
    "julianny-manon-ramirez": "Santo Domingo Country, SRL",
    "arielby-misael-perez-sosa": "Altacopa, S.A.",
    "cruz-mariel-zapata-brito": "Distrito Educativo 15-03",
    "genesis-isabel-antonio-feliz": "ETED",
    "santianny-asencio": "Ferretería Fuente de Amor",
    "jaronli-maciel-camilo-de-la-nuez": "Instituto Nacional de Aguas Potables y Alcantarillados",
    "ana-patricia-cuevas-ogando": "Papidpack",
    "yeury-de-leon-encarnacion": "Frederic Schad",
    "jose-david-destin-evangelista": "Junta Central Electoral",
    "ruth-mariel-diaz-ramirez": "Haina International Terminal",
    "jesus-miguel-feliz-garcia": "Haina International Terminal",
    "nikaury-altagracia-franco-aquino": "Navisfret, S.R.L.",
    "heimi-jamiris-franco-rodriguez": "Autoridad Portuaria Dominicana",
    "rusbelt-adrian-gavilan-feliz": "Hospital General Doctor José Vinicio Calventi",
    "alexa-marie-guzman-estevez": "Delta Comercial",
    "dileynni-heredia-contreras": "Operadora Metropolitana de Servicios de Autobuses",
    "carlos-saul-jimenez-turbi": "Delta Comercial",
    "mia-esther-lucas": "Capital Transport Solutions",
    "alisson-magarin-ynfante": "Ferretería Pepe",
    "charlenis-matos-de-los-santos": "Haina International Terminal",
    "reyna-luz-matos-montano": "Dirección General de Impuestos Internos",
    "jeimy-maria-montero-rosa": "Delta Comercial",
    "michel-moreta-reyes": "Distrito Educativo 15-03",
    "karyme-ravelo-reyes": "Fex Mirador Norte",
    "vangely-marie-reynoso": "Instituto de Seguridad Social de las Fuerzas Armadas",
    "angel-silvestre-rodriguez-de-la-cruz": "Plásticos Comerciales",
    "marianny-rosario-hernandez": "Distrito Educativo 15-03",
    "melannie-anais-ruiz-pena": "Altacopa, S.A.",
    "asael-tavarez-burgos": "Junta Central Electoral",
    "scarlet-tavarez-pena": "Agencia Aduanal & Comercio Exterior",
    "braian-emmanuel-valdez-garcia": "Frederic Schad",
    "jose-angel-merced-veras-acosta": "Junta de Aviación Civil",
}


def slugify(value):
    value = unicodedata.normalize("NFKD", value)
    value = value.encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def portrait_boxes(path):
    img = Image.open(path).convert("RGB")
    pix = img.load()
    seen = set()
    boxes = []

    for y in range(250, 1750, 4):
        for x in range(120, 1450, 4):
            if (x, y) in seen:
                continue

            r, g, b = pix[x, y]
            if not (b > 150 and g > 120 and r < 190 and b > r + 25):
                continue

            queue = [(x, y)]
            seen.add((x, y))
            xs = []
            ys = []

            while queue:
                cx, cy = queue.pop()
                xs.append(cx)
                ys.append(cy)

                for nx, ny in ((cx + 4, cy), (cx - 4, cy), (cx, cy + 4), (cx, cy - 4)):
                    if nx < 120 or nx >= 1450 or ny < 250 or ny >= 1750 or (nx, ny) in seen:
                        continue

                    rr, gg, bb = pix[nx, ny]
                    if bb > 150 and gg > 120 and rr < 190 and bb > rr + 25:
                        seen.add((nx, ny))
                        queue.append((nx, ny))

            if len(xs) > 500:
                boxes.append((min(xs), min(ys), max(xs) + 4, max(ys) + 4, len(xs)))

    def clusters(values, gap):
        grouped = []
        for value in sorted(values):
            if not grouped or abs(grouped[-1][-1] - value) > gap:
                grouped.append([value])
            else:
                grouped[-1].append(value)
        return [sum(group) / len(group) for group in grouped]

    columns = clusters([(item[0] + item[2]) / 2 for item in boxes], 150)
    rows = clusters([(item[1] + item[3]) / 2 for item in boxes], 170)

    def slot(item):
        center_x = (item[0] + item[2]) / 2
        center_y = (item[1] + item[3]) / 2
        col = min(range(len(columns)), key=lambda index: abs(columns[index] - center_x))
        row = min(range(len(rows)), key=lambda index: abs(rows[index] - center_y))
        return row, col

    return img, sorted(boxes, key=slot)


def yml_quote(value):
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


records = {}

for area_key, area in AREAS.items():
    records[area_key] = []
    area_dir = IMG_BASE / area_key
    area_dir.mkdir(parents=True, exist_ok=True)
    current = 0

    for filename in area["files"]:
        image, boxes = portrait_boxes(SOURCE / filename)

        for x, y, _right, _bottom, _size in boxes:
            if current >= len(area["names"]):
                break

            name = area["names"][current]
            slug = slugify(name)
            crop = image.crop((max(0, x), max(0, y), min(image.width, x + 244), min(image.height, y + 258)))
            jpg_path = area_dir / f"{slug}.jpg"
            webp_path = area_dir / f"{slug}.webp"
            crop.save(jpg_path, quality=92, optimize=True)
            crop.save(webp_path, quality=86, method=6)

            records[area_key].append(
                {
                    "nombre": name,
                    "area": area["label"],
                    "empresa": EMPRESAS.get(slug, "Por registrar"),
                    "ano_escolar": PERIODO,
                    "foto": f"/assets/img/pasantes/2025-2026/{area_key}/{slug}.jpg",
                    "foto_webp": f"/assets/img/pasantes/2025-2026/{area_key}/{slug}.webp",
                    "certificacion": f"{CERT_BASE}/{area_key}/{slug}.pdf",
                }
            )
            current += 1

    print(f"{area_key}: {current} de {len(area['names'])}")

lines = [
    "# Datos fuente para la página /pasantes/.",
    "# Las certificaciones se activan al colocar PDFs con el mismo slug en assets/docs/certificaciones-pasantia/2025-2026/.",
    f"periodo: {yml_quote(PERIODO)}",
    "areas:",
]

for area_key, items in records.items():
    lines.append(f"  {area_key}:")
    for item in items:
        lines.append(f"    - nombre: {yml_quote(item['nombre'])}")
        lines.append(f"      area: {yml_quote(item['area'])}")
        lines.append(f"      empresa: {yml_quote(item['empresa'])}")
        lines.append(f"      ano_escolar: {yml_quote(item['ano_escolar'])}")
        lines.append(f"      foto: {yml_quote(item['foto'])}")
        lines.append(f"      foto_webp: {yml_quote(item['foto_webp'])}")
        lines.append(f"      certificacion: {yml_quote(item['certificacion'])}")

DATA_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"wrote {DATA_FILE}")
