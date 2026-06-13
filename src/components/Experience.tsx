import { useRef, useEffect, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

export default function Experience() {
  const { camera } = useThree();

  const cameraGroup = useRef(null);
  const mesh1 = useRef(null);
  const mesh2 = useRef(null);
  const mesh3 = useRef(null);

  const scroll = useRef(0);
  const currentSection = useRef(0);
  const cursor = useRef({ x: 0, y: 0 });

  const objectsDistance = 4;

  const meshes = [mesh1, mesh2, mesh3];

  useLayoutEffect(() => {
    meshes.forEach((ref) => {
      const mesh = ref.current;

      // set initial state BEFORE paint
      mesh.position.y -= 2;
      mesh.material.transparent = true;
      mesh.material.opacity = 0;
    });

    // then animate
    meshes.forEach((ref, i) => {
      const mesh = ref.current;

      gsap.to(mesh.position, {
        y: mesh.position.y + 2,
        duration: 1.5,
        delay: i * 0.2,
        ease: 'power3.out',
      });

      gsap.to(mesh.material, {
        opacity: 1,
        duration: 1.2,
        delay: i * 0.2,
      });
    });
  }, []);

  /**
   * Scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      scroll.current = window.scrollY;

      const newSection = Math.round(scroll.current / window.innerHeight);

      if (newSection !== currentSection.current) {
        currentSection.current = newSection;

        const mesh = meshes[newSection]?.current;
        if (!mesh) return;

        gsap.to(mesh.rotation, {
          duration: 1.5,
          ease: 'power2.inOut',
          x: '+=6',
          y: '+=3',
          z: '+=1.5',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Cursor
   */
  useEffect(() => {
    const handleMouse = (e) => {
      cursor.current.x = e.clientX / window.innerWidth - 0.5;
      cursor.current.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  /**
   * Animation loop
   */
  useFrame((state, delta) => {
    // Camera scroll
    camera.position.y =
      (-scroll.current / window.innerHeight) * objectsDistance;

    // Parallax
    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = -cursor.current.y * 0.5;

    cameraGroup.current.position.x +=
      (parallaxX - cameraGroup.current.position.x) * 5 * delta;

    cameraGroup.current.position.y +=
      (parallaxY - cameraGroup.current.position.y) * 5 * delta;

    // Mesh rotation
    meshes.forEach((meshRef) => {
      if (!meshRef.current) return;
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.12;
    });
  });

  return (
    <>
      <group ref={cameraGroup}>
        <perspectiveCamera />
      </group>

      {/* Lights */}
      <directionalLight position={[1, 1, 0]} intensity={3} />

      {/* Meshes */}
      <mesh ref={mesh1} position={[2, 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 60]} />
        <meshToonMaterial color="#ffeded" transparent />
      </mesh>

      <mesh ref={mesh2} position={[-2, -objectsDistance, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshToonMaterial color="#ffeded" transparent />
      </mesh>

      <mesh ref={mesh3} position={[2, -objectsDistance * 2, 0]}>
        <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
        <meshToonMaterial color="#ffeded" transparent />
      </mesh>
    </>
  );
}
