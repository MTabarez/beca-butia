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

## Publicar en GitHub y GitHub Pages

El proyecto ya incluye el workflow `.github/workflows/deploy.yml`, que compila y publica automáticamente el sitio cada vez que subís cambios a la rama `main`.

### 1. Subir el código a GitHub

Creá un repositorio vacío en GitHub (por ejemplo `becas-butia`) y ejecutá en la raíz del proyecto:

```bash
git init
git branch -M main
git add .
git commit -m "Versión inicial del sitio Becas Butiá"
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

### 2. Activar GitHub Pages

1. Entrá a tu repositorio en GitHub → **Settings** → **Pages**.
2. En **Build and deployment → Source**, seleccioná **GitHub Actions**.
3. En la pestaña **Actions**, verificá que el workflow **Publicar Becas Butiá en GitHub Pages** finalice en verde.
4. Al terminar, GitHub mostrará la URL pública (por ejemplo `https://TU-USUARIO.github.io/TU-REPOSITORIO/`).

### Dominio personalizado (opcional)

Si deseás publicar con dominio propio (por ejemplo `becas.edu.uy`), agregá un archivo `public/CNAME` con el dominio. El workflow detectará el archivo y compilará automáticamente con `VITE_BASE_PATH=/`.

## Fuentes fotográficas e institucionales

Las fotografías y datos utilizados corresponden a registros y publicaciones oficiales de ANEP, DGES, MEC, Presidencia de la República, Medios Públicos y El Popular. Consultá el archivo `src/config/imageAssets.ts` para el detalle de cada fuente.
