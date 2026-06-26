import { Ball } from './Ball';
import { Ground } from './Ground';
import { Bounds } from './Bounds';

export function World() {
  return (
    <>
      <Ground />

      <Ball positionX={-1.5} color="#576A8F" size={0.6} />
      <Ball positionX={0} color="#B7BDF7" size={0.5} />
      <Ball positionX={1.5} color="#FF7444" size={0.7} />

      <Bounds />
    </>
  );
}
