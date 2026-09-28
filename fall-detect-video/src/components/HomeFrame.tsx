import React from 'react';
import {Img, staticFile} from 'remotion';

type HomeFrameProps = {
  panel: 0 | 1 | 2;
  style?: React.CSSProperties;
};

// The source image contains three square views of the same living room.
export const HomeFrame: React.FC<HomeFrameProps> = ({panel, style}) => (
  <div style={{position: 'relative', overflow: 'hidden', aspectRatio: '1', ...style}}>
    <Img
      src={staticFile('home/fall-sequence.png')}
      style={{position: 'absolute', width: '300%', height: '100%', maxWidth: 'none', left: `${-panel * 100}%`}}
    />
  </div>
);
