import { useRef } from 'react';
import {
  OrbitControls,
  Text3D,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei';
import Title from './Title';

export default function Experience() {
  const cubeRef = useRef(null);
  const groupRef = useRef(null);

  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#FF7444" />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI / 4} position-x={2} scale={1.5}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="#B7BDF7" />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI / 2} position-y={-1} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial resolution={512} />
      </mesh>

      <Title />
    </>
  );
}
