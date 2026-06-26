import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// How far the camera is allowed to drift from its base position, in world units.
const TILT = 1.2;
// How quickly the camera eases toward the target (higher = snappier).
const EASE = 2.5;
// The point the camera aims at — it lands at the vertical center of the screen.
// Aiming below the content pushes the content toward the top of the page.
// Lower this value to move the text higher up.
const LOOK_AT = new THREE.Vector3(0, -1.5, 0);

const target = new THREE.Vector3();

export function CameraRig() {
  // Capture the base position on the first frame — after R3F has applied the
  // Canvas `camera` prop — and only once, so re-renders never reset it.
  const base = useRef<THREE.Vector3 | null>(null);

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    if (!base.current) base.current = camera.position.clone();

    // pointer is normalized to [-1, 1] on both axes.
    target.set(
      base.current.x + pointer.x * TILT,
      base.current.y + pointer.y * TILT,
      base.current.z,
    );

    // Frame-rate independent smoothing.
    const t = 1 - Math.exp(-EASE * delta);
    camera.position.lerp(target, t);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
