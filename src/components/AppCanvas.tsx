import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

import Experience from './Experience';
import { Environment } from './Environment';
import { CameraRig } from './CameraRig';
import './style.css';

export function AppCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      dpr={[1, 2]} // Clamp pixel ratio
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{ fov: 35, position: [-0.2, 10.0, 16.2] }}
      className="webgl"
      shadows
    >
      <Experience />
      <Environment />
      <CameraRig />
      {/*<OrbitControls />*/}
    </Canvas>
  );
}
