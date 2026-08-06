import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Mask } from '@react-three/drei';

export const LENS_Z = 2.4;

const GONE = 0.0001;

const RING_PX = 4;

const GRAB_PX = 24;

type Props = {
  radius: number;
  follow: boolean;
  frozen: boolean;
  touch: boolean;
  rim: string;

  home?: [number, number];
};

export function Lens({
  radius,
  follow,
  frozen,
  touch,
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

  const plane = useMemo(
    () => viewport.getCurrentViewport(camera, [0, 0, LENS_Z]),
    [viewport, camera],
  );

  const toLensPlane = useCallback(
    (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      return { x: (x * plane.width) / 2, y: (y * plane.height) / 2 };
    },
    [canvas, plane],
  );

  const tube = useMemo(
    () => ((RING_PX / 2) * plane.width) / size.width,
    [plane, size.width],
  );

  const reachPx = useMemo(
    () => (radius * size.width) / plane.width + RING_PX / 2,
    [radius, plane, size.width],
  );

  const grabRadius = useMemo(
    () => Math.max(radius, (GRAB_PX * plane.width) / size.width),
    [radius, plane, size.width],
  );

  const parked = frozen || touch;

  const openness = useRef(parked ? 1 : 0);
  const scale = useRef(parked ? 1 : GONE);
  const snapToCursor = useRef(false);
  const grabOffset = useRef<{ x: number; y: number } | null>(null);

  const clamp = useCallback(
    (x: number, y: number) => {
      const edge = radius + tube;
      const limitX = Math.max(0, plane.width / 2 - edge);
      const limitY = Math.max(0, plane.height / 2 - edge);
      return {
        x: Math.min(limitX, Math.max(-limitX, x)),
        y: Math.min(limitY, Math.max(-limitY, y)),
      };
    },
    [radius, tube, plane],
  );

  useEffect(() => {
    if (frozen || touch) return;

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
  }, [canvas, frozen, touch, follow, target, toLensPlane, reachPx]);

  useEffect(() => {
    if (frozen || !touch) return;

    const down = (event: PointerEvent) => {
      const here = group.current?.position ?? target;
      const { x, y } = toLensPlane(event);
      if (Math.hypot(x - here.x, y - here.y) > grabRadius) return;

      grabOffset.current = { x: here.x - x, y: here.y - y };
      canvas.setPointerCapture(event.pointerId);
    };

    const move = (event: PointerEvent) => {
      const offset = grabOffset.current;
      if (!offset) return;

      const { x, y } = toLensPlane(event);
      const next = clamp(x + offset.x, y + offset.y);
      target.set(next.x, next.y, LENS_Z);
      snapToCursor.current = true;
    };

    const up = (event: PointerEvent) => {
      if (!grabOffset.current) return;
      grabOffset.current = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const hold = (event: TouchEvent) => {
      if (grabOffset.current) event.preventDefault();
    };

    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('touchmove', hold, { passive: false });
    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('touchmove', hold);
    };
  }, [canvas, frozen, touch, target, toLensPlane, grabRadius, clamp]);

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
          toneMapped={false}
          transparent
          opacity={1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
