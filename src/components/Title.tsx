import { Text3D, Float } from '@react-three/drei';
import { colorPalettes } from '../utils/colorPalettes';

export default function Title() {
  return (
    <Float speed={0.5}>
      <Text3D
        font="/fonts/limelight/Limelight_Regular.json"
        color="salmon"
        position-y={4}
        position-x={-8}
      >
        Daria Borisiak
        <meshStandardMaterial color={colorPalettes[0][3]} />
      </Text3D>
      <Text3D
        font="/fonts/limelight/Limelight_Regular.json"
        color="salmon"
        position-y={2.7}
        lineHeight={0.5}
        position-x={-8}
      >
        Frontend developer
        <meshStandardMaterial color={colorPalettes[0][2]} />
      </Text3D>
    </Float>
  );
}
