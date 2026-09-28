import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const LensScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: '#07162b', overflow: 'hidden', color: 'white'}}>
      <Img src={staticFile('home/camera-photo.jpg')} style={{position: 'absolute', right: 0, top: 0, width: 1080, height: 1080, objectFit: 'cover', objectPosition: 'center top', scale: interpolate(frame, [0, 54], [1.03, 1.35], {easing: Easing.bezier(.16, 1, .3, 1)})}} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #031427e8 0%, #031427a1 29%, #03142736 63%, #0314276b 100%)'}} />
      <div style={{position: 'absolute', left: 99, top: 88, color: '#b7d1df', fontSize: 24, fontWeight: 800, letterSpacing: 6}}>FALLDETECT / RESPUESTA</div>
      <div style={{position: 'absolute', left: 99, bottom: 130, opacity: interpolate(frame, [4, 23], [0, 1], {extrapolateRight: 'clamp'})}}>
        <div style={{width: 86, height: 5, background: '#59dcec', marginBottom: 26}} />
        <div style={{fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -3}}>Caída en casa.<br />Alerta a su hija.</div>
        <div style={{fontSize: 29, marginTop: 22, color: '#d7e7ed'}}>El aviso llega al familiar designado.</div>
      </div>
      <div style={{position: 'absolute', right: 86, bottom: 80, fontSize: 21, fontWeight: 800, letterSpacing: 5, color: '#ffffffbb'}}>SALA DE ESTAR → FAMILIAR</div>
    </AbsoluteFill>
  );
};
