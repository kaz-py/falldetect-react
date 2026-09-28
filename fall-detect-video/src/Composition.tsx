import {Composition, Folder, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Audio} from '@remotion/media';
import {CameraIntro} from './scenes/CameraIntro';
import {CctvScene} from './scenes/CctvScene';
import {LensScene} from './scenes/LensScene';
import {AlertScene} from './scenes/AlertScene';
import {BrandScene} from './scenes/BrandScene';

const transition = linearTiming({durationInFrames: 18});

export const FallDetectFilm: React.FC = () => (
  <>
  <TransitionSeries>
    <TransitionSeries.Sequence name="01 · Cámara" durationInFrames={60}><CameraIntro /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={transition} />
    <TransitionSeries.Sequence name="02 · Detección" durationInFrames={170}><CctvScene /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={transition} />
    <TransitionSeries.Sequence name="03 · Lente" durationInFrames={55}><LensScene /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={transition} />
    <TransitionSeries.Sequence name="04 · Alerta" durationInFrames={130}><AlertScene /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={transition} />
    <TransitionSeries.Sequence name="05 · Marca" durationInFrames={80}><BrandScene /></TransitionSeries.Sequence>
  </TransitionSeries>
  <Audio from={194} src={staticFile('audio/whoosh.wav')} volume={0.28} />
  <Audio from={240} src={staticFile('audio/ding.wav')} volume={0.42} />
  </>
);

export const MyComposition: React.FC = () => (
  <>
    <Composition id="FallDetect" component={FallDetectFilm} durationInFrames={423} fps={30} width={1920} height={1080} />
    <Folder name="Escenas-editables">
      <Composition id="Camara" component={CameraIntro} durationInFrames={60} fps={30} width={1920} height={1080} />
      <Composition id="Deteccion" component={CctvScene} durationInFrames={170} fps={30} width={1920} height={1080} />
      <Composition id="Lente" component={LensScene} durationInFrames={55} fps={30} width={1920} height={1080} />
      <Composition id="Alerta" component={AlertScene} durationInFrames={130} fps={30} width={1920} height={1080} />
      <Composition id="Marca" component={BrandScene} durationInFrames={80} fps={30} width={1920} height={1080} />
    </Folder>
  </>
);
