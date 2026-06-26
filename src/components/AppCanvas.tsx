import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

import Experience from './Experience';
import { Environment } from './Environment';
import { CameraRig } from './CameraRig';
import { Postprocessing } from './Postprocessing';
import './style.css';

export function AppCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{ fov: 35, position: [-0.2, 15.0, 12.2] }}
      className="webgl"
      shadows="variance"
    >
      <Experience />
      <Environment />
      <CameraRig />
      <Postprocessing />
    </Canvas>
  );
}
