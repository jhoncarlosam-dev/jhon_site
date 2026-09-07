# Portafolio Web — Jhon Acevedo

Currículum y portafolio de [Jhon Carlos Acevedo](https://github.com/jhoncarlosam-dev), migrado a **Next.js**, **React** y **Tailwind CSS**.

Sitio en producción: [https://ac3.netlify.app/](https://ac3.netlify.app/)

## Tecnologías

- Next.js (App Router, export estático)
- React + TypeScript
- Tailwind CSS
- react-icons
- html2canvas (descarga de la tarjeta de servicios)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build estático

```bash
npm run build
```

El sitio se genera en `out/` y se publica en Netlify (`publish = out`).

## Contenido

El texto del currículum está en [`data/resume.ts`](data/resume.ts). Las secciones se renderizan desde [`app/page.tsx`](app/page.tsx).

## Autor

Desarrollado por [Jhon Carlos](https://github.com/jhoncarlosam-dev).

- Correo: jhoncarlosam.dev@gmail.com
- GitHub: [jhoncarlosam-dev](https://github.com/jhoncarlosam-dev)
