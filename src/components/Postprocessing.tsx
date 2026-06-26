import { EffectComposer, Vignette } from '@react-three/postprocessing';

export function Postprocessing() {
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.5} darkness={0.5} />
    </EffectComposer>
  );
}
