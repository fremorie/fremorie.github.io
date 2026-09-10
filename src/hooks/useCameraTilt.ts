import { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { CAMERA_POSITION, CAMERA_TARGET } from '../constants';
import { useIsPointerInWindow } from './useIsPointerInWindow';

type CameraTiltOptions = {
    /** furthest the camera slides left or right of its rest position, in world units */
    horizontalReach?: number;
    /** furthest the camera slides up or down from its rest position, in world units */
    verticalReach?: number;
    /** how fast the camera catches up, in 1/seconds */
    smoothing?: number;
};

export function useCameraTilt({
    horizontalReach = 0.8,
    verticalReach = 0.45,
    smoothing = 2,
}: CameraTiltOptions = {}) {
    const camera = useThree((state) => state.camera);
    const isPointerInWindow = useIsPointerInWindow();

    const target = useMemo(() => new THREE.Vector3(...CAMERA_TARGET), []);
    const restPosition = useMemo(
        () => new THREE.Vector3(...CAMERA_POSITION),
        [],
    );
    const restBasis = useMemo(() => {
        const forward = new THREE.Vector3()
            .subVectors(target, restPosition)
            .normalize();
        const right = new THREE.Vector3()
            .crossVectors(forward, camera.up)
            .normalize();
        const up = new THREE.Vector3().crossVectors(right, forward).normalize();

        return { right, up };
    }, [camera, restPosition, target]);
    const tiltedPosition = useMemo(() => new THREE.Vector3(), []);

    useFrame(({ pointer }, delta) => {
        tiltedPosition.copy(restPosition);

        if (isPointerInWindow.current) {
            tiltedPosition
                .addScaledVector(restBasis.right, pointer.x * horizontalReach)
                .addScaledVector(restBasis.up, pointer.y * verticalReach);
        }

        camera.position.lerp(tiltedPosition, 1 - Math.exp(-smoothing * delta));
        camera.lookAt(target);
    });
}
