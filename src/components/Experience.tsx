import { Html, Text3D, Center } from '@react-three/drei';
const FONT_3D = '/fonts/limelight/Limelight_Regular.json';
const INK = '#576A8F';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daria-borisyak' },
  { label: 'GitHub', href: 'https://github.com/fremorie' },
];

export default function Experience() {
  return (
    <>
      <mesh scale={50} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color="#FFF8DE" />
      </mesh>

      <group position={[0, 0, -0.3]}>
        <Center top position={[0, 0, -1.4]}>
          <Text3D
            font={FONT_3D}
            size={0.9}
            height={0.15}
            curveSegments={8}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.015}
            castShadow
          >
            Daria Borisiak
            <meshStandardMaterial color={INK} />
          </Text3D>
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

      {/* Subtitle and links laid flat on the plane. The group is rotated to
          match the plane, so children live in its local XY space. */}
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
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
