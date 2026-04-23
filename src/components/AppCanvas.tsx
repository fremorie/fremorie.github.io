import * as THREE from 'three';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export function AppCanvas() {
  return (
    <Canvas
      dpr={[1, 2]} // Clamp pixel ratio
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <Experience />
    </Canvas>
  );
}
