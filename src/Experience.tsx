import { useCallback, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';

import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Spheres } from './Spheres';
import { Stage } from './Stage';
import { useCameraRig } from './hooks/useCameraRig';
import { useDebug } from './hooks/useDebug';
import { NARROW_VIEWPORT } from './constants';

/** Roughly her silhouette — she's a blob, so a box is close enough to hit. */
const KISA_HALF_EXTENTS = [5.4, 5.5, 5.4] as const;

export function Experience() {
    const kisaRef = useRef<THREE.Group>(null);
    const width = useThree((state) => state.size.width);
    const debug = useDebug();

    /*
     * On a narrow screen the page stacks into one column and its content runs
     * the full width, so Kisa shrinks and tucks closer to the corner. Page.css
     * reserves the band she sits in.
     */
    const isNarrow = width > 0 && width <= NARROW_VIEWPORT;
    const scale = isNarrow ? 0.7 : 1;

    const [startles, setStartles] = useState(0);

    const handleCollision = useCallback(
        ({ other }: { other: { rigidBodyObject?: THREE.Object3D | null } }) => {
            // she reacts to something landing on her, not to the floor
            if (other.rigidBodyObject?.userData?.type !== 'sphere') return;
            setStartles((count) => count + 1);
        },
        [],
    );

    useCameraRig(kisaRef, { margin: isNarrow ? 24 : 48 });

    return (
        <Physics gravity={[0, -34, 0]} debug={debug}>
            <Kisa ref={kisaRef} scale={scale} startles={startles} />

            {/* kept outside Kisa's own group, so it can't widen the bounding
                box the camera rig measures her corner position from */}
            <RigidBody
                type="fixed"
                colliders={false}
                onCollisionEnter={handleCollision}
            >
                <CuboidCollider
                    args={[
                        KISA_HALF_EXTENTS[0] * scale,
                        KISA_HALF_EXTENTS[1] * scale,
                        KISA_HALF_EXTENTS[2] * scale,
                    ]}
                    position={[0, KISA_HALF_EXTENTS[1] * scale, 0]}
                />
            </RigidBody>

            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[200, 1, 200]} position={[0, -1, 0]} />
            </RigidBody>

            <Spheres />

            <Stage />
            <Environment />
        </Physics>
    );
}
