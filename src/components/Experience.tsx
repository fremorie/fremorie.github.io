import { Physics } from '@react-three/rapier';

import { Content } from './Content';
import { World } from './World/World';

export default function Experience() {
  return (
    <Physics>
      <Content />
      <World />
    </Physics>
  );
}
