import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {BrandMark, BrandWordmark} from '../components/BrandLogo';
import {HomeFrame} from '../components/HomeFrame';

export const BrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: '#071b35', overflow: 'hidden', color: '#092653'}}>
      <HomeFrame panel={0} style={{position: 'absolute', left: 420, top: -420, width: 1920, height: 1920, filter: 'blur(8px)'}} />
      <AbsoluteFill style={{background: '#061b35c9'}} />
      <Interactive.Div name="Cierre FallDetect" style={{position: 'absolute', left: 425, top: 150, width: 1070, height: 780, borderRadius: 31, background: '#ffffff', boxShadow: '0 40px 110px #0008', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: interpolate(frame, [1, 23], [0, 1], {extrapolateRight: 'clamp'}), scale: interpolate(frame, [1, 23], [.92, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)})}}>
        <BrandMark size={275} />
        <div style={{marginTop: 23}}><BrandWordmark size={128} /></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 23}}><div style={{width: 76, height: 4, background: '#0875f5'}} /><span style={{fontSize: 37, letterSpacing: 5}}>Detección de caídas</span><div style={{width: 76, height: 4, background: '#0875f5'}} /></div>
        <div style={{fontSize: 27, color: '#537089', marginTop: 52, fontWeight: 700}}>Una alerta a tiempo hace la diferencia.</div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
