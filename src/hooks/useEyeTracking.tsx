import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { useIsPointerInWindow } from './useIsPointerInWindow';

type EyeTrackingOptions = {
    /** furthest the gaze swings left or right of the viewer, in degrees */
    maxYaw?: number;
    /** furthest the gaze swings up or down from the viewer, in degrees */
    maxPitch?: number;
    /** >1 responds quickly near the eyes and flattens further out; approaches a linear response as it nears 0 */
    falloff?: number;
    /** how fast the gaze catches up, in 1/seconds */
    smoothing?: number;
};

type Response = { curve: number; atEdge: number };

/**
 * Eases the gaze so it responds quickly near the eyes and flattens further out.
 * Clamped because the cursor can sit more than a full half-screen away from an
 * off-centre monster, which would otherwise push the swing past its maximum.
 */
function getSwing(towardPointer: number, { curve, atEdge }: Response) {
    return THREE.MathUtils.clamp(
        Math.tanh(towardPointer * curve) / atEdge,
        -1,
        1,
    );
}

export function useEyeTracking({
    maxYaw = 18,
    maxPitch = 12,
    falloff = 1.2,
    smoothing = 6,
}: EyeTrackingOptions = {}) {
    const eyeLeftRef = useRef<THREE.Mesh>(null);
    const eyeRightRef = useRef<THREE.Mesh>(null);

    const camera = useThree((state) => state.camera);
    const isPointerInWindow = useIsPointerInWindow();

    const cameraBasis = useMemo(
        () => ({
            right: new THREE.Vector3(),
            up: new THREE.Vector3(),
            forward: new THREE.Vector3(),
        }),
        [],
    );

    const gazeTarget = useMemo(() => new THREE.Vector3(), []);
    const gazeCurrent = useMemo(() => camera.position.clone(), [camera]);

    const eyeCenter = useMemo(() => new THREE.Vector3(), []);
    const rightEyeCenter = useMemo(() => new THREE.Vector3(), []);
    const eyeOnScreen = useMemo(() => new THREE.Vector3(), []);

    /** How far a degree of gaze reaches, per unit of distance to the camera. */
    const reachPerUnitDistance = useMemo(
        () => ({
            horizontal: Math.tan(THREE.MathUtils.degToRad(maxYaw)),
            vertical: Math.tan(THREE.MathUtils.degToRad(maxPitch)),
        }),
        [maxYaw, maxPitch],
    );

    const response = useMemo(() => {
        const curve = Math.max(falloff, 1e-3);
        return { curve, atEdge: Math.tanh(curve) };
    }, [falloff]);

    useFrame(({ pointer }, delta) => {
        const leftEye = eyeLeftRef.current;
        const rightEye = eyeRightRef.current;
        if (!leftEye || !rightEye) return;

        // with the cursor away, the eyes settle back on the viewer
        gazeTarget.copy(camera.position);

        if (isPointerInWindow.current) {
            camera.updateMatrixWorld();
            camera.matrixWorld.extractBasis(
                cameraBasis.right,
                cameraBasis.up,
                cameraBasis.forward,
            );

            // measured every frame, so moving the monster around the layout
            // can't leave the gaze aiming at where she used to be
            leftEye.getWorldPosition(eyeCenter);
            rightEye.getWorldPosition(rightEyeCenter);
            eyeCenter.add(rightEyeCenter).multiplyScalar(0.5);

            eyeOnScreen.copy(eyeCenter).project(camera);

            // the cursor is measured from the eyes rather than from the middle
            // of the screen, so a monster in the corner still looks the right way
            const swingX = getSwing(pointer.x - eyeOnScreen.x, response);
            const swingY = getSwing(pointer.y - eyeOnScreen.y, response);

            const eyeToCameraDistance = eyeCenter.distanceTo(camera.position);

            gazeTarget
                .addScaledVector(
                    cameraBasis.right,
                    swingX *
                        eyeToCameraDistance *
                        reachPerUnitDistance.horizontal,
                )
                .addScaledVector(
                    cameraBasis.up,
                    swingY *
                        eyeToCameraDistance *
                        reachPerUnitDistance.vertical,
                );
        }

        gazeCurrent.lerp(gazeTarget, 1 - Math.exp(-smoothing * delta));

        leftEye.lookAt(gazeCurrent);
        rightEye.lookAt(gazeCurrent);
    });

    return { eyeLeftRef, eyeRightRef };
}
