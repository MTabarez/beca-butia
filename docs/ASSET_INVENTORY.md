# Inventario de Recursos Fotográficos y Fuentes Oficiales — Becas Butiá

## Política Fotográfica Vigente

- **Sin fotografías generadas por IA:** todas las posiciones fotográficas del sitio utilizan actualmente **una única fotografía temporal de referencia auténtica** procedente de los archivos oficiales de Presidencia de la República de Uruguay.
- **Archivo temporal único:** `/assets/images/butia-reference-placeholder.jpg` (ubicado en `public/assets/images/butia-reference-placeholder.jpg`).
- **Origen de la imagen temporal:** Galería oficial del lanzamiento de las Becas Butiá 2026 en la UTU de Vista Linda, Canelones (`21/11/2025`), archivo original `fgr_03.jpg` (`https://medios.presidencia.gub.uy/tav_portal/2025/noticias/AO_496/fgr_03.jpg`).
- **Configuración centralizada:** todos los componentes consumen exclusivamente `src/config/imageAssets.ts`. Cuando se apruebe la selección definitiva de fotografías oficiales, basta con actualizar las rutas en dicho archivo sin modificar el diseño ni la maquetación.
- **Video del Hero:** el componente del Hero queda preparado para admitir un archivo MP4 oficial en `videoAssets.heroVideoSrc` (`/assets/video/hero-becas-butia.mp4`) utilizando `imageAssets.hero` como póster. No se ha inventado ningún archivo de video sintético.

---

## 1. Inventario de Posiciones Fotográficas para Reemplazo Futuro

| Componente | Posición en interfaz | Sujeto previsto | Orientación recomendada | Proporción | Marcador actual | Nombre de archivo futuro sugerido |
|---|---|---|---|---|---|---|
| `HeroSection` | Fondo principal / póster de video | Estudiantes reales en un centro de educación media pública en Uruguay | Horizontal (Landscape) | `16:9` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-hero-estudiantes.jpg` |
| `HeroSection` | Fotografía flotante superpuesta bajo el Hero | Interacción cotidiana entre docente y estudiante | Horizontal (Landscape) | `4:3` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-hero-detalle-aula.jpg` |
| `HomePage` (Sec. 03) | Retrato editorial izquierdo (*El programa*) | Estudiante en aula o biblioteca pública | Vertical (Portrait) | `4:4.7` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-programa-principal.jpg` |
| `HomePage` (Sec. 03) | Inserto documental derecho (*El programa*) | Estudiantes participando en una actividad educativa o taller UTU | Horizontal (Landscape) | `4:3` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-programa-taller.jpg` |
| `StatisticsSection` | Imagen panorámica central (*Impacto*) | Comunidad educativa en patio de liceo o UTU | Horizontal (Landscape) | `16:9` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-impacto-comunidad.jpg` |
| `FeatureCarousel` | Tarjetas horizontales (01–04) | Estudiantes en distintas instancias de estudio y acompañamiento | Horizontal (Landscape) | `4:3` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/card-ejes-01-a-04.jpg` |
| `EligibilitySection` | Tarjetas de 5 modalidades educativas | Liceo público, taller UTU, Uruguay Estudia, Áreas Pedagógicas y escuela rural | Horizontal (Landscape) | `4:3` y `16:9` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/modalidad-[secundaria\|utu\|pue\|areas\|rural].jpg` |
| `ApplicationSteps` | Imagen vertical junto a los 3 pasos | Estudiante realizando gestión en línea con dispositivo Ceibal | Vertical (Portrait) | `4:4.4` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-postulacion-ceibal.jpg` |
| `EducationalAgreementSection` | Imagen editorial del Acuerdo Educativo | Encuentro pedagógico entre equipo educativo y estudiantes | Horizontal (Landscape) | `4:3` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/home-acuerdo-educativo.jpg` |
| `CTASection` | Fondo a sangre e inserto de cierre | Jóvenes compartiendo la jornada educativa | Horizontal (Landscape) | `16:9` y `4:3` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/cta-fondo-y-detalle.jpg` |
| `ConoceLaBecaPage`, `ComoPostulartePage`, `RequisitosPage` | Cabeceras y bloques editoriales internos | Actividades reales de Educación Media pública en todo el país | Horizontal (Landscape) | `16:8.2` y `4:4.7` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/internas-[conoce\|postulacion\|requisitos].jpg` |
| `Footer` | Vista previa interactiva (escritorio) | Comunidad educativa uruguaya | Horizontal (Landscape) | `16:9.5` | `/assets/images/butia-reference-placeholder.jpg` | `/assets/images/footer-preview-[tema].jpg` |

---

## 2. Catálogo de Fuentes Fotográficas Oficiales y Créditos

| Prioridad | Institución | Colección / Recurso | URL oficial | Fecha | Créditos institucionales | Nota de permisos |
|---|---|---|---|---|---|---|
| Prioridad 1 | Presidencia de la República | Informe de resultados Becas Butiá 2026 (17 fotos descargables y videos) | `https://www.gub.uy/presidencia/comunicacion/publicaciones/orsi-presentacion-del-informe-resultados-becas-butia-2026` | 17/06/2026 | Camilo Dos Santos, Eduardo Collins (fotografía) · Guillermo Arregui (video) / Presidencia de la República | Conservar créditos y confirmar autorización de reutilización para publicación definitiva. |
| Prioridad 1 | Presidencia de la República | Lanzamiento Becas Butiá 2026 en UTU de Vista Linda, Canelones (8 fotos descargables) | `https://www.gub.uy/presidencia/comunicacion/fotos/presidente-orsi-lanzamiento-becas-butia` | 21/11/2025 | Presidencia de la República Oriental del Uruguay | Incluye `fgr_03.jpg` (utilizada como fotografía temporal única de referencia) y `fgr_02.jpg` (libreta oficial 70.000 Becas Butiá). |
| Prioridad 2 | MEC | Campaña oficial Becas Butiá y portal `/butia` | `https://www.gub.uy/ministerio-educacion-cultura/comunicacion/campanas/becas-butia` y `/butia` | Nov 2025 – 2026 | Ministerio de Educación y Cultura (DNE) | Material de comunicación oficial de la campaña. |
| Prioridad 3 | ANEP | Portal y prensa ANEP | `https://www.anep.edu.uy/` | Vigente | Comunicación Institucional ANEP | Evaluar fotografías con autorización expresa de uso de imagen de estudiantes menores de edad. |
| Prioridad 4 | DGETP — UTU | Portal institucional UTU | `https://www.utu.edu.uy/` | Vigente | Comunicación DGETP — UTU | Fuente prioritaria para talleres técnicos, laboratorios, CEA, CEC y escuelas agrarias. |
| Prioridad 5 | Ceibal | Portal institucional Ceibal | `https://ceibal.edu.uy/` | Vigente | Comunicación Ceibal | Fuente prioritaria para actividades con tecnología e inclusión digital. |
| Prioridad 6 | ANEP, MEC, Ceibal, BROU, BPS, MIDES, INJU | Logotipos institucionales SVG oficiales (versión diapo) | `https://becas.edu.uy/` | 2025 – 2026 | Organismos integrantes de Becas Butiá | Almacenados localmente en `public/assets/brand/institutional-logos/`. |
