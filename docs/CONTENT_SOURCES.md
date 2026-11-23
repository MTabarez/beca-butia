# Registro de Contenidos y Trazabilidad de Fuentes — Becas Butiá

Este documento registra la fuente oficial, fecha de publicación, año de convocatoria y vigencia (histórica, vigente o pendiente de confirmación 2027) de cada dato factual incluido en el sitio web.

## Matriz de Trazabilidad Factual

| Dato / Afirmación | Fuente oficial | Fecha de publicación | Año de convocatoria | Estado |
|---|---|---|---|---|
| Naturaleza del programa: apoyo económico y estrategia de protección de trayectorias educativas («Contigo caminamos los sueños») | `https://becas.edu.uy/acerca-de-la-beca` y `https://www.gub.uy/ministerio-educacion-cultura/comunicacion/campanas/becas-butia` | Noviembre 2025 – 2026 | Vigente (estable) | Vigente |
| Organismos participantes (7 instituciones): ANEP, MEC, BROU, BPS, CEIBAL, INJU y MIDES | `https://becas.edu.uy/acerca-de-la-beca` | 2025 – 2026 | Vigente (estable) | Vigente |
| **20.958** becas otorgadas en 2026 (primer semestre) | Presentación oficial de resultados Becas Butiá 2026 — Presidencia / MEC (`https://www.gub.uy/presidencia/comunicacion/publicaciones/orsi-presentacion-del-informe-resultados-becas-butia-2026`) | 17/06/2026 | 2026 | Resultado verificado (histórico 2026) |
| **70.000** estudiantes como meta de alcance hacia 2029 | `https://becas.edu.uy/acerca-de-la-beca` y lanzamiento Presidencia (`21/11/2025`) | 21/11/2025 | Proyección 2029 | Meta proyectada (no resultado alcanzado) |
| Modalidades habilitadas: Educación Secundaria, DGETP–UTU (Escuelas Técnicas, Agrarias, CEA y CEC), Programa Uruguay Estudia (Ciclo Básico y Bachillerato), Áreas Pedagógicas y Escuelas Rurales con Ciclo Básico | `https://becas.edu.uy/acerca-de-la-beca` y campaña MEC | Noviembre 2025 – 2026 | Referencia 2025–2026 | Vigente sujeto a reglamento 2027 |
| Condición de edad: las comunicaciones 2025/2026 indican 11 a 21 años, mientras que guías de usuario anteriores contenían otro límite etario; se evita fijar un requisito definitivo 2027 hasta publicación del reglamento vigente | `https://becas.edu.uy/acerca-de-la-beca` y Guía del Usuario MEC | 2025 – 2026 | 2027 | Pendiente de confirmación oficial 2027 |
| Montos anuales de referencia 2026: Media Básica `$ 13.000`, Media Superior 1.º `$ 17.000`, 2.º `$ 21.000`, 3.º `$ 25.000`, distribuidos en 9 pagos mensuales entre abril y diciembre | Campaña oficial MEC (`https://www.gub.uy/ministerio-educacion-cultura/comunicacion/campanas/becas-butia`) | Noviembre 2025 | 2026 | Referencia histórica 2026 (pendiente confirmación 2027) |
| Fechas de inscripción para 2027 | Pendiente de publicación oficial para el ciclo 2027 | — | 2027 | Pendiente de confirmación oficial (no inventadas) |
| Renovación no automática: quienes recibieron la beca anteriormente deben volver a postularse revisando y enviando sus datos | Guía del Usuario MEC (`https://www.gub.uy/ministerio-educacion-cultura/comunicacion/publicaciones/guia-del-usuario-beca-butia`) | Vigente | Anual | Vigente |
| Flujo de solicitud: registro / inicio de sesión con documento, formulario por secciones con guardado parcial («Guardar»), validación visual «Este formulario está completo» y envío definitivo | Guía del Usuario MEC (`gub.uy/ministerio-educacion-cultura`) | Vigente | Anual | Vigente |
| Portales oficiales de gestión: `https://becas.servicios.mec.gub.uy/` (postulación) y `https://consultar.servicios.mec.gub.uy/` (consulta de estado y pagos) | `https://www.gub.uy/ministerio-educacion-cultura/butia` | Vigente | Vigente | Vigente |
| Canales oficiales de atención: teléfono `0800 2342`, celular `*2342`, horario lunes a viernes de 08:00 a 18:00, correo `butia@mec.gub.uy` y formulario web de atención | `https://www.gub.uy/ministerio-educacion-cultura/butia` y `https://becas.edu.uy/` | Vigente | Vigente | Vigente |

## Reglas de Mantenimiento Anual (2027, 2028, 2029)

Todos los valores sujetos a cambio anual se encuentran centralizados en `src/data/becasContent.ts` dentro de:
- `ANNUAL_CALL_CONFIG` (año de convocatoria, estado de fechas, nota de edad 2027).
- `HISTORICAL_STATS` (estadísticas con año explícito).
- `SCHOLARSHIP_AMOUNTS_CONFIG` (montos históricos 2026 y bandera de confirmación 2027).
- `OFFICIAL_URLS` y `SUPPORT_CHANNELS`.
