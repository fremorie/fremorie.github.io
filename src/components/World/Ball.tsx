import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { random } from '../../utils/random';

type Props = {
  size: number;
  color: string;
  positionX: number;
};

export function Ball({ positionX, size, color }: Props) {
  const body = useRef(null);

  const handleClick = () => {
    console.log('applying lcick', body.current);
    if (!body.current) return;

    body.current.applyImpulse(
      { x: random() * 6, y: Math.random(), z: random() * 6 },
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
      >
        <sphereGeometry />
        <meshStandardMaterial roughness={1} color={color} />
      </mesh>
    </RigidBody>
  );
}
