import { Html, Text3D, Center } from '@react-three/drei';

import { INK } from '../utils/colorPalettes';
import { RigidBody } from '@react-three/rapier';

const FONT_3D = '/fonts/limelight/Limelight_Regular.json';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daria-borisyak' },
  { label: 'GitHub', href: 'https://github.com/fremorie' },
];

export function Content() {
  return (
    <>
      <group position={[0, 0, -0.3]}>
        <Center top position={[0, 0, -1.4]}>
          <RigidBody colliders={'cuboid'} restitution={1} friction={0.5}>
            <Text3D
              font={FONT_3D}
              size={0.9}
              height={0.15}
              curveSegments={8}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.015}
              castShadow
              receiveShadow
            >
              Daria Borisiak
              <meshStandardMaterial color={INK} />
            </Text3D>
          </RigidBody>
        </Center>
      </group>

      <group position={[0, 1.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Center top position={[0, 0, -1.4]}>
          <Text3D
            font={FONT_3D}
            size={0.5}
            height={0.07}
            curveSegments={8}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.015}
            castShadow
          >
            Frontend developer
            <meshStandardMaterial color={INK} />
          </Text3D>
        </Center>
      </group>

      {/*<group rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.9, 0]}>*/}
      {/*    <Html transform distanceFactor={6}>*/}
      {/*        /!* TODO: point this at the real projects destination *!/*/}
      {/*        <a href="#projects" className="projects-button">*/}
      {/*            Projects*/}
      {/*        </a>*/}
      {/*    </Html>*/}
      {/*</group>*/}

      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.8, 0]}>
        <Html transform position={[0, -0.8, 0]} distanceFactor={6}>
          <nav style={navStyle}>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Html>
      </group>
    </>
  );
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  fontFamily: 'Limelight, sans-serif',
  fontSize: '28px',
  whiteSpace: 'nowrap',
};
