import { RigidBody } from '@react-three/rapier';

export function Ground() {
  return (
    <RigidBody type="fixed" restitution={0.5} friction={0.7}>
      <mesh scale={50} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color="#FFF8DE" />
      </mesh>
    </RigidBody>
  );
}
