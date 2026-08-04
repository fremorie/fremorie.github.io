import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Canvas,
  useFrame,
  useLoader,
  type ThreeEvent,
} from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';

export type AppIcon = {
  file: string;
  bar: string;
  role: string;
  label: string;
};

const APP_ICONS: AppIcon[] = [
  { file: 'wolt', bar: 'wolt', role: 'role-wolt', label: 'Wolt' },
  { file: 'vimcar', bar: 'vimcar', role: 'role-vimcar', label: 'Vimcar' },
  {
    file: 'coursera',
    bar: 'coursera',
    role: 'role-coursera',
    label: 'Coursera',
  },
  {
    file: 'yandex',
    bar: 'yandex',
    role: 'role-yandex-market',
    label: 'Yandex',
  },
  {
    file: 'bookmate',
    bar: 'bookmate',
    role: 'role-earlier',
    label: 'Bookmate',
  },
  {
    file: 'retailrocket',
    bar: 'retailrocket',
    role: 'role-earlier',
    label: 'Retail Rocket',
  },
];

const BODY = '#2B3444';
const SCREEN_WIDTH = 1.08;
const SCREEN_HEIGHT = 2.26;

function appTexture(
  image: HTMLImageElement,
  label: string,
): THREE.CanvasTexture {
  const WIDTH = 100;
  const HEIGHT = 132;
  const pixelRatio = 4;
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH * pixelRatio;
  canvas.height = HEIGHT * pixelRatio;

  const context = canvas.getContext('2d')!;
  context.scale(pixelRatio, pixelRatio);

  const size = 86;
  const x = (WIDTH - size) / 2;

  context.save();
  context.beginPath();
  context.roundRect(x, 0, size, size, 21);
  context.clip();
  context.drawImage(image, x, 0, size, size);
  context.restore();

  context.fillStyle = '#2B3245';
  context.font = '600 12px ui-monospace, Menlo, Consolas, monospace';
  context.textAlign = 'center';
  context.fillText(label, WIDTH / 2, size + 17);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function wallpaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const context = canvas.getContext('2d')!;
  const gradient = context.createLinearGradient(0, 0, 256, 512);
  gradient.addColorStop(0, '#C9CEF9');
  gradient.addColorStop(1, '#FFE3C0');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 512);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type Props = {
  lit: string | null;
  onHover: (bar: string | null) => void;

  onSelect: (role: string) => void;
};

function Device({
  lit,
  onHover,
  onSelect,
  onReady,
}: Props & { onReady?: () => void }) {
  const group = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = '';
    };
  }, [hovered]);

  const frozen = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const icons = useLoader(
    THREE.TextureLoader,
    APP_ICONS.map((app) => `/logos/${app.file}.webp`),
  );

  const faces = useMemo(
    () =>
      APP_ICONS.map((app, i) =>
        appTexture(icons[i].image as HTMLImageElement, app.label),
      ),
    [icons],
  );
  const wallpaper = useMemo(() => wallpaperTexture(), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => onReady?.());
    return () => cancelAnimationFrame(frame);
  }, [onReady]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.3;
    group.current.rotation.x = -state.pointer.y * 0.16;
  });

  function enter(event: ThreeEvent<PointerEvent>, bar: string) {
    event.stopPropagation();
    setHovered(true);
    onHover(bar);
  }
  function leave() {
    setHovered(false);
    onHover(null);
  }

  return (
    <group ref={group}>
      <Float
        enabled={!frozen}
        speed={1.2}
        rotationIntensity={0.3}
        floatIntensity={1}
        floatingRange={[-0.05, 0.05]}
      >
        <RoundedBox args={[1.24, 2.44, 0.14]} radius={0.11} smoothness={5}>
          <meshStandardMaterial color={BODY} roughness={0.35} metalness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0715]}>
          <planeGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT]} />
          <meshBasicMaterial map={wallpaper} toneMapped={false} />
        </mesh>
        <mesh position={[0, SCREEN_HEIGHT / 2 - 0.09, 0.073]}>
          <planeGeometry args={[0.3, 0.045]} />
          <meshBasicMaterial
            color="#2D374B"
            transparent
            opacity={0.35}
            toneMapped={false}
          />
        </mesh>
        {APP_ICONS.map((app, i) => {
          const column = i % 3;
          const row = Math.floor(i / 3);
          const x = (column - 1) * 0.335;
          const y = 0.6 - row * 0.46;
          return (
            <mesh
              key={app.file}
              position={[x, y, 0.074]}
              scale={lit === app.bar ? 1.08 : 1}
              onPointerOver={(event) => enter(event, app.bar)}
              onPointerOut={leave}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(app.role);
              }}
            >
              <planeGeometry args={[0.3, 0.396]} />
              <meshBasicMaterial
                map={faces[i]}
                transparent
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
}

export function Phone3D({
  onReady,
  ...props
}: Props & { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.4], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} />
      <directionalLight
        position={[-3, -1, 2]}
        intensity={0.7}
        color="#FFD9C0"
      />
      <Suspense fallback={null}>
        <Device {...props} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
