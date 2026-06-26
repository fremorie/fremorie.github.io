import { CuboidCollider, RigidBody } from '@react-three/rapier';

const HEIGHT = 5;
const WIDTH = 16;

export function Bounds() {
  return (
    <RigidBody type="fixed" restitution={0.5} friction={0} colliders={false}>
      <CuboidCollider
        args={[0.15, HEIGHT / 2, WIDTH / 2]}
        position={[WIDTH / 2, HEIGHT / 2, 0]}
      />

      <CuboidCollider
        args={[0.15, HEIGHT / 2, WIDTH / 2]}
        position={[-WIDTH / 2, HEIGHT / 2, 0]}
      />

      <CuboidCollider
        args={[WIDTH / 2, HEIGHT / 2, 0.15]}
        position={[0, HEIGHT / 2, WIDTH / 2]}
      />

      <CuboidCollider
        args={[WIDTH / 2, HEIGHT / 2, 0.15]}
        position={[0, HEIGHT / 2, -WIDTH / 2]}
      />
    </RigidBody>
  );
}
