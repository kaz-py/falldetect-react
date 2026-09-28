import React from 'react';
import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {BrandWordmark} from '../components/BrandLogo';
import {HomeFrame} from '../components/HomeFrame';

export const AlertScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: '#1b2732', overflow: 'hidden', color: 'white'}}>
      <Img
        src={staticFile('home/daughter-photo.jpg')}
        style={{position: 'absolute', left: 0, top: 0, width: 960, height: 1080, objectFit: 'cover', objectPosition: 'center 47%', scale: interpolate(frame, [0, 129], [1.01, 1.065])}}
      />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #0314260a 0%, #0314262e 38%, #031426ba 55%, #031426ed 100%)'}} />
      <div style={{position: 'absolute', top: 74, left: 92, padding: '13px 20px', borderRadius: 8, background: '#061a2dcc', fontSize: 24, fontWeight: 800, letterSpacing: 4}}>FAMILIAR DESIGNADO · SU HIJA</div>
      <Interactive.Div name="Notificación recibida" style={{position: 'absolute', right: 89, top: 155, width: 758, height: 766, padding: 33, borderRadius: 27, background: '#07192de8', border: '2px solid #cce9f771', boxShadow: '0 35px 100px #0009', backdropFilter: 'blur(18px)', opacity: interpolate(frame, [9, 30], [0, 1], {extrapolateRight: 'clamp'}), translate: interpolate(frame, [9, 30], ['0px 85px', '0px 0px'], {extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)})}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ffffff38', paddingBottom: 20}}>
          <BrandWordmark size={46} color="#ffffff" />
          <span style={{fontSize: 19, color: '#a8c8d8', letterSpacing: 3, fontWeight: 800}}>AHORA</span>
        </div>
        <div style={{display: 'flex', gap: 21, alignItems: 'center', marginTop: 29}}>
          <div style={{width: 75, height: 75, display: 'grid', placeItems: 'center', borderRadius: 17, background: '#c52b42', fontSize: 47, fontWeight: 900}}>!</div>
          <div><div style={{fontSize: 21, fontWeight: 800, letterSpacing: 4, color: '#ff9fac'}}>ALERTA PARA SU HIJA</div><div style={{fontSize: 42, fontWeight: 800, marginTop: 5}}>Papá podría necesitar ayuda</div></div>
        </div>
        <div style={{fontSize: 23, color: '#c9dae5', lineHeight: 1.35, marginTop: 19}}>Cámara 01 · Sala de estar<br />Se detectó una posible caída en casa.</div>
        <div style={{height: 249, marginTop: 25, borderRadius: 16, overflow: 'hidden', position: 'relative', border: '1px solid #ffffff55'}}>
          <HomeFrame panel={2} style={{position: 'absolute', left: 0, top: -350, width: 690, height: 690}} />
          <div style={{position: 'absolute', left: 15, top: 15, background: '#07192dcc', padding: '7px 11px', borderRadius: 6, fontSize: 17, fontWeight: 800, letterSpacing: 2}}>VISTA DEL EVENTO EN CASA</div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 25}}>
          <div style={{fontSize: 20, color: '#b9cdd9'}}>Aviso enviado al familiar</div>
          <div style={{background: '#1173e8', padding: '15px 25px', borderRadius: 10, fontSize: 23, fontWeight: 800}}>Ver evento ↗</div>
        </div>
      </Interactive.Div>
      <div style={{position: 'absolute', left: 92, bottom: 76, maxWidth: 820, fontSize: 38, fontWeight: 800, lineHeight: 1.15, textShadow: '0 3px 20px #000b'}}>Su hija recibe la alerta en casa.</div>
    </AbsoluteFill>
  );
};
