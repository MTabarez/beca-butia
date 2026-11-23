# Becas Butiá — Sitio Web Institucional (Uruguay)

Sitio web informativo de **Becas Butiá**, programa nacional de becas para estudiantes de educación media pública de Uruguay articulado por ANEP, MEC, BROU, BPS, Ceibal, INJU y MIDES.

## Funcionalidades incluidas

- **Portada editorial** con encabezado adaptable, secuencia continua hero + collage, carrusel de modalidades educativas, resultados 2026 y meta 2029, acuerdo educativo, montos de referencia (vista anual / cuota mensual), guía de postulación, red institucional y preguntas frecuentes.
- **Páginas internas** completas: `/conoce-la-beca`, `/como-postularte` y `/requisitos`.
- **Buscador interno** tolerante a tildes y mayúsculas en todo el sitio.
- **Listo para GitHub Pages**: resolución automática de rutas y archivos estáticos bajo subcarpetas (`/<repositorio>/`), páginas estáticas por ruta para evitar errores 404 al recargar y workflow automático de GitHub Actions.

## Desarrollo local

Requisitos: **Node.js 20+** y **npm**.

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

### Comandos útiles

```bash
npm run lint     # Verificación de tipos TypeScript
npm test         # Pruebas unitarias (rutas, montos, búsqueda y animaciones)
npm run build    # Compilación de producción en ./dist
npm run preview  # Vista previa local de la build compilada
```
