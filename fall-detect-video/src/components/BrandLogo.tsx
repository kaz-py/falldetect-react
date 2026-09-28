import React from 'react';

export const BrandMark: React.FC<{size?: number}> = ({size = 180}) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" aria-label="FallDetect">
    <path d="M151 18 255 59c9 4 13 9 13 19v23M268 141c-6 63-46 110-117 151C72 251 34 196 31 130V78c0-9 4-15 12-19L151 18Z" stroke="#092653" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="89" cy="128" r="24" fill="#092653" />
    <path d="m91 172 29-15 42 13 25-28M122 158l-9 62m17-30 43 41m-6-61 48 31" stroke="#092653" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M180 102c35 5 55 29 58 59M184 78c48 6 78 37 82 83M189 55c58 8 93 47 97 105" stroke="#0875f5" strokeWidth="14" strokeLinecap="round" />
    <path d="m270 40 25 42c4 7 0 16-9 16h-50c-8 0-13-9-9-16l25-42c4-7 14-7 18 0Z" fill="#0875f5" />
    <path d="M261 54v23" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <circle cx="261" cy="86" r="4" fill="white" />
  </svg>
);

export const BrandWordmark: React.FC<{size?: number; color?: string}> = ({size = 72, color = '#092653'}) => (
  <span style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: size, fontWeight: 800, letterSpacing: '-0.075em', color, lineHeight: 1}}>
    Fall<span style={{color: '#0875f5'}}>Detect</span>
  </span>
);
