# Declaraciones de bienes — Diputados

Visualización en tarjetas de las declaraciones de bienes de los diputados, con búsqueda por nombre, orden por ingresos/propiedades y un modal de detalle por diputado/a.

Migrado desde un notebook de Observable a [Svelte](https://svelte.dev) + [Vite](https://vite.dev). Los datos se cargan en tiempo real desde una hoja de Google Sheets publicada como CSV.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

El sitio se publica automáticamente en GitHub Pages mediante el workflow `.github/workflows/deploy.yml` en cada push a `main` (requiere activar "GitHub Actions" como fuente en Settings → Pages del repositorio).
