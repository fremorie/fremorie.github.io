import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

/** How far in front of the camera one lands, so it sits at Kisa's own depth. */
const SPAWN_DISTANCE = 96;

/** Clicking low on the page shouldn't drop one through the floor. */
const MIN_SPAWN_HEIGHT = 14;

/** Old ones are retired rather than left to pile up forever. */
const MAX_SPHERES = 12;

/** Saturated enough to carry against the taupe, warm enough to belong to it. */
const COLORS = [
    '#e07a5f',
    '#81b29a',
    '#e8b84b',
    '#6d8ea0',
    '#b3799f',
    '#d1553f',
    '#7f9d6a',
];

type Sphere = {
    id: number;
    position: [number, number, number];
    radius: number;
    color: string;
};

export function Spheres() {
    const camera = useThree((state) => state.camera);
    const size = useThree((state) => state.size);

    const [spheres, setSpheres] = useState<Sphere[]>([]);
    const nextId = useRef(0);

    const spawn = useCallback(
        (clientX: number, clientY: number) => {
            // the canvas fills the viewport, so client coordinates are its own
            const pointer = new THREE.Vector2(
                (clientX / size.width) * 2 - 1,
                -(clientY / size.height) * 2 + 1,
            );

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(pointer, camera);

            const position = raycaster.ray.at(
                SPAWN_DISTANCE,
                new THREE.Vector3(),
            );
            position.y = Math.max(position.y, MIN_SPAWN_HEIGHT);

            const sphere: Sphere = {
                id: nextId.current++,
                position: [position.x, position.y, position.z],
                radius: 1.1 + Math.random() * 0.9,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            };

            setSpheres((current) => [...current, sphere].slice(-MAX_SPHERES));
        },
        [camera, size],
    );

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            // links, nav items and anything else clickable keep their click
            if (
                event.button !== 0 ||
                (event.target instanceof Element &&
                    event.target.closest('a, button, input, textarea, select'))
            ) {
                return;
            }

            // a click that ends a text selection isn't a click at the page
            if (!window.getSelection()?.isCollapsed) return;

            spawn(event.clientX, event.clientY);
        }

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [spawn]);

    return (
        <>
            {spheres.map((sphere) => (
                <RigidBody
                    key={sphere.id}
                    colliders="ball"
                    position={sphere.position}
                    restitution={0.45}
                    friction={0.6}
                    userData={{ type: 'sphere' }}
                >
                    <mesh castShadow receiveShadow>
                        <sphereGeometry args={[sphere.radius, 24, 24]} />
                        <meshStandardMaterial
                            color={sphere.color}
                            roughness={0.45}
                        />
                    </mesh>
                </RigidBody>
            ))}
        </>
    );
}
