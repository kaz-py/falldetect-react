import React from 'react';
import {Img, staticFile} from 'remotion';

// SVG traced from the supplied reference; retain its contours and proportions.
export const BrandMark: React.FC<{size?: number}> = ({size = 180}) => (
  <Img
    src={staticFile('brand/falldetect-mark.svg')}
    width={size}
    height={size}
    alt="FallDetect"
    style={{display: 'block', flexShrink: 0, objectFit: 'contain'}}
  />
);

export const BrandWordmark: React.FC<{size?: number; color?: string}> = ({size = 72, color = '#092653'}) => (
  <span style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: size, fontWeight: 800, letterSpacing: '-0.075em', color, lineHeight: 1}}>
    Fall<span style={{color: '#0875f5'}}>Detect</span>
  </span>
);
