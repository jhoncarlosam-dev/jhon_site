# Portafolio — Jhon Acevedo

Sitio de [Jhon Carlos Acevedo](https://github.com/jhoncarlosam-dev) para conseguir trabajo como **fullstack freelance**. Next.js, React y Tailwind.

Producción: [https://ac3.netlify.app/](https://ac3.netlify.app/)

## Desarrollo

```bash
npm install
npm run dev
```

El texto (ofertas, caso Café Marrón, experiencia) está en [`data/resume.ts`](data/resume.ts).

## Hablar desde el celular

La ruta `/chat` es una pantalla simple para conversar desde el teléfono, por texto o micrófono.

En producción: [https://ac3.netlify.app/chat](https://ac3.netlify.app/chat). En el motorola edge 60 fusion ábrela con Chrome (el navegador del teléfono) y agrégala a la pantalla de inicio. La pantalla es curva y 20:9: los controles quedan lejos del borde y el teclado no tapa el mensaje.

1. Crea una clave en [console.x.ai](https://console.x.ai).
2. Pégala en Ajustes. Queda en ese navegador; el sitio no la recibe.
3. Escribe o toca el micrófono. Si la voz está activa, también escucha la respuesta.

La página llama a Grok (`grok-4.3`) directo desde el celular. No está conectada a una sesión de Cursor.

## Build

```bash
npm run build
```

Sale en `out/` para Netlify (`publish = out`).
