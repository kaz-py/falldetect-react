import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {HomeFrame} from '../components/HomeFrame';

export const CctvScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fall = frame >= 74;
  const unstable = frame >= 58 && !fall;
  const statusColor = fall ? '#ff6174' : unstable ? '#ffc36a' : '#6beadd';
  const layers = [
    {panel: 0 as const, opacity: interpolate(frame, [0, 53, 59], [1, 1, 0], {extrapolateRight: 'clamp'})},
    {panel: 1 as const, opacity: interpolate(frame, [53, 59, 68, 76], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})},
    {panel: 2 as const, opacity: interpolate(frame, [68, 76], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})},
  ];
  const tracks = [
    {left: 246, top: 165, width: 170, height: 360},
    {left: 236, top: 282, width: 330, height: 370},
    {left: 265, top: 470, width: 470, height: 232},
  ];
  const track = tracks[frame < 58 ? 0 : frame < 74 ? 1 : 2];
  const trackOpacity = frame >= 53 && frame <= 62
    ? interpolate(frame, [53, 56, 59, 62], [1, 0, 0, 1])
    : frame >= 68 && frame <= 79
      ? interpolate(frame, [68, 71, 76, 79], [1, 0, 0, 1])
      : 1;

  return (
    <AbsoluteFill style={{backgroundColor: '#081c2c', overflow: 'hidden', color: 'white'}}>
      <div style={{position: 'absolute', left: 78, top: 47, display: 'flex', alignItems: 'center', gap: 18, fontSize: 27, fontWeight: 800, letterSpacing: 4}}>
        <span style={{width: 16, height: 16, borderRadius: '50%', background: statusColor, boxShadow: `0 0 20px ${statusColor}`}} />
        CAM 01 <span style={{fontWeight: 400, opacity: .7}}>· SALA DE ESTAR</span>
      </div>
      <div style={{position: 'absolute', right: 85, top: 48, color: '#acd4d6', fontSize: 22, fontWeight: 800, letterSpacing: 4}}>MONITOREO EN CASA</div>
      <div style={{position: 'absolute', left: 78, top: 104, width: 900, height: 900, overflow: 'hidden', borderRadius: 16, boxShadow: '0 28px 75px #0008'}}>
        {layers.map(({panel, opacity}) => (
          <HomeFrame key={panel} panel={panel} style={{position: 'absolute', inset: 0, width: 900, height: 900, opacity}} />
        ))}
        <div style={{position: 'absolute', inset: 20, border: '2px solid #e5f4f487', borderRadius: 8, pointerEvents: 'none'}} />
        <div style={{position: 'absolute', ...track, border: `4px solid ${statusColor}`, boxShadow: `0 0 27px ${statusColor}88`, borderRadius: 10, opacity: trackOpacity}}>
          <div style={{position: 'absolute', left: -4, top: -42, padding: '7px 12px', background: fall ? '#bd263c' : unstable ? '#a87217' : '#0a7e86', fontSize: 18, fontWeight: 800, letterSpacing: 2, whiteSpace: 'nowrap', borderRadius: '6px 6px 0 0'}}>
            {fall ? 'POSIBLE CAÍDA' : unstable ? 'PÉRDIDA DE EQUILIBRIO' : 'PERSONA EN SEGUIMIENTO'}
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 1040, right: 80, top: 192, bottom: 76, padding: '43px 45px', border: '1px solid #b8d7df55', borderRadius: 16, background: '#102d42'}}>
        <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 4, color: '#9cc6d2'}}>ANÁLISIS DE POSTURA</div>
        <div style={{width: 72, height: 4, marginTop: 24, background: statusColor}} />
        <div style={{fontSize: 58, fontWeight: 800, lineHeight: 1.13, marginTop: 27, color: statusColor}}>
          {fall ? 'Posible caída detectada' : unstable ? 'Pérdida de equilibrio' : 'Movimiento normal'}
        </div>
        <p style={{fontSize: 25, lineHeight: 1.45, color: '#c9dce4', marginTop: 27, maxWidth: 570}}>
          {fall ? 'La persona permanece en el suelo. Se prepara el aviso para su hija.' : 'La cámara sigue el movimiento dentro de la sala de estar.'}
        </p>
        <div style={{borderTop: '1px solid #a2c0ca55', marginTop: 46, paddingTop: 32, fontSize: 22, lineHeight: 2.2, color: '#d7e7ea'}}>
          <div>01 <span style={{marginLeft: 22}}>Captura en el hogar</span></div>
          <div>02 <span style={{marginLeft: 22}}>Análisis de postura</span></div>
          <div style={{color: fall ? '#ff9fac' : '#7797a1'}}>03 <span style={{marginLeft: 22}}>Aviso al familiar</span></div>
        </div>
      </div>
      <Interactive.Div name="Aviso de caída" style={{position: 'absolute', right: 110, bottom: 96, width: 700, padding: '23px 30px', borderRadius: 12, background: '#b71f35', boxShadow: '0 18px 50px #0009', opacity: interpolate(frame, [91, 106], [0, 1], {extrapolateRight: 'clamp'}), translate: interpolate(frame, [91, 106], ['0px 45px', '0px 0px'], {extrapolateRight: 'clamp'})}}>
        <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 3}}>ALERTA PREPARADA</div>
        <div style={{fontSize: 35, fontWeight: 800, marginTop: 5}}>Notificación para su hija</div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
