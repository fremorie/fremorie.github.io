import { RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useCursor } from '@react-three/drei';
import { useRef, useState } from 'react';

import { random } from '../../utils/random';

type Props = {
  size: number;
  color: string;
  positionX: number;
};

export function Ball({ positionX, size, color }: Props) {
  const body = useRef<RapierRigidBody>(null);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer', 'auto');

  const handleClick = () => {
    if (!body.current) return;

    body.current.applyImpulse(
      { x: random() * 6, y: Math.random() * 2, z: random() * 6 },
      true,
    );
  };

  return (
    <RigidBody ref={body} colliders={'hull'} restitution={1} friction={0.5}>
      <mesh
        scale={size}
        position={[positionX, size, 2.5]}
        castShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry />
        <meshStandardMaterial roughness={1} color={color} />
      </mesh>
    </RigidBody>
  );
}
