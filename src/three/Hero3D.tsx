import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMask, useTexture } from '@react-three/drei';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

import { useTheme } from '../hooks/useTheme';
import { Lens } from './Lens';
import { palette } from './palette';

const { cream: CREAM, coral: ACCENT, ink: INK } = palette;

const MATCAPS = {
  brass: '/matcaps/9D602E_E4C363_D5A64F_C38A44.jpg',

  ivory: '/matcaps/EAD8D6_B59A97_CCB4B0_C9ABAB.jpg',

  lilac: '/matcaps/A48DA4_E8DDE8_C9B7C9_D4C2D4.jpg',
} as const;

type MatcapName = keyof typeof MATCAPS;

function centred(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
  geometry.computeBoundingBox();
  const centre = new THREE.Vector3();
  geometry.boundingBox!.getCenter(centre);
  geometry.translate(-centre.x, -centre.y, -centre.z);
  geometry.computeBoundingSphere();
  return geometry;
}

const radiusOf = (geometry: THREE.BufferGeometry) =>
  geometry.boundingSphere?.radius ?? 1;

const SHAPES = [
  {
    id: 'cube',
    matcap: 'ivory' as MatcapName,
    at: [-0.6, 0.58] as const,
    z: 0.35,
    size: 0.13,
    spin: [0.18, 0.24] as const,
    phase: 0,
  },
  {
    id: 'pyramid',
    matcap: 'brass' as MatcapName,
    at: [0.62, 0.52] as const,
    z: -0.3,
    size: 0.12,
    spin: [0.5, -0.2] as const,
    phase: 2.1,
    upright: true,
  },
  {
    id: 'sphere',
    matcap: 'lilac' as MatcapName,
    at: [-0.52, -0.62] as const,
    z: 0.2,
    size: 0.1,
    spin: [0.1, 0.16] as const,
    phase: 4.3,
  },
] as const;

type ShapeProps = {
  geometry: THREE.BufferGeometry;
  matcap: THREE.Texture;
  meshColour: string;
  position: [number, number, number];
  scale: number;
  spin: readonly [number, number];
  phase: number;

  upright?: boolean;
  frozen: boolean;
  solid: ReturnType<typeof useMask>;
  wireframe: ReturnType<typeof useMask>;
};

function FloatingShape({
  geometry,
  matcap,
  meshColour,
  position,
  scale,
  spin,
  phase,
  upright,
  frozen,
  solid,
  wireframe,
}: ShapeProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const time = frozen ? 0 : state.clock.elapsedTime;

    group.current.position.y = position[1] + Math.sin(time * 0.5 + phase) * 0.1;
    group.current.rotation.x = upright
      ? Math.sin(time * spin[0] + phase) * 0.16
      : time * spin[0] + phase;
    group.current.rotation.y = time * spin[1] + phase;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh geometry={geometry}>
        <meshMatcapMaterial matcap={matcap} {...solid} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={meshColour}
          wireframe
          transparent
          opacity={0.55}
          {...wireframe}
        />
      </mesh>
    </group>
  );
}

function Scene({ onReady }: { onReady?: () => void }) {
  const { viewport } = useThree();
  const { theme } = useTheme();
  const float = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const frozen = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => onReady?.());
    return () => cancelAnimationFrame(frame);
  }, [onReady]);

  const teapot = useMemo(() => centred(new TeapotGeometry(1, 7)), []);

  const matcaps = useTexture(MATCAPS, (loaded) => {
    for (const texture of Object.values(
      loaded as Record<MatcapName, THREE.Texture>,
    )) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  });

  const shapes = useMemo(
    () => ({
      cube: centred(new THREE.BoxGeometry(1, 1, 1)),
      pyramid: centred(new THREE.ConeGeometry(0.72, 1.2, 4, 1)),
      sphere: centred(new THREE.SphereGeometry(0.6, 32, 20)),
    }),
    [],
  );

  const fit = Math.min(viewport.width, viewport.height);

  const scale = (fit * 0.36) / radiusOf(teapot);

  const lensRadius = scale * radiusOf(teapot) * 0.34;

  const solid = useMask(1, true);
  const wireframe = useMask(1, false);

  const meshColour = theme === 'dark' ? CREAM : INK;

  useFrame((state) => {
    const time = frozen ? 0 : state.clock.elapsedTime;
    if (float.current) {
      float.current.position.y = Math.sin(time * 0.6) * 0.12;
      float.current.rotation.z = Math.sin(time * 0.45) * 0.07;
    }
    if (spin.current) spin.current.rotation.y = time * 0.35;
  });

  return (
    <>
      <Lens
        radius={lensRadius}
        follow
        frozen={frozen}
        rim={ACCENT}
        home={[0, 0]}
      />
      <group ref={float}>
        <group rotation={[0.42, 0, 0.28]} scale={scale}>
          <group ref={spin}>
            <mesh geometry={teapot}>
              <meshMatcapMaterial matcap={matcaps.brass} {...solid} />
            </mesh>
            <mesh geometry={teapot}>
              <meshBasicMaterial
                color={meshColour}
                wireframe
                transparent
                opacity={0.55}
                {...wireframe}
              />
            </mesh>
          </group>
        </group>
      </group>
      {SHAPES.map((shape) => (
        <FloatingShape
          key={shape.id}
          geometry={shapes[shape.id]}
          matcap={matcaps[shape.matcap]}
          meshColour={meshColour}
          position={[
            (shape.at[0] * viewport.width) / 2,
            (shape.at[1] * viewport.height) / 2,
            shape.z,
          ]}
          scale={(fit * shape.size) / radiusOf(shapes[shape.id])}
          spin={shape.spin}
          phase={shape.phase}
          upright={'upright' in shape ? shape.upright : false}
          frozen={frozen}
          solid={solid}
          wireframe={wireframe}
        />
      ))}
    </>
  );
}

export function Hero3D({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      gl={{ stencil: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 34 }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(CREAM), 0)}
    >
      <Suspense fallback={null}>
        <Scene onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
