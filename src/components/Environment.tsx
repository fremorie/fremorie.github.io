export function Environment() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 3, 0]} intensity={20} castShadow />
    </>
  );
}
