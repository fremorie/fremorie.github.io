import { useHelper } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const DEBUG = false;

export function Environment() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const [shadowCamera, setShadowCamera] = useState<THREE.Camera | null>(null);

  useHelper(
    DEBUG ? directionalLightRef : null,
    THREE.DirectionalLightHelper,
    1,
  );

  useHelper(
    DEBUG && shadowCamera ? { current: shadowCamera } : null,
    THREE.CameraHelper,
  );

  useEffect(() => {
    if (directionalLightRef.current) {
      setShadowCamera(directionalLightRef.current.shadow.camera);
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={directionalLightRef}
        position={[3, 5, 4]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={6}
        shadow-blurSamples={16}
        shadow-bias={-0.0001}
        shadow-normalBias={0.04}
        shadow-camera-near={-2}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
}
