import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Mask } from '@react-three/drei';

export const LENS_Z = 2.4;

const GONE = 0.0001;

const RING_PX = 4;

type Props = {
  radius: number;
  follow: boolean;
  frozen: boolean;
  rim: string;

  home?: [number, number];
};

export function Lens({
  radius,
  follow,
  frozen,
  rim,
  home = [-0.55, 0.35],
}: Props) {
  const group = useRef<THREE.Group>(null);
  const target = useMemo(
    () => new THREE.Vector3(home[0], home[1], LENS_Z),
    [home],
  );
  const geometry = useMemo(
    () => new THREE.CircleGeometry(radius, 64),
    [radius],
  );

  const { viewport, camera, size, gl } = useThree();
  const canvas = gl.domElement;

  const toLensPlane = useCallback(
    (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      const plane = viewport.getCurrentViewport(camera, [0, 0, LENS_Z]);
      return { x: (x * plane.width) / 2, y: (y * plane.height) / 2 };
    },
    [gl, viewport, camera],
  );

  const reachPx = useMemo(
    () =>
      (radius * size.width) /
        viewport.getCurrentViewport(camera, [0, 0, LENS_Z]).width +
      RING_PX / 2,
    [radius, viewport, camera, size.width],
  );

  const tube = useMemo(
    () =>
      ((RING_PX / 2) *
        viewport.getCurrentViewport(camera, [0, 0, LENS_Z]).width) /
      size.width,
    [viewport, camera, size.width],
  );

  const openness = useRef(frozen ? 1 : 0);
  const scale = useRef(frozen ? 1 : GONE);
  const snapToCursor = useRef(false);

  useEffect(() => {
    if (frozen) return;

    const track = (event: PointerEvent) => {
      if (!follow) return;
      const { x, y } = toLensPlane(event);
      target.set(x, y, LENS_Z);
    };

    const opennessAt = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const toEdge = Math.min(
        event.clientX - rect.left,
        rect.right - event.clientX,
        event.clientY - rect.top,
        rect.bottom - event.clientY,
      );
      return Math.min(1, Math.max(0, toEdge / reachPx));
    };

    const enter = (event: PointerEvent) => {
      openness.current = opennessAt(event);
      track(event);

      snapToCursor.current = true;
    };
    const move = (event: PointerEvent) => {
      openness.current = opennessAt(event);
      track(event);
    };
    const leave = () => {
      openness.current = 0;
    };

    canvas.addEventListener('pointerenter', enter);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    return () => {
      canvas.removeEventListener('pointerenter', enter);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, [canvas, frozen, follow, target, toLensPlane, reachPx]);

  useFrame((_, delta) => {
    if (!group.current) return;

    if (snapToCursor.current) {
      group.current.position.copy(target);
      snapToCursor.current = false;
    }

    group.current.position.lerp(target, 1 - Math.pow(0.001, delta));

    const wanted = Math.max(openness.current, GONE);
    scale.current += (wanted - scale.current) * (1 - Math.pow(0.0005, delta));
    group.current.scale.setScalar(Math.max(scale.current, GONE));
  });

  return (
    <group ref={group} position={[home[0], home[1], LENS_Z]}>
      <Mask id={1} geometry={geometry} />

      <mesh geometry={geometry} renderOrder={5}>
        <meshBasicMaterial
          color="#9fd0e0"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
      <mesh renderOrder={6}>
        <torusGeometry args={[radius, tube, 10, 96]} />
        <meshBasicMaterial
          color={rim}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
