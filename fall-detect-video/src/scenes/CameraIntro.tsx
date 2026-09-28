import React from 'react';
import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {BrandWordmark} from '../components/BrandLogo';

export const CameraIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: '#091c30', overflow: 'hidden', color: 'white'}}>
      <Img src={staticFile('home/camera-photo.jpg')} style={{position: 'absolute', right: 0, top: 0, width: 1080, height: 1080, objectFit: 'cover', objectPosition: 'center top', scale: interpolate(frame, [0, 59], [1.02, 1.1])}} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #061524 2%, #061524ed 31%, #0615248c 57%, #06152422 100%)'}} />
      <div style={{position: 'absolute', left: 100, right: 100, top: 74, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <BrandWordmark size={49} color="#ffffff" />
        <span style={{fontSize: 24, fontWeight: 800, letterSpacing: 5, color: '#e0e8ea'}}>CÁMARA DEL HOGAR · 01</span>
      </div>
      <Interactive.Div name="Mensaje de apertura" style={{position: 'absolute', left: 100, top: 445, width: 700, opacity: interpolate(frame, [3, 25], [0, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)}), translate: interpolate(frame, [3, 25], ['0px 48px', '0px 0px'], {extrapolateRight: 'clamp'})}}>
        <div style={{width: 92, height: 5, background: '#51d4ec', marginBottom: 27}} />
        <div style={{fontSize: 88, fontWeight: 800, lineHeight: 1.03, letterSpacing: -4}}>Cada segundo<br /><span style={{color: '#74e4f5'}}>cuenta.</span></div>
        <div style={{fontSize: 29, marginTop: 29, lineHeight: 1.4, color: '#e1edf3'}}>Una cámara observa la sala de estar y reconoce una posible caída en casa.</div>
      </Interactive.Div>
      <div style={{position: 'absolute', left: 100, bottom: 72, display: 'flex', alignItems: 'center', gap: 17, fontSize: 23, fontWeight: 800, letterSpacing: 4}}>
        <span style={{width: 15, height: 15, borderRadius: '50%', background: '#5ce0ef', boxShadow: '0 0 22px #5ce0ef'}} /> MONITOREO EN CASA
      </div>
    </AbsoluteFill>
  );
};
