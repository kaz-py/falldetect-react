# FallDetect

Landing page del proyecto universitario FallDetect + Signal for Help, de Ingeniería Informática y Ciencia de Datos (UNAE, 2026). Presenta la detección de caídas con visión por computadora, la alerta por Telegram y el gesto de auxilio.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir http://localhost:5173. Para comprobar la versión de producción: `npm run build` y `npm run preview`.

## Estructura

- `src/components/sections/`: contenido de cada sección.
- `src/components/three/`: cámara, persona y mano animadas con Three.js.
- `src/components/layout/`: navegación y pie.
- `src/data/siteContent.js`: textos de los pasos y tarjetas.
- `src/styles/`: estilos y tokens visuales.
- `public/img/fall-sequence.png`: secuencia conceptual de la detección; no son capturas reales del sistema.
- `public/models/`: modelos 3D usados por la página.

## Créditos de modelos

- Mano anatómica articulada: [Emma L. D. Lieker](https://github.com/emmalieker/anatomical-hand-model), **CC BY-NC 4.0**. Uso académico y no comercial. Mantener atribución si se publica este sitio.
- Figura humana: Quaternius, distribuida por [UMRAM / Bilkent](https://github.com/UMRAM-Bilkent/supine-human-model), **CC0**. Secuencia esquelética completa de caída hacia delante, con apoyo sobre el suelo y pose final sostenida.

La cámara está modelada en código; la persona aparece directamente en el espacio 3D, sin monitor. La animación de la mano ilustra los tres pasos del gesto y cinco ciclos. Los contenidos de la landing describen el proyecto; esta página no accede a la cámara ni envía alertas.
