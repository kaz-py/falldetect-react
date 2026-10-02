# Video FallDetect

Video de 14,1 segundos, 1920 × 1080, 30 fps. Muestra una cámara dentro del hogar, a un adulto mayor que cae en la sala de estar y a su hija recibiendo la alerta en otro interior doméstico. Las imágenes están en `public/home/` y se animan en Remotion. Incluye dos efectos de sonido en `public/audio/`.

## Previsualizar y editar

```powershell
npm install
npm run dev
```

Abre la composición `FallDetect` en Remotion Studio. Las cinco escenas también aparecen por separado en `Escenas-editables`.

## Exportar

```powershell
npx remotion render FallDetect out/falldetect.mp4 --codec h264 --crf=16
```

El logo en `public/brand/falldetect-mark.svg` está trazado directamente desde la captura original, conservada en `public/brand/falldetect-reference.png`, con curvas suavizadas para quitar las irregularidades de sus píxeles. Conserva la figura, el escudo y la alerta; el color es azul oscuro sobre fondo blanco. `src/components/BrandLogo.tsx` carga ese SVG sin estirarlo. Para cambiar el logo, sustituye el SVG. La exportación usa fotogramas PNG y H.264 con CRF 16 para conservar los bordes del logo. Las imágenes antiguas de la plaza en `public/city/` no se usan y están excluidas de Git.

El doblez y la separación entre las piernas conservan los contornos de la referencia ampliada en `public/brand/falldetect-legs-reference.png`.

Para actualizar el video de la web después de exportarlo, copia `out/falldetect.mp4` a `../public/video/falldetect.mp4`. La web sirve ese archivo directamente desde `public/video/`.

Fotos de interiores: cámara de [Cai Fang en Unsplash](https://unsplash.com/photos/white-security-camera-casting-a-long-shadow-on-a-wall-L8sCDG5MO5Y); familiar de [Liza Summer en Pexels](https://www.pexels.com/photo/concerned-woman-browsing-smartphone-in-room-6383268/).
